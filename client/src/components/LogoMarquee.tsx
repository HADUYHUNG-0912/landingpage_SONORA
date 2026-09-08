// LogoMarquee.tsx
// Dải logo đối tác chạy ngang, dùng cho landing page nền tối.
// Không cần thư viện ngoài. Logo trong public/logos/

interface LogoItem {
  name: string;
  src: string;
}

const LOGOS: LogoItem[] = [
  { name: "Sana Capital",       src: "/logos/sana-capital.png" },
  { name: "Mắt Sài Gòn MSG",    src: "/logos/msg.png" },
  { name: "IMV",                src: "/logos/imv.png" },
  { name: "Hit Collab Factory", src: "/logos/hit-collab-factory.png" },
  { name: "VimpexDrink",        src: "/logos/vimpex-drink.png" },
  { name: "Maxim",              src: "/logos/maxim.png" },
  { name: "UMobile",            src: "/logos/umobile.png" },
];

// ONE_LOOP = 3× bộ gốc → đủ lấp màn hình Full HD / 2K
const ONE_LOOP = [...LOGOS, ...LOGOS, ...LOGOS];
// track = 2× ONE_LOOP → translateX(-50%) luôn khớp ranh giới, không giật
const track = [...ONE_LOOP, ...ONE_LOOP];

export default function LogoMarquee() {
  return (
    <section className="lm-section" aria-label="Đối tác và khách hàng">
      <style>{`
        .lm-section {
          padding: 72px 0;
          background: radial-gradient(ellipse 80% 65% at 50% 50%, #0d1e44 0%, #08122a 55%, #050a16 100%);
          border-top: 1px solid rgba(59, 130, 246, 0.22);
          border-bottom: 1px solid rgba(59, 130, 246, 0.22);
          box-shadow: inset 0 1px 0 rgba(147, 197, 253, 0.1), inset 0 -1px 0 rgba(147, 197, 253, 0.1);
          position: relative;
        }

        .lm-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% 50%, rgba(37, 99, 235, 0.14) 0%, transparent 70%);
          pointer-events: none;
        }

        .lm-title {
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: #93c5fd;
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.35);
          margin: 0 0 40px;
          position: relative;
          z-index: 1;
        }

        /* Khung ngoài: cắt tràn + gradient fade 2 mép */
        /* Khung ngoài: cắt tràn + gradient fade 2 mép, vô hiệu hóa tương tác người dùng */
        .lm-viewport {
          overflow: hidden;
          position: relative;
          z-index: 1;
          -webkit-mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
                  mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
          pointer-events: none;
          user-select: none;
        }

        .lm-track {
          display: flex;
          align-items: center;
          gap: 56px;
          width: max-content;
          padding: 16px 0;
          animation: lm-scroll 60s linear infinite;
          pointer-events: none;
        }

        /* Logo item: không viền, không card, hòa vào nền tối */
        .lm-item {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        /* Logo trắng tinh tế chạy liên tục trên nền tối, không tương tác */
        .lm-logo {
          height: 40px;
          max-height: 44px;
          max-width: 160px;
          width: auto;
          object-fit: contain;
          display: block;
          filter: brightness(0) invert(1);
          opacity: 0.75;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
        }

        /* Desktop */
        @media (min-width: 768px) {
          .lm-logo {
            height: 46px;
            max-height: 50px;
            max-width: 180px;
          }
          .lm-track {
            gap: 64px;
          }
        }

        /* Keyframe: dịch -50% = đúng 1 ONE_LOOP */
        @keyframes lm-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* Accessibility: giảm hiệu ứng chuyển động */
        @media (prefers-reduced-motion: reduce) {
          .lm-track {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
            width: auto;
          }
          .lm-viewport {
            overflow-x: auto;
            -webkit-mask-image: none;
            mask-image: none;
          }
        }
        /* Jump Button xuống Portfolio */
        .lm-cta-wrap {
          display: flex;
          justify-content: center;
          margin-top: 36px;
          position: relative;
          z-index: 2;
        }

        .lm-jump-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 10px 22px;
          border-radius: 999px;
          background: rgba(59, 130, 246, 0.12);
          border: 1px solid rgba(147, 197, 253, 0.28);
          color: #bfdbfe;
          font-family: inherit;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: .02em;
          cursor: pointer;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          transition: background .2s ease, border-color .2s ease, color .2s ease, transform .2s ease, box-shadow .2s ease;
        }

        .lm-jump-btn:hover {
          background: rgba(37, 99, 235, 0.35);
          border-color: rgba(147, 197, 253, 0.65);
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 71, 171, 0.35);
        }

        .lm-jump-btn svg {
          transition: transform .2s ease;
        }
        .lm-jump-btn:hover svg {
          transform: translateY(2px);
        }
        .lm-jump-btn:active {
          transform: scale(0.96);
        }

        /* Mobile Breakpoint (<= 768px) */
        @media (max-width: 768px) {
          .lm-section {
            padding: 48px 0;
          }
          .lm-title {
            font-size: 11px;
            letter-spacing: .18em;
            margin: 0 0 24px;
          }
          .lm-logo {
            height: 34px;
            max-height: 38px;
          }
          .lm-track {
            gap: 36px;
            animation-duration: 50s;
          }
          .lm-cta-wrap {
            margin-top: 24px;
            padding: 0 16px;
          }
          .lm-jump-btn {
            padding: 9px 18px;
            font-size: 12px;
            max-width: 100%;
          }
        }

        /* Small Mobile (<= 420px) */
        @media (max-width: 420px) {
          .lm-section {
            padding: 42px 0;
          }
          .lm-logo {
            height: 28px;
            max-height: 32px;
          }
          .lm-track {
            gap: 28px;
          }
          .lm-jump-btn {
            font-size: 11px;
            padding: 8px 14px;
            gap: 6px;
          }
        }
      `}</style>

      <h2 className="lm-title">Đối tác &amp; Khách hàng</h2>

      <div className="lm-viewport">
        <div className="lm-track">
          {track.map((logo, i) => (
            <div className="lm-item" key={`${logo.name}-${i}`}>
              <img
                className="lm-logo"
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                aria-hidden={i >= ONE_LOOP.length}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="lm-cta-wrap">
        <button
          type="button"
          className="lm-jump-btn"
          onClick={() => {
            document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          <span>Xem chi tiết các dự án đã triển khai</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
}
