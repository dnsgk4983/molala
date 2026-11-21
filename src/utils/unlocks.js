const UNLOCK_KEY = 'molala_gallery_v1';

export function get_unlocks() {
    try {
        const saved = JSON.parse(localStorage.getItem(UNLOCK_KEY) || '{}');
        return {
            endings: Array.isArray(saved.endings) ? saved.endings : [],
            illustrations: Array.isArray(saved.illustrations) ? saved.illustrations : [],
            cookie_unlocked: saved.cookie_unlocked === true
        };
    } catch {
        return { endings: [], illustrations: [], cookie_unlocked: false };
    }
}

export function unlock_ending(type) {
    const previous = get_unlocks();
    const endings = [...new Set([...previous.endings, type])];
    const illustrations = [...new Set([...previous.illustrations, `ending_${type}.png`])];
    const next = {
        endings,
        illustrations,
        cookie_unlocked: previous.cookie_unlocked || type === 'true'
    };
    localStorage.setItem(UNLOCK_KEY, JSON.stringify(next));
    return next;
}
