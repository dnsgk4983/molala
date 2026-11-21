
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import intro_beach from '../assets/images/intro_beach.png';
import intro_phone from '../assets/images/intro_phone.png';
import intro_hand from '../assets/images/intro_hand.png';
import profile_sunfish from '../assets/images/profile_sunfish.png';

const scenes = [
    {
        image: intro_beach,
        narration: '평범한 하루의 끝.\n해변을 걷고 있었다.'
    },
    {
        image: intro_phone,
        narration: '그때, 모래사장 위에 떨어진\n휴대폰 하나를 발견했다.'
    },
    {
        image: intro_hand,
        narration: '휴대폰을 집어 든 순간,\n화면에 메시지가 도착했다.'
    }
];

const notifications = [
    '단자아아앙!!',
    '아니 왜 연락이 안 되는 거야!!',
    '무슨 일 생긴 거 아니지?'
];

export default function ProloguePage({ on_complete }) {
    const [scene_index, set_scene_index] = useState(0);
    const [previous_image, set_previous_image] = useState(null);
    const [show_notification, set_show_notification] = useState(false);
    const [notification_index, set_notification_index] = useState(0);
    const [show_chat_button, set_show_chat_button] = useState(false);
    const [is_transitioning, set_is_transitioning] = useState(false);

    const background_ref = useRef(null);
    const previous_background_ref = useRef(null);
    const narration_ref = useRef(null);
    const next_button_ref = useRef(null);
    const notification_ref = useRef(null);
    const chat_button_ref = useRef(null);
    const timeline_ref = useRef(null);
    const scene_index_ref = useRef(0);
    const transitioning_ref = useRef(false);

    const reduced_motion = () => {
        return window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;
    };

    useEffect(() => {
        const timeline = gsap.timeline();

        timeline.fromTo(
            narration_ref.current,
            {
                opacity: 0,
                y: 12
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: 'power2.out'
            }
        );

        timeline.fromTo(
            next_button_ref.current,
            {
                opacity: 0,
                y: 14
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: 'power2.out'
            },
            '-=0.1'
        );

        timeline_ref.current = timeline;

        return () => {
            timeline.kill();
        };
    }, []);

    useEffect(() => {
        if (!show_notification) {
            return;
        }

        const timeline = gsap.timeline();

        timeline.fromTo(
            notification_ref.current,
            {
                opacity: 0,
                y: -20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
            }
        );

        notifications.forEach((message, index) => {
            if (index === 0) {
                return;
            }

            timeline.to({}, {
                duration: 1.3,
                onComplete: () => {
                    set_notification_index(index);
                }
            });
        });

        timeline.to({}, {
            duration: 0.8,
            onComplete: () => {
                set_show_chat_button(true);
            }
        });

        timeline_ref.current = timeline;

        return () => {
            timeline.kill();
        };
    }, [show_notification]);

    useEffect(() => {
        if (!show_chat_button || !chat_button_ref.current) {
            return;
        }

        gsap.fromTo(
            chat_button_ref.current,
            {
                opacity: 0,
                y: 12
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            }
        );
    }, [show_chat_button]);

    const handle_next = () => {
        if (transitioning_ref.current || show_notification) {
            return;
        }

        if (scene_index_ref.current >= scenes.length - 1) {
            transitioning_ref.current = true;
            set_is_transitioning(true);

            const timeline = gsap.timeline({
                onComplete: () => {
                    set_show_notification(true);
                    transitioning_ref.current = false;
                    set_is_transitioning(false);
                }
            });

            timeline.to(
                [narration_ref.current, next_button_ref.current],
                {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in'
                }
            );

            return;
        }

        transitioning_ref.current = true;
        set_is_transitioning(true);

        const next_index = scene_index_ref.current + 1;
        const old_image = scenes[scene_index_ref.current].image;

        const timeline = gsap.timeline({
            onComplete: () => {
                transitioning_ref.current = false;
                set_is_transitioning(false);
            }
        });

        timeline.to(
            [narration_ref.current, next_button_ref.current],
            {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    set_previous_image(old_image);
                    scene_index_ref.current = next_index;
                    set_scene_index(next_index);
                }
            }
        );

        timeline.add(() => {
            requestAnimationFrame(() => {
                if (previous_background_ref.current) {
                    gsap.fromTo(
                        previous_background_ref.current,
                        {
                            opacity: 1
                        },
                        {
                            opacity: 0,
                            duration: 0.8,
                            ease: 'power2.inOut',
                            onComplete: () => {
                                set_previous_image(null);
                            }
                        }
                    );
                }
            });
        });

        timeline.fromTo(
            narration_ref.current,
            {
                opacity: 0,
                y: 8
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out'
            },
            '+=0.25'
        );

        timeline.fromTo(
            next_button_ref.current,
            {
                opacity: 0,
                y: 10
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: 'power2.out'
            },
            '+=0.1'
        );

        timeline_ref.current = timeline;
    };

    const handle_chat = () => {
        if (typeof on_complete === 'function') {
            on_complete();
        }
    };

    return (
        <section className="prologue_page">
            <img
                ref={background_ref}
                className="prologue_page__background"
                src={scenes[scene_index].image}
                alt=""
            />

            {previous_image && (
                <img
                    ref={previous_background_ref}
                    className="prologue_page__background"
                    src={previous_image}
                    alt=""
                    style={{
                        zIndex: 1
                    }}
                />
            )}

            <div
                className="prologue_page__shade"
                style={{
                    zIndex: 2
                }}
            />

            {!show_notification && (
                <div
                    className="prologue_page__content"
                    style={{
                        zIndex: 3
                    }}
                >
                    <div
                        ref={narration_ref}
                        className="prologue_page__narration"
                    >
                        {scenes[scene_index].narration}
                    </div>

                    <button
                        ref={next_button_ref}
                        className="prologue_page__next"
                        type="button"
                        disabled={is_transitioning}
                        onClick={handle_next}
                    >
                        <span className="prologue_page__next_arrows" aria-hidden="true">
                            {[0, 1, 2].map((index) => (
                                <svg
                                    key={index}
                                    className={`prologue_page__next_arrow prologue_page__next_arrow_${index + 1}`}
                                    viewBox="0 0 32 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
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
                        <span className="prologue_page__next_label">다음 장면</span>
                    </button>
                </div>
            )}

            {show_notification && (
                <>
                    <div
                        ref={notification_ref}
                        className="prologue_page__floating"
                        role="status"
                        aria-live="polite"
                    >
                        <img
                            className="prologue_page__floating_avatar"
                            src={profile_sunfish}
                            alt=""
                        />

                        <div className="prologue_page__floating_content">
                            <strong className="prologue_page__floating_name">
                                모라라 공주님♡
                            </strong>

                            <p className="prologue_page__floating_message">
                                {notifications[notification_index]}
                            </p>
                        </div>

                        <span className="prologue_page__floating_time">
                            지금
                        </span>
                    </div>

                    {show_chat_button && (
                        <button
                            ref={chat_button_ref}
                            className="prologue_page__chat_button"
                            type="button"
                            onClick={handle_chat}
                        >
                            대화하기
                        </button>
                    )}
                </>
            )}
        </section>
    );
}
