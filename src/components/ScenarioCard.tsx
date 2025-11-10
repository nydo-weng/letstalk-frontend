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
        No scenario loaded. Please refresh.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{categoryEmojis[scenario.category]}</span>
          <span className="text-sm font-medium text-gray-600 capitalize">
            {scenario.category}
          </span>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            difficultyColors[scenario.difficulty]
          }`}
        >
          {scenario.difficulty}
        </span>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-2">{scenario.prompt}</h2>

      <p className="text-gray-600 text-sm">{scenario.context}</p>
    </div>
  );
}
