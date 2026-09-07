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
          <div className="showcase-layout">
            
            {/* Left Column: Project Details */}
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
                  <div className="project-tag-pill">{activeProject.tag}</div>
                  
                  <h3 className="project-title">{activeProject.title}</h3>
                  
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
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Center Area: Large Preview Display with Arrows */}
            <div className="showcase-preview-wrap">
              <div className="preview-screen">
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

            {/* Right Column: Vertical Thumbnails Strip */}
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

              <a
                href="#contact"
                className="more-projects-link"
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
          margin-bottom: 44px;
        }

        .portfolio-badge {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 8px 18px;
          border-radius: 999px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.25);
          color: #93c5fd;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .portfolio-headline {
          font-size: clamp(40px, 4.8vw, 68px);
          font-weight: 500;
          line-height: 1.12;
          letter-spacing: -.04em;
          color: #fcfbfe;
          margin: 0 0 16px;
        }

        .portfolio-headline em {
          font-style: normal;
          color: #a8b9ff;
        }

        .portfolio-subline {
          max-width: 760px;
          color: #9d9aa8;
          font-size: 19px;
          line-height: 1.65;
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
          padding: 6px 14px;
          border-radius: 8px;
          background: rgba(107, 61, 255, 0.18);
          border: 1px solid rgba(154, 133, 255, 0.3);
          color: #c4b5fd;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: .05em;
          text-transform: uppercase;
          margin-bottom: 18px;
          width: fit-content;
        }

        .project-title {
          font-size: clamp(28px, 2.8vw, 42px);
          font-weight: 600;
          line-height: 1.25;
          color: #ffffff;
          margin: 0 0 18px;
          letter-spacing: -.02em;
        }

        .project-target {
          font-size: 18px;
          color: #cfcdd9;
          line-height: 1.6;
          margin: 0 0 12px;
        }

        .project-target strong, .project-purpose strong {
          color: #ffffff;
          font-weight: 600;
        }

        .project-purpose {
          font-size: 18px;
          color: #a8a5b6;
          line-height: 1.6;
          margin: 0 0 24px;
        }

        .project-checklist {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 32px;
        }

        .checklist-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .check-icon-wrap {
          flex-shrink: 0;
          width: 26px;
          height: 26px;
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
          font-size: 18px;
          color: #d1d0db;
          line-height: 1.55;
        }

        .project-actions {
          margin-top: 8px;
        }

        .project-cta-btn {
          min-height: 56px;
          padding: 0 30px;
          font-size: 17px;
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
        }

        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
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
          transition: opacity .22s ease, transform .22s ease, border-color .22s ease;
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
          font-size: 15px;
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

        /* Responsive */
        @media (max-width: 1100px) {
          .showcase-layout {
            grid-template-columns: 1fr 1fr;
          }
          .showcase-thumbnails-col {
            grid-column: span 2;
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
          }
          .thumbnails-list {
            flex-direction: row;
            width: auto;
          }
          .thumbnail-item {
            width: 120px;
          }
          .thumb-arrow-wrap {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .showcase-layout {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .showcase-thumbnails-col {
            grid-column: span 1;
            order: 3;
          }
          .showcase-preview-wrap {
            order: 2;
          }
          .showcase-info {
            order: 1;
          }
          .preview-dots {
            display: flex;
          }
          .thumbnail-item {
            width: 90px;
          }
        }
      `}</style>
    </section>
  );
}
