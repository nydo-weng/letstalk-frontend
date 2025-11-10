import type { Scenario, Evaluation } from '../types';

// API 基础 URL - 可以通过环境变量配置
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

/**
 * 获取随机场景
 */
export async function getRandomScenario(): Promise<Scenario> {
  const response = await fetch(`${API_BASE_URL}/api/scenario`);

  if (!response.ok) {
    throw new Error(`获取场景失败：${response.statusText}`);
  }

  return response.json();
}

/**
 * 评估音频
 */
export async function evaluateAudio(
  audioBlob: Blob,
  scenario: Scenario
): Promise<Evaluation> {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');
  formData.append('scenario', JSON.stringify(scenario));

  const response = await fetch(`${API_BASE_URL}/api/evaluate`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || '评估失败，请稍后再试');
  }

  return response.json();
}

/**
 * 仅转录音频（用于调试）
 */
export async function transcribeAudio(audioBlob: Blob): Promise<{ text: string }> {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');

  const response = await fetch(`${API_BASE_URL}/api/transcribe`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('转录失败，请稍后再试');
  }

  return response.json();
}
