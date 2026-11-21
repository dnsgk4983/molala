import { useState } from 'react';
import intro_phone from '../assets/images/intro_phone.png';
import intro_beach from '../assets/images/intro_beach.png';

const scenes = [
    { title: '공주절이다~!', text: '원래 기사단장은 휴대폰을 손에 쥔 채 신나게 해변으로 향하고 있었다.', image: intro_beach },
    { title: '갈매기 습격!', text: '그때, 거대한 갈매기가 갑자기 날아와 기사단장을 낚아챘다. “으아아아악!!!”', image: intro_beach },
    { title: '떨어진 휴대폰', text: '휴대폰은 모래사장에 툭 떨어졌다. 파도 소리만 남은 해변.', image: intro_phone },
    { title: '새끼 코랄단의 발견', text: '작은 새끼 코랄단이 반짝이는 휴대폰을 발견했다. 화면에는 공주님의 알림이 떠 있었다.', image: intro_phone },
    { title: '일곱 날의 기억', text: '웃고, 놀라고, 노래하고, 공주절을 준비하던 일곱 날이 폴라로이드처럼 스쳐 지나간다.', image: intro_beach },
    { title: '기사단장의 귀환', text: '저 멀리서 갈매기에게 탈출한 기사단장이 헐레벌떡 뛰어온다!', image: intro_beach },
    { title: '다 함께, 공주절!', text: '새끼 코랄단과 기사단장이 동시에 모라라에게 폴짝! 바닷가에 웃음이 번진다.', image: intro_beach }
];

export default function CookiePage({ on_complete }) {
    const [index, set_index] = useState(0);
    const scene = scenes[index];

    return (
        <section className="cookie_story" aria-label="진 엔딩 특별 후일담">
            <img className="cookie_story__background" src={scene.image} alt="" />
            <div className="cookie_story__shade" />
            <div className="cookie_story__card" key={index}>
                <span className="cookie_story__count">SPECIAL EPISODE · {index + 1} / {scenes.length}</span>
                <h1>{scene.title}</h1>
                <p>{scene.text}</p>
                <button type="button" onClick={() => index === scenes.length - 1 ? on_complete() : set_index(index + 1)}>
                    {index === scenes.length - 1 ? '이야기 마치기' : '다음 장면 →'}
                </button>
            </div>
        </section>
    );
}
