import PhoneStatusBar from '../components/PhoneStatusBar.jsx';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { story_data, last_day } from '../data/story_data.js';

const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/vGSh5jVzS2o';

const max_affection = Object.values(story_data).reduce((total, events) => {
    return total + events.reduce((day_total, event) => {
        if (event.type !== 'choice' || !Array.isArray(event.options)) {
            return day_total;
        }

        return day_total + Math.max(0, ...event.options.map((option) => Number(option.affection) || 0));
    }, 0);
}, 0);
import { load_game, save_game } from '../utils/save_game.js';
import { load_preferences, speed_options } from '../utils/preferences.js';

const image_modules = import.meta.glob(
    '../assets/images/**/*.{png,jpg,jpeg,webp}',
    {
        eager: true,
        query: '?url',
        import: 'default'
    }
);

const image_map = Object.fromEntries(
    Object.entries(image_modules).map(([path, url]) => [
        path.split('/').pop(),
        url
    ])
);

const chat_image_dimensions = {
    'chat_wallpaper.png': [941, 1672],
    'day01_kingdom.png': [1448, 1086],
    'day02_room.png': [1448, 1086],
    'day03_beach.png': [1448, 1086],
    'day03_selfie.png': [1086, 1448],
    'day04_scrapbook.png': [1448, 1086],
    'day04_tiara.png': [1448, 1086],
    'day05_singing.png': [1086, 1448],
    'day05_stars.png': [1672, 941],
    'day06_invitation.png': [1448, 1086],
    'day06_outfit.png': [1086, 1448],
    'day07_festival.png': [1672, 941],
    'day07_meeting.png': [1086, 1448],
    'ending_bad.png': [1086, 1448],
    'ending_normal.png': [1086, 1448],
    'ending_true.png': [1086, 1448],
    'extra_seagull.png': [1448, 1086],
    'gallery_cover.png': [1448, 1086],
    'intro_beach.png': [941, 1672],
    'intro_hand.png': [941, 1671],
    'intro_phone.png': [941, 1671],
    'moon_empty.png': [1254, 1254],
    'moon_full.png': [1254, 1254],
    'moon_icon_base.png': [1254, 1254],
    'profile_molala.png': [1254, 1254],
    'profile_sunfish.png': [1254, 1254],
    'tiara_empty.png': [1024, 560],
    'tiara_full.png': [1024, 560],
    'title_bg.png': [941, 1672],
};

function get_profile_image(has_selfie) {
    return image_map[has_selfie ? 'day03_selfie.png' : 'profile_sunfish.png'];
}

function get_initial_state() {
    const saved_data = load_game();

    if (saved_data?.current_page === 'chat') {
        const saved_day = Number.isInteger(saved_data.day)
            ? Math.min(Math.max(saved_data.day, 1), last_day)
            : 1;

        const saved_messages = Array.isArray(saved_data.messages)
            ? saved_data.messages.filter(
                (message) => (
                    message &&
                    typeof message.text === 'string' &&
                    [
                        'molala',
                        'player',
                        'system',
                        'narration',
                        'image',
                        'music'
                    ].includes(message.sender)
                )
            )
            : [];

        const saved_step = Number.isInteger(saved_data.step)
            ? Math.min(
                Math.max(saved_data.step, 0),
                story_data[saved_day].length
            )
            : 0;

        let saved_reply_queue = [];

        if (Array.isArray(saved_data.reply_queue)) {
            saved_reply_queue = saved_data.reply_queue.filter(
                (text) => typeof text === 'string'
            );
        } else if (typeof saved_data.pending_reply === 'string') {
            saved_reply_queue = saved_data.pending_reply.split('\n');
        }

        return {
            day: saved_day,
            step: saved_step,
            messages: saved_messages,
            affection: Number.isFinite(saved_data.affection)
                ? saved_data.affection
                : 0,
            key_choices: saved_data.key_choices || {},
            message_speed: load_preferences().message_speed,
            reply_queue: saved_reply_queue,
            choice_pending: (
                saved_data.choice_pending === true ||
                saved_reply_queue.length > 0
            )
        };
    }

    return {
        day: 1,
        step: 0,
        messages: [],
        affection: 0,
        key_choices: {},
        message_speed: load_preferences().message_speed,
        reply_queue: [],
        choice_pending: false
    };
}

function ChatPage({ on_return_title, on_enter_ending, on_open_settings, message_speed_preference, chat_mode_preference = 'manual' }) {
    const initial_state_ref = useRef(null);

    if (initial_state_ref.current === null) {
        initial_state_ref.current = get_initial_state();
    }

    const [game_state, set_game_state] = useState(
        initial_state_ref.current
    );

    const [reaction, set_reaction] = useState(null);
    const [choice_reaction_pending, set_choice_reaction_pending] = useState(false);
    const [show_return_confirm, set_show_return_confirm] = useState(false);
    const [day_transition, set_day_transition] = useState(null);
    const [show_tiara_dialog, set_show_tiara_dialog] = useState(false);
    const [show_music_video, set_show_music_video] = useState(false);
    const [loaded_selfie_ids, set_loaded_selfie_ids] = useState(() => new Set());

    const scroll_ref = useRef(null);
    const last_scrolled_message_ref = useRef(null);
    const image_scroll_ref = useRef(null);
    const tiara_light_ref = useRef(null);
    const tiara_progress_ref = useRef(null);
    const timer_ref = useRef(null);
    const transition_timer_ref = useRef([]);
    const pending_action_ref = useRef(null);
    const choice_locked_ref = useRef(false);
    const state_ref = useRef(game_state);

    const message_id_ref = useRef(
        game_state.messages.reduce(
            (maximum, message) => Math.max(
                maximum,
                Number(message.id) || 0
            ),
            0
        ) + 1
    );

    state_ref.current = game_state;

    const {
        day,
        step,
        messages,
        affection,
        message_speed,
        reply_queue,
        choice_pending
    } = game_state;

    const selfie_message_index = messages.findIndex((message) => (
        message.sender === 'image' && message.image === 'day03_selfie.png'
    ));
    const selfie_message = selfie_message_index >= 0
        ? messages[selfie_message_index]
        : null;
    const selfie_is_visible = Boolean(
        selfie_message && loaded_selfie_ids.has(selfie_message.id)
    );

    const current_story = story_data[day] ?? [];
    const current_step = current_story[step];

    const day_progress = current_story.length > 0
        ? Math.min(step / current_story.length, 1)
        : 0;
    const tiara_progress = Math.min(
        Math.max(((day - 1) + day_progress) / last_day, 0),
        1
    );

    useEffect(() => {
        const tiara_light = tiara_light_ref.current;

        if (!tiara_light) {
            return;
        }

        const previous_progress = tiara_progress_ref.current;
        const next_progress = tiara_progress;
        const mask_at = (progress) => {
            const top = Math.max(0, Math.min(100, 110 * progress - 5));
            const bottom = Math.max(0, Math.min(100, 110 * progress + 5));

            return `polygon(0 0, ${top}% 0, ${bottom}% 100%, 0 100%)`;
        };

        if (previous_progress === null) {
            gsap.set(tiara_light, {
                clipPath: mask_at(next_progress)
            });
        } else {
            gsap.fromTo(
                tiara_light,
                {
                    clipPath: mask_at(previous_progress)
                },
                {
                    clipPath: mask_at(next_progress),
                    duration: 1.4,
                    ease: 'power2.inOut',
                    overwrite: true
                }
            );
        }

        tiara_progress_ref.current = next_progress;


        return () => {
            gsap.killTweensOf(tiara_light);
        };
    }, [tiara_progress]);

    const is_choice = current_step?.type === 'choice';
    const is_day_complete = !current_step && !choice_pending;
    const is_game_complete = is_day_complete && day === last_day;

    const is_typing = (
        choice_pending && reply_queue.length > 0
    ) || current_step?.type === 'message';

    const clear_pending = useCallback(() => {
        if (timer_ref.current !== null) {
            clearTimeout(timer_ref.current);
            timer_ref.current = null;
        }

        pending_action_ref.current = null;
    }, []);

    const run_pending = useCallback(() => {
        const action = pending_action_ref.current;

        if (!action) {
            return;
        }

        clear_pending();
        action();
    }, [clear_pending]);

    const schedule_action = useCallback((action, delay) => {
        clear_pending();

        pending_action_ref.current = action;

        if (chat_mode_preference === 'auto') {
            timer_ref.current = setTimeout(() => {
                run_pending();
            }, delay);
        }
    }, [clear_pending, run_pending, chat_mode_preference]);

    const update_game = useCallback((updater) => {
        const next_state = updater(state_ref.current);

        state_ref.current = next_state;

        save_game({
            ...next_state,
            current_page: 'chat',
            pending_reply: null,
            is_finished: next_state.ending_confirmed === true
        });

        set_game_state(next_state);
    }, []);

    useEffect(() => {
        if (!message_speed_preference || state_ref.current.message_speed === message_speed_preference) {
            return;
        }

        update_game((previous) => ({
            ...previous,
            message_speed: message_speed_preference
        }));
    }, [message_speed_preference, update_game]);

    useEffect(() => {
        return () => {
            clear_pending();
            transition_timer_ref.current.forEach(clearTimeout);
        };
    }, [clear_pending]);

    useEffect(() => {
        save_game({
            ...state_ref.current,
            current_page: 'chat',
            pending_reply: null,
            is_finished: state_ref.current.ending_confirmed === true
        });
    }, [is_game_complete]);

    useEffect(() => {
        if (is_day_complete) {
            return;
        }

        if (choice_pending) {
            if (choice_reaction_pending) {
                return;
            }

            if (reply_queue.length === 0) {
                update_game((previous) => ({
                    ...previous,
                    choice_pending: false,
                    step: previous.step + 1
                }));

                choice_locked_ref.current = false;
                return;
            }

            schedule_action(() => {
                update_game((previous) => ({
                    ...previous,
                    messages: [
                        ...previous.messages,
                        {
                            id: message_id_ref.current++,
                            sender: 'molala',
                            text: previous.reply_queue[0],
                            day: previous.day
                        }
                    ],
                    reply_queue: previous.reply_queue.slice(1)
                }));
            }, speed_options[message_speed]);

            return clear_pending;
        }

        if (current_step?.type === 'choice') {
            return;
        }

        if (current_step) {
            schedule_action(() => {
                update_game((previous) => ({
                    ...previous,
                    messages: [
                        ...previous.messages,
                        {
                            id: message_id_ref.current++,
                            sender: current_step.type === 'message'
                                ? current_step.sender
                                : current_step.type,
                            text: current_step.text ?? '',
                            image: current_step.image ?? null,
                            title: current_step.title ?? null,
                            day: previous.day
                        }
                    ],
                    step: previous.step + 1
                }));
            }, speed_options[message_speed]);

            return clear_pending;
        }
    }, [
        day,
        step,
        choice_pending,
        choice_reaction_pending,
        reply_queue,
        message_speed,
        current_step,
        is_day_complete,
        schedule_action,
        clear_pending,
        update_game
    ]);

    useEffect(() => {
        const container = scroll_ref.current;

        if (!container || messages.length === 0) {
            return;
        }

        const latest_message = messages[messages.length - 1];

        if (last_scrolled_message_ref.current === latest_message.id) {
            return;
        }

        last_scrolled_message_ref.current = latest_message.id;

        if (latest_message.sender === 'image') {
            const image_event = Array.from(
                container.querySelectorAll('.chat_page__image_event')
            ).at(-1);

            if (image_event) {
                const container_rect = container.getBoundingClientRect();
                const image_rect = image_event.getBoundingClientRect();
                const target_top = container.scrollTop + image_rect.top - container_rect.top;

                image_scroll_ref.current = latest_message.id;
                container.scrollTo({
                    top: Math.max(0, target_top - 16),
                    behavior: 'smooth'
                });
            }

            return;
        }

        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
        });
    }, [messages]);

    useEffect(() => {
        if (!reaction) {
            return;
        }

        // CSS 애니메이션 완료 여부와 무관하게 다음 대화 진행을 보장한다.
        const timeout_id = window.setTimeout(() => {
            set_reaction(null);
            set_choice_reaction_pending(false);
        }, 1150);

        return () => {
            window.clearTimeout(timeout_id);
        };
    }, [reaction]);

    const handle_skip = () => {
        if (is_day_complete) {
            return;
        }

        run_pending();
    };

    const handle_choice = (option) => {
        if (
            choice_locked_ref.current ||
            !is_choice ||
            choice_pending
        ) {
            return;
        }

        choice_locked_ref.current = true;

        const replies = Array.isArray(option.reply)
            ? option.reply
            : String(option.reply ?? '').split('\n');

        const valid_replies = replies.filter(
            (text) => typeof text === 'string' && text.length > 0
        );

        update_game((previous) => ({
            ...previous,
            affection: Math.max(0, previous.affection + (Number(option.affection) || 0)),
            key_choices: option.key_choice
                ? {
                    ...(previous.key_choices || {}),
                    [previous.day]: option.key_choice
                }
                : (previous.key_choices || {}),
            messages: [
                ...previous.messages,
                {
                    id: message_id_ref.current++,
                    sender: 'player',
                    text: option.text,
                    day: previous.day
                }
            ],
            reply_queue: valid_replies,
            choice_pending: true
        }));

        set_choice_reaction_pending(true);
        set_reaction({
            id: message_id_ref.current++,
            emoji: Number(option.affection || 0) > 0 ? '💗' : Number(option.affection || 0) < 0 ? '😞' : '😐',
            value: Number(option.affection || 0)
        });
    };

    const handle_return_title = () => {
        clear_pending();
        set_choice_reaction_pending(false);
        set_reaction(null);
        transition_timer_ref.current.forEach(clearTimeout);
        transition_timer_ref.current = [];
        set_show_return_confirm(false);
        on_return_title?.();
    };

    const handle_enter_ending = () => {
        if (!is_game_complete || choice_reaction_pending || day_transition) {
            return;
        }

        clear_pending();
        update_game((previous) => ({
            ...previous,
            beach_started: true
        }));
        on_enter_ending?.();
    };

    const handle_next_day = () => {
        if (day_transition || !is_day_complete || is_game_complete) {
            return;
        }

        clear_pending();
        const next_day = day + 1;
        set_day_transition({ day: next_day, phase: 'enter' });

        const change_timer = window.setTimeout(() => {
            update_game((previous) => ({
                ...previous,
                day: next_day,
                step: 0,
                reply_queue: [],
                choice_pending: false,
                messages: [
                    ...previous.messages,
                    {
                        id: message_id_ref.current++,
                        sender: 'system',
                        text: `1월 ${next_day + 3}일 DAY ${next_day}`,
                        day: next_day
                    }
                ]
            }));
            set_day_transition({ day: next_day, phase: 'leave' });
        }, 1700);

        const finish_timer = window.setTimeout(() => {
            set_day_transition(null);
            transition_timer_ref.current = [];
        }, 2500);

        transition_timer_ref.current = [change_timer, finish_timer];
    };

    const handle_chat_image_load = (event, message_id) => {
        if (event.currentTarget.getAttribute('src') === image_map['day03_selfie.png']) {
            set_loaded_selfie_ids((previous) => {
                if (previous.has(message_id)) {
                    return previous;
                }

                const next = new Set(previous);
                next.add(message_id);
                return next;
            });
        }

        const container = scroll_ref.current;

        if (!container || image_scroll_ref.current !== message_id) {
            return;
        }

        // 이미지의 공간은 원본 비율로 미리 확보되어 있으므로
        // 로드 완료 후에는 스크롤을 다시 이동시키지 않는다.
        image_scroll_ref.current = null;
    };

    const render_message = (message, history_day, message_index) => {
        if (message.sender === 'system') {
            return (
                <div
                    className="chat_page__date"
                    key={message.id}
                >
                    {message.text}
                </div>
            );
        }

        if (message.sender === 'narration') {
            return (
                <div
                    className="chat_page__narration"
                    key={message.id}
                >
                    {message.text}
                </div>
            );
        }

        if (message.sender === 'music') {
            return (
                <button
                    type="button"
                    className="chat_page__music_event"
                    key={message.id}
                    aria-label={`${message.title || '백일몽'} 영상 재생 팝업 열기`}
                    onClick={() => set_show_music_video(true)}
                >
                    <span className="chat_page__music_icon" aria-hidden="true">♫</span>
                    <div className="chat_page__music_details">
                        <strong>{message.title || '백일몽'}</strong>
                        <span>터치하여 영상 보기</span>
                        <div className="chat_page__music_wave" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>
                    <span className="chat_page__music_play" aria-hidden="true">▶</span>
                </button>
            );
        }

        if (message.sender === 'image') {
            const image_url = image_map[message.image];

            return (
                <div
                    className="chat_page__image_event"
                    key={message.id}
                >
                    {image_url ? (
                        <img
                            src={image_url}
                            alt={message.text || '모라라가 보낸 사진'}
                            loading="eager"
                            decoding="async"
                            width={chat_image_dimensions[message.image]?.[0]}
                            height={chat_image_dimensions[message.image]?.[1]}
                            onLoad={(event) => handle_chat_image_load(event, message.id)}
                        />
                    ) : (
                        <div className="chat_page__image_placeholder">
                            이미지를 찾을 수 없습니다: {message.image}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div
                className={`chat_page__message chat_page__message_${message.sender}`}
                key={message.id}
            >
                {message.sender === 'molala' && (
                    <div className="chat_page__message_avatar">
                        <img
                            src={get_profile_image(selfie_is_visible && message_index > selfie_message_index)}
                            alt="모라라 공주님♡ 프로필"
                            style={{
                                display: 'block',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '50%'
                            }}
                        />
                    </div>
                )}

                <div className="chat_page__bubble">
                    {message.text}
                </div>
            </div>
        );
    };

    return (
        <section className="chat_page" style={{ position: 'relative' }}>
            <header className="chat_page__header">
                <PhoneStatusBar date_label={`1월 ${day + 3}일 · DAY ${day}`} />
                <div className="chat_page__header_main">
                <div className="chat_page__avatar_reaction_wrap">
                    <div className="chat_page__avatar">
                    <img
                        src={get_profile_image(selfie_is_visible)}
                        alt="모라라 공주님♡ 프로필"
                        style={{
                            display: 'block',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '50%'
                        }}
                    />
                    </div>
                    {reaction && (
                        <div
                            className={`chat_page__choice_effect chat_page__choice_effect_${reaction.value > 0 ? 'positive' : reaction.value < 0 ? 'negative' : 'neutral'}`}
                            key={reaction.id}
                            role="status"
                            aria-label={`호감도 ${reaction.value > 0 ? '상승' : reaction.value < 0 ? '하락' : '변화 없음'}`}
                        >
                            <span className="chat_page__choice_effect_icon">{reaction.emoji}</span>
                            {reaction.value > 0 && (
                                <>
                                    <span className="chat_page__choice_effect_particle chat_page__choice_effect_particle_left">♥</span>
                                    <span className="chat_page__choice_effect_particle chat_page__choice_effect_particle_right">♥</span>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className="chat_page__profile">
                    <strong>모라라 공주님♡</strong>

                </div>

                <button
                    type="button"
                    className="chat_page__tiara_progress"
                    onClick={() => set_show_tiara_dialog(true)}
                    aria-label="달빛 충전도 확인"
                    title="달빛 충전도 확인"
                >
                    <img className="chat_page__tiara_empty" src={image_map['tiara_empty.png']} alt="" draggable={false} />
                    <div className="chat_page__tiara_light_mask" ref={tiara_light_ref}>
                        <img className="chat_page__tiara_full" src={image_map['tiara_full.png']} alt="" draggable={false} />
                    </div>
                </button>

                <div className="chat_page__affection">
                    <span>💕</span>
                    <strong>{affection}</strong>
                </div>
                <button
                    type="button"
                    className="chat_page__settings_button"
                    onClick={on_open_settings}
                    aria-label="게임 설정"
                    title="게임 설정"
                >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M10 2h4l.6 2.4a8 8 0 0 1 2 1.1l2.3-.8 2 3.5-1.8 1.7a8 8 0 0 1 0 2.3l1.8 1.7-2 3.5-2.3-.8a8 8 0 0 1-2 1.1L14 20h-4l-.6-2.4a8 8 0 0 1-2-1.1l-2.3.8-2-3.5 1.8-1.7a8 8 0 0 1 0-2.3L3.1 8.1l2-3.5 2.3.8a8 8 0 0 1 2-1.1L10 2Z" />
                        <circle cx="12" cy="11" r="3" />
                    </svg>
                </button>


                </div>
            <div className="chat_page__affection_progress">
                <div className="chat_page__affection_progress_label">
                    <span>모라라와의 관계</span>
                    <strong>{affection} / {max_affection}점</strong>
                </div>
                <div
                    className="chat_page__affection_progress_track"
                    role="progressbar"
                    aria-label="호감도"
                    aria-valuemin={0}
                    aria-valuemax={max_affection}
                    aria-valuenow={Math.min(max_affection, Math.max(0, affection))}
                >
                    <div
                        className="chat_page__affection_progress_fill"
                        style={{ width: `${max_affection > 0 ? Math.min(100, Math.max(0, affection / max_affection * 100)) : 0}%` }}
                    />
                </div>
            </div>

            </header>

            <div
                className="chat_page__messages"
                ref={scroll_ref}
                onClick={handle_skip}
            >
                {messages.map((message, index) => {
                    const previous_day_markers = messages
                        .slice(0, index + 1)
                        .filter((item) => (
                            item.sender === 'system' &&
                            /^DAY \d+$/.test(item.text)
                        ));

                    const latest_marker = previous_day_markers.at(-1);
                    const history_day = latest_marker
                        ? Number(latest_marker.text.replace('DAY ', ''))
                        : 1;

                    return render_message(message, history_day, index);
                })}

                {(!is_choice || choice_pending) && !is_day_complete && chat_mode_preference === 'manual' && (
                    <button
                        type="button"
                        className="chat_page__inline_advance"
                        onClick={(event) => {
                            event.stopPropagation();
                            handle_skip();
                        }}
                        disabled={choice_reaction_pending}
                        aria-label="다음 대사 보기"
                    >
                        <span aria-hidden="true">▾</span>
                        {choice_reaction_pending ? '답장을 기다리는 중…' : '화면을 눌러 계속하기'}
                    </button>
                )}

                {is_typing && chat_mode_preference === 'auto' && (
                    <div className="chat_page__message chat_page__message_molala">
                        <div className="chat_page__message_avatar">
                            <img
                                src={get_profile_image(selfie_is_visible)}
                                alt="모라라 공주님♡ 프로필"
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '50%'
                                }}
                            />
                        </div>

                        <div className="chat_page__bubble chat_page__typing">
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>
                )}

                {is_day_complete && !is_game_complete && (
                    <div className="chat_page__end" role="status">
                        <span className="chat_page__end_label">1월 {day + 3}일 DAY {day} · COMPLETE</span>
                        <strong className="chat_page__end_title">오늘의 이야기가 끝났어요</strong>
                        <span className="chat_page__end_description">다음 이야기를 만나볼까요?</span>
                    </div>
                )}
            </div>

            <footer className="chat_page__footer">
                {is_choice && !choice_pending && (
                    <div className="chat_page__choices">
                        {current_step.options.map((option) => (
                            <button
                                className="chat_page__choice"
                                type="button"
                                key={option.text}
                                onClick={() => handle_choice(option)}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                )}

                {is_day_complete && !is_game_complete && (
                    <button
                        className="chat_page__choice chat_page__next_day_button"
                        type="button"
                        onClick={handle_next_day}
                    >
                        1월 {day + 4}일 DAY {day + 1} 시작하기 <span aria-hidden="true">→</span>
                    </button>
                )}

                {is_game_complete && !choice_reaction_pending && (
                    <button
                        className="chat_page__choice chat_page__ending_button"
                        type="button"
                        onClick={handle_enter_ending}
                    >
                        바다로 가자
                    </button>
                )}

                {(!is_choice || choice_pending) && !is_day_complete && chat_mode_preference === 'auto' && (
                    <div className="chat_page__waiting" role="status">
                        자동으로 대화가 진행됩니다.
                    </div>
                )}
            </footer>

            {day_transition && (
                <div
                    className="chat_page__day_transition"
                    role="status"
                    aria-live="polite"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 100,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '14px',
                        background: 'linear-gradient(160deg, #231c35, #48304e)',
                        color: '#fff5fa',
                        opacity: day_transition.phase === 'leave' ? 0 : 1,
                        transition: 'opacity 0.8s ease',
                        pointerEvents: 'auto'
                    }}
                >
                    <span style={{ fontSize: '13px', letterSpacing: '0.28em' }}>
                        THE NEXT DAY
                    </span>
                    <strong style={{ fontSize: 'clamp(22px, 5.8vw, 30px)', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
                        1월 {day_transition.day + 3}일 DAY {day_transition.day}
                    </strong>
                    <span aria-hidden="true" style={{ fontSize: '25px' }}>
                        ✦
                    </span>
                </div>
            )}

            {show_music_video && (
                <div
                    className="chat_page__video_overlay"
                    role="presentation"
                    onClick={() => set_show_music_video(false)}
                >
                    <div
                        className="chat_page__video_dialog"
                        role="dialog"
                        aria-modal="true"
                        aria-label="백일몽 영상 재생"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="chat_page__video_header">
                            <strong>백일몽</strong>
                            <button
                                type="button"
                                aria-label="영상 닫기"
                                onClick={() => set_show_music_video(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="chat_page__video_player">
                            <iframe
                                src={`${YOUTUBE_EMBED_URL}?playsinline=1&rel=0`}
                                title="백일몽 YouTube 영상"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}

            {show_tiara_dialog && (
                <div className="chat_page__moon_overlay" onClick={() => set_show_tiara_dialog(false)} role="presentation">
                    <div className="chat_page__moon_dialog" role="dialog" aria-modal="true" aria-labelledby="moon_dialog_title" onClick={(event) => event.stopPropagation()}>
                        <button className="chat_page__moon_close" type="button" aria-label="닫기" onClick={() => set_show_tiara_dialog(false)}>×</button>
                        <span className="chat_page__moon_eyebrow">MOONLIGHT</span>
                        <h2 id="moon_dialog_title">달빛 충전도</h2>
                        <div className="chat_page__moon_art" aria-hidden="true">
                            <img src={image_map['tiara_empty.png']} alt="" />
                            <div
                                className="chat_page__moon_art_light"
                                style={{
                                    clipPath: `polygon(0 0, ${Math.max(0, Math.min(100, 110 * tiara_progress - 5))}% 0, ${Math.max(0, Math.min(100, 110 * tiara_progress + 5))}% 100%, 0 100%)`
                                }}
                            >
                                <img src={image_map['tiara_full.png']} alt="" />
                            </div>
                        </div>
                        <strong className="chat_page__moon_percent">{Math.round(tiara_progress * 100)}%</strong>
                        <div className="chat_page__moon_track" role="progressbar" aria-label="달빛 충전도" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(tiara_progress * 100)}>
                            <div className="chat_page__moon_track_fill" style={{ width: `${Math.round(tiara_progress * 100)}%` }} />
                        </div>
                        <p>이야기가 이어질수록 티아라에 달빛이 차올라요.</p>
                    </div>
                </div>
            )}

            {show_return_confirm && (
                <div className="chat_page__return_overlay" role="presentation" onClick={() => set_show_return_confirm(false)}>
                    <div className="chat_page__return_dialog" role="dialog" aria-modal="true" aria-labelledby="return_title" onClick={(event) => event.stopPropagation()}>
                        <strong id="return_title">처음으로 돌아갈까요?</strong>
                        <p>지금까지의 대화는 저장되어 있어요.</p>
                        <div className="chat_page__return_actions">
                            <button type="button" onClick={() => set_show_return_confirm(false)}>계속하기</button>
                            <button type="button" onClick={handle_return_title}>타이틀로</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default ChatPage;
