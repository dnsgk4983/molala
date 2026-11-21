export default function CookiePage({ on_complete }) {
    return (
        <section className="cookie_story" aria-label="진 엔딩 쿠키영상">
            <div className="cookie_story__content">
                <p className="cookie_story__eyebrow">SPECIAL EPISODE</p>
                <h1 className="cookie_story__heading">공주절의 숨겨진 이야기</h1>

                <div className="cookie_story__video_placeholder" role="status">
                    <span className="cookie_story__play_icon" aria-hidden="true">▶</span>
                    <p className="cookie_story__placeholder_title">영상이 들어갈 부분입니다</p>
                    <p className="cookie_story__placeholder_description">쿠키영상은 추후 공개될 예정입니다.</p>
                </div>

                <button
                    className="cookie_story__finish_button"
                    type="button"
                    onClick={on_complete}
                >
                    이야기 마치기
                </button>
            </div>
        </section>
    );
}
