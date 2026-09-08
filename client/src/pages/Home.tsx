/* Design reminder: Nova Orbit is a cosmic-minimalist landing page—large dark space, precise orbit geometry, Orbit Violet accents, and asymmetrical anchors. */
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
  Github,
  Instagram,
  Layers3,
  Menu,
  Orbit,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useHeroParticles } from "../hooks/useHeroParticles";
import LogoMarquee from "../components/LogoMarquee";
import PortfolioShowcase from "../components/PortfolioShowcase";

// ── Motion System ──────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;
const VP = { once: true, amount: 0.15 } as const;
const VP_STEP = { once: true, amount: 0.25 } as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};
const panelIn = {
  hidden: { opacity: 0, x: 32, scale: 0.98 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.85, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const logoUrl = "/nova-orbit-logo.png";
const heroUrl = "/nova-orbit-hero.jpg";
const signalUrl = "/nova-orbit-product-signal.jpg";
const flowUrl = "/nova-orbit-product-flow.jpg";

const navItems = [
  { label: "About", target: "about" },
  { label: "Portfolio", target: "portfolio" },
  { label: "Services", target: "platform" },
  { label: "Process", target: "solutions" },
  { label: "Why Sonora", target: "why" },
  { label: "Contact", target: "contact" },
];

const capabilities = [
  {
    code: "01 / CRM DEVELOPMENT",
    title: "Build a CRM around the way your business actually works.",
    copy: "Thiết kế và phát triển hệ thống CRM dựa trên quy trình vận hành thực tế của doanh nghiệp.",
    stat: "CRM",
    statLabel: "Customer Management • Pipeline • Dashboard",
    image: signalUrl,
    className: "capability-card capability-card--wide",
  },
  {
    code: "02 / WEB DEVELOPMENT",
    title: "Web experiences designed for business goals.",
    copy: "Thiết kế và phát triển website phục vụ thương hiệu, kinh doanh và vận hành của doanh nghiệp.",
    stat: "Web",
    statLabel: "Corporate • Platform • CMS • Responsive",
    image: flowUrl,
    className: "capability-card capability-card--tall",
  }
];

function scrollToSection(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className="brand-lockup" aria-label="Sonora">
      <img className={`brand-mark ${inverse ? "brand-mark--inverse" : ""}`} src={logoUrl} alt="" />
      <span className="brand-wordmark">SONORA</span>
    </div>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const particlesCanvasRef = useHeroParticles();

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (target: string) => {
    setIsMenuOpen(false);
    scrollToSection(target);
  };

  const showPrototypeToast = (label: string) => {
    toast.message(`${label} là hành động mẫu trong bản prototype.`, {
      description: "Luồng chuyển đổi thực tế sẽ được kết nối ở vòng triển khai tiếp theo.",
    });
  };

  return (
    <main className="site-shell">
      <section className="hero" id="top" style={{ "--hero-image": `url(${heroUrl})` } as React.CSSProperties}>
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-grid hero-grid--one" aria-hidden="true" />
        <div className="hero-grid hero-grid--two" aria-hidden="true" />
        <div className="hero-ambient hero-ambient--violet" aria-hidden="true" />
        <div className="hero-ambient hero-ambient--cyan" aria-hidden="true" />
        <canvas ref={particlesCanvasRef} className="hero-particles" aria-hidden="true" />

        <header className={`site-header ${hasScrolled ? "site-header--scrolled" : ""}`}>
          <button className="brand-button" type="button" onClick={() => scrollToSection("top")} aria-label="Về đầu trang">
            <BrandMark />
          </button>

          <nav className="desktop-nav" aria-label="Điều hướng chính">
            {navItems.map((item) => (
              <button type="button" key={item.target} onClick={() => goTo(item.target)}>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="header-actions">
            <button className="button button--quiet desktop-action" type="button" onClick={() => goTo("contact")}>
              Trao đổi về dự án
            </button>
            <button className="button button--primary desktop-action" type="button" onClick={() => goTo("contact")}>
              Trao đổi về dự án <ArrowUpRight size={15} />
            </button>
            <button className="menu-button" type="button" aria-label="Mở menu" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={21} /> : <Menu size={22} />}
            </button>
          </div>
        </header>

        <div className={`mobile-menu ${isMenuOpen ? "mobile-menu--open" : ""}`}>
          {navItems.map((item) => (
            <button type="button" key={item.target} onClick={() => goTo(item.target)}>
              {item.label}<ChevronRight size={17} />
            </button>
          ))}
          <button className="button button--primary" type="button" onClick={() => goTo("contact")}>Trao đổi về dự án <ArrowUpRight size={15} /></button>
        </div>

        <div className="hero-symbol-wrap" aria-hidden="true">
          <div className="orbit-halo orbit-halo--outer" />
          <div className="orbit-halo orbit-halo--inner" />
          <img className="hero-symbol" src={logoUrl} alt="" />
          <span className="signal-node signal-node--one" />
          <span className="signal-node signal-node--two" />
        </div>

        <div className="hero-content">
          <div className="eyebrow"><span className="eyebrow-dot" /> Công ty công nghệ / B2B</div>
          <h1>From Business Challenges<br /><em>to Digital Solutions.</em></h1>
          <p>Sonora đồng hành cùng doanh nghiệp từ phân tích bài toán, xây dựng giải pháp đến phát triển và triển khai sản phẩm số thông qua một quy trình rõ ràng và minh bạch.</p>
          <div className="hero-actions">
            <button className="button button--primary button--large" type="button" onClick={() => goTo("contact")}>Trao đổi về dự án <ArrowDownRight size={18} /></button>
            <button className="button button--ghost button--large" type="button" onClick={() => goTo("solutions")}>Khám phá cách chúng tôi làm việc</button>
          </div>
        </div>

        <div className="hero-meta">
          <div className="availability"><span className="pulse-dot" /> Hệ thống đang hoạt động</div>
          <div className="social-rail" aria-label="Liên kết xã hội">
            <button type="button" aria-label="X" onClick={() => showPrototypeToast("X")}><X size={18} /></button>
            <button type="button" aria-label="Telegram" onClick={() => showPrototypeToast("Telegram")}><Send size={18} /></button>
            <button type="button" aria-label="Instagram" onClick={() => showPrototypeToast("Instagram")}><Instagram size={18} /></button>
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true"><span /> Cuộn để khám phá</div>
      </section>

      <LogoMarquee />

      <PortfolioShowcase />

      <section className="split-panel-section bg-about-philosophy" id="about">
        <div className="split-panel__container">

          {/* Left col — slides from left */}
          <motion.div
            className="split-panel__left"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <span className="split-panel__eyebrow">01 ABOUT SONORA</span>
            <h2 className="split-panel__headline">Technology starts with<br/>understanding.</h2>
            <p className="split-panel__intro">Sonora là một technology agency tại Việt Nam được xây dựng với một tư duy đơn giản:</p>
            <div className="split-panel__statement">Một sản phẩm tốt không bắt đầu<br/>từ việc viết code —<br/>mà bắt đầu từ việc <span className="headline-highlight">hiểu đúng vấn đề.</span></div>
            <p className="split-panel__supporting">Chúng tôi tiếp cận mỗi dự án từ bài toán kinh doanh, nhu cầu người dùng và mục tiêu vận hành trước khi đưa ra giải pháp công nghệ phù hợp.</p>
            <div className="split-panel__actions">
              <button className="button button--primary" type="button" onClick={() => showPrototypeToast("Trao đổi về dự án")}>Trao đổi về dự án <ArrowUpRight size={16} /></button>
              <button className="button button--ghost" type="button" onClick={() => scrollToSection("solutions")}>Xem cách làm việc</button>
            </div>
          </motion.div>

          {/* Right panel — slides from right */}
          <motion.div
            className="split-panel__right"
            variants={panelIn}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <div className="dark-browser-panel">
              <div className="panel-topbar">
                <div className="panel-dots"><i/><i/><i/></div>
                <div className="panel-title">About.Sonora</div>
              </div>
              <div className="panel-body">
                <div className="panel-intro">Core philosophy behind every project</div>
                <motion.div className="panel-list" variants={stagger} initial="hidden" whileInView="visible" viewport={VP}>
                  <motion.div className="panel-item" variants={staggerItem}>
                    <span className="panel-item-num">01</span>
                    <div className="panel-item-content"><strong>Understand first</strong><span>Hiểu bài toán kinh doanh trước khi nghĩ đến giải pháp</span></div>
                  </motion.div>
                  <motion.div className="panel-item" variants={staggerItem}>
                    <span className="panel-item-num">02</span>
                    <div className="panel-item-content"><strong>Define clearly</strong><span>Làm rõ mục tiêu, scope và vấn đề cần giải quyết</span></div>
                  </motion.div>
                  <motion.div className="panel-item" variants={staggerItem}>
                    <span className="panel-item-num">03</span>
                    <div className="panel-item-content"><strong>Build with structure</strong><span>Triển khai theo quy trình rõ ràng, có milestone và deliverable</span></div>
                  </motion.div>
                  <motion.div className="panel-item" variants={staggerItem}>
                    <span className="panel-item-num">04</span>
                    <div className="panel-item-content"><strong>Collaborate openly</strong><span>Trao đổi minh bạch trong suốt quá trình thực hiện</span></div>
                  </motion.div>
                </motion.div>
              </div>
              <div className="panel-footer">
                <div className="panel-footer-left"><i/> Sonora mindset</div>
                <div className="panel-footer-right">built on clarity</div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      <section className="workflow-section workflow-section--focus" id="solutions">
        <div className="workflow-backdrop" aria-hidden="true" />

        {/* Process intro — fade up */}
        <motion.div
          className="workflow-intro"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <div className="section-label"><span>03</span> Process</div>
          <h2>A clear process<br /><em>from idea to launch.</em></h2>
        </motion.div>

        <div className="workflow-line" aria-hidden="true"><span /><span /><span /><span /></div>

        {/* Each step staggers in individually as it enters viewport */}
        <div className="steps">
          {[
            ["Discovery", "Hiểu bài toán trước khi nghĩ đến giải pháp.", "Làm rõ mục tiêu, vấn đề, yêu cầu, phạm vi và các ràng buộc của dự án."],
            ["Analysis & Solution Design", "Biến yêu cầu thành một giải pháp có cấu trúc.", "Phân tích nghiệp vụ và xây dựng hướng giải pháp phù hợp với mục tiêu dự án."],
            ["Planning", "Biến giải pháp thành một kế hoạch có thể thực thi.", "Chia dự án thành milestone, timeline và deliverable rõ ràng."],
            ["UI/UX & Development", "Thiết kế và phát triển theo từng giai đoạn.", "Sản phẩm được xây dựng theo các vòng review để hai bên có thể kiểm soát tiến độ và phản hồi."],
            ["QA & Validation", "Kiểm tra trước khi sản phẩm đến tay người dùng.", "Testing, review và UAT dựa trên phạm vi đã thống nhất."],
            ["Deployment", "Đưa sản phẩm vào môi trường thực tế.", "Hệ thống được triển khai lên production sau khi hoàn thành các bước kiểm tra và nghiệm thu cần thiết."],
            ["Maintenance & Support", "Đồng hành sau khi bàn giao.", "Sonora hỗ trợ xử lý vấn đề, bảo trì và tối ưu theo phạm vi hợp tác."],
          ].map(([title, subtitle, text], index) => (
            <motion.article
              className="step"
              key={title as string}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: index * 0.08 }}
              viewport={VP_STEP}
            >
              <span>0{index + 1}</span>
              <h3>{title as string}</h3>
              <p><strong>{subtitle as string}</strong><br />{text as string}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="platform-section" id="platform">
        <div className="orbit-drawing" aria-hidden="true"><span /><span /><span /></div>

        {/* Section heading fades up */}
        <motion.div
          className="section-heading section-heading--split"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <div>
            <div className="section-label section-label--bright"><span>02</span> Services</div>
            <h2>What we can<br /><em>build together.</em></h2>
          </div>
          <p>Các năng lực được tổ chức theo từng lớp rõ ràng để doanh nghiệp dễ dàng hiểu chúng tôi làm gì, bắt đầu từ đâu và phối hợp như thế nào.</p>
        </motion.div>

        {/* Cards stagger in */}
        <div className="capability-layout">
          {capabilities.map((item, index) => (
            <motion.article
              className={item.className}
              key={item.code}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: index * 0.12 }}
              viewport={VP}
            >
              <div className="capability-visual" style={item.image ? { backgroundImage: `url(${item.image})` } : undefined}>
                {!item.image && <div className="node-system" aria-hidden="true"><i /><i /><i /><i /><b /></div>}
                <span className="card-index">0{index + 1}</span>
              </div>
              <div className="capability-content">
                <span className="capability-code">{item.code}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <div className="capability-bottom">
                  <div><strong>{item.stat}</strong><span>{item.statLabel}</span></div>
                  <button type="button" onClick={() => showPrototypeToast(item.code.split(" / ")[1])} aria-label={`Khám phá ${item.code}`}><ArrowUpRight size={18} /></button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="split-panel-section bg-why-contrast" id="why">
        <div className="split-panel__container">

          {/* Left col — slides from left */}
          <motion.div
            className="split-panel__left"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <span className="split-panel__eyebrow">04 WHY SONORA</span>
            <h2 className="split-panel__headline">Built differently<br />from the<br /><span className="headline-highlight">start.</span></h2>
            <p className="split-panel__supporting">Sonora ưu tiên cách phối hợp chuyên nghiệp: mục tiêu rõ, trách nhiệm rõ, cập nhật đều và bàn giao có cấu trúc. Đây là lớp nền để tạo dựng niềm tin từ lần làm việc đầu tiên.</p>
            <div className="split-panel__actions">
              <button className="button button--primary" type="button" onClick={() => showPrototypeToast("Trao đổi bài toán")}>Trao đổi bài toán <ArrowUpRight size={16} /></button>
              <button className="button button--ghost" type="button" onClick={() => scrollToSection("solutions")}>Xem cách làm việc</button>
            </div>
          </motion.div>

          {/* Right panel — slides from right */}
          <motion.div
            className="split-panel__right"
            variants={panelIn}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <div className="dark-browser-panel">
              <div className="panel-topbar">
                <div className="panel-dots"><i/><i/><i/></div>
                <div className="panel-title">why.sonora</div>
              </div>
              <div className="panel-body">
                <div className="panel-intro">Core values in every project</div>
                <motion.div className="panel-list" variants={stagger} initial="hidden" whileInView="visible" viewport={VP}>
                  <motion.div className="panel-item" variants={staggerItem}>
                    <span className="panel-item-num">01</span>
                    <div className="panel-item-content"><strong>Transparent</strong><span>Scope, milestone, deliverable rõ ràng</span></div>
                  </motion.div>
                  <motion.div className="panel-item" variants={staggerItem}>
                    <span className="panel-item-num">02</span>
                    <div className="panel-item-content"><strong>Business-first</strong><span>Hiểu mục tiêu trước khi chọn giải pháp</span></div>
                  </motion.div>
                  <motion.div className="panel-item" variants={staggerItem}>
                    <span className="panel-item-num">03</span>
                    <div className="panel-item-content"><strong>Scalable</strong><span>Kiến trúc linh hoạt cho tương lai</span></div>
                  </motion.div>
                  <motion.div className="panel-item" variants={staggerItem}>
                    <span className="panel-item-num">04</span>
                    <div className="panel-item-content"><strong>Communication</strong><span>Trao đổi minh bạch và chủ động</span></div>
                  </motion.div>
                </motion.div>
              </div>
              <div className="panel-footer">
                <div className="panel-footer-left"><i/> nguyên tắc làm việc</div>
                <div className="panel-footer-right">trust by design</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="final-cta" id="contact">
        <div className="final-cta-glow" aria-hidden="true" />
        <div className="final-cta-orbit" aria-hidden="true" />
        <motion.div
          className="final-cta-content"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <div className="brand-stamp"><Sparkles size={17} /> SONORA / IT PARTNER</div>
          <h2>Have an idea?<br /><em>Let’s turn it into something real.</em></h2>
          <button className="button button--light button--large" type="button" onClick={() => showPrototypeToast("Trao đổi với Sonora")}>Trao đổi với Sonora <ArrowUpRight size={18} /></button>
        </motion.div>
      </section>

      <motion.footer
        className="site-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <BrandMark inverse />
        <p>Technology built around your business.</p>
        <div className="footer-links"><button type="button" onClick={() => scrollToSection("top")}>Lên đầu trang</button><span>© 2026 SONORA</span></div>
      </motion.footer>
    </main>
  );
}
