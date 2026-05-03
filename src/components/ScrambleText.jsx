import { useState, useEffect, useRef } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:\'",.<>/?';

const ScrambleText = ({ text, className = '' }) => {
  const [displayText, setDisplayText] = useState(text);
  const isHovered = useRef(false);
  const frameRef = useRef(null);
  const iterationRef = useRef(0);

  const startScramble = () => {
    isHovered.current = true;
    iterationRef.current = 0;
    cancelAnimationFrame(frameRef.current);
    scramble();
  };

  const stopScramble = () => {
    isHovered.current = false;
    // Let it resolve naturally
  };

  const scramble = () => {
    if (!isHovered.current && iterationRef.current >= text.length) {
      setDisplayText(text);
      return;
    }

    setDisplayText(prev => {
      return text.split('').map((char, index) => {
        if (char === ' ') return ' ';
        if (index < iterationRef.current) {
          return text[index];
        }
        return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
      }).join('');
    });

    if (iterationRef.current < text.length) {
      iterationRef.current += 1/3; // Speed of resolving
    }

    frameRef.current = requestAnimationFrame(scramble);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <span 
      className={className} 
      onMouseEnter={startScramble} 
      onMouseLeave={stopScramble}
      style={{ display: 'inline-block' }}
    >
      {displayText}
    </span>
  );
};

export default ScrambleText;
