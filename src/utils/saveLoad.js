import { STATE_DEFAULTS, STRING_KEYS } from './stateKeys';

export function saveScenario(getState) {
  const state = getState();
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mortgage-scenario-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function loadScenario(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const validated = {};
        for (const key of Object.keys(STATE_DEFAULTS)) {
          if (key in data) {
            const val = data[key];
            if (STRING_KEYS.has(key)) {
              validated[key] = typeof val === 'string' ? val : String(val);
            } else {
              const num = Number(val);
              validated[key] = isFinite(num) ? num : STATE_DEFAULTS[key];
            }
          }
        }
        resolve(validated);
      } catch {
        reject(new Error('Invalid scenario file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}
