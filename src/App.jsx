
import { useEffect, useState } from 'react';
import LoadingPage from './pages/LoadingPage.jsx';
import TitlePage from './pages/TitlePage.jsx';
import ProloguePage from './pages/ProloguePage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import EndingPage from './pages/EndingPage.jsx';
import CookiePage from './pages/CookiePage.jsx';
import { load_game, delete_save } from './utils/save_game.js';
import StartSettings from './components/StartSettings.jsx';
import { load_preferences, save_preferences } from './utils/preferences.js';

const PAGE = {
    LOADING: 'loading',
    TITLE: 'title',
    PROLOGUE: 'prologue',
    CHAT: 'chat',
    ENDING: 'ending',
    COOKIE: 'cookie'
};

function get_initial_page() {
    return PAGE.LOADING;
}

function App() {
    const [current_page, set_current_page] = useState(get_initial_page);
    const [preferences, set_preferences] = useState(load_preferences);
    const [settings_open, set_settings_open] = useState(false);
    const [has_save, set_has_save] = useState(() => load_game() !== null);
    const [show_new_confirm, set_show_new_confirm] = useState(false);

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--molala_font_scale',
            String(preferences.font_scale)
        );
    }, [preferences.font_scale]);

    const handle_loading_complete = () => {
        set_has_save(load_game() !== null);
        set_current_page(PAGE.TITLE);
    };

    const handle_start = () => {
        if (has_save) {
            set_show_new_confirm(true);
            return;
        }

        start_new_game();
    };

    const start_new_game = () => {
        delete_save();
        set_has_save(false);
        set_show_new_confirm(false);
        set_settings_open(false);
        set_current_page(PAGE.PROLOGUE);
    };

    const handle_settings_confirm = (next_preferences) => {
        save_preferences(next_preferences);
        set_preferences(next_preferences);
        set_settings_open(false);
    };

    const continue_game = () => {
        const game_data = load_game();

        if (game_data?.ending_confirmed === true) {
            set_current_page(PAGE.ENDING);
            return;
        }

        const has_progress = (
            Number(game_data?.day) > 1 ||
            Number(game_data?.step) > 0 ||
            (
                Array.isArray(game_data?.messages) &&
                game_data.messages.length > 0
            )
        );

        if (has_progress) {
            set_current_page(PAGE.CHAT);
            return;
        }

        set_current_page(PAGE.PROLOGUE);
    };

    const handle_return_title = () => {
        set_has_save(load_game() !== null);
        set_settings_open(false);
        set_current_page(PAGE.TITLE);
    };

    const handle_prologue_complete = () => {
        set_current_page(PAGE.CHAT);
    };

    const handle_enter_ending = () => {
        set_settings_open(false);
        set_current_page(PAGE.ENDING);
    };

    const handle_ending_complete = () => {
        set_current_page(PAGE.COOKIE);
    };

    const handle_cookie_complete = () => {
        delete_save();
        set_has_save(false);
        set_current_page(PAGE.TITLE);
    };

    const render_page = () => {
        switch (current_page) {
            case PAGE.LOADING:
                return (
                    <LoadingPage
                        on_complete={handle_loading_complete}
                    />
                );

            case PAGE.TITLE:
                return (
                    <>
                        <TitlePage
                            on_start={handle_start}
                            on_continue={continue_game}
                            has_save={has_save}
                            on_settings={() => set_settings_open(true)}
                        />
                        {show_new_confirm && (
                            <div className="start_settings" role="presentation">
                                <div className="start_settings__panel" role="dialog" aria-modal="true" aria-labelledby="new_game_title">
                                    <h2 id="new_game_title">새로 시작할까요?</h2>
                                    <p>기존 진행 기록이 삭제되고 처음부터 시작해요. 게임 설정은 유지됩니다.</p>
                                    <div className="start_settings__actions">
                                        <button className="start_settings__confirm" type="button" onClick={start_new_game}>새로 시작하기</button>
                                        <button className="start_settings__back" type="button" onClick={() => set_show_new_confirm(false)}>취소</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {settings_open && (
                            <StartSettings
                                initial_preferences={preferences}
                                on_confirm={handle_settings_confirm}
                                on_back={() => set_settings_open(false)}
                            />
                        )}
                    </>
                );

            case PAGE.PROLOGUE:
                return (
                    <ProloguePage
                        on_complete={handle_prologue_complete}
                    />
                );

            case PAGE.CHAT:
                return (
                    <>
                        <ChatPage
                            on_return_title={handle_return_title}
                            on_enter_ending={handle_enter_ending}
                            on_open_settings={() => set_settings_open(true)}
                            message_speed_preference={preferences.message_speed}
                        />
                        {settings_open && (
                            <StartSettings
                                initial_preferences={preferences}
                                on_confirm={handle_settings_confirm}
                                on_back={() => set_settings_open(false)}
                                on_return_title={handle_return_title}
                            />
                        )}
                    </>
                );

            case PAGE.ENDING:
                return (
                    <EndingPage
                        on_restart={handle_ending_complete}
                    />
                );

            case PAGE.COOKIE:
                return (
                    <CookiePage
                        on_complete={handle_cookie_complete}
                    />
                );

            default:
                return (
                    <LoadingPage
                        on_complete={handle_loading_complete}
                    />
                );
        }
    };

    return render_page();
}

export default App;
