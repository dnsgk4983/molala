import { useEffect, useState } from 'react';

const size_options = [
    { value: 0.85, label: '작게' },
    { value: 1, label: '보통' },
    { value: 1.15, label: '크게' },
    { value: 1.3, label: '아주 크게' }
];

function StartSettings({ initial_preferences, on_confirm, on_back, on_return_title }) {
    const [message_speed, set_message_speed] = useState(initial_preferences.message_speed);
    const [font_scale, set_font_scale] = useState(initial_preferences.font_scale);
    const [show_return_confirm, set_show_return_confirm] = useState(false);

    useEffect(() => {
        const handle_keydown = (event) => {
            if (event.key === 'Escape') {
                if (show_return_confirm) {
                    set_show_return_confirm(false);
                } else {
                    on_back();
                }
            }
        };

        window.addEventListener('keydown', handle_keydown);

        return () => {
            window.removeEventListener('keydown', handle_keydown);
        };
    }, [on_back, show_return_confirm]);

    return (
        <div
            className="start_settings"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    if (show_return_confirm) {
                        set_show_return_confirm(false);
                    } else {
                        on_back();
                    }
                }
            }}
        >
            <div className="start_settings__panel" role="dialog" aria-modal="true" aria-label="게임 설정">
                <span className="start_settings__eyebrow">GAME SETTINGS</span>
                <h1>게임 설정</h1>
                <p className="start_settings__description">편안한 속도와 글씨 크기를 골라주세요.</p>

                <fieldset className="start_settings__group">
                    <legend>대화 속도</legend>
                    <div className="start_settings__options">
                        {[
                            { value: 'slow', label: '느리게' },
                            { value: 'normal', label: '보통' },
                            { value: 'fast', label: '빠르게' }
                        ].map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                className={`start_settings__option ${message_speed === option.value ? 'start_settings__option_active' : ''}`}
                                aria-pressed={message_speed === option.value}
                                onClick={() => set_message_speed(option.value)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </fieldset>

                <fieldset className="start_settings__group">
                    <legend>글씨 크기</legend>
                    <div className="start_settings__options">
                        {size_options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                className={`start_settings__option ${font_scale === option.value ? 'start_settings__option_active' : ''}`}
                                aria-pressed={font_scale === option.value}
                                onClick={() => set_font_scale(option.value)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                    <p className="start_settings__preview" style={{ fontSize: `calc(1em * ${font_scale})` }}>
                        공주님, 오늘도 좋은 하루예요 ♡
                    </p>
                </fieldset>

                <div className="start_settings__actions">
                    <button
                        type="button"
                        className="start_settings__confirm"
                        onClick={() => on_confirm({ message_speed, font_scale })}
                    >
                        설정 저장
                    </button>
                    {on_return_title && (
                        <button
                            type="button"
                            className="start_settings__return_title"
                            onClick={() => set_show_return_confirm(true)}
                        >
                            메인으로 돌아가기
                        </button>
                    )}
                    <button type="button" className="start_settings__back" onClick={on_back}>
                        닫기
                    </button>
                </div>
            </div>
            {show_return_confirm && (
                <div className="start_settings__return_overlay" role="presentation">
                    <div
                        className="start_settings__return_panel"
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="return_title_heading"
                        aria-describedby="return_title_description"
                    >
                        <h2 id="return_title_heading">메인으로 돌아갈까요?</h2>
                        <p id="return_title_description">
                            현재 진행 기록은 유지됩니다. 메인에서 이어하기로 돌아올 수 있어요.
                        </p>
                        <div className="start_settings__return_actions">
                            <button
                                type="button"
                                className="start_settings__confirm"
                                onClick={on_return_title}
                            >
                                메인으로 돌아가기
                            </button>
                            <button
                                type="button"
                                className="start_settings__back"
                                onClick={() => set_show_return_confirm(false)}
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StartSettings;
