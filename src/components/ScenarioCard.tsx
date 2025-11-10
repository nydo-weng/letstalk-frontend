import type { Scenario } from '../types';

interface ScenarioCardProps {
  scenario: Scenario | null;
  loading: boolean;
}

const categoryEmojis: Record<Scenario['category'], string> = {
  daily: '🏠',
  business: '💼',
  travel: '✈️',
  shopping: '🛍️',
  dining: '🍽️',
  medical: '🏥',
  social: '👥',
  education: '📚',
};

const difficultyColors: Record<Scenario['difficulty'], string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
};

const categoryLabels: Record<Scenario['category'], string> = {
  daily: '日常交流',
  business: '商务沟通',
  travel: '旅行出行',
  shopping: '购物',
  dining: '餐饮点餐',
  medical: '就医健康',
  social: '社交场合',
  education: '校园/学习',
};

const difficultyLabels: Record<Scenario['difficulty'], string> = {
  beginner: '入门 Beginner',
  intermediate: '进阶 Intermediate',
  advanced: '挑战 Advanced',
};

export function ScenarioCard({ scenario, loading }: ScenarioCardProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  if (!scenario) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
        暂无场景，请稍后再试。
      </div>
    );
  }

  const promptZh = scenario.promptZh ?? '';
  const contextZh = scenario.contextZh ?? '';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{categoryEmojis[scenario.category]}</span>
          <span className="text-sm font-medium text-gray-600 capitalize">
            {categoryLabels[scenario.category]} ({scenario.category})
          </span>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            difficultyColors[scenario.difficulty]
          }`}
        >
          {difficultyLabels[scenario.difficulty]}
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">练习任务 · Prompt</h2>
          <p className="text-gray-900">{scenario.prompt}</p>
          {promptZh && <p className="text-gray-600 text-sm">{promptZh}</p>}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-700">情境背景 · Context</h3>
          <p className="text-gray-900">{scenario.context}</p>
          {contextZh && <p className="text-gray-600 text-sm">{contextZh}</p>}
        </div>
      </div>
    </div>
  );
}
