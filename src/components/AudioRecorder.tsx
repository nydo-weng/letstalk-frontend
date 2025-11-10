import { UseAudioRecorderReturn } from '../hooks/useAudioRecorder';

interface AudioRecorderProps {
  recorder: UseAudioRecorderReturn;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function AudioRecorder({ recorder, onSubmit, isSubmitting }: AudioRecorderProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">录音并作答（Record Your Response）</h3>

      {recorder.error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {recorder.error}
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        {/* 录音按钮 */}
        {!recorder.audioBlob && (
          <button
            onClick={recorder.isRecording ? recorder.stopRecording : recorder.startRecording}
            disabled={isSubmitting}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              recorder.isRecording
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {recorder.isRecording ? (
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <rect x="6" y="6" width="8" height="8" />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        )}

        {/* 录音状态 */}
        {recorder.isRecording && (
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-red-500">
              {formatTime(recorder.recordingSeconds)}
            </div>
            <p className="text-sm text-gray-600 mt-1">录音中 Recording...</p>
            <p className="text-xs text-gray-500">(最长 40 秒)</p>
          </div>
        )}

        {/* 音频播放器 */}
        {recorder.audioURL && !recorder.isRecording && (
          <div className="w-full space-y-4">
            <audio src={recorder.audioURL} controls className="w-full" />

            <div className="flex gap-2">
              <button
                onClick={recorder.clearRecording}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                重新录制
              </button>
              <button
                onClick={onSubmit}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>AI 正在评估...</span>
                  </>
                ) : (
                  '提交评估 Submit'
                )}
              </button>
            </div>
          </div>
        )}

        {/* 提示文本 */}
        {!recorder.isRecording && !recorder.audioBlob && (
          <p className="text-sm text-gray-600 text-center">
            点击麦克风开始录音（Click the mic to start），最长 40 秒
          </p>
        )}
      </div>
    </div>
  );
}
