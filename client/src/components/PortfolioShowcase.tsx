import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Check, ArrowUpRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  targetAudience: string;
  purpose: string;
  highlights: string[];
  image: string;
  ctaText: string;
  tag: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "sana-capital",
    title: "Sana Capital — Nền tảng Tài chính & Quỹ đầu tư",
    client: "Sana Capital",
    category: "Fintech & Quản lý tài sản số",
    targetAudience: "Quỹ đầu tư mạo hiểm, Quản lý tài sản số, Doanh nghiệp tài chính",
    purpose: "Số hóa báo cáo danh mục đầu tư, minh bạch dữ liệu tăng trưởng theo thời gian thực và thu hút nhà đầu tư chiến lược",
    highlights: [
      "Giao diện chuẩn quốc tế, hiển thị trực quan các danh mục đầu tư và biểu đồ lợi nhuận",
      "Tích hợp biểu mẫu đăng ký thẩm định và bảo mật dữ liệu cấp doanh nghiệp",
      "Tốc độ tải trang dưới 1.2s, chuẩn SEO và tối ưu tỷ lệ chuyển đổi cho các chiến dịch"
    ],
    image: "/projects/sana-capital.jpg",
    ctaText: "Tư vấn dự án Tài chính / Fintech",
    tag: "Fintech Platform"
  },
  {
    id: "mat-sai-gon",
    title: "Mắt Sài Gòn (MSG) — Hệ thống CRM & Hành trình Bệnh nhân",
    client: "Bệnh viện Mắt Sài Gòn",
    category: "Y tế & Quản lý vận hành khám chữa bệnh",
    targetAudience: "Hệ thống bệnh viện đa chi nhánh, Phòng khám đa khoa, Chuỗi nha khoa/thẩm mỹ",
    purpose: "Số hóa toàn diện quy trình tiếp nhận, hồ sơ bệnh nhân, đặt lịch khám và nhắc lịch hẹn tự động đa kênh",
    highlights: [
      "Quản lý hồ sơ bệnh nhân tập trung, đồng bộ lịch hẹn bác sĩ theo thời gian thực giữa các chi nhánh",
      "Tự động gửi thông báo xác nhận và nhắc lịch qua Zalo/SMS giúp giảm 45% tỷ lệ hủy hẹn",
      "Bảng điều khiển (Dashboard) trực quan theo dõi năng suất phòng khám và doanh thu dịch vụ"
    ],
    image: "/projects/mat-sai-gon.jpg",
    ctaText: "Tư vấn hệ thống CRM Y tế",
    tag: "Healthcare CRM"
  },
  {
    id: "maxim",
    title: "Maxim — Nền tảng Đặt xe & Điều phối Vận tải",
    client: "Maxim Mobility",
    category: "Vận tải, Logistics & Điều phối thời gian thực",
    targetAudience: "Dịch vụ gọi xe, Đội xe vận tải hàng hóa, Logistics chặng cuối",
    purpose: "Xây dựng trung tâm điều phối GPS trực tiếp, kết nối tức thì giữa khách hàng và mạng lưới đối tác tài xế",
    highlights: [
      "Thuật toán ghép cuốc và định vị GPS thông minh, rút ngắn thời gian chờ xe xuống dưới 3 phút",
      "Bảng điều khiển Admin kiểm soát dòng tiền, trạng thái đơn hàng và tỷ lệ chấp nhận cuốc",
      "Kiến trúc Microservices chịu tải hàng chục nghìn lượt đặt lệnh đồng thời không gián đoạn"
    ],
    image: "/projects/maxim.jpg",
    ctaText: "Tư vấn giải pháp Vận tải / Logistics",
    tag: "Mobility & Fleet"
  },
  {
    id: "hit-collab",
    title: "Hit Collab Factory — Không gian Số hóa Quy trình Sáng tạo",
    client: "Hit Collab Factory",
    category: "Cộng tác nội bộ & Quản trị dự án Agency",
    targetAudience: "Creative Agency, Studio sản xuất nội dung, Đội ngũ thiết kế & phần mềm",
    purpose: "Tập trung hóa quản lý tiến độ, duyệt asset thiết kế tương tác và quản trị giao tiếp khách hàng B2B",
    highlights: [
      "Kanban board và Timeline Gantt linh hoạt cho từng giai đoạn từ lên ý tưởng đến bàn giao",
      "Không gian review bản vẽ và mockup trực tiếp với tính năng để lại phản hồi tại từng điểm ảnh",
      "Báo cáo tiến độ tự động giúp ban điều hành nắm bắt ngay các điểm nghẽn của từng dự án"
    ],
    image: "/projects/hit-collab.jpg",
    ctaText: "Tư vấn công cụ Quản trị Agency",
    tag: "Workflow Portal"
  }
];

export default function PortfolioShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeProject = PROJECTS[currentIndex];

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 45;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const showContactToast = (projectName: string) => {
    toast.message(`Tư vấn giải pháp: ${projectName}`, {
      description: "Đội ngũ kỹ thuật VENUS sẽ liên hệ và trao đổi giải pháp chi tiết cùng bạn.",
    });
  };

  return (
    <section className="portfolio-section" id="portfolio" aria-label="Dự án tiêu biểu VENUS">
      <div className="portfolio-container">
        
        {/* Section Header */}
        <div className="portfolio-header">
          <div className="portfolio-badge">
            <Sparkles size={14} />
            <span>PORTFOLIO / CASE STUDIES</span>
          </div>
          <h2 className="portfolio-headline">
            Những sản phẩm số tạo ra <em>kết quả thực tế.</em>
          </h2>
          <p className="portfolio-subline">
            Mỗi giải pháp được VENUS kiến tạo từ sự thấu hiểu bài toán cốt lõi của doanh nghiệp, mang lại hiệu quả vận hành và tăng trưởng bền vững.
          </p>
        </div>

        {/* Main Showcase Card */}
        <div className="showcase-card">
          {/* Mobile-only header (Tag + Title on top for immediate context) */}
          <div className="showcase-mobile-header">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                <div className="project-tag-pill">{activeProject.tag}</div>
                <h3 className="project-title">{activeProject.title}</h3>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="showcase-layout">
            
            {/* Left Column: Project Details (Desktop) / Specs below preview (Mobile) */}
            <div className="showcase-info">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="showcase-info-content"
                >
                  <div className="desktop-only-heading">
                    <div className="project-tag-pill">{activeProject.tag}</div>
                    <h3 className="project-title">{activeProject.title}</h3>
                  </div>
                  
                  <p className="project-target">
                    <strong>Giải pháp cho:</strong> {activeProject.targetAudience}
                  </p>
                  
                  <p className="project-purpose">
                    <strong>Mục đích sử dụng:</strong> {activeProject.purpose}
                  </p>

                  <div className="project-checklist">
                    {activeProject.highlights.map((item, idx) => (
                      <div className="checklist-item" key={idx}>
                        <div className="check-icon-wrap">
                          <Check size={16} className="check-icon" />
                        </div>
                        <span className="check-text">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="project-actions">
                    <button
                      type="button"
                      className="button button--primary project-cta-btn"
                      onClick={() => showContactToast(activeProject.client)}
                    >
                      {activeProject.ctaText}
                      <ArrowUpRight size={18} />
                    </button>
                    
                    {/* Mobile-only more projects link placed naturally after CTA */}
                    <a
                      href="#contact"
                      className="more-projects-link mobile-more-link"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Xem thêm các giải pháp khác <span>→</span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Center Area: Large Preview Display with Arrows and Touch Swipe */}
            <div className="showcase-preview-wrap">
              <div 
                className="preview-screen"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeProject.image}
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="preview-image"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  />
                </AnimatePresence>

                {/* Arrow Controls */}
                <button
                  type="button"
                  className="nav-arrow nav-arrow--left"
                  onClick={handlePrev}
                  aria-label="Dự án trước"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  className="nav-arrow nav-arrow--right"
                  onClick={handleNext}
                  aria-label="Dự án tiếp theo"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* Indicator dots for mobile */}
              <div className="preview-dots">
                {PROJECTS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`preview-dot ${i === currentIndex ? "preview-dot--active" : ""}`}
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Chuyển đến dự án ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Vertical Thumbnails Strip (Desktop) / Horizontal Touch Grid (Mobile) */}
            <div className="showcase-thumbnails-col">
              <div className="thumb-arrow-wrap">
                <button
                  type="button"
                  className="thumb-nav-btn"
                  onClick={handlePrev}
                  aria-label="Cuộn lên dự án trước"
                >
                  <ChevronUp size={18} />
                </button>
              </div>

              <div className="thumbnails-list">
                {PROJECTS.map((proj, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      className={`thumbnail-item ${isActive ? "thumbnail-item--active" : ""}`}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Xem dự án ${proj.client}`}
                    >
                      <img src={proj.image} alt={proj.client} className="thumbnail-img" />
                      {isActive && <div className="thumbnail-glow-border" />}
                    </button>
                  );
                })}
              </div>

              <div className="thumb-arrow-wrap">
                <button
                  type="button"
                  className="thumb-nav-btn"
                  onClick={handleNext}
                  aria-label="Cuộn xuống dự án sau"
                >
                  <ChevronDown size={18} />
                </button>
              </div>

              {/* Desktop more projects link */}
              <a
                href="#contact"
                className="more-projects-link desktop-more-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Xem thêm các giải pháp khác <span>→</span>
              </a>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .portfolio-section {
          position: relative;
          padding: clamp(90px, 8vw, 130px) clamp(22px, 5vw, 84px);
          background: #060913;
          background-image: 
            radial-gradient(circle at 15% 25%, rgba(59, 130, 246, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 85% 75%, rgba(107, 61, 255, 0.09) 0%, transparent 45%);
          color: #f2f0ee;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .portfolio-container {
          max-width: 1440px;
          margin: 0 auto;
        }

        .portfolio-header {
          margin-bottom: 40px;
        }

        .portfolio-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.25);
          color: #93c5fd;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .portfolio-headline {
          font-size: clamp(30px, 3.6vw, 48px);
          font-weight: 500;
          line-height: 1.15;
          letter-spacing: -.035em;
          color: #fcfbfe;
          margin: 0 0 14px;
        }

        .portfolio-headline em {
          font-style: normal;
          color: #a8b9ff;
        }

        .portfolio-subline {
          max-width: 660px;
          color: #9d9aa8;
          font-size: 15.5px;
          line-height: 1.6;
          margin: 0;
        }

        /* Outer Bento Card */
        .showcase-card {
          background: rgba(13, 17, 30, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: clamp(28px, 4vw, 50px);
          box-shadow: 
            0 24px 60px rgba(0, 0, 0, 0.45),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        /* Mobile-only header is hidden on desktop */
        .showcase-mobile-header {
          display: none;
        }
        .desktop-only-heading {
          display: block;
        }

        .showcase-layout {
          display: grid;
          grid-template-columns: 1.25fr 1.55fr 170px;
          gap: clamp(28px, 3.5vw, 48px);
          align-items: center;
        }

        /* Left info column */
        .showcase-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .project-tag-pill {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 8px;
          background: rgba(107, 61, 255, 0.18);
          border: 1px solid rgba(154, 133, 255, 0.3);
          color: #c4b5fd;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: .05em;
          text-transform: uppercase;
          margin-bottom: 14px;
          width: fit-content;
        }

        .project-title {
          font-size: clamp(22px, 2.2vw, 32px);
          font-weight: 600;
          line-height: 1.25;
          color: #ffffff;
          margin: 0 0 14px;
          letter-spacing: -.02em;
        }

        .project-target {
          font-size: 14.5px;
          color: #cfcdd9;
          line-height: 1.6;
          margin: 0 0 10px;
        }

        .project-target strong, .project-purpose strong {
          color: #ffffff;
          font-weight: 600;
        }

        .project-purpose {
          font-size: 14.5px;
          color: #a8a5b6;
          line-height: 1.6;
          margin: 0 0 20px;
        }

        .project-checklist {
          display: flex;
          flex-direction: column;
          gap: 11px;
          margin-bottom: 26px;
        }

        .checklist-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .check-icon-wrap {
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.2);
          border: 1px solid rgba(96, 165, 250, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
        }

        .check-icon {
          color: #60a5fa;
        }

        .check-text {
          font-size: 14px;
          color: #d1d0db;
          line-height: 1.5;
        }

        .project-actions {
          margin-top: 6px;
        }

        .project-cta-btn {
          min-height: 48px;
          padding: 0 24px;
          font-size: 14.5px;
          transition: transform .18s ease, box-shadow .18s ease, background-color .18s ease;
        }

        /* Center preview screen */
        .showcase-preview-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .preview-screen {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 16px;
          overflow: hidden;
          background: #02040a;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
          touch-action: pan-y;
          user-select: none;
        }

        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }

        /* Arrow navigation */
        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(9, 13, 24, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background .2s ease, border-color .2s ease, transform .2s ease;
          z-index: 5;
        }

        .nav-arrow:hover {
          background: rgba(37, 99, 235, 0.9);
          border-color: #93c5fd;
          transform: translateY(-50%) scale(1.08);
        }

        .nav-arrow:active {
          transform: translateY(-50%) scale(0.95);
        }

        .nav-arrow--left {
          left: 14px;
        }

        .nav-arrow--right {
          right: 14px;
        }

        .preview-dots {
          display: none;
          gap: 8px;
          margin-top: 14px;
        }

        .preview-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          border: 0;
          cursor: pointer;
          transition: background .2s, width .2s;
        }

        .preview-dot--active {
          width: 24px;
          border-radius: 4px;
          background: #60a5fa;
        }

        /* Right column: Vertical thumbnails */
        .showcase-thumbnails-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .thumb-arrow-wrap {
          display: flex;
          justify-content: center;
        }

        .thumb-nav-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background .18s, border-color .18s, color .18s;
        }

        .thumb-nav-btn:hover {
          background: rgba(59, 130, 246, 0.25);
          border-color: rgba(147, 197, 253, 0.5);
          color: #ffffff;
        }

        .thumbnails-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        .thumbnail-item {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 10px;
          overflow: hidden;
          background: #050814;
          border: 2px solid transparent;
          cursor: pointer;
          opacity: 0.55;
          transition: opacity .22s ease, transform .22s ease, border-color .22s ease, box-shadow .22s ease;
          padding: 0;
        }

        .thumbnail-item:hover {
          opacity: 0.88;
          transform: translateY(-2px);
        }

        .thumbnail-item--active {
          opacity: 1;
          border-color: #3b82f6;
          box-shadow: 0 0 16px rgba(59, 130, 246, 0.4);
          transform: scale(1.03);
        }

        .thumbnail-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .more-projects-link {
          margin-top: 12px;
          font-size: 13.5px;
          font-weight: 600;
          color: #93c5fd;
          text-decoration: none;
          text-align: center;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: color .2s, gap .2s;
        }

        .more-projects-link:hover {
          color: #ffffff;
          gap: 7px;
        }

        .mobile-more-link {
          display: none;
        }
        .desktop-more-link {
          display: inline-flex;
        }

        /* ── Breakpoint: Tablet (769px – 1100px) ────────────────────────── */
        @media (max-width: 1100px) and (min-width: 769px) {
          .showcase-layout {
            grid-template-columns: 1fr 1.2fr;
            gap: 32px;
          }
          .showcase-thumbnails-col {
            grid-column: span 2;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 16px;
            margin-top: 10px;
          }
          .thumbnails-list {
            flex-direction: row;
            width: auto;
            gap: 12px;
          }
          .thumbnail-item {
            width: 120px;
          }
          .thumb-arrow-wrap {
            display: none;
          }
        }

        /* ── Breakpoint: Mobile (<= 768px) ──────────────────────────────── */
        @media (max-width: 768px) {
          .portfolio-section {
            padding: clamp(52px, 8vw, 70px) 16px;
          }

          .portfolio-header {
            margin-bottom: 24px;
          }

          .portfolio-badge {
            font-size: 11px;
            padding: 4px 11px;
            gap: 5px;
            margin-bottom: 12px;
          }

          .portfolio-headline {
            font-size: clamp(22px, 5.8vw, 28px);
            line-height: 1.2;
            letter-spacing: -.03em;
            margin-bottom: 12px;
          }

          .portfolio-subline {
            font-size: 13.5px;
            line-height: 1.6;
          }

          /* Compact Bento Card */
          .showcase-card {
            border-radius: 20px;
            padding: 20px 14px;
          }

          /* Show tag & title directly on top of mockup */
          .showcase-mobile-header {
            display: block;
            margin-bottom: 16px;
          }
          .desktop-only-heading {
            display: none;
          }

          .showcase-mobile-header .project-tag-pill {
            font-size: 10.5px;
            padding: 3px 9px;
            margin-bottom: 8px;
            border-radius: 6px;
          }

          .showcase-mobile-header .project-title {
            font-size: clamp(18px, 4.6vw, 22px);
            line-height: 1.28;
            margin-bottom: 0;
          }

          /* Mobile layout order: 1. Mockup Preview -> 2. Thumbnails switcher -> 3. Info details */
          .showcase-layout {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .showcase-preview-wrap {
            order: 1;
            width: 100%;
          }

          .preview-screen {
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          }

          .nav-arrow {
            width: 36px;
            height: 36px;
          }
          .nav-arrow--left {
            left: 8px;
          }
          .nav-arrow--right {
            right: 8px;
          }

          .preview-dots {
            display: flex;
            justify-content: center;
            gap: 6px;
            margin-top: 10px;
          }
          .preview-dot {
            width: 6px;
            height: 6px;
          }
          .preview-dot--active {
            width: 18px;
          }

          /* Thumbnails strip: 4 equal touchable columns */
          .showcase-thumbnails-col {
            order: 2;
            width: 100%;
            margin-top: 2px;
          }

          .thumb-arrow-wrap {
            display: none;
          }

          .thumbnails-list {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            width: 100%;
          }

          .thumbnail-item {
            width: 100%;
            aspect-ratio: 16 / 10;
            border-radius: 8px;
            opacity: 0.6;
          }

          .thumbnail-item--active {
            opacity: 1;
            transform: scale(1.02);
            border-color: #60a5fa;
            box-shadow: 0 0 12px rgba(59, 130, 246, 0.45);
          }

          .thumbnail-item:active {
            transform: scale(0.95);
          }

          .desktop-more-link {
            display: none;
          }

          /* Project info details below thumbnails */
          .showcase-info {
            order: 3;
            width: 100%;
          }

          .project-target {
            font-size: 13px;
            line-height: 1.55;
            margin: 0 0 6px;
          }

          .project-purpose {
            font-size: 13px;
            line-height: 1.55;
            margin: 0 0 14px;
          }

          .project-checklist {
            gap: 8px;
            margin-bottom: 18px;
          }

          .check-icon-wrap {
            width: 20px;
            height: 20px;
            margin-top: 1px;
          }

          .check-icon {
            width: 13px;
            height: 13px;
          }

          .check-text {
            font-size: 13px;
            line-height: 1.45;
          }

          /* Action button: full width for effortless mobile thumb tapping */
          .project-actions {
            margin-top: 4px;
          }

          .project-cta-btn {
            width: 100%;
            min-height: 46px;
            padding: 0 18px;
            font-size: 13.5px;
            justify-content: center;
            border-radius: 12px;
          }

          .project-cta-btn:active {
            transform: scale(0.98);
          }

          .mobile-more-link {
            display: inline-flex;
            justify-content: center;
            width: 100%;
            margin-top: 12px;
            font-size: 12.5px;
          }
        }

        /* ── Breakpoint: Small Mobile (<= 400px) ────────────────────────── */
        @media (max-width: 400px) {
          .portfolio-section {
            padding: 44px 12px;
          }

          .showcase-card {
            border-radius: 16px;
            padding: 16px 10px;
          }

          .thumbnails-list {
            gap: 6px;
          }

          .thumbnail-item {
            border-radius: 6px;
          }

          .nav-arrow {
            width: 30px;
            height: 30px;
          }

          .nav-arrow svg {
            width: 16px;
            height: 16px;
          }

          .check-text {
            font-size: 12px;
          }

          .project-cta-btn {
            font-size: 13px;
            min-height: 44px;
          }
        }
      `}</style>
    </section>
  );
}
