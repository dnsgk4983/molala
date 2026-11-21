import { get_unlocks } from '../utils/unlocks.js';

const images = import.meta.glob('../assets/images/**/*.{png,jpg,jpeg,webp}', {
    eager: true,
    query: '?url',
    import: 'default'
});

const image_map = Object.fromEntries(Object.entries(images).map(([path, url]) => [path.split('/').pop(), url]));
const endings = [
    { type: 'bad', title: '아쉬운 엔딩', image: 'ending_bad.png' },
    { type: 'normal', title: '노멀 엔딩', image: 'ending_normal.png' },
    { type: 'true', title: '진 엔딩', image: 'ending_true.png' }
];

export default function GalleryPage({ on_back }) {
    const unlocked = get_unlocks();

    return (
        <section className="gallery_page">
            <header><button type="button" onClick={on_back}>← 메인으로</button><h1>추억 갤러리</h1></header>
            <p>한 번 해금한 엔딩은 새 게임을 시작해도 남아 있어요.</p>
            <div className="gallery_page__grid">
                {endings.map((ending) => {
                    const available = unlocked.endings.includes(ending.type);
                    return (
                        <article key={ending.type} className="gallery_page__item">
                            {available && image_map[ending.image] ? <img src={image_map[ending.image]} alt={ending.title} /> : <span aria-hidden="true">✦</span>}
                            <strong>{available ? ending.title : '아직 열리지 않은 추억'}</strong>
                        </article>
                    );
                })}
            </div>
            <p>{unlocked.cookie_unlocked ? '진 엔딩 특별 후일담 해금 완료' : '진 엔딩을 만나면 특별 후일담이 열립니다.'}</p>
        </section>
    );
}
