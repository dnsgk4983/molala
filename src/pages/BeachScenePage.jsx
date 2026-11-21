import { useEffect, useState } from 'react';
import { load_game, save_game } from '../utils/save_game.js';
import { get_ending_type } from '../utils/ending_logic.js';

const image_modules = import.meta.glob(
    '../assets/images/**/*.{png,jpg,jpeg,webp}',
    {
        eager: true,
        query: '?url',
        import: 'default'
    }
);

const images = Object.fromEntries(
    Object.entries(image_modules).map(([path, url]) => [
        path.split('/').pop(),
        url
    ])
);

const opening_lines = [
    { speaker: '', text: '1월 10일. 공주절을 맞은 해변에는 보름달이 떠 있다.' },
    { speaker: '', text: '일주일 전 휴대폰을 주웠던 곳에 다시 섰다.' },
    { speaker: '', text: '화면에 모라라 공주님의 메시지가 도착한다.' },
    { speaker: '모라라', text: '단장!! 드디어 공주절이야아아!!' },
    { speaker: '모라라', text: '나 이제 육지에 나갈 수 있어!' },
    { speaker: '모라라', text: '나 지금 해변으로 가고 있어! 조금만 기다려줘!' },
    { speaker: '', text: '(하지만 나는 진짜 기사단장이 아니잖아. 이제는 사실대로 말해야겠지.)' }
];

const bad_lines = [
    { speaker: '', text: '(사실대로 말하면 지금까지의 대화가 전부 거짓말이 되는 걸까?)' },
    { speaker: '', text: '휴대폰에 “사실 저는…”이라고 적었다가, 끝내 지운다.' },
    { speaker: '', text: '메시지를 보내지 못한 채 해변을 떠났다.' },
    { speaker: '', text: '시간이 흐르고, 모라라에게서 알림이 도착했다.' },
    { speaker: '모라라', text: '단장? 오늘 많이 바쁜가 보네.' },
    { speaker: '모라라', text: '나 오늘 코랄단이랑 진짜 재밌게 놀았어ㅋㅋㅋ' },
    { speaker: '모라라', text: '너랑도 같이 놀았으면 좋았을 텐데.' },
    { speaker: '모라라', text: '그래도 괜찮아! 다음에 또 기회가 있겠지ㅎㅎ' },
    { speaker: '', text: '(답장 하나만 보내면 됐는데. 가장 중요한 순간에는 아무 말도 하지 못했다.)' }
];

const meeting_lines = [
    { speaker: '', text: '(더는 숨길 수 없어. 어떤 결과가 되더라도 직접 이야기해야겠어.)' },
    { speaker: '', text: '“사실 저는 기사단장이 아니에요.” 메시지를 전송했다.' },
    { speaker: '', text: '읽음 표시가 뜨지 않는다. 잠시 후, 등 뒤에서 목소리가 들린다.' },
    { speaker: '모라라', expression: 'smile', text: '…찾았다! 여기 있었구나.' },
    { speaker: '모라라', expression: 'smile', text: '직접 만나는 건 처음이지? 모라라 공주님 등장~!' },
    { speaker: 'player', text: '…공주님?' },
    { speaker: '모라라', expression: 'default', text: '아, 그리고. 너 사실 기사단장 아니지?' },
    { speaker: 'player', text: '…네?!' },
    { speaker: '모라라', expression: 'smile', text: 'ㅋㅋㅋㅋ 알고 있었어. 처음엔 말투가 좀 이상하다 싶었는데.' },
    { speaker: '모라라', text: '얘기하다 보니까 알겠더라. 네가 원래 기사단장이 아니라는 거.' },
    { speaker: 'player', text: '…미안해요.' },
    { speaker: '모라라', expression: 'default', text: '응. 그건 잘못한 거 맞아.' },
    { speaker: '모라라', expression: 'smile', text: '근데 내가 계속 답장한 건 내 선택이었어.' },
    { speaker: '모라라', expression: 'shy', text: '네가 어떤 사람인지 궁금했고, 너랑 이야기하는 게 재밌었거든.' }
];

const normal_lines = [
    { speaker: '모라라', text: '사실 나 오늘 꼭 해야 할 일이 있거든.' },
    { speaker: '모라라', text: '우리 원래 기사단장 찾으러 가려고. 연락이 안 된 지 꽤 됐잖아.' },
    { speaker: '모라라', expression: 'smile', text: '그래도 너랑 이야기했던 시간은 정말 즐거웠어.' },
    { speaker: '모라라', expression: 'smile', text: '덕분에 새로운 코랄단도 알게 됐고ㅎㅎ' },
    { speaker: '모라라', text: '다음에 만나면 그땐 네 이름부터 알려줘!' },
    { speaker: 'player', text: '제 이름은 {name}이에요.' },
    { speaker: '모라라', expression: 'smile', text: '{name}! 이제 기억했어. 다음에 또 만나자. 약속이야~!' }
];

const true_lines = [
    { speaker: '모라라', expression: 'shy', text: '있잖아. 내가 네가 기사단장이 아닌 걸 알고도 계속 연락했던 이유, 궁금하지 않아?' },
    { speaker: 'player', text: '…네.' },
    { speaker: '모라라', text: '처음엔 그냥 누군지 궁금했어.' },
    { speaker: '모라라', text: '근데 새로운 사람을 알아가는 것도 참 좋은 일이구나 싶더라고.' },
    { speaker: '모라라', text: '코랄단이랑 함께했던 시간도, 앞으로 만들 추억도 다 소중하거든.' },
    { speaker: '모라라', expression: 'shy', text: '네가 매일 내 이야기에 답장해 주고, 노래도 들어주고, 오늘 여기서 기다려준 거.' },
    { speaker: '모라라', text: '그게 나한테는 정말 큰 힘이 됐어.' },
    { speaker: '모라라', expression: 'shy', text: '그러니까… 앞으로도 내 기사단장이 되어줄래?' },
    { speaker: 'player', text: '근데 이미 기사단장이 있잖아요?' },
    { speaker: '모라라', expression: 'smile', text: '기사단장이 꼭 한 명이어야 한다는 법 있어?! 내가 공주인데!!' },
    { speaker: '모라라', expression: 'smile', text: '오늘부로 {name}을 새로운 코랄기사단장으로 임명할게!' },
    { speaker: '모라라', expression: 'shy', text: '앞으로도 잘 부탁해. 나의 기사단장! ♡' },
    { speaker: '모라라', text: '내일도 답장해 줄 거지?' },
    { speaker: 'player', text: '물론이죠. 공주님, 답장은 제가 할게요.' }
];

function BeachScenePage({ on_complete, on_return_title }) {
    const [saved_game] = useState(() => load_game() || {});
    const [ending_type] = useState(() => get_ending_type(saved_game));
    const [position, set_position] = useState(() => Math.max(0, Number(saved_game.beach_position) || 0));
    const [player_name, set_player_name] = useState(() => saved_game.player_name || '');
    const [name_confirmed, set_name_confirmed] = useState(() => Boolean(saved_game.player_name));
    const [name_error, set_name_error] = useState('');
    const [visible, set_visible] = useState(false);

    const ending_lines = ending_type === 'bad'
        ? bad_lines
        : [...meeting_lines, ...(ending_type === 'true' ? true_lines : normal_lines)];
    const lines = [...opening_lines, ...ending_lines];
    const is_end = position >= lines.length;
    const line = lines[Math.min(position, lines.length - 1)];
    const is_meeting = ending_type !== 'bad' && position >= opening_lines.length + 3;
    const expression = line?.expression || 'default';
    const background = images['beach_evening.png'] || images['intro_beach.png'];
    const character = images[`beach_molala_${expression}.png`] || images['beach_molala.png'];

    useEffect(() => {
        const frame = requestAnimationFrame(() => set_visible(true));

        return () => cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        if (!name_confirmed) {
            return;
        }

        const previous = load_game() || {};

        save_game({
            ...previous,
            current_page: 'beach',
            beach_started: true,
            beach_position: position,
            player_name,
            ending_type
        });
    }, [position, player_name, name_confirmed, ending_type]);

    const confirm_name = () => {
        const name = player_name.trim();

        if (name.length < 1 || name.length > 12) {
            set_name_error('닉네임을 1~12자로 입력해 주세요.');
            return;
        }

        set_player_name(name);
        set_name_confirmed(true);
        set_name_error('');
    };

    const finish = () => {
        const previous = load_game() || {};

        save_game({
            ...previous,
            ending_confirmed: true,
            beach_started: false,
            player_name,
            ending_type
        });

        on_complete?.();
    };

    const display_text = (line?.text || '').replaceAll('{name}', player_name);
    const display_speaker = line?.speaker === 'player' ? player_name : line?.speaker;

    return (
        <section className={`beach_scene ${visible ? 'beach_scene__visible' : ''}`}>
            {background && (
                <img
                    className="beach_scene__background"
                    src={background}
                    alt="노을빛 해변"
                />
            )}
            <div className="beach_scene__shade" />
            {character && ending_type !== 'bad' && is_meeting && (
                <img
                    className="beach_scene__character"
                    src={character}
                    alt="해변에 서 있는 모라라"
                />
            )}
            <button
                className="beach_scene__home"
                type="button"
                onClick={on_return_title}
                aria-label="메인으로 돌아가기"
            >
                ⌂
            </button>
            <div className="beach_scene__dialogue" aria-live="polite">
                {!name_confirmed && (
                    <div className="beach_scene__choices">
                        <label className="beach_scene__name_label" htmlFor="beach_player_name">
                            이야기 속에 남길 닉네임
                        </label>
                        <input
                            id="beach_player_name"
                            className="beach_scene__name_input"
                            type="text"
                            maxLength={12}
                            autoComplete="nickname"
                            placeholder="닉네임 입력"
                            value={player_name}
                            onChange={(event) => {
                                set_player_name(event.target.value);
                                set_name_error('');
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    confirm_name();
                                }
                            }}
                        />
                        {name_error && (
                            <p className="beach_scene__name_error" role="alert">
                                {name_error}
                            </p>
                        )}
                        <button type="button" onClick={confirm_name}>
                            이 이름으로 계속하기
                        </button>
                    </div>
                )}
                {name_confirmed && !is_end && (
                    <button
                        className="beach_scene__dialogue_button"
                        type="button"
                        onClick={() => set_position((previous) => previous + 1)}
                    >
                        {display_speaker && (
                            <strong className="beach_scene__speaker">
                                {display_speaker}
                            </strong>
                        )}
                        <span className="beach_scene__line" key={position}>
                            {display_text}
                        </span>
                        <span className="beach_scene__hint">
                            터치하여 계속 ▾
                        </span>
                    </button>
                )}
                {name_confirmed && is_end && (
                    <button
                        className="beach_scene__finish"
                        type="button"
                        onClick={finish}
                    >
                        우리의 이야기 계속하기 →
                    </button>
                )}
            </div>
        </section>
    );
}

export default BeachScenePage;
