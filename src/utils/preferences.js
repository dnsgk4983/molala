const PREFERENCES_KEY = 'molala_preferences_v1';
const LEGACY_PREFERENCES_KEY = 'morara_preferences_v1';

export const speed_options = {
    fast: 450,
    normal: 1100,
    slow: 1800
};

export function load_preferences() {
    try {
        const saved = JSON.parse((window.localStorage.getItem(PREFERENCES_KEY) || window.localStorage.getItem(LEGACY_PREFERENCES_KEY) || '{}'));

        return {
            message_speed: speed_options[saved.message_speed] ? saved.message_speed : 'normal',
            font_scale: [0.85, 1, 1.15, 1.3].includes(saved.font_scale) ? saved.font_scale : 1,
            chat_mode: saved.chat_mode === 'auto' ? 'auto' : 'manual'
        };
    } catch {
        return {
            message_speed: 'normal',
            font_scale: 1,
            chat_mode: 'manual'
        };
    }
}

export function save_preferences(preferences) {
    window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
}
