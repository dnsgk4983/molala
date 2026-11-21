export function get_ending_type(game_data) {
    const affection = Math.max(0, Number(game_data?.affection) || 0);
    const key_choices = game_data?.key_choices || {};
    const song_choice = key_choices[5];
    const meeting_choice = key_choices[6];

    if (!song_choice && !meeting_choice) {
        if (affection >= 23) {
            return 'true';
        }

        if (affection >= 18) {
            return 'normal';
        }

        return 'bad';
    }

    if (affection < 12 || meeting_choice === 'uncertain') {
        return 'bad';
    }

    if (
        affection >= 22 &&
        ['understanding', 'future'].includes(song_choice) &&
        meeting_choice === 'promise'
    ) {
        return 'true';
    }

    return 'normal';
}
