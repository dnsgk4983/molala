import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { load_game } from '../utils/save_game.js';
import { unlock_ending } from '../utils/unlocks.js';

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

const ending_data = {
    true: {
        label: 'TRUE ENDING',
        title: '공주님과의 약속',
        description: '수많은 답장 끝에,\n마침내 두 사람의 마음이 닿았습니다.',
        epilogue: '우리의 이야기는 여기서 끝나지 않을 거예요.',
        image: 'ending_true.png'
    },
    normal: {
        label: 'NORMAL ENDING',
        title: '언제나 웃는 공주님',
        description: '함께 웃고 떠들었던 일곱 날.\n그 모든 순간이 소중한 추억이 되었습니다.',
        epilogue: '내일도 함께 웃을 수 있기를.',
        image: 'ending_normal.png'
    },
    bad: {
        label: 'BAD ENDING',
        title: '별빛 아래의 인연',
        description: '서로 다른 길을 걷더라도\n함께했던 시간은 사라지지 않습니다.',
        epilogue: '언젠가 같은 별을 바라볼 수 있기를.',
        image: 'ending_bad.png'
    }
};

function get_ending_type(game_data) {
    const affection = Number(game_data?.affection) || 0;

    if (affection >= 23) {
        return 'true';
    }

    if (affection >= 18) {
        return 'normal';
    }

    return 'bad';
}

function EndingPage({ on_restart, on_return_title }) {
    const content_ref = useRef(null);
    const [ending_type] = useState(() => get_ending_type(load_game()));
    const ending = ending_data[ending_type];

    useEffect(() => {
        unlock_ending(ending_type);
    }, [ending_type]);

    const ending_image = image_map[ending.image];

    useEffect(() => {
        if (!content_ref.current) {
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const context = gsap.context(() => {
            const timeline = gsap.timeline({
                defaults: {
                    ease: 'power2.out'
                }
            });

            timeline
                .from('.ending_page__eyebrow', {
                    autoAlpha: 0,
                    y: -12,
                    duration: 0.55
                })
                .from('.ending_page__artwork', {
                    autoAlpha: 0,
                    y: 18,
                    scale: 0.97,
                    duration: 1.05
                }, '-=0.2')
                .from([
                    '.ending_page__label',
                    '.ending_page__title',
                    '.ending_page__divider',
                    '.ending_page__description',
                    '.ending_page__epilogue'
                ], {
                    autoAlpha: 0,
                    y: 12,
                    stagger: 0.12,
                    duration: 0.5
                }, '-=0.4')
                .from('.ending_page__footer', {
                    autoAlpha: 0,
                    y: 10,
                    duration: 0.5
                }, '-=0.2');
        }, content_ref);

        return () => context.revert();
    }, []);

    return (
        <section className="ending_page">
            <div className="ending_page__background" />
            <div className="ending_page__overlay" />

            <div className="ending_page__content" ref={content_ref}>
                <span className="ending_page__eyebrow">
                    THE END
                </span>

                <div className="ending_page__center">
                    <div className="ending_page__artwork">
                        {ending_image ? (
                            <img
                                src={ending_image}
                                alt={ending.title}
                            />
                        ) : (
                            <span className="ending_page__artwork_placeholder">
                                ✧
                            </span>
                        )}
                    </div>

                    <span className="ending_page__label">
                        {ending.label}
                    </span>

                    <h1 className="ending_page__title">
                        {ending.title}
                    </h1>

                    <div className="ending_page__divider" aria-hidden="true">
                        <span>✦</span>
                    </div>

                    <p className="ending_page__description">
                        {ending.description}
                    </p>

                    <p className="ending_page__epilogue">
                        {ending.epilogue}
                    </p>
                </div>

                <div className="ending_page__footer">
                    <p className="ending_page__thanks">
                        모라라 공주님과 함께한 7일
                    </p>

                    {ending_type === 'true' && typeof on_restart === 'function' && (
                        <button className="ending_page__restart" type="button" onClick={on_restart}>
                            비밀 후일담 보기
                        </button>
                    )}
                    {ending_type !== 'true' && (
                        <button className="ending_page__restart" type="button" onClick={on_return_title}>
                            메인으로 돌아가기
                        </button>
                    )}

                    <span className="ending_page__credit">
                        Thank you for playing
                    </span>
                </div>
            </div>
        </section>
    );
}

export default EndingPage;
