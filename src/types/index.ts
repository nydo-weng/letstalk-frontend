// 场景定义
export interface Scenario {
  prompt: string;
  context: string;
  category: 'daily' | 'business' | 'travel' | 'shopping' | 'dining' | 'medical' | 'social' | 'education';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// 语法错误
export interface GrammarError {
  original: string;
  correction: string;
  explanation: string;
  severity: 'minor' | 'moderate' | 'major';
}

// 发音问题
export interface PronunciationIssue {
  word: string;
  issue: string;
  suggestion: string;
  commonMistake?: string;
}

// 相关性分析
export interface RelevanceAnalysis {
  isRelevant: boolean;
  analysis: string;
  missingPoints: string[];
}

// 流畅度反馈
export interface FluencyFeedback {
  issues: string[];
  suggestions: string[];
}

// 评分
export interface Scores {
  pronunciation: number;
  grammar: number;
  relevance: number;
  fluency: number;
  overall: number;
}

// 反馈
export interface Feedback {
  grammar: GrammarError[];
  pronunciation: PronunciationIssue[];
  relevance: RelevanceAnalysis;
  fluency: FluencyFeedback;
}

// 完整评估结果
export interface Evaluation {
  transcription: string;
  scores: Scores;
  feedback: Feedback;
  suggestedResponse: string;
  summary: string;
  nextScenario: Scenario;
}
