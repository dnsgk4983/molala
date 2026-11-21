import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import phone_frame_src from '../assets/images/phone_home_frame.png';
import phone_background_src from '../assets/images/phone_home_background.png';

function TitlePage({
    on_start,
    on_settings,
    on_continue,
    on_gallery,
    has_save
}) {
    const page_ref = useRef(null);
    const track_ref = useRef(null);
    const drag_ref = useRef(null);
    const distance_ref = useRef(0);
    const [slide_distance, set_slide_distance] = useState(0);
    const [choice_open, set_choice_open] = useState(false);
    const [is_transitioning, set_is_transitioning] = useState(false);
    const [is_dragging, set_is_dragging] = useState(false);
    const [track_progress, set_track_progress] = useState(0);

    useEffect(() => {
        const context = gsap.context(() => {
            gsap.fromTo(
                '.title_phone__content',
                {
                    opacity: 0,
                    y: 18
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.75,
                    ease: 'power2.out'
                }
            );
        }, page_ref);

        return () => context.revert();
    }, []);

    const open_game = () => {
        if (is_transitioning || choice_open) {
            return;
        }

        set_is_transitioning(true);
        const track_width = track_ref.current?.getBoundingClientRect().width || 0;
        const thumb_width = track_ref.current?.querySelector('button')?.getBoundingClientRect().width || 0;
        set_slide_distance(Math.max(0, track_width - thumb_width - 10));
        set_track_progress(100);

        window.setTimeout(() => {
            set_is_transitioning(false);
            set_slide_distance(0);
            set_track_progress(0);

            if (has_save) {
                set_choice_open(true);
                return;
            }

            on_start();
        }, 320);
    };

    const handle_pointer_down = (event) => {
        if (choice_open || is_transitioning) {
            return;
        }

        set_is_dragging(true);
        drag_ref.current = {
            pointer_id: event.pointerId,
            start_x: event.clientX,
            start_distance: slide_distance
        };

        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handle_pointer_move = (event) => {
        if (!drag_ref.current || drag_ref.current.pointer_id !== event.pointerId) {
            return;
        }

        const track_width = track_ref.current?.getBoundingClientRect().width || 0;
        const thumb_width = event.currentTarget.getBoundingClientRect().width;
        const max_distance = Math.max(0, track_width - thumb_width - 10);
        const delta = event.clientX - drag_ref.current.start_x;

        const next_distance = Math.min(max_distance, Math.max(0, drag_ref.current.start_distance + delta));
        distance_ref.current = next_distance;
        set_slide_distance(next_distance);
        set_track_progress(max_distance > 0 ? Math.min(100, (next_distance / max_distance) * 100) : 0);
    };

    const handle_pointer_up = (event) => {
        if (!drag_ref.current || drag_ref.current.pointer_id !== event.pointerId) {
            return;
        }

        const track_width = track_ref.current?.getBoundingClientRect().width || 0;
        const thumb_width = event.currentTarget.getBoundingClientRect().width;
        const max_distance = Math.max(0, track_width - thumb_width - 10);
        const should_start = max_distance > 0 && distance_ref.current >= max_distance * 0.72;

        drag_ref.current = null;
        set_is_dragging(false);
        distance_ref.current = 0;

        if (should_start) {
            open_game();
            return;
        }

        set_slide_distance(0);
        set_track_progress(0);
    };

    return (
        <section className="title_page" ref={page_ref}>
            <div className="title_page__background" aria-hidden="true" />
            <div className="title_page__overlay" aria-hidden="true" />

            <div className="title_phone">
                <img
                    className="title_phone__background_art"
                    src={phone_background_src}
                    alt=""
                    aria-hidden="true"
                    draggable="false"
                />
                <div className="title_phone__screen">
                    <div className="title_phone__content">
                        <h1 className="title_phone__sr_only">공주님, 답장은 제가 할게요 — 기사단장 대타 뛰겠습니다!</h1>
                        <div className="title_phone__bottom">
                            <div className={`title_phone__slide_track ${is_transitioning ? 'title_phone__slide_track_complete' : ''}`} ref={track_ref}>
                                <div
                                    className="title_phone__slide_fill"
                                    aria-hidden="true"
                                    style={{
                                        width: `${track_progress}%`,
                                        transition: is_dragging ? 'none' : 'width 280ms ease-out'
                                    }}
                                />
                                <span className="title_phone__slide_label" aria-hidden="true">
                                    밀어서 게임 시작
                                </span>
                                <button
                                    type="button"
                                    className="title_phone__slide_thumb"
                                    aria-label="오른쪽으로 밀어 게임 시작"
                                    onPointerDown={handle_pointer_down}
                                    onPointerMove={handle_pointer_move}
                                    onPointerUp={handle_pointer_up}
                                    onPointerCancel={() => {
                                        drag_ref.current = null;
                                        distance_ref.current = 0;
                                        set_is_dragging(false);
                                        set_slide_distance(0);
                                        set_track_progress(0);
                                    }}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter' || event.key === ' ') {
                                            event.preventDefault();
                                            open_game();
                                        }
                                    }}
                                    style={{
                                        transform: `translateX(${slide_distance}px)`,
                                        transition: is_dragging ? 'none' : 'transform 320ms cubic-bezier(0.2, 0.8, 0.2, 1)'
                                    }}
                                >
                                    <span aria-hidden="true">♡</span>
                                    <span aria-hidden="true">›</span>
                                </button>
                            </div>

                            <div className="title_phone__utilities">
                                <button type="button" onClick={on_settings}>⚙ 게임 설정</button>
                                <button type="button" onClick={on_gallery}>▧ 갤러리</button>
                            </div>
                        </div>
                    </div>
                </div>

                <img
                    className="title_phone__frame"
                    src={phone_frame_src}
                    alt=""
                    aria-hidden="true"
                    draggable="false"
                />
            </div>

            {choice_open && (
                <div className="title_phone__modal_backdrop">
                    <div
                        className="title_phone__modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="title_phone_choice_heading"
                    >
                        <h2 id="title_phone_choice_heading">진행 중인 이야기가 있어요</h2>
                        <p>이어서 진행할까요, 처음부터 시작할까요?</p>
                        <button
                            className="title_phone__modal_primary"
                            type="button"
                            onClick={() => {
                                set_choice_open(false);
                                on_continue();
                            }}
                        >
                            이어하기
                        </button>
                        <button
                            className="title_phone__modal_secondary"
                            type="button"
                            onClick={() => {
                                set_choice_open(false);
                                on_start();
                            }}
                        >
                            새로하기
                        </button>
                        <button
                            className="title_phone__modal_cancel"
                            type="button"
                            onClick={() => set_choice_open(false)}
                        >
                            취소
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default TitlePage;
