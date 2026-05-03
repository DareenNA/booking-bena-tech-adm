import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedSection = ({ children, className = '', type = 'fade-up', stagger = false }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    
    if (type === 'fade-up') {
      gsap.fromTo(el, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    } else if (type === 'stagger') {
      const childrenElements = el.children;
      gsap.fromTo(childrenElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, [type]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};

export default AnimatedSection;
