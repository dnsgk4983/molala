import { useEffect, useState } from 'react';
import { load_game, save_game } from '../utils/save_game.js';

const image_modules = import.meta.glob(
    '../assets/images/**/*.{png,jpg,jpeg,webp}',
    {
        eager: true,
        query: '?url',
        import: 'default'
    }
);

const images = Object.fromEntries(
    Object.entries(image_modules).map(([path, url]) => [path.split('/').pop(), url])
);

const lines = [
    { speaker: '', text: '바다에 도착했다. 노을이 물든 수평선 너머로 파도가 천천히 밀려온다.', reveal: false },
    { speaker: '', text: '휴대폰 화면을 다시 확인한다. 분명 이 근처라고 했는데…', reveal: false },
    { speaker: '', text: '이제 와서 무슨 말을 해야 할까. 나는 진짜 기사단장도 아닌데.', reveal: false },
    { speaker: '???', text: '단장아아아앙—!', reveal: false },
    { speaker: '', text: '등 뒤에서 낯익은 목소리가 들린다. 깜짝 놀라 고개를 돌린 순간…', reveal: false },
    { speaker: '모라라', expression: 'smile', text: '까꿍! 헤헤, 많이 기다렸어?', reveal: true },
    { speaker: '모라라', expression: 'smile', text: '어때? 나 진짜로 육지에 왔다! 발밑에 모래가 간질간질해ㅋㅋ' },
    { speaker: '', text: '모라라는 신이 나서 한 바퀴 돌다가, 문득 내 얼굴을 살핀다.' },
    { speaker: '모라라', expression: 'default', text: '근데… 잠깐. 내가 알던 단장이랑 분위기가 좀 다른데?' },
    { speaker: '', text: '손에 쥔 휴대폰이 무겁게 느껴진다. 더는 미룰 수 없다.' },
    { speaker: '나', text: '사실 그 휴대폰, 내가 해변에서 주웠어. 처음부터 기사단장은 아니었어.' },
    { speaker: '모라라', expression: 'shy', text: '…뭐? 그럼 지금까지 내 장난 다 받아 준 사람이 너였다고?' },
    { speaker: '모라라', expression: 'default', text: '왜 이제 말했어. 나 진짜 깜짝 놀랐잖아.' },
    { speaker: '모라라', expression: 'shy', text: '근데 있지. 노래 듣고 감상 말해 준 것도, 내일 늦잠 자지 말라고 한 것도… 너였네.' },
    { speaker: '', text: '모라라는 잠시 바다를 바라본다. 파도 한 번이 발끝을 적시고 지나간다.' },
    { speaker: '모라라', expression: 'smile', text: '그래서, 이제 어떻게 할 거야?' }
];

const choices = [
    { text: '이번에는 내 이름으로 다시 인사할게.', affection: 2 },
    { text: '휴대폰부터 돌려주고, 천천히 이야기할래.', affection: 1 },
    { text: '미안해. 그래도 오늘은 함께 걷고 싶어.', affection: 0 }
];

const closing_lines = [
    { speaker: '모라라', expression: 'shy', text: '좋아. 대신 앞으로는 모르는 척 금지야. 알겠지?' },
    { speaker: '', text: '모라라가 웃으며 손을 내민다. 이번에는 알림도, 답장 버튼도 없다.' },
    { speaker: '모라라', expression: 'smile', text: '가자. 파도 오는 데까지 달려 볼래?' }
];

function BeachScenePage({ on_complete, on_return_title }) {
    const saved = load_game();
    const [position, set_position] = useState(() => Math.max(0, Math.min(Number(saved?.beach_position) || 0, lines.length + closing_lines.length)));
    const [selected, set_selected] = useState(() => saved?.beach_choice_done === true);
    const [visible, set_visible] = useState(false);
    const all_lines = selected ? [...lines, ...closing_lines] : lines;
    const is_choice = !selected && position >= lines.length;
    const is_end = selected && position >= all_lines.length;
    const line = all_lines[Math.min(position, all_lines.length - 1)];
    const expression = line?.expression || 'default';
    const character_revealed = position >= lines.findIndex((entry) => entry.reveal === true);
    const background = images['beach_evening.png'] || images['intro_beach.png'];
    const character = images[`beach_molala_${expression}.png`] || images['beach_molala.png'];

    useEffect(() => {
        const frame = requestAnimationFrame(() => set_visible(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        const previous = load_game() || {};
        save_game({
            ...previous,
            current_page: 'beach',
            beach_started: true,
            beach_position: position,
            beach_choice_done: selected
        });
    }, [position, selected]);

    const advance = () => {
        if (!is_choice && !is_end) {
            set_position((previous) => previous + 1);
        }
    };

    const choose = (choice) => {
        const previous = load_game() || {};
        save_game({
            ...previous,
            affection: (Number(previous.affection) || 0) + choice.affection,
            beach_choice_done: true,
            beach_position: lines.length
        });
        set_selected(true);
    };

    const finish = () => {
        const previous = load_game() || {};
        save_game({
            ...previous,
            ending_confirmed: true,
            beach_started: false
        });
        on_complete?.();
    };

    return (
        <section className={`beach_scene ${visible ? 'beach_scene__visible' : ''}`}>
            {background && <img className="beach_scene__background" src={background} alt="노을빛 해변" />}
            <div className="beach_scene__shade" />
            {character && character_revealed && (
                <img
                    className="beach_scene__character"
                    key="molala_reveal"
                    src={character}
                    alt="해변에 서 있는 모라라"
                />
            )}
            <button className="beach_scene__home" type="button" onClick={on_return_title} aria-label="메인으로 돌아가기">⌂</button>
            <div className={`beach_scene__dialogue ${!character_revealed ? 'beach_scene__dialogue--intro' : ''}`} aria-live="polite">
                {!is_choice && !is_end && (
                    <button className="beach_scene__dialogue_button" type="button" onClick={advance}>
                        {line.speaker && <strong className="beach_scene__speaker">{line.speaker}</strong>}
                        <span className="beach_scene__line" key={position}>{line.text}</span>
                        <span className="beach_scene__hint">터치하여 계속 ▾</span>
                    </button>
                )}
                {is_choice && (
                    <div className="beach_scene__choices">
                        {choices.map((choice) => (
                            <button key={choice.text} type="button" onClick={() => choose(choice)}>{choice.text}</button>
                        ))}
                    </div>
                )}
                {is_end && <button className="beach_scene__finish" type="button" onClick={finish}>우리의 이야기 계속하기 →</button>}
            </div>
        </section>
    );
}

export default BeachScenePage;
