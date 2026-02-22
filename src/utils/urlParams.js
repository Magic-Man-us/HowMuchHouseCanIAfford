import { STATE_DEFAULTS, URL_KEY_MAP, URL_KEY_REVERSE, STRING_KEYS } from './stateKeys';

export function encodeStateToUrl(getState) {
  const state = getState();
  const params = new URLSearchParams();

  for (const [key, shortKey] of Object.entries(URL_KEY_MAP)) {
    const val = state[key];
    const def = STATE_DEFAULTS[key];
    // Only encode values that differ from defaults
    if (val !== def) {
      params.set(shortKey, String(val));
    }
  }

  const base = window.location.origin + window.location.pathname;
  return params.toString() ? `${base}?${params.toString()}` : base;
}

export function decodeStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (params.size === 0) return null;

  const state = {};
  for (const [shortKey, value] of params.entries()) {
    const fullKey = URL_KEY_REVERSE[shortKey];
    if (!fullKey) continue;

    if (STRING_KEYS.has(fullKey)) {
      state[fullKey] = value;
    } else {
      const num = Number(value);
      if (isFinite(num)) {
        state[fullKey] = num;
      }
    }
  }

  return Object.keys(state).length > 0 ? state : null;
}
