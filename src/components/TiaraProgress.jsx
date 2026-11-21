
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const total_days = 7;

function TiaraProgress({ day = 1 }) {
    const glow_ref = useRef(null);
    const previous_progress_ref = useRef(null);

    const current_day = Math.min(
        Math.max(Math.floor(Number(day) || 1), 1),
        total_days
    );

    const progress = ((current_day - 1) / (total_days - 1)) * 100;

    useEffect(() => {
        const glow_element = glow_ref.current;

        if (!glow_element) {
            return;
        }

        const clip_path = `inset(0 ${100 - progress}% 0 0)`;

        const reduce_motion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (previous_progress_ref.current === null || reduce_motion) {
            gsap.set(glow_element, {
                clipPath: clip_path
            });

            previous_progress_ref.current = progress;

            return;
        }

        const animation = gsap.to(glow_element, {
            clipPath: clip_path,
            duration: 1.1,
            ease: 'power2.inOut',
            overwrite: true
        });

        previous_progress_ref.current = progress;

        return () => {
            animation.kill();
        };
    }, [progress]);

    return (
        <div
            className="tiara_progress"
            role="progressbar"
            aria-label="스토리 진행도"
            aria-valuemin={1}
            aria-valuemax={total_days}
            aria-valuenow={current_day}
            aria-valuetext={`${current_day}일차 / 총 ${total_days}일`}
        >
            <div
                className="tiara_progress__icon"
                aria-hidden="true"
            >
                <span className="tiara_progress__base">
                    ♛
                </span>

                <span
                    className="tiara_progress__glow"
                    ref={glow_ref}
                >
                    ♛
                </span>
            </div>

            <span className="tiara_progress__label">
                {current_day} / {total_days}
            </span>
        </div>
    );
}

export default TiaraProgress;
