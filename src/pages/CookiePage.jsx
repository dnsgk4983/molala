
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const cookie_video_url = '';

function CookiePage({ on_complete }) {
    const content_ref = useRef(null);
    const [is_video_visible, set_is_video_visible] = useState(false);

    const has_video = cookie_video_url.trim().length > 0;

    useEffect(() => {
        if (!content_ref.current) {
            return;
        }

        const reduce_motion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (reduce_motion) {
            return;
        }

        const context = gsap.context(() => {
            gsap.fromTo(
                '.cookie_page__content',
                {
                    opacity: 0
                },
                {
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power2.out'
                }
            );
        }, content_ref);

        return () => {
            context.revert();
        };
    }, []);

    const handle_play = () => {
        if (!has_video) {
            return;
        }

        set_is_video_visible(true);
    };

    return (
        <section className="cookie_page">
            <div className="cookie_page__background" />

            <div
                className="cookie_page__wrapper"
                ref={content_ref}
            >
                <div className="cookie_page__content">
                    <span className="cookie_page__eyebrow">
                        SPECIAL EPISODE
                    </span>

                    <h1 className="cookie_page__title">
                        공주님이 남긴 마지막 메시지
                    </h1>

                    <p className="cookie_page__description">
                        아직 전하지 못한 이야기가 하나 남아 있어요.
                    </p>

                    {has_video && !is_video_visible && (
                        <button
                            className="cookie_page__play"
                            type="button"
                            onClick={handle_play}
                        >
                            마지막 이야기 보기
                        </button>
                    )}

                    {has_video && is_video_visible && (
                        <div className="cookie_page__video">
                            <video
                                src={cookie_video_url}
                                controls
                                autoPlay
                                playsInline
                                onEnded={on_complete}
                            />
                        </div>
                    )}

                    {!has_video && (
                        <p className="cookie_page__placeholder">
                            마지막 이야기를 준비하고 있습니다.
                        </p>
                    )}

                    <button
                        className="cookie_page__complete"
                        type="button"
                        onClick={on_complete}
                    >
                        이야기 마치기
                    </button>
                </div>
            </div>
        </section>
    );
}

export default CookiePage;
