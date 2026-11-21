
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function TitlePage({
    on_start,
    on_settings,
    on_continue,
    on_gallery,
    has_save
}) {
    const page_ref = useRef(null);

    useEffect(() => {
        const reduce_motion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (reduce_motion) {
            return;
        }

        const animation_context = gsap.context(() => {
            const timeline = gsap.timeline({
                defaults: {
                    ease: 'power2.out'
                }
            });

            timeline
                .fromTo(
                    '.title_page__eyebrow',
                    {
                        opacity: 0,
                        y: 14
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.65
                    }
                )
                .fromTo(
                    '.title_page__heading',
                    {
                        opacity: 0,
                        y: 25
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.85
                    },
                    '-=0.35'
                )
                .fromTo(
                    '.title_page__subtitle',
                    {
                        opacity: 0,
                        y: 14
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.65
                    },
                    '-=0.4'
                )
                .fromTo(
                    '.title_page__start_area',
                    {
                        opacity: 0,
                        y: 25
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.75
                    },
                    '-=0.25'
                );
        }, page_ref);

        return () => {
            animation_context.revert();
        };
    }, []);

    return (
        <section
            className="title_page"
            ref={page_ref}
        >
            <div
                className="title_page__background"
                aria-hidden="true"
            />

            <div
                className="title_page__overlay"
                aria-hidden="true"
            />

            <div className="title_page__content">
                <div className="title_page__title">
                    <span className="title_page__eyebrow">
                        MOLALA FANMADE VISUAL NOVEL
                    </span>

                    <h1 className="title_page__heading">
                        공주님, 답장은
                        <span>제가 할게요</span>
                    </h1>

                    <p className="title_page__subtitle">
                        기사단장 대타 뛰겠습니다!
                    </p>

                    <div
                        className="title_page__ornament"
                        aria-hidden="true"
                    >
                        <span />
                        <span>✦</span>
                        <span />
                    </div>
                </div>

                <div className="title_page__start_area">
                    <button
                        className="title_page__settings"
                        type="button"
                        onClick={on_settings}
                    >
                        <span>⚙ 게임 설정</span>
                    </button>
                    {has_save ? (
                        <>
                            <button className="title_page__start" type="button" onClick={on_continue}>
                                <span>이어하기</span>
                            </button>
                            <button className="title_page__continue" type="button" onClick={on_start}>
                                <span>새로하기</span>
                            </button>
                        </>
                    ) : (
                        <button className="title_page__start" type="button" onClick={on_start}>
                            <span>게임 시작</span>
                        </button>
                    )}

                    <button className="title_page__continue" type="button" onClick={on_gallery}>
                        <span>추억 갤러리</span>
                    </button>
                    <span className="title_page__credit">
                        A FANMADE STORY FOR MOLALA
                    </span>
                </div>
            </div>
        </section>
    );
}

export default TitlePage;
