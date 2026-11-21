import { useEffect, useState } from 'react';
import PhoneStatusBar from '../components/PhoneStatusBar.jsx';
import profile_sunfish from '../assets/images/profile_sunfish.png';
import { knight_memo_title, knight_memo_lines } from '../data/knight_memo.js';

const inner_thoughts = [
    '휴대폰에 메모장이 열려 있다. 코랄기사단장의 의무라니…?',
    '이걸 적은 사람은 공주님을 정말 소중히 생각하나 보다.',
    '그런데 이 휴대폰, 주인이 어디에 있는 걸까?'
];

export default function ProloguePage({ on_complete }) {
    const [memo_count, set_memo_count] = useState(0);
    const [thought_count, set_thought_count] = useState(0);
    const [notification_visible, set_notification_visible] = useState(false);

    useEffect(() => {
        if (memo_count < knight_memo_lines.length) {
            const timer = window.setTimeout(() => {
                set_memo_count((previous) => previous + 1);
            }, 760);

            return () => window.clearTimeout(timer);
        }

        if (thought_count === 0) {
            const timer = window.setTimeout(() => {
                set_thought_count(1);
            }, 700);

            return () => window.clearTimeout(timer);
        }
    }, [memo_count, thought_count]);

    const advance_thought = () => {
        if (notification_visible || thought_count === 0) {
            return;
        }

        if (thought_count < inner_thoughts.length) {
            set_thought_count((previous) => previous + 1);
            return;
        }

        set_notification_visible(true);
    };

    return (
        <section className="prologue_page prologue_page--full_memo">
            <div className="prologue_page__full_memo">
                <PhoneStatusBar date_label="1월 4일 · DAY 1" />
                <div className="prologue_page__memo_heading">메모</div>
                <div className="prologue_page__memo_sheet">
                    <h2 className="prologue_page__memo_title">{knight_memo_title}</h2>
                    {knight_memo_lines.slice(0, memo_count).map((line) => (
                        <p className="prologue_page__memo_line" key={line}>{line}</p>
                    ))}

                </div>
            </div>
            {thought_count > 0 && !notification_visible && (
                <div
                    className="prologue_page__thought_overlay"
                    aria-live="polite"
                    onClick={advance_thought}
                >
                    <div className="prologue_page__thought_backdrop" aria-hidden="true" />
                    <button
                        className="prologue_page__thought_dialog"
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            advance_thought();
                        }}
                        aria-label="다음 독백 보기"
                        key={thought_count}
                    >
                        <p className="prologue_page__thought_text">
                            ({inner_thoughts[thought_count - 1]})
                        </p>
                        <span className="prologue_page__thought_hint" aria-hidden="true">⌄</span>
                    </button>
                </div>
            )}
            {notification_visible && (
                <>
                    <button
                        type="button"
                        className="prologue_page__notification"
                        onClick={on_complete}
                        aria-label="모라라 공주님의 메시지 확인하기"
                    >
                        <img src={profile_sunfish} alt="" />
                        <span className="prologue_page__notification_copy">
                            <span className="prologue_page__notification_heading">
                                <strong>모라라 공주님♡</strong>
                                <span>지금</span>
                            </span>
                            <span className="prologue_page__notification_message">
                                단장아아앙!! 어디야? 연락이 안 돼서 걱정했잖아!
                            </span>
                        </span>
                    </button>
                    <button className="prologue_page__open_chat" type="button" onClick={on_complete}>
                        메시지 확인하기 <span aria-hidden="true">→</span>
                    </button>
                </>
            )}
        </section>
    );
}
