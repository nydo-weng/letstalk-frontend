import { Evaluation } from '../types';

interface EvaluationResultProps {
  evaluation: Evaluation;
  onNext: () => void;
}

export function EvaluationResult({ evaluation, onNext }: EvaluationResultProps) {
  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getSeverityColor = (severity: 'minor' | 'moderate' | 'major'): string => {
    switch (severity) {
      case 'minor':
        return 'bg-blue-100 text-blue-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'major':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* 总体评分 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Your Results</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {Object.entries(evaluation.scores).map(([key, score]) => (
            <div
              key={key}
              className={`p-4 rounded-lg ${getScoreBgColor(score)}`}
            >
              <div className="text-sm text-gray-600 capitalize mb-1">{key}</div>
              <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                {score}
              </div>
            </div>
          ))}
        </div>

        {/* 转录文本 */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">What you said:</h3>
          <div className="bg-gray-50 rounded p-3 text-gray-800 italic">
            "{evaluation.transcription}"
          </div>
        </div>

        {/* 总结 */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-gray-800">{evaluation.summary}</p>
        </div>
      </div>

      {/* 语法反馈 */}
      {evaluation.feedback.grammar.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">📝 Grammar Feedback</h3>
          <div className="space-y-3">
            {evaluation.feedback.grammar.map((error, index) => (
              <div key={index} className="border-l-4 border-orange-500 pl-4 py-2">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-red-600 line-through">{error.original}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${getSeverityColor(
                      error.severity
                    )}`}
                  >
                    {error.severity}
                  </span>
                </div>
                <div className="text-green-600 mb-1">✓ {error.correction}</div>
                <p className="text-sm text-gray-600">{error.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 发音反馈 */}
      {evaluation.feedback.pronunciation.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">🗣️ Pronunciation Tips</h3>
          <div className="space-y-3">
            {evaluation.feedback.pronunciation.map((issue, index) => (
              <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
                <div className="font-semibold text-purple-700 mb-1">
                  "{issue.word}"
                </div>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Issue:</span> {issue.issue}
                </p>
                <p className="text-sm text-green-700">
                  <span className="font-medium">Tip:</span> {issue.suggestion}
                </p>
                {issue.commonMistake && (
                  <p className="text-xs text-gray-500 mt-1">
                    Common mistake: {issue.commonMistake}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 相关性分析 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">🎯 Scenario Relevance</h3>
        <div
          className={`mb-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            evaluation.feedback.relevance.isRelevant
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {evaluation.feedback.relevance.isRelevant ? '✓ Relevant' : '✗ Not Relevant'}
        </div>
        <p className="text-gray-700 mb-3">{evaluation.feedback.relevance.analysis}</p>
        {evaluation.feedback.relevance.missingPoints &&
          evaluation.feedback.relevance.missingPoints.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-2">
                Points to consider:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {evaluation.feedback.relevance.missingPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}
      </div>

      {/* 流畅度反馈 */}
      {(evaluation.feedback.fluency.issues.length > 0 ||
        evaluation.feedback.fluency.suggestions.length > 0) && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">💬 Fluency Feedback</h3>
          {evaluation.feedback.fluency.issues.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Issues:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {evaluation.feedback.fluency.issues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
          {evaluation.feedback.fluency.suggestions.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-2">
                Suggestions:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                {evaluation.feedback.fluency.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 推荐回复 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">💡 Model Response</h3>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-gray-800 italic">"{evaluation.suggestedResponse}"</p>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          This is a natural, correct way to respond to the scenario.
        </p>
      </div>

      {/* 下一个场景按钮 */}
      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
        >
          Try Next Scenario →
        </button>
      </div>
    </div>
  );
}
