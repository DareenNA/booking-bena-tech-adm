import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 's0',
    tag: '01 — Web Architecture',
    name: 'WEB DEVELOPMENT',
    captionName: 'WEB DEVELOPMENT',
    desc: 'Websites built to perform and endure. Clean, fast, and optimized for conversion and enterprise scalability.',
    img: '/assets/benatech_web_1200x600.png',
    faceIdx: 0,
    faceName: 'top',
    align: 'left',
    features: [
      { title: 'Informational Platforms', desc: 'Clean, lightning-fast sites optimized for discovery and conversion.' },
      { title: 'E-Commerce Infrastructure', desc: 'Custom online stores with seamless payment routing and inventory sync.' },
      { title: 'Advanced Architecture', desc: 'Bespoke web applications built with modern React, Vite, and Cloudflare.' }
    ]
  },
  {
    id: 's1',
    tag: '02 — Automation Systems',
    name: 'BUSINESS AUTOMATION',
    captionName: 'BUSINESS AUTOMATION',
    desc: 'Eliminate repetition and manual tasks. We connect your software stack to streamline operations and unlock growth.',
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
    tag: '03 — Mobile Ecosystems',
    name: 'MOBILE SYSTEMS',
    captionName: 'MOBILE SYSTEMS',
    desc: 'Native mobile experiences people actually love to use, coupled with robust admin management portals.',
    img: '/assets/benatech_mobile_1200x600.png',
    faceIdx: 2,
    faceName: 'right',
    align: 'left',
    features: [
      { title: 'Progressive Web Apps (PWA)', desc: 'Fast, offline-ready web apps accessible on all devices.' },
      { title: 'Native iOS & Android', desc: 'High-performance mobile applications with custom UI and push notifications.' },
      { title: 'Unified Ecosystems', desc: 'Mobile frontends seamlessly backed by cloud APIs and Supabase databases.' }
    ]
  },
  {
    id: 's3',
    tag: '04 — Enterprise ERP',
    name: 'ERP SYSTEMS',
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
    tag: '05 — Artificial Intelligence',
    name: 'AI SOLUTIONS',
    captionName: 'AI SOLUTIONS',
    desc: 'Harness cutting-edge generative AI, custom LLM integrations, and automated intelligent agents to transform your productivity.',
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
    tag: '06 — Cyber Defense & Compliance',
    name: 'SECURITY AWARENESS',
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

const ExpandableFeature = ({ title, desc }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.9rem 0', cursor: 'pointer' }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: isOpen ? 'var(--primary-orange)' : '#fff', transition: 'color 0.3s' }}>
          {title}
        </h4>
        {isOpen ? <Minus size={16} className="text-orange" /> : <Plus size={16} style={{ color: 'var(--text-grey)' }} />}
      </div>
      {isOpen && (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-grey)', marginTop: '0.5rem', lineHeight: 1.5 }}>
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
          {SERVICES_DATA.map((srv) => (
            <div key={srv.id} className="face" data-face={srv.faceName}>
              <img src={srv.img} alt={srv.name} />
              <span className="face-ph">{srv.name}</span>
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
              <div className="h-line"></div>
              <div className="tag">{srv.tag}</div>
              <h2>{srv.name}</h2>
              <p className="body-text">{srv.desc}</p>

              <div style={{ marginTop: '1.5rem' }}>
                {srv.features.map((ft, idx) => (
                  <ExpandableFeature key={idx} title={ft.title} desc={ft.desc} />
                ))}
              </div>

              <div className="cta-row">
                {i > 0 && (
                  <button className="cta-back-cube" onClick={() => scrollToSection(i - 1)}>
                    <ArrowLeft size={14} /> Back
                  </button>
                )}
                
                {i < SERVICES_DATA.length - 1 ? (
                  <button className="cta-cube" onClick={() => scrollToSection(i + 1)}>
                    Turn <ArrowRight size={14} />
                  </button>
                ) : (
                  <button className="cta-cube" onClick={() => scrollToSection(0)}>
                    Restart <ArrowRight size={14} />
                  </button>
                )}

                <Link to="/booking" className="cta-cube" style={{ background: 'var(--primary-orange)', color: '#000' }}>
                  Book Meeting
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
