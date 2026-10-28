/**
 * Calculation History & Saved Problems Storage Manager
 * Uses browser LocalStorage with zero cookies and zero third-party telemetry.
 */

export interface HistoryItem {
  id: string;
  timestamp: number;
  polyStr: string;
  divisorStr: string;
  variable: string;
  remainder: number;
  remainderDisplay: string;
  isFactor: boolean;
  quotientStr: string;
  isPinned?: boolean;
  notes?: string;
}

const STORAGE_KEY = 'pal_calculation_history_v2';

export function getStoredHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

export function saveHistoryItem(item: Omit<HistoryItem, 'id' | 'timestamp'>): HistoryItem[] {
  try {
    const current = getStoredHistory();
    // Prevent duplicate consecutive entries
    const isDuplicate = current.length > 0 &&
      current[0].polyStr === item.polyStr &&
      current[0].divisorStr === item.divisorStr &&
      current[0].variable === item.variable;

    if (isDuplicate) return current;

    const newItem: HistoryItem = {
      ...item,
      id: `pal_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      isPinned: false,
    };

    const updated = [newItem, ...current.filter(i => !i.isPinned || i.id !== newItem.id)].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function togglePinHistoryItem(id: string): HistoryItem[] {
  try {
    const current = getStoredHistory();
    const updated = current.map(item =>
      item.id === id ? { ...item, isPinned: !item.isPinned } : item
    );
    // Sort so pinned are on top, then by timestamp
    updated.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return b.timestamp - a.timestamp;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function deleteHistoryItem(id: string): HistoryItem[] {
  try {
    const current = getStoredHistory();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function clearAllHistory(): void {
  try {
    const current = getStoredHistory();
    // Keep pinned items if any, otherwise empty
    const pinnedOnly = current.filter(i => i.isPinned);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pinnedOnly));
  } catch {
    // ignore
  }
}

export function exportHistoryAsJSON(): string {
  const history = getStoredHistory();
  return JSON.stringify(
    {
      version: '2.0',
      exportDate: new Date().toISOString(),
      institution: 'Polynomial Algebra Laboratory',
      count: history.length,
      problems: history,
    },
    null,
    2
  );
}

export function exportHistoryAsCSV(): string {
  const history = getStoredHistory();
  const headers = ['Timestamp', 'Variable', 'Polynomial_P', 'Divisor_D', 'Quotient_Q', 'Remainder_R', 'Is_Factor', 'Notes'];
  const rows = history.map(item => [
    new Date(item.timestamp).toISOString(),
    item.variable,
    `"${item.polyStr.replace(/"/g, '""')}"`,
    `"${item.divisorStr.replace(/"/g, '""')}"`,
    `"${item.quotientStr.replace(/"/g, '""')}"`,
    item.remainderDisplay,
    item.isFactor ? 'TRUE' : 'FALSE',
    `"${(item.notes || '').replace(/"/g, '""')}"`,
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

export function importHistoryFromJSON(jsonString: string): HistoryItem[] {
  try {
    const parsed = JSON.parse(jsonString);
    const items: HistoryItem[] = Array.isArray(parsed) ? parsed : (parsed.problems || []);
    const valid = items.filter(i => i.polyStr && i.divisorStr);
    const existing = getStoredHistory();
    const existingIds = new Set(existing.map(e => e.id));
    const combined = [...valid.filter(v => !existingIds.has(v.id)), ...existing].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
    return combined;
  } catch (e) {
    throw new Error('无效的 JSON 备份文件 (Invalid JSON file)');
  }
}
