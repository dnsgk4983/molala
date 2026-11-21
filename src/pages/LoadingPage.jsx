
import { useEffect, useState } from 'react';

function LoadingPage({ on_complete }) {
    const [progress, set_progress] = useState(0);

    useEffect(() => {
        let cancelled = false;

        const resources = [];

        const load_image = (src) => {
            return new Promise((resolve) => {
                const image = new Image();

                image.onload = resolve;
                image.onerror = resolve;
                image.src = src;
            });
        };

        const load_resources = async () => {
            if (resources.length === 0) {
                set_progress(100);
                on_complete?.();
                return;
            }

            let completed = 0;

            for (const resource of resources) {
                await load_image(resource);

                if (cancelled) {
                    return;
                }

                completed += 1;

                set_progress(
                    Math.round((completed / resources.length) * 100)
                );
            }

            if (!cancelled) {
                on_complete?.();
            }
        };

        load_resources();

        return () => {
            cancelled = true;
        };
    }, [on_complete]);

    return (
        <section className="loading_page">
            <div className="loading_page__content">
                <div className="loading_page__symbol">
                    <span className="loading_page__symbol_center" />
                </div>

                <h1 className="loading_page__title">
                    공주님, 답장은 제가 할게요
                </h1>

                <p className="loading_page__subtitle">
                    기사단장 대타 뛰겠습니다!
                </p>

                <div
                    className="loading_page__progress"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    <div
                        className="loading_page__progress_fill"
                        style={{
                            width: `${progress}%`
                        }}
                    />
                </div>

                <p className="loading_page__status">
                    화면 로드 중... {progress}%
                </p>
            </div>
        </section>
    );
}

export default LoadingPage;
