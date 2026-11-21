
const save_key = 'molala_save_v1';
const legacy_save_key = 'morara_save_v1';

const default_save = {
    current_page: 'title',
    day: 1,
    step: 0,
    messages: [],
    affection: 0,
    is_finished: false,
    message_speed: 'normal'
};

export function load_game() {
    try {
        const saved_data = localStorage.getItem(save_key) || localStorage.getItem(legacy_save_key);

        if (!saved_data) {
            return null;
        }

        const parsed_data = JSON.parse(saved_data);

        if (
            !parsed_data ||
            typeof parsed_data !== 'object' ||
            Array.isArray(parsed_data) ||
            !Array.isArray(parsed_data.messages) ||
            !Number.isInteger(parsed_data.step) ||
            parsed_data.step < 0
        ) {
            return null;
        }

        return {
            ...default_save,
            ...parsed_data
        };
    } catch {
        return null;
    }
}

export function save_game(data) {
    try {
        localStorage.setItem(
            save_key,
            JSON.stringify({
                ...default_save,
                ...data
            })
        );

        return true;
    } catch {
        return false;
    }
}

export function delete_save() {
    try {
        localStorage.removeItem(save_key);
        localStorage.removeItem(legacy_save_key);
        return true;
    } catch {
        return false;
    }
}
