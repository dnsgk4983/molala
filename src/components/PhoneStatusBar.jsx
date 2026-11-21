import '../assets/scss/components/_phone_status.scss';
export default function PhoneStatusBar({ date_label = '1월 4일 · DAY 1' }) {
    return (
        <div className="phone_status_bar" role="group" aria-label="휴대폰 상태 표시줄">
            <span className="phone_status_bar__date">{date_label}</span>
            <span className="phone_status_bar__indicators" aria-label="통신 상태, 와이파이, 배터리">
                <svg viewBox="0 0 19 16" aria-hidden="true" focusable="false">
                    <rect x="1" y="10" width="3" height="5" rx="1" />
                    <rect x="5.5" y="7" width="3" height="8" rx="1" />
                    <rect x="10" y="4" width="3" height="11" rx="1" />
                    <rect x="14.5" y="1" width="3" height="14" rx="1" />
                </svg>
                <svg viewBox="0 0 18 16" aria-hidden="true" focusable="false">
                    <path d="M1 5Q9 -1 17 5M4 9Q9 5 14 9M7.5 12.5Q9 11 10.5 12.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="9" cy="14" r="1.2" />
                </svg>
                <svg viewBox="0 0 25 16" aria-hidden="true" focusable="false">
                    <rect x="1" y="2" width="20" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <rect x="3.5" y="4.5" width="14" height="7" rx="1.5" />
                    <rect x="22" y="6" width="2" height="4" rx="1" />
                </svg>
            </span>
        </div>
    );
}
