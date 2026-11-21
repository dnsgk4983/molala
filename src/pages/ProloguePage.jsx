import { useEffect, useRef, useState } from 'react';
import intro_beach from '../assets/images/intro_beach.png';
import intro_phone from '../assets/images/intro_phone.png';
import intro_hand from '../assets/images/intro_hand.png';
import profile_sunfish from '../assets/images/profile_sunfish.png';

const scenes = [
    {
        image: intro_beach,
        text: '해변을 걷다가\n모래 위에 놓인 휴대폰을 발견했다.'
    },
    {
        image: intro_phone,
        text: '주인이 근처에 있을까?\n주변을 둘러봐도 아무도 보이지 않는다.'
    },
    {
        image: intro_hand,
        text: '휴대폰을 조심스럽게 집어 들었다.\n화면에는 메모장이 열려 있었다.'
    }
];

const memo_lines = [
    '• 공주님 연락 확인하기',
    '• 약속 장소: 바닷가',
    '• 준비한 선물 챙기기',
    '• 무엇보다 공주님을 혼자 기다리게 하지 말 것',
    '…마지막 줄은 급하게 적은 듯 글씨가 삐뚤다.'
];

export default function ProloguePage({ on_complete }) {
    const [scene, set_scene] = useState(0);
    const [phase, set_phase] = useState('scene');
    const [memo_count, set_memo_count] = useState(0);
    const [notification_visible, set_notification_visible] = useState(false);
    const [scene_busy, set_scene_busy] = useState(false);
    const scene_timer_ref = useRef(null);

    useEffect(() => {
        return () => {
            window.clearTimeout(scene_timer_ref.current);
        };
    }, []);

    useEffect(() => {
        if (phase !== 'memo') {
            return;
        }

        if (memo_count < memo_lines.length) {
            const timer = window.setTimeout(() => {
                set_memo_count((previous) => previous + 1);
            }, memo_count === 0 ? 700 : 850);

            return () => window.clearTimeout(timer);
        }

        const timer = window.setTimeout(() => {
            set_notification_visible(true);
        }, 1100);

        return () => window.clearTimeout(timer);
    }, [phase, memo_count]);

    const handle_next_scene = () => {
        if (scene_busy || phase !== 'scene') {
            return;
        }

        set_scene_busy(true);

        if (scene < scenes.length - 1) {
            scene_timer_ref.current = window.setTimeout(() => {
                set_scene((previous) => previous + 1);
                set_scene_busy(false);
            }, 180);
            return;
        }

        scene_timer_ref.current = window.setTimeout(() => {
            set_phase('memo');
            set_scene_busy(false);
        }, 180);
    };

    const handle_scene_keydown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handle_next_scene();
        }
    };

    return (
        <section className="prologue_page">
            <img
                className="prologue_page__background"
                src={scenes[scene].image}
                alt=""
            />
            <div className="prologue_page__shade" />

            {phase === 'scene' && (
                <div
                    className="prologue_page__scene_area"
                    role="button"
                    tabIndex={0}
                    aria-label="다음 장면으로 이동"
                    onClick={handle_next_scene}
                    onKeyDown={handle_scene_keydown}
                >
                    <div className="prologue_page__content" key={scene}>
                        <p className="prologue_page__narration">
                            {scenes[scene].text}
                        </p>
                        <span className="prologue_page__next_arrows" aria-hidden="true">
                            {[1, 2, 3].map((number) => (
                                <svg
                                    key={number}
                                    className={`prologue_page__next_arrow prologue_page__next_arrow_${number}`}
                                    viewBox="0 0 32 16"
                                    fill="none"
                                >
                                    <path
                                        d="M3 3L16 13L29 3"
                                        stroke="currentColor"
                                        strokeWidth="3.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            ))}
                        </span>
                    </div>
                </div>
            )}

            {phase === 'memo' && (
                <>
                    <div className="prologue_page__phone_screen">
                        <div className="prologue_page__phone_top">
                            <span>9:41</span>
                            <span aria-hidden="true">●●● ▰</span>
                        </div>
                        <div className="prologue_page__memo_heading">메모</div>
                        <div className="prologue_page__memo_sheet">
                            <h2 className="prologue_page__memo_title">
                                공주절 준비 메모
                            </h2>
                            {memo_lines.slice(0, memo_count).map((line, index) => (
                                <p
                                    key={index}
                                    className="prologue_page__memo_line"
                                >
                                    {line}
                                </p>
                            ))}
                        </div>
                    </div>

                    {notification_visible && (
                        <>
                            <button
                                className="prologue_page__notification"
                                type="button"
                                onClick={on_complete}
                                aria-label="모라라 공주님의 카카오톡 메시지 확인하기"
                            >
                                <img src={profile_sunfish} alt="" />
                                <span className="prologue_page__notification_copy">
                                    <span className="prologue_page__notification_heading">
                                        <strong>모라라 공주님♡</strong>
                                        <span>지금</span>
                                    </span>
                                    <span className="prologue_page__notification_message">
                                        단장아아앙!! 어디야? 연락이 안 돼서 걱정했잖아!
                                    </span>
                                </span>
                            </button>
                            <button
                                className="prologue_page__open_chat"
                                type="button"
                                onClick={on_complete}
                            >
                                메시지 확인하기 <span aria-hidden="true">→</span>
                            </button>
                        </>
                    )}
                </>
            )}
        </section>
    );
}
