import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, ArrowRight, ArrowLeft, Calendar } from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 's0',
    num: '01',
    tag: 'Web Architecture',
    name: 'Web Development',
    captionName: 'WEB DEVELOPMENT',
    desc: 'Websites built to perform and endure. Clean, fast, and optimized for conversion and enterprise scalability.',
    img: '/assets/benatech_web_1200x600.png',
    faceIdx: 0,
    faceName: 'top',
    align: 'left',
    features: [
      { title: 'Informational Platforms', desc: 'Clean, lightning-fast sites optimized for discovery, conversion, and global reach.' },
      { title: 'E-Commerce Infrastructure', desc: 'Custom online stores with seamless payment routing, checkout UX, and inventory sync.' },
      { title: 'Advanced Architecture', desc: 'Bespoke web applications built with modern React, Vite, and Cloudflare edge engines.' }
    ]
  },
  {
    id: 's1',
    num: '02',
    tag: 'Automation Systems',
    name: 'Business Automation',
    captionName: 'BUSINESS AUTOMATION',
    desc: 'Eliminate repetitive manual work. We connect your software stack to streamline operations and unlock growth.',
    img: '/assets/benatech_automation_1200x600.png',
    faceIdx: 1,
    faceName: 'front',
    align: 'right',
    features: [
      { title: 'Workflow Integration', desc: 'Connecting APIs, CRM platforms, and databases to automate data entry.' },
      { title: 'Data Pipelines', desc: 'Real-time reporting, automated emails, and lead processing triggers.' },
      { title: 'Enterprise Automation', desc: 'End-to-end process overhauls reducing operational overhead by up to 80%.' }
    ]
  },
  {
    id: 's2',
    num: '03',
    tag: 'Mobile Ecosystems',
    name: 'Mobile Systems',
    captionName: 'MOBILE SYSTEMS',
    desc: 'Native mobile experiences people actually love to use, coupled with robust admin management portals.',
    img: '/assets/benatech_mobile_1200x600.png',
    faceIdx: 2,
    faceName: 'right',
    align: 'left',
    features: [
      { title: 'Progressive Web Apps (PWA)', desc: 'Fast, offline-ready web apps accessible on all devices without store friction.' },
      { title: 'Native iOS & Android', desc: 'High-performance mobile applications with custom UI and push notifications.' },
      { title: 'Unified Ecosystems', desc: 'Mobile frontends seamlessly backed by cloud APIs and Supabase databases.' }
    ]
  },
  {
    id: 's3',
    num: '04',
    tag: 'Enterprise ERP',
    name: 'ERP Systems',
    captionName: 'ENTERPRISE RESOURCE PLANNING',
    desc: 'Tailored enterprise platforms connecting finance, inventory, HR, and client operations into a single source of truth.',
    img: '/assets/benatech_erp_1200x600.png',
    faceIdx: 3,
    faceName: 'back',
    align: 'right',
    features: [
      { title: 'ERP Implementation', desc: 'Customizing platforms like Odoo, ERPNext, or SAP to your exact business flows.' },
      { title: 'Custom Module Development', desc: 'Building specialized trackers, inventory engines, and reporting dashboards.' },
      { title: 'Data Migration & Integrity', desc: 'Secure database migration with zero downtime and schema validation.' }
    ]
  },
  {
    id: 's4',
    num: '05',
    tag: 'Artificial Intelligence',
    name: 'AI Solutions',
    captionName: 'AI SOLUTIONS',
    desc: 'Harness cutting-edge generative AI, custom LLM integrations, and automated intelligent agents to transform productivity.',
    img: '/assets/benatech_ai_1200x600.png',
    faceIdx: 4,
    faceName: 'left',
    align: 'left',
    features: [
      { title: 'Custom AI Agents & Copilots', desc: 'Deploy intelligent assistants trained on your proprietary enterprise knowledge.' },
      { title: 'LLM & API Integrations', desc: 'Embed Gemini, OpenAI, or local models directly into your business software.' },
      { title: 'Predictive Analytics', desc: 'Automate data insights, customer sentiment tracking, and decision pipelines.' }
    ]
  },
  {
    id: 's5',
    num: '06',
    tag: 'Cyber Defense & Compliance',
    name: 'Security Awareness',
    captionName: 'ANNUAL SECURITY AWARENESS PROGRAM',
    desc: 'Comprehensive annual security awareness programs to train your workforce, simulate phishing threats, and maintain compliance.',
    img: '/assets/benatech_security_1200x600.png',
    faceIdx: 5,
    faceName: 'bottom',
    align: 'right',
    features: [
      { title: 'Phishing Simulations', desc: 'Real-world simulated attack campaigns to test and improve staff vigilance.' },
      { title: 'Interactive Training Modules', desc: 'Engaging cyber security micro-courses covering passwords, data leakage, and social engineering.' },
      { title: 'Executive Audit & Reporting', desc: 'Detailed compliance metrics and risk assessment reports for stakeholders.' }
    ]
  }
];

const STOPS = [
  { rx: 90, ry: 0 },    // Top face
  { rx: 0, ry: 0 },     // Front face
  { rx: 0, ry: -90 },   // Right face
  { rx: 0, ry: -180 },  // Back face
  { rx: 0, ry: -270 },  // Left face
  { rx: -90, ry: -360 } // Bottom face
];

const easeIO = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

const FeatureTextItem = ({ title, desc }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="feature-item" onClick={() => setIsOpen(!isOpen)}>
      <div className="feature-item-header">
        <div className="feature-item-title">
          <span className="bullet"></span>
          <span>{title}</span>
        </div>
        {isOpen ? <Minus size={15} className="text-orange" /> : <Plus size={15} style={{ color: 'var(--text-grey)' }} />}
      </div>
      {isOpen && (
        <p className="feature-item-desc">
          {desc}
        </p>
      )}
    </div>
  );
};

const Services = () => {
  const cubeRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progressPct, setProgressPct] = useState(0);

  useEffect(() => {
    let animId;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.max(0, Math.min(1, scrollY / maxScroll));

      setProgressPct(Math.round(ratio * 100));

      const N = SERVICES_DATA.length;
      const t = ratio * (N - 1);
      const i = Math.min(Math.floor(t), N - 2);
      const f = easeIO(t - i);

      const activeIndex = Math.min(N - 1, Math.round(t));
      setCurrentIdx(activeIndex);

      if (cubeRef.current && STOPS[i] && STOPS[i + 1]) {
        const a = STOPS[i];
        const b = STOPS[i + 1];
        const rx = a.rx + (b.rx - a.rx) * f;
        const ry = a.ry + (b.ry - a.ry) * f;
        cubeRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const scrollToSection = (idx) => {
    const el = document.getElementById(`s${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeService = SERVICES_DATA[currentIdx] || SERVICES_DATA[0];

  return (
    <div style={{ position: 'relative', background: '#050507' }}>
      
      {/* 3D Cube Canvas Background Scene */}
      <div id="cube_scene">
        <div id="cube" ref={cubeRef}>
          {SERVICES_DATA.map((srv, i) => (
            <div key={srv.id} className="face" data-face={srv.faceName}>
              <div className="face-img-wrap">
                <img src={srv.img} alt={srv.name} />
              </div>
              <div className="face-overlay"></div>
              <div className="face-title-badge">
                <span className="face-ph">{srv.name}</span>
                <span className="face-num-badge">0{i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed HUD Top Right */}
      <div id="cube_hud">
        <div>{String(progressPct).padStart(3, '0')}%</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPct}%` }}></div>
        </div>
        <div className="scene-label">{activeService.name}</div>
      </div>

      {/* Side Navigation Dots */}
      <div id="scene_strip">
        {SERVICES_DATA.map((srv, i) => (
          <span
            key={srv.id}
            className={`scene-dot ${i === currentIdx ? 'active' : ''}`}
            onClick={() => scrollToSection(i)}
            title={srv.name}
          />
        ))}
      </div>

      {/* Floating Bottom Caption */}
      <div id="face_caption">
        <div id="face_caption_num">0{currentIdx + 1} / 06</div>
        <div id="face_caption_name">{activeService.captionName}</div>
      </div>

      {/* Scroll Sections Container */}
      <div id="cube_scroll_container">
        {SERVICES_DATA.map((srv, i) => (
          <section key={srv.id} id={srv.id}>
            <div className={`text-card ${srv.align === 'right' ? 'right' : srv.align === 'center' ? 'center' : ''}`}>
              
              <div className="tag-badge">
                <span className="tag-badge-dot"></span>
                <span>{srv.num} — {srv.tag}</span>
              </div>

              <h2>{srv.name}</h2>
              <p className="body-text">{srv.desc}</p>

              <div className="feature-list">
                {srv.features.map((ft, idx) => (
                  <FeatureTextItem key={idx} title={ft.title} desc={ft.desc} />
                ))}
              </div>

              <div className="cta-row">
                {i > 0 && (
                  <button className="cta-secondary-btn" onClick={() => scrollToSection(i - 1)}>
                    <ArrowLeft size={15} /> Back
                  </button>
                )}
                
                {i < SERVICES_DATA.length - 1 ? (
                  <button className="cta-secondary-btn" onClick={() => scrollToSection(i + 1)}>
                    Turn <ArrowRight size={15} />
                  </button>
                ) : (
                  <button className="cta-secondary-btn" onClick={() => scrollToSection(0)}>
                    Restart <ArrowRight size={15} />
                  </button>
                )}

                <Link to="/booking" className="cta-primary-btn">
                  <Calendar size={15} /> Book Meeting
                </Link>
              </div>

            </div>
          </section>
        ))}
      </div>

    </div>
  );
};

export default Services;
