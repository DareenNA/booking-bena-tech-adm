import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, name: "Fintech Interface", tag: "Web Architecture", desc: "High-performance financial data visualization.", image: "/assets/hero_3d.png" },
  { id: 2, name: "Retail Experience", tag: "Mobile Ecosystem", desc: "Seamless shopping experience for a major retailer.", image: "/assets/bento_1.png" },
  { id: 3, name: "Logistics Core", tag: "Business Automation", desc: "Automating fleet management and delivery tracking.", image: "/assets/bento_2.png" },
  { id: 4, name: "Real Estate System", tag: "Web Architecture", desc: "Property listing and management system.", image: "/assets/hero_3d.png" },
];

const Portfolio = () => {
  useEffect(() => {
    gsap.fromTo('.reveal-up', 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <div style={{ paddingTop: '150px', paddingBottom: '10rem', minHeight: '100vh' }}>
      <div className="ambient-light"></div>
      
      <div className="container">
        <div className="reveal-up" style={{ marginBottom: '6rem' }}>
          <h1 className="display-1" style={{ marginBottom: '1.5rem' }}>Our Work</h1>
          <p className="text-grey" style={{ fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.6 }}>
            A selection of digital foundations we've architected for our partners.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="bento-grid reveal-up">
          {projects.map((project, idx) => {
            // Mix of full width and half width spans
            let spanClass = "span 12"; // Default
            if (idx === 0) spanClass = "span 12";
            else if (idx === 1 || idx === 2) spanClass = "span 6";
            else if (idx === 3) spanClass = "span 12";

            return (
              <div key={project.id} className="bento-card portfolio-item" style={{ gridColumn: spanClass, padding: 0, height: idx === 0 || idx === 3 ? '600px' : '450px' }}>
                
                <div className="bento-image-wrap">
                  <img src={project.image} alt={project.name} style={{ opacity: 0.8 }} />
                </div>

                <div className="portfolio-overlay" style={{
                  position: 'relative',
                  zIndex: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '3rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <span style={{ 
                        display: 'inline-block', color: 'var(--primary-orange)',
                        fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem'
                      }}>
                        {project.tag}
                      </span>
                      <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--text-white)' }}>{project.name}</h3>
                      <p className="portfolio-desc" style={{ 
                        fontSize: '1.1rem', color: 'var(--text-grey)', 
                        maxHeight: '0', overflow: 'hidden', opacity: 0, transition: 'all 0.4s ease'
                      }}>
                        {project.desc}
                      </p>
                    </div>
                    
                    <div className="portfolio-icon" style={{ opacity: 0, transform: 'translateY(10px)', transition: 'all 0.4s ease' }}>
                      <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--text-white)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowUpRight size={24} color="#000" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .portfolio-item:hover .portfolio-desc { max-height: 100px; opacity: 1; margin-top: 1rem; }
        .portfolio-item:hover .portfolio-icon { opacity: 1; transform: translateY(0); }
      `}</style>
    </div>
  );
};

export default Portfolio;
