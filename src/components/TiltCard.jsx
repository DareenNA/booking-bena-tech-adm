import Tilt from 'react-parallax-tilt';

const TiltCard = ({ children, className = '' }) => {
  return (
    <Tilt 
      tiltMaxAngleX={5} 
      tiltMaxAngleY={5} 
      perspective={1000} 
      transitionSpeed={1000} 
      scale={1.02}
      className={className}
      glareEnable={true}
      glareMaxOpacity={0.05}
      glarePosition="all"
    >
      {children}
    </Tilt>
  );
};

export default TiltCard;
