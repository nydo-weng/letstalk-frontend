import { useState, useEffect } from 'react';
import { ScenarioCard } from './components/ScenarioCard';
import { AudioRecorder } from './components/AudioRecorder';
import { EvaluationResult } from './components/EvaluationResult';
import { useAudioRecorder } from './hooks/useAudioRecorder';
import { getRandomScenario, evaluateAudio } from './services/api';
import type { Scenario, Evaluation } from './types';

type AppState = 'loading' | 'ready' | 'evaluating' | 'results';

function App() {
  const [state, setState] = useState<AppState>('loading');
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recorder = useAudioRecorder();

  // 加载初始场景
  useEffect(() => {
    loadScenario();
  }, []);

  const loadScenario = async () => {
    try {
      setState('loading');
      setError(null);
      const newScenario = await getRandomScenario();
      setScenario(newScenario);
      setState('ready');
    } catch (err) {
      console.error('Failed to load scenario:', err);
      setError('无法获取练习场景，请检查网络后重试。');
      setState('ready');
    }
  };

  const handleSubmit = async () => {
    if (!recorder.audioBlob || !scenario) return;

    try {
      setState('evaluating');
      setError(null);

      const result = await evaluateAudio(recorder.audioBlob, scenario);
      setEvaluation(result);
      setState('results');

      // 清空录音
      recorder.clearRecording();
    } catch (err) {
      console.error('Evaluation failed:', err);
      setError(
        err instanceof Error
          ? err.message
          : '评估失败，请稍后再试。'
      );
      setState('ready');
    }
  };

  const handleNext = () => {
    if (evaluation?.nextScenario) {
      // 使用评估返回的下一个场景
      setScenario(evaluation.nextScenario);
      setEvaluation(null);
      setState('ready');
    } else {
      // 否则加载新场景
      loadScenario();
    }
  };

  const handleRetry = () => {
    loadScenario();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Let's Talk · AI 口语教练</h1>
              <p className="text-gray-600 mt-1">和 AI 一起轻松练习英语口语 Practice English Speaking with AI</p>
            </div>
            {state !== 'loading' && scenario && (
              <button
                onClick={handleRetry}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                换一个场景
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p className="font-medium">提示</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {state === 'results' && evaluation ? (
          <EvaluationResult evaluation={evaluation} onNext={handleNext} />
        ) : (
          <div className="space-y-6">
            {/* Scenario Card */}
            <ScenarioCard scenario={scenario} loading={state === 'loading'} />

            {/* Audio Recorder */}
            {state !== 'loading' && (
              <AudioRecorder
                recorder={recorder}
                onSubmit={handleSubmit}
                isSubmitting={state === 'evaluating'}
              />
            )}

            {/* Instructions */}
            {state === 'ready' && !recorder.isRecording && !recorder.audioBlob && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <h3 className="font-semibold text-blue-900 mb-2">使用步骤 How it works</h3>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>先阅读上面的练习场景（Scenario）</li>
                  <li>点击麦克风开始录音（Start Recording）</li>
                  <li>尽量使用英文作答，如有需要可先在脑中组织语言</li>
                  <li>完成后点击停止，再确认录音</li>
                  <li>提交后即可获取 AI 的评估与反馈</li>
                </ol>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-600 text-sm">
        <p>由 OpenAI Whisper & GPT-4o 提供语音与评估能力</p>
        <p className="mt-1">坚持练习，口语更自信！💪</p>
      </footer>
    </div>
  );
}

export default App;
