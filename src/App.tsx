import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import './App.css';

// Mouse follower hook
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  
  return mousePosition;
};

// SVG Components for decorative elements
const OmSymbol = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50,5 C35,5 25,15 25,30 C25,45 35,50 45,50 C40,55 30,55 25,50 C20,45 15,50 15,60 C15,75 30,85 50,85 C70,85 85,75 85,55 C85,40 75,35 65,35 C70,30 75,25 75,20 C75,12 68,8 60,10 C55,11 52,15 50,20 M50,20 C48,15 45,11 40,10 C32,8 25,12 25,20 C25,25 30,30 35,35 M75,55 C75,65 65,75 50,75 C35,75 25,65 25,55 M85,25 C90,25 95,30 95,35 C95,40 90,45 85,45 C80,45 75,40 75,35 C75,30 80,25 85,25" 
      strokeWidth="2" 
      stroke="currentColor" 
      fill="none"
    />
  </svg>
);

const FloralCorner = ({ className = "", flip = false }: { className?: string; flip?: boolean }) => (
  <svg 
    viewBox="0 0 150 150" 
    className={className}
    style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
  >
    {/* Main flower */}
    <g fill="currentColor" opacity="0.8">
      {/* Petals */}
      <ellipse cx="30" cy="30" rx="12" ry="20" transform="rotate(-45 30 30)" />
      <ellipse cx="30" cy="30" rx="12" ry="20" transform="rotate(0 30 30)" />
      <ellipse cx="30" cy="30" rx="12" ry="20" transform="rotate(45 30 30)" />
      <ellipse cx="30" cy="30" rx="12" ry="20" transform="rotate(90 30 30)" />
      {/* Center */}
      <circle cx="30" cy="30" r="6" opacity="0.6" />
    </g>
    {/* Leaves and stems */}
    <path 
      d="M45,45 Q70,50 90,80 M50,50 Q60,70 65,100 M35,50 Q50,80 40,120" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none" 
      opacity="0.6"
    />
    {/* Small buds */}
    <circle cx="90" cy="80" r="5" fill="currentColor" opacity="0.5" />
    <circle cx="65" cy="100" r="4" fill="currentColor" opacity="0.4" />
    <circle cx="40" cy="120" r="6" fill="currentColor" opacity="0.5" />
    {/* Leaves */}
    <ellipse cx="70" cy="60" rx="8" ry="4" transform="rotate(30 70 60)" fill="currentColor" opacity="0.3" />
    <ellipse cx="55" cy="85" rx="10" ry="4" transform="rotate(60 55 85)" fill="currentColor" opacity="0.3" />
  </svg>
);

// Extended floral corner with more flowers
const FloralCornerLarge = ({ className = "", flip = false }: { className?: string; flip?: boolean }) => (
  <svg 
    viewBox="0 0 200 200" 
    className={className}
    style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
  >
    {/* Main large flower */}
    <g fill="currentColor" opacity="0.9">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse key={angle} cx="35" cy="35" rx="10" ry="22" transform={`rotate(${angle} 35 35)`} />
      ))}
      <circle cx="35" cy="35" r="8" fill="#C5A065" opacity="0.8" />
    </g>
    
    {/* Secondary flower */}
    <g fill="currentColor" opacity="0.7">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse key={angle} cx="85" cy="55" rx="6" ry="14" transform={`rotate(${angle} 85 55)`} />
      ))}
      <circle cx="85" cy="55" r="5" fill="#C5A065" opacity="0.6" />
    </g>
    
    {/* Third flower */}
    <g fill="currentColor" opacity="0.6">
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={angle} cx="55" cy="95" rx="5" ry="12" transform={`rotate(${angle} 55 95)`} />
      ))}
      <circle cx="55" cy="95" r="4" fill="#C5A065" opacity="0.5" />
    </g>
    
    {/* Stems and vines */}
    <path 
      d="M50,50 Q80,70 110,100 Q140,130 160,170 M60,60 Q75,90 85,130 Q95,160 90,190 M40,55 Q55,85 50,120 Q45,155 55,185" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      fill="none" 
      opacity="0.4"
    />
    
    {/* Buds along stems */}
    <circle cx="110" cy="100" r="4" fill="currentColor" opacity="0.5" />
    <circle cx="130" cy="130" r="5" fill="currentColor" opacity="0.4" />
    <circle cx="150" cy="160" r="6" fill="currentColor" opacity="0.5" />
    <circle cx="85" cy="130" r="4" fill="currentColor" opacity="0.4" />
    <circle cx="50" cy="120" r="5" fill="currentColor" opacity="0.5" />
    
    {/* Leaves */}
    <ellipse cx="95" cy="80" rx="12" ry="5" transform="rotate(35 95 80)" fill="#4A5D45" opacity="0.3" />
    <ellipse cx="70" cy="110" rx="10" ry="4" transform="rotate(55 70 110)" fill="#4A5D45" opacity="0.25" />
    <ellipse cx="120" cy="115" rx="11" ry="4" transform="rotate(25 120 115)" fill="#4A5D45" opacity="0.3" />
  </svg>
);

const LotusFlower = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 60" className={className} fill="currentColor">
    {/* Center petals */}
    <ellipse cx="50" cy="45" rx="8" ry="25" opacity="0.9" />
    <ellipse cx="50" cy="45" rx="8" ry="25" transform="rotate(-15 50 45)" opacity="0.8" />
    <ellipse cx="50" cy="45" rx="8" ry="25" transform="rotate(15 50 45)" opacity="0.8" />
    {/* Side petals */}
    <ellipse cx="50" cy="45" rx="7" ry="22" transform="rotate(-35 50 45)" opacity="0.6" />
    <ellipse cx="50" cy="45" rx="7" ry="22" transform="rotate(35 50 45)" opacity="0.6" />
    <ellipse cx="50" cy="45" rx="6" ry="18" transform="rotate(-55 50 45)" opacity="0.4" />
    <ellipse cx="50" cy="45" rx="6" ry="18" transform="rotate(55 50 45)" opacity="0.4" />
  </svg>
);

// Mouse-following lotus
const MouseLotus = ({ mouseX, mouseY, delay = 0, offset = { x: 0, y: 0 }, size = 30 }: {
  mouseX: number;
  mouseY: number;
  delay?: number;
  offset?: { x: number; y: number };
  size?: number;
}) => (
  <motion.div
    className="fixed pointer-events-none z-40 hidden md:block"
    animate={{
      x: mouseX + offset.x - size / 2,
      y: mouseY + offset.y - size / 2,
    }}
    transition={{
      type: "spring",
      stiffness: 150 - delay * 30,
      damping: 15 + delay * 2,
      mass: 0.5 + delay * 0.2
    }}
  >
    <svg viewBox="0 0 100 60" style={{ width: size, height: size * 0.6 }} className="text-wedding-pink">
      <ellipse cx="50" cy="45" rx="8" ry="25" fill="currentColor" opacity={0.5 - delay * 0.1} />
      <ellipse cx="50" cy="45" rx="8" ry="25" transform="rotate(-15 50 45)" fill="currentColor" opacity={0.4 - delay * 0.08} />
      <ellipse cx="50" cy="45" rx="8" ry="25" transform="rotate(15 50 45)" fill="currentColor" opacity={0.4 - delay * 0.08} />
      <ellipse cx="50" cy="45" rx="7" ry="22" transform="rotate(-35 50 45)" fill="currentColor" opacity={0.3 - delay * 0.05} />
      <ellipse cx="50" cy="45" rx="7" ry="22" transform="rotate(35 50 45)" fill="currentColor" opacity={0.3 - delay * 0.05} />
    </svg>
  </motion.div>
);

// Floating petal with mouse repel effect
const FloatingPetal = ({ delay = 0, duration = 10, startX = 0, color = "#E8B4B8", size = "normal" }: { 
  delay?: number; 
  duration?: number; 
  startX?: number;
  color?: string;
  size?: "small" | "normal" | "large";
}) => {
  const sizeClasses = {
    small: "w-2 h-2 sm:w-3 sm:h-3",
    normal: "w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5",
    large: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
  };
  
  return (
    <motion.div
      className={`absolute ${sizeClasses[size]}`}
      initial={{ x: startX, y: -20, rotate: 0, opacity: 0 }}
      animate={{ 
        x: [startX, startX + 40, startX - 30, startX + 20, startX - 10],
        y: [-20, 150, 350, 550, 800],
        rotate: [0, 90, 180, 270, 360],
        opacity: [0, 0.7, 0.7, 0.5, 0]
      }}
      transition={{ 
        duration, 
        delay, 
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <svg viewBox="0 0 20 20" className="w-full h-full" style={{ color }}>
        <ellipse cx="10" cy="10" rx="4" ry="8" fill="currentColor" />
      </svg>
    </motion.div>
  );
};

// Floating full flower
const FloatingFlower = ({ delay = 0, duration = 15, startX = 0, color = "#E8B4B8" }: { 
  delay?: number; 
  duration?: number; 
  startX?: number;
  color?: string;
}) => (
  <motion.div
    className="absolute w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
    initial={{ x: startX, y: -30, rotate: 0, opacity: 0 }}
    animate={{ 
      x: [startX, startX + 50, startX - 40, startX + 30],
      y: [-30, 200, 450, 700],
      rotate: [0, 45, 90, 135],
      opacity: [0, 0.5, 0.5, 0]
    }}
    transition={{ 
      duration, 
      delay, 
      repeat: Infinity,
      ease: "linear"
    }}
  >
    <svg viewBox="0 0 80 80" className="w-full h-full">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="40"
          cy="40"
          rx="5"
          ry="15"
          fill={color}
          opacity="0.7"
          transform={`rotate(${angle} 40 40)`}
        />
      ))}
      <circle cx="40" cy="40" r="6" fill="#C5A065" opacity="0.8" />
    </svg>
  </motion.div>
);

// Swaying flower that stays in place but gently moves
const SwayingFlower = ({ className = "", color = "#E8B4B8", delay = 0 }: { 
  className?: string; 
  color?: string;
  delay?: number;
}) => (
  <motion.div
    className={className}
    animate={{ 
      rotate: [-5, 5, -5],
      scale: [1, 1.05, 1]
    }}
    transition={{ 
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <svg viewBox="0 0 80 80" className="w-full h-full">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="40"
          cy="40"
          rx="6"
          ry="18"
          fill={color}
          opacity="0.7"
          transform={`rotate(${angle} 40 40)`}
        />
      ))}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
        <ellipse
          key={angle}
          cx="40"
          cy="40"
          rx="4"
          ry="12"
          fill={color}
          opacity="0.9"
          transform={`rotate(${angle} 40 40)`}
        />
      ))}
      <circle cx="40" cy="40" r="8" fill="#C5A065" opacity="0.8" />
      <circle cx="40" cy="40" r="4" fill="#D4AF37" />
    </svg>
  </motion.div>
);

// Small blossom for scattered decoration
const SmallBlossom = ({ className = "", color = "#E8B4B8" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 40 40" className={className}>
    {[0, 72, 144, 216, 288].map((angle) => (
      <ellipse
        key={angle}
        cx="20"
        cy="20"
        rx="4"
        ry="10"
        fill={color}
        opacity="0.7"
        transform={`rotate(${angle} 20 20)`}
      />
    ))}
    <circle cx="20" cy="20" r="4" fill="#C5A065" opacity="0.8" />
  </svg>
);

// Floral vine/garland - now with more flowers and leaves
const FloralVine = ({ className = "", flip = false }: { className?: string; flip?: boolean }) => (
  <svg 
    viewBox="0 0 80 500" 
    className={className}
    style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
  >
    {/* Main vine */}
    <path 
      d="M40,0 Q25,60 45,120 Q65,180 35,240 Q15,300 50,360 Q70,420 40,500" 
      stroke="#4A5D45" 
      strokeWidth="2.5" 
      fill="none"
      opacity="0.5"
    />
    
    {/* Secondary vine */}
    <path 
      d="M35,20 Q55,80 30,140 Q10,200 45,260 Q75,320 35,380 Q5,440 45,500" 
      stroke="#4A5D45" 
      strokeWidth="1.5" 
      fill="none"
      opacity="0.35"
    />
    
    {/* Flowers along vine - 8 flowers now */}
    <g>
      {/* Flower 1 */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={`f1-${angle}`} cx="42" cy="50" rx="4" ry="10" fill="#E8B4B8" opacity="0.7" transform={`rotate(${angle} 42 50)`} />
      ))}
      <circle cx="42" cy="50" r="4" fill="#C5A065" />
      
      {/* Flower 2 */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={`f2-${angle}`} cx="28" cy="110" rx="5" ry="12" fill="#E8B4B8" opacity="0.65" transform={`rotate(${angle} 28 110)`} />
      ))}
      <circle cx="28" cy="110" r="5" fill="#C5A065" />
      
      {/* Flower 3 */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse key={`f3-${angle}`} cx="55" cy="170" rx="4" ry="10" fill="#C5A065" opacity="0.5" transform={`rotate(${angle} 55 170)`} />
      ))}
      <circle cx="55" cy="170" r="4" fill="#D4AF37" />
      
      {/* Flower 4 */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={`f4-${angle}`} cx="22" cy="230" rx="5" ry="12" fill="#E8B4B8" opacity="0.7" transform={`rotate(${angle} 22 230)`} />
      ))}
      <circle cx="22" cy="230" r="5" fill="#C5A065" />
      
      {/* Flower 5 */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={`f5-${angle}`} cx="50" cy="290" rx="4" ry="9" fill="#F5D5D8" opacity="0.6" transform={`rotate(${angle} 50 290)`} />
      ))}
      <circle cx="50" cy="290" r="4" fill="#C5A065" />
      
      {/* Flower 6 */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse key={`f6-${angle}`} cx="25" cy="350" rx="5" ry="11" fill="#E8B4B8" opacity="0.65" transform={`rotate(${angle} 25 350)`} />
      ))}
      <circle cx="25" cy="350" r="5" fill="#C5A065" />
      
      {/* Flower 7 */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={`f7-${angle}`} cx="58" cy="410" rx="4" ry="10" fill="#C5A065" opacity="0.55" transform={`rotate(${angle} 58 410)`} />
      ))}
      <circle cx="58" cy="410" r="4" fill="#D4AF37" />
      
      {/* Flower 8 */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={`f8-${angle}`} cx="35" cy="470" rx="5" ry="11" fill="#E8B4B8" opacity="0.7" transform={`rotate(${angle} 35 470)`} />
      ))}
      <circle cx="35" cy="470" r="5" fill="#C5A065" />
    </g>
    
    {/* Many more leaves */}
    <ellipse cx="20" cy="25" rx="10" ry="5" fill="#4A5D45" opacity="0.45" transform="rotate(-35 20 25)" />
    <ellipse cx="60" cy="70" rx="11" ry="5" fill="#4A5D45" opacity="0.4" transform="rotate(30 60 70)" />
    <ellipse cx="15" cy="90" rx="9" ry="4" fill="#4A5D45" opacity="0.4" transform="rotate(-25 15 90)" />
    <ellipse cx="55" cy="130" rx="10" ry="5" fill="#4A5D45" opacity="0.45" transform="rotate(35 55 130)" />
    <ellipse cx="18" cy="155" rx="9" ry="4" fill="#4A5D45" opacity="0.4" transform="rotate(-30 18 155)" />
    <ellipse cx="65" cy="200" rx="11" ry="5" fill="#4A5D45" opacity="0.45" transform="rotate(25 65 200)" />
    <ellipse cx="12" cy="215" rx="10" ry="4" fill="#4A5D45" opacity="0.4" transform="rotate(-35 12 215)" />
    <ellipse cx="58" cy="260" rx="9" ry="5" fill="#4A5D45" opacity="0.4" transform="rotate(30 58 260)" />
    <ellipse cx="15" cy="285" rx="10" ry="4" fill="#4A5D45" opacity="0.45" transform="rotate(-25 15 285)" />
    <ellipse cx="62" cy="320" rx="11" ry="5" fill="#4A5D45" opacity="0.4" transform="rotate(35 62 320)" />
    <ellipse cx="18" cy="370" rx="9" ry="4" fill="#4A5D45" opacity="0.45" transform="rotate(-30 18 370)" />
    <ellipse cx="60" cy="390" rx="10" ry="5" fill="#4A5D45" opacity="0.4" transform="rotate(25 60 390)" />
    <ellipse cx="20" cy="430" rx="11" ry="4" fill="#4A5D45" opacity="0.45" transform="rotate(-35 20 430)" />
    <ellipse cx="55" cy="455" rx="9" ry="5" fill="#4A5D45" opacity="0.4" transform="rotate(30 55 455)" />
    <ellipse cx="22" cy="490" rx="10" ry="4" fill="#4A5D45" opacity="0.45" transform="rotate(-25 22 490)" />
    
    {/* Small buds */}
    <circle cx="55" cy="35" r="3" fill="#E8B4B8" opacity="0.45" />
    <circle cx="12" cy="65" r="3" fill="#F5D5D8" opacity="0.4" />
    <circle cx="68" cy="145" r="3" fill="#E8B4B8" opacity="0.45" />
    <circle cx="8" cy="185" r="3" fill="#E8B4B8" opacity="0.4" />
    <circle cx="70" cy="245" r="3" fill="#F5D5D8" opacity="0.45" />
    <circle cx="5" cy="310" r="3" fill="#E8B4B8" opacity="0.4" />
    <circle cx="72" cy="365" r="3" fill="#E8B4B8" opacity="0.45" />
    <circle cx="10" cy="400" r="3" fill="#F5D5D8" opacity="0.4" />
    <circle cx="65" cy="445" r="3" fill="#E8B4B8" opacity="0.45" />
  </svg>
);

// Dense flower cluster for filling space
const FlowerCluster = ({ className = "", variant = 1 }: { className?: string; variant?: number }) => (
  <svg viewBox="0 0 120 120" className={className}>
    {/* Multiple overlapping flowers */}
    <g opacity="0.7">
      {/* Center flower */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse key={`c-${angle}`} cx="60" cy="60" rx="6" ry="16" fill={variant === 1 ? "#E8B4B8" : "#F5D5D8"} transform={`rotate(${angle} 60 60)`} />
      ))}
      <circle cx="60" cy="60" r="7" fill="#C5A065" />
    </g>
    
    {/* Surrounding flowers */}
    <g opacity="0.55">
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={`t-${angle}`} cx="60" cy="25" rx="4" ry="10" fill={variant === 1 ? "#E8B4B8" : "#C5A065"} transform={`rotate(${angle} 60 25)`} />
      ))}
      <circle cx="60" cy="25" r="4" fill="#C5A065" />
    </g>
    
    <g opacity="0.55">
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={`b-${angle}`} cx="60" cy="95" rx="4" ry="10" fill={variant === 1 ? "#F5D5D8" : "#E8B4B8"} transform={`rotate(${angle} 60 95)`} />
      ))}
      <circle cx="60" cy="95" r="4" fill="#C5A065" />
    </g>
    
    <g opacity="0.5">
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={`l-${angle}`} cx="25" cy="60" rx="4" ry="9" fill={variant === 1 ? "#E8B4B8" : "#F5D5D8"} transform={`rotate(${angle} 25 60)`} />
      ))}
      <circle cx="25" cy="60" r="3" fill="#C5A065" />
    </g>
    
    <g opacity="0.5">
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={`r-${angle}`} cx="95" cy="60" rx="4" ry="9" fill={variant === 1 ? "#C5A065" : "#E8B4B8"} transform={`rotate(${angle} 95 60)`} />
      ))}
      <circle cx="95" cy="60" r="3" fill="#D4AF37" />
    </g>
    
    {/* Leaves */}
    <ellipse cx="40" cy="40" rx="8" ry="4" fill="#4A5D45" opacity="0.35" transform="rotate(-45 40 40)" />
    <ellipse cx="80" cy="40" rx="8" ry="4" fill="#4A5D45" opacity="0.35" transform="rotate(45 80 40)" />
    <ellipse cx="40" cy="80" rx="8" ry="4" fill="#4A5D45" opacity="0.35" transform="rotate(45 40 80)" />
    <ellipse cx="80" cy="80" rx="8" ry="4" fill="#4A5D45" opacity="0.35" transform="rotate(-45 80 80)" />
  </svg>
);

const DecorativeArch = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 400 500" 
    className={className}
    fill="none"
    preserveAspectRatio="none"
  >
    {/* Outer ornate arch */}
    <path 
      d="M20,500 L20,180 Q20,20 200,20 Q380,20 380,180 L380,500" 
      stroke="url(#goldGradient)" 
      strokeWidth="3"
    />
    {/* Inner arch */}
    <path 
      d="M35,500 L35,185 Q35,40 200,40 Q365,40 365,185 L365,500" 
      stroke="url(#goldGradient)" 
      strokeWidth="1.5"
      opacity="0.6"
    />
    {/* Decorative top ornament */}
    <circle cx="200" cy="15" r="8" fill="url(#goldGradient)" opacity="0.8" />
    <circle cx="200" cy="15" r="4" fill="#FDFBF7" />
    
    {/* Side decorative elements */}
    <circle cx="20" cy="180" r="4" fill="url(#goldGradient)" opacity="0.6" />
    <circle cx="380" cy="180" r="4" fill="url(#goldGradient)" opacity="0.6" />
    
    {/* Decorative curves at arch peak */}
    <path 
      d="M160,35 Q180,25 200,30 Q220,25 240,35" 
      stroke="url(#goldGradient)" 
      strokeWidth="1" 
      opacity="0.5"
    />
    
    {/* Gold gradient definition */}
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4AF37" />
        <stop offset="50%" stopColor="#C5A065" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
    </defs>
  </svg>
);

const MajesticFlower = ({ className = "", color = "#E8B4B8" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 80 80" className={className}>
    {/* Outer petals */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <ellipse
        key={angle}
        cx="40"
        cy="40"
        rx="6"
        ry="18"
        fill={color}
        opacity="0.7"
        transform={`rotate(${angle} 40 40)`}
      />
    ))}
    {/* Inner petals */}
    {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
      <ellipse
        key={angle}
        cx="40"
        cy="40"
        rx="4"
        ry="12"
        fill={color}
        opacity="0.9"
        transform={`rotate(${angle} 40 40)`}
      />
    ))}
    {/* Center */}
    <circle cx="40" cy="40" r="8" fill="#C5A065" opacity="0.8" />
    <circle cx="40" cy="40" r="4" fill="#D4AF37" />
  </svg>
);

const LeafBranch = ({ className = "", flip = false }: { className?: string; flip?: boolean }) => (
  <svg 
    viewBox="0 0 100 200" 
    className={className}
    style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
  >
    {/* Main stem */}
    <path 
      d="M50,0 Q45,50 50,100 Q55,150 50,200" 
      stroke="#4A5D45" 
      strokeWidth="2" 
      fill="none"
      opacity="0.6"
    />
    {/* Leaves */}
    <ellipse cx="35" cy="30" rx="15" ry="6" fill="#4A5D45" opacity="0.4" transform="rotate(-30 35 30)" />
    <ellipse cx="65" cy="60" rx="15" ry="6" fill="#4A5D45" opacity="0.4" transform="rotate(30 65 60)" />
    <ellipse cx="35" cy="90" rx="15" ry="6" fill="#4A5D45" opacity="0.4" transform="rotate(-30 35 90)" />
    <ellipse cx="65" cy="120" rx="15" ry="6" fill="#4A5D45" opacity="0.4" transform="rotate(30 65 120)" />
    <ellipse cx="35" cy="150" rx="15" ry="6" fill="#4A5D45" opacity="0.4" transform="rotate(-30 35 150)" />
    <ellipse cx="65" cy="180" rx="15" ry="6" fill="#4A5D45" opacity="0.4" transform="rotate(30 65 180)" />
  </svg>
);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const location = useLocation();
  const mousePosition = useMousePosition();

  // Only allow specific routes
  const allowedRoutes = ['/invite', '/sood-invite', '/arora-invite'];
  const isValidRoute = allowedRoutes.includes(location.pathname);

  // Animations based on scroll position
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, -50]);
  const mandapOpacity = useTransform(scrollY, [100, 500], [0, 1]);
  const mandapScale = useTransform(scrollY, [100, 500], [0.95, 1]);

  const generateCalendarLink = () => {
    const event = {
      title: "Chhaya & Aditya's Wedding",
      start: "20260315T090000Z",
      end: "20260315T230000Z",
      details: "Join us to celebrate the wedding of Chhaya and Aditya!",
      location: "Chino Hills, California"
    };
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`;
  };

  // Show 404 for invalid routes
  if (!isValidRoute) {
    return (
      <div className="min-h-screen bg-wedding-cream text-wedding-green font-serif flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-wedding-gold mb-4">404</h1>
          <p className="text-2xl md:text-3xl mb-2">Page Not Found</p>
          <p className="text-lg md:text-xl text-wedding-green/70">This invitation link is not valid.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wedding-cream text-wedding-green font-serif overflow-x-hidden scroll-smooth" ref={containerRef} style={{ scrollSnapType: 'y proximity' }}>
      
      {/* --- MOUSE FOLLOWING LOTUSES (Desktop only) --- */}
      <MouseLotus mouseX={mousePosition.x} mouseY={mousePosition.y} delay={0} offset={{ x: 20, y: 20 }} size={35} />
      <MouseLotus mouseX={mousePosition.x} mouseY={mousePosition.y} delay={1} offset={{ x: -25, y: 15 }} size={28} />
      <MouseLotus mouseX={mousePosition.x} mouseY={mousePosition.y} delay={2} offset={{ x: 15, y: -20 }} size={22} />
      <MouseLotus mouseX={mousePosition.x} mouseY={mousePosition.y} delay={3} offset={{ x: -18, y: -25 }} size={18} />
      
      {/* --- BACKGROUND TEXTURE --- */}
      <div 
        className="fixed inset-0 z-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}
      />

      {/* --- FLOATING PETALS ANIMATION (4x more!) --- */}
      <div className="fixed inset-0 z-5 pointer-events-none overflow-hidden">
        {/* Pink petals - different sizes and speeds */}
        <FloatingPetal delay={0} duration={12} startX={50} color="#E8B4B8" size="normal" />
        <FloatingPetal delay={1.5} duration={15} startX={150} color="#E8B4B8" size="large" />
        <FloatingPetal delay={3} duration={10} startX={250} color="#E8B4B8" size="small" />
        <FloatingPetal delay={4.5} duration={14} startX={350} color="#E8B4B8" size="normal" />
        <FloatingPetal delay={6} duration={11} startX={450} color="#E8B4B8" size="large" />
        <FloatingPetal delay={7.5} duration={13} startX={100} color="#E8B4B8" size="small" />
        <FloatingPetal delay={9} duration={16} startX={200} color="#E8B4B8" size="normal" />
        <FloatingPetal delay={10.5} duration={12} startX={300} color="#E8B4B8" size="large" />
        
        {/* Gold petals */}
        <FloatingPetal delay={2} duration={14} startX={80} color="#C5A065" size="small" />
        <FloatingPetal delay={5} duration={12} startX={180} color="#C5A065" size="normal" />
        <FloatingPetal delay={8} duration={15} startX={280} color="#C5A065" size="small" />
        <FloatingPetal delay={11} duration={13} startX={380} color="#C5A065" size="normal" />
        
        {/* Light pink petals */}
        <FloatingPetal delay={1} duration={16} startX={120} color="#F5D5D8" size="large" />
        <FloatingPetal delay={4} duration={11} startX={220} color="#F5D5D8" size="normal" />
        <FloatingPetal delay={7} duration={14} startX={320} color="#F5D5D8" size="large" />
        <FloatingPetal delay={10} duration={12} startX={420} color="#F5D5D8" size="normal" />
        
        {/* Desktop only - MANY more petals (4x) */}
        <div className="hidden md:block">
          {/* Wave 1 */}
          <FloatingPetal delay={0.5} duration={13} startX={500} color="#E8B4B8" size="normal" />
          <FloatingPetal delay={2.5} duration={15} startX={600} color="#E8B4B8" size="large" />
          <FloatingPetal delay={4.5} duration={11} startX={700} color="#C5A065" size="small" />
          <FloatingPetal delay={6.5} duration={14} startX={800} color="#E8B4B8" size="normal" />
          <FloatingPetal delay={8.5} duration={12} startX={900} color="#F5D5D8" size="large" />
          <FloatingPetal delay={10.5} duration={16} startX={550} color="#E8B4B8" size="small" />
          <FloatingPetal delay={12.5} duration={13} startX={650} color="#C5A065" size="normal" />
          <FloatingPetal delay={14.5} duration={15} startX={750} color="#E8B4B8" size="large" />
          
          {/* Wave 2 */}
          <FloatingPetal delay={1.2} duration={14} startX={1000} color="#E8B4B8" size="normal" />
          <FloatingPetal delay={3.2} duration={12} startX={1100} color="#F5D5D8" size="large" />
          <FloatingPetal delay={5.2} duration={16} startX={1200} color="#E8B4B8" size="small" />
          <FloatingPetal delay={7.2} duration={13} startX={850} color="#C5A065" size="normal" />
          <FloatingPetal delay={9.2} duration={15} startX={950} color="#E8B4B8" size="large" />
          <FloatingPetal delay={11.2} duration={11} startX={1050} color="#F5D5D8" size="small" />
          
          {/* Wave 3 */}
          <FloatingPetal delay={0.8} duration={15} startX={1150} color="#E8B4B8" size="normal" />
          <FloatingPetal delay={2.8} duration={13} startX={1250} color="#C5A065" size="large" />
          <FloatingPetal delay={4.8} duration={12} startX={1350} color="#E8B4B8" size="small" />
          <FloatingPetal delay={6.8} duration={14} startX={520} color="#F5D5D8" size="normal" />
          <FloatingPetal delay={8.8} duration={16} startX={620} color="#E8B4B8" size="large" />
          <FloatingPetal delay={10.8} duration={11} startX={720} color="#C5A065" size="small" />
          
          {/* Wave 4 */}
          <FloatingPetal delay={1.8} duration={12} startX={820} color="#E8B4B8" size="normal" />
          <FloatingPetal delay={3.8} duration={14} startX={920} color="#F5D5D8" size="large" />
          <FloatingPetal delay={5.8} duration={15} startX={1020} color="#E8B4B8" size="small" />
          <FloatingPetal delay={7.8} duration={13} startX={1120} color="#C5A065" size="normal" />
          <FloatingPetal delay={9.8} duration={11} startX={1220} color="#E8B4B8" size="large" />
          <FloatingPetal delay={11.8} duration={16} startX={580} color="#F5D5D8" size="small" />
        </div>
        
        {/* Floating full flowers - MORE on desktop */}
        <FloatingFlower delay={0} duration={20} startX={100} color="#E8B4B8" />
        <FloatingFlower delay={5} duration={18} startX={300} color="#F5D5D8" />
        <FloatingFlower delay={10} duration={22} startX={500} color="#E8B4B8" />
        <FloatingFlower delay={15} duration={19} startX={700} color="#C5A065" />
        <FloatingFlower delay={7} duration={21} startX={900} color="#E8B4B8" />
        <div className="hidden lg:block">
          <FloatingFlower delay={3} duration={23} startX={1100} color="#F5D5D8" />
          <FloatingFlower delay={8} duration={20} startX={1300} color="#E8B4B8" />
          <FloatingFlower delay={12} duration={18} startX={150} color="#C5A065" />
          <FloatingFlower delay={17} duration={22} startX={450} color="#E8B4B8" />
          <FloatingFlower delay={2} duration={19} startX={750} color="#F5D5D8" />
          <FloatingFlower delay={13} duration={21} startX={1050} color="#E8B4B8" />
        </div>
      </div>

      {/* --- DECORATIVE CORNER FLOWERS (FIXED) - LARGER ON DESKTOP --- */}
      <div className="fixed top-0 left-0 z-15 pointer-events-none">
        <FloralCornerLarge className="w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 text-wedding-pink opacity-70" />
      </div>
      <div className="fixed top-0 right-0 z-15 pointer-events-none">
        <FloralCornerLarge className="w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 text-wedding-pink opacity-70" flip />
      </div>
      
      {/* --- FLORAL VINES ON SIDES (Now on mobile too, more on desktop) --- */}
      <div className="fixed top-0 left-0 z-10 pointer-events-none">
        <FloralVine className="w-12 h-80 sm:w-14 sm:h-96 md:w-20 md:h-[500px] lg:w-24 lg:h-[600px] opacity-60" />
      </div>
      <div className="fixed top-0 right-0 z-10 pointer-events-none">
        <FloralVine className="w-12 h-80 sm:w-14 sm:h-96 md:w-20 md:h-[500px] lg:w-24 lg:h-[600px] opacity-60" flip />
      </div>
      {/* Second set of vines - desktop */}
      <div className="fixed top-1/3 left-0 z-10 pointer-events-none hidden md:block">
        <FloralVine className="w-16 h-[450px] lg:w-20 lg:h-[550px] opacity-55" />
      </div>
      <div className="fixed top-1/3 right-0 z-10 pointer-events-none hidden md:block">
        <FloralVine className="w-16 h-[450px] lg:w-20 lg:h-[550px] opacity-55" flip />
      </div>
      {/* Third set - large desktop */}
      <div className="fixed top-2/3 left-0 z-10 pointer-events-none hidden lg:block">
        <FloralVine className="w-18 h-[400px] xl:w-22 xl:h-[500px] opacity-50" />
      </div>
      <div className="fixed top-2/3 right-0 z-10 pointer-events-none hidden lg:block">
        <FloralVine className="w-18 h-[400px] xl:w-22 xl:h-[500px] opacity-50" flip />
      </div>
      
      {/* --- FLOWER CLUSTERS (Desktop - filling white space) --- */}
      <div className="fixed top-[15%] left-[8%] z-5 pointer-events-none hidden lg:block">
        <FlowerCluster className="w-24 h-24 xl:w-32 xl:h-32 opacity-50" variant={1} />
      </div>
      <div className="fixed top-[15%] right-[8%] z-5 pointer-events-none hidden lg:block">
        <FlowerCluster className="w-24 h-24 xl:w-32 xl:h-32 opacity-50" variant={2} />
      </div>
      <div className="fixed top-[40%] left-[5%] z-5 pointer-events-none hidden xl:block">
        <FlowerCluster className="w-28 h-28 opacity-45" variant={2} />
      </div>
      <div className="fixed top-[40%] right-[5%] z-5 pointer-events-none hidden xl:block">
        <FlowerCluster className="w-28 h-28 opacity-45" variant={1} />
      </div>
      <div className="fixed top-[65%] left-[10%] z-5 pointer-events-none hidden lg:block">
        <FlowerCluster className="w-20 h-20 xl:w-26 xl:h-26 opacity-40" variant={1} />
      </div>
      <div className="fixed top-[65%] right-[10%] z-5 pointer-events-none hidden lg:block">
        <FlowerCluster className="w-20 h-20 xl:w-26 xl:h-26 opacity-40" variant={2} />
      </div>
      
      {/* --- SWAYING FLOWERS (More and bigger on desktop) --- */}
      <div className="fixed top-1/4 left-4 md:left-16 lg:left-24 z-15 pointer-events-none hidden md:block">
        <SwayingFlower className="w-14 h-14 lg:w-20 lg:h-20 xl:w-24 xl:h-24 opacity-55" color="#E8B4B8" delay={0} />
      </div>
      <div className="fixed top-1/3 right-4 md:right-16 lg:right-24 z-15 pointer-events-none hidden md:block">
        <SwayingFlower className="w-12 h-12 lg:w-18 lg:h-18 xl:w-22 xl:h-22 opacity-50" color="#C5A065" delay={1} />
      </div>
      <div className="fixed top-1/2 left-8 md:left-20 lg:left-28 z-15 pointer-events-none hidden md:block">
        <SwayingFlower className="w-16 h-16 lg:w-22 lg:h-22 xl:w-28 xl:h-28 opacity-55" color="#E8B4B8" delay={2} />
      </div>
      <div className="fixed top-2/3 right-6 md:right-18 lg:right-26 z-15 pointer-events-none hidden md:block">
        <SwayingFlower className="w-14 h-14 lg:w-20 lg:h-20 xl:w-24 xl:h-24 opacity-50" color="#F5D5D8" delay={0.5} />
      </div>
      {/* Extra swaying flowers for large screens */}
      <div className="fixed top-[20%] left-[12%] z-15 pointer-events-none hidden xl:block">
        <SwayingFlower className="w-16 h-16 opacity-45" color="#E8B4B8" delay={1.5} />
      </div>
      <div className="fixed top-[20%] right-[12%] z-15 pointer-events-none hidden xl:block">
        <SwayingFlower className="w-14 h-14 opacity-45" color="#F5D5D8" delay={2.5} />
      </div>
      <div className="fixed top-[55%] left-[15%] z-15 pointer-events-none hidden xl:block">
        <SwayingFlower className="w-18 h-18 opacity-40" color="#C5A065" delay={0.8} />
      </div>
      <div className="fixed top-[55%] right-[15%] z-15 pointer-events-none hidden xl:block">
        <SwayingFlower className="w-16 h-16 opacity-40" color="#E8B4B8" delay={1.8} />
      </div>
      
      {/* --- SCATTERED SMALL BLOSSOMS (Many more on desktop) --- */}
      <div className="fixed top-20 left-1/4 z-5 pointer-events-none hidden md:block">
        <SmallBlossom className="w-6 h-6 lg:w-8 lg:h-8 opacity-45" color="#E8B4B8" />
      </div>
      <div className="fixed top-40 right-1/4 z-5 pointer-events-none hidden md:block">
        <SmallBlossom className="w-5 h-5 lg:w-7 lg:h-7 opacity-40" color="#C5A065" />
      </div>
      <div className="fixed bottom-1/4 left-1/3 z-5 pointer-events-none hidden lg:block">
        <SmallBlossom className="w-7 h-7 xl:w-9 xl:h-9 opacity-45" color="#E8B4B8" />
      </div>
      <div className="fixed bottom-1/3 right-1/3 z-5 pointer-events-none hidden lg:block">
        <SmallBlossom className="w-5 h-5 xl:w-7 xl:h-7 opacity-40" color="#F5D5D8" />
      </div>
      {/* More blossoms for large screens */}
      <div className="fixed top-[25%] left-[20%] z-5 pointer-events-none hidden xl:block">
        <SmallBlossom className="w-6 h-6 opacity-40" color="#E8B4B8" />
      </div>
      <div className="fixed top-[25%] right-[20%] z-5 pointer-events-none hidden xl:block">
        <SmallBlossom className="w-7 h-7 opacity-40" color="#C5A065" />
      </div>
      <div className="fixed top-[45%] left-[18%] z-5 pointer-events-none hidden xl:block">
        <SmallBlossom className="w-5 h-5 opacity-35" color="#F5D5D8" />
      </div>
      <div className="fixed top-[45%] right-[18%] z-5 pointer-events-none hidden xl:block">
        <SmallBlossom className="w-6 h-6 opacity-35" color="#E8B4B8" />
      </div>
      <div className="fixed top-[70%] left-[22%] z-5 pointer-events-none hidden xl:block">
        <SmallBlossom className="w-7 h-7 opacity-40" color="#C5A065" />
      </div>
      <div className="fixed top-[70%] right-[22%] z-5 pointer-events-none hidden xl:block">
        <SmallBlossom className="w-5 h-5 opacity-40" color="#E8B4B8" />
      </div>
      
      {/* --- DECORATIVE SIDE FLOWERS (Bigger on desktop) --- */}
      <div className="fixed bottom-20 left-2 sm:left-4 md:left-12 lg:left-20 z-15 pointer-events-none">
        <MajesticFlower className="w-12 h-12 sm:w-16 sm:h-16 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-44 xl:h-44 opacity-55" color="#E8B4B8" />
      </div>
      <div className="fixed bottom-40 right-2 sm:right-4 md:right-12 lg:right-20 z-15 pointer-events-none">
        <MajesticFlower className="w-10 h-10 sm:w-14 sm:h-14 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 opacity-50" color="#C5A065" />
      </div>
      <div className="fixed bottom-60 left-4 md:left-16 lg:left-24 z-15 pointer-events-none hidden md:block">
        <MajesticFlower className="w-20 h-20 lg:w-28 lg:h-28 xl:w-36 xl:h-36 opacity-45" color="#F5D5D8" />
      </div>
      <div className="fixed bottom-80 right-6 md:right-20 lg:right-28 z-15 pointer-events-none hidden md:block">
        <MajesticFlower className="w-18 h-18 lg:w-24 lg:h-24 xl:w-32 xl:h-32 opacity-40" color="#E8B4B8" />
      </div>
      {/* Extra flowers for large screens */}
      <div className="fixed bottom-[30%] left-[8%] z-15 pointer-events-none hidden xl:block">
        <MajesticFlower className="w-28 h-28 opacity-40" color="#C5A065" />
      </div>
      <div className="fixed bottom-[30%] right-[8%] z-15 pointer-events-none hidden xl:block">
        <MajesticFlower className="w-32 h-32 opacity-40" color="#E8B4B8" />
      </div>
      
      {/* --- LEAF BRANCHES ON SIDES (More and bigger) --- */}
      <div className="fixed top-1/4 left-0 z-10 pointer-events-none hidden md:block">
        <LeafBranch className="w-24 h-48 lg:w-32 lg:h-64 xl:w-40 xl:h-80 opacity-45" />
      </div>
      <div className="fixed top-1/4 right-0 z-10 pointer-events-none hidden md:block">
        <LeafBranch className="w-24 h-48 lg:w-32 lg:h-64 xl:w-40 xl:h-80 opacity-45" flip />
      </div>
      <div className="fixed top-2/3 left-0 z-10 pointer-events-none hidden md:block">
        <LeafBranch className="w-20 h-40 lg:w-28 lg:h-56 xl:w-36 xl:h-72 opacity-40" />
      </div>
      <div className="fixed top-2/3 right-0 z-10 pointer-events-none hidden md:block">
        <LeafBranch className="w-20 h-40 lg:w-28 lg:h-56 xl:w-36 xl:h-72 opacity-40" flip />
      </div>
      {/* Extra leaf branches for large screens */}
      <div className="fixed top-[10%] left-[3%] z-10 pointer-events-none hidden xl:block">
        <LeafBranch className="w-28 h-56 opacity-35" />
      </div>
      <div className="fixed top-[10%] right-[3%] z-10 pointer-events-none hidden xl:block">
        <LeafBranch className="w-28 h-56 opacity-35" flip />
      </div>
      <div className="fixed top-[50%] left-[2%] z-10 pointer-events-none hidden xl:block">
        <LeafBranch className="w-24 h-48 opacity-35" />
      </div>
      <div className="fixed top-[50%] right-[2%] z-10 pointer-events-none hidden xl:block">
        <LeafBranch className="w-24 h-48 opacity-35" flip />
      </div>

      {/* --- LAYER 2: THE MANDAP (BEHIND CONTENT, FADES IN) --- */}
      <motion.div 
        className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ opacity: mandapOpacity, scale: mandapScale }}
      >
        <div className="w-[85%] sm:w-[80%] max-w-xl mt-12 sm:mt-20 relative px-4">
           <img 
            src="/assets/mandaap-only-rsvp.png" 
            alt="Mandap" 
            className="w-full h-auto object-contain rounded-t-full mix-blend-multiply"
            style={{
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
            }}
           />
        </div>
      </motion.div>

      {/* --- LAYER 3: SCROLLABLE CONTENT --- */}
      <div className="relative z-30">
        
        {/* SECTION 1: HERO TEXT - FORMAL INVITATION */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-3 sm:px-4 py-6 sm:py-8" style={{ scrollSnapAlign: 'start' }}>
          <motion.div style={{ opacity: heroOpacity, y: heroY }} className="mt-[-3vh] sm:mt-[-10vh] w-full max-w-[380px] sm:max-w-md md:max-w-lg mx-auto">
            
            {/* Decorative Arch Frame */}
            <div className="relative mx-auto px-3 sm:px-8 py-6 sm:py-12">
              {/* SVG Decorative Arch */}
              <DecorativeArch className="absolute inset-0 w-full h-full pointer-events-none" />
              
              {/* Invitation Content */}
              <div className="relative z-10 pt-4 sm:pt-10 pb-2 sm:pb-4">
                
                {/* Om Symbol - Bigger on all sizes */}
                {/* Om Symbol - Larger and standalone */}
                <div className="text-wedding-gold mb-4 sm:mb-6 font-light flex justify-center">
                  <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl" style={{ fontFamily: 'serif' }}>ॐ</span>
                </div>
                
                {/* Conditional Invitation Text Based on Route */}
                {location.pathname === '/sood-invite' && (
                  <>
                    {/* Grandparents' Names - Sood Invite */}
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed tracking-wide text-wedding-green mb-1 sm:mb-2 px-1 sm:px-2 font-semibold">
                      Raman & Rita Sood
                    </p>
                    <p className="text-xs sm:text-sm md:text-base text-wedding-gold mb-1 italic">and</p>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed tracking-wide text-wedding-green mb-3 sm:mb-4 px-1 sm:px-2 font-semibold">
                      Krishan & Kavita Dang
                    </p>
                    
                    {/* Request Line */}
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg italic text-wedding-green/80 mb-3 sm:mb-5 leading-relaxed px-1 sm:px-2">
                      request the honor of your presence<br/>
                      on the auspicious occasion of the
                    </p>
                  </>
                )}
                
                {location.pathname === '/arora-invite' && (
                  <>
                    {/* Parents' Names - Arora Invite */}
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed tracking-wide text-wedding-green mb-3 sm:mb-4 px-1 sm:px-2 font-semibold">
                      Sanjeev & Indra Arora
                    </p>
                    
                    {/* Request Line */}
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg italic text-wedding-green/80 mb-3 sm:mb-5 leading-relaxed px-1 sm:px-2">
                      request the honor of your presence<br/>
                      on the auspicious occasion of the
                    </p>
                  </>
                )}
                
                {location.pathname === '/invite' && (
                  <>
                    {/* Generic Request Line - Main Page */}
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg italic text-wedding-green/80 mb-3 sm:mb-5 leading-relaxed px-1 sm:px-2">
                      We request the honor of your presence<br/>
                      on the auspicious occasion of the
                    </p>
                  </>
                )}
                
                {/* Marriage Ceremony - Bigger on all sizes */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-wedding-gold italic mb-3 sm:mb-5 font-light tracking-wide">
                  Marriage Ceremony
                </h1>
                
                {/* Arora Invite - Chhaya first (daughter) */}
                {location.pathname === '/arora-invite' && (
                  <>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-wedding-green/80 mb-1.5 sm:mb-3">of their daughter</p>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-wedding-pink italic font-light mb-0.5 sm:mb-2">Chhaya</h2>
                    <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-wedding-green/70 mb-2.5 sm:mb-4 tracking-wide">
                      (Daughter of Indra & Sanjeev Arora)
                    </p>
                    
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-wedding-gold italic mb-1.5 sm:mb-3">with</p>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-wedding-pink italic font-light mb-0.5 sm:mb-2">Aditya</h2>
                    <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-wedding-green/70 mb-4 sm:mb-8 tracking-wide">
                      (Son of Amita & Ashish Sood)
                    </p>
                  </>
                )}
                
                {/* Sood Invite - Aditya first (grandson) */}
                {location.pathname === '/sood-invite' && (
                  <>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-wedding-green/80 mb-1.5 sm:mb-3">of their grandson</p>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-wedding-pink italic font-light mb-0.5 sm:mb-2">Aditya</h2>
                    <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-wedding-green/70 mb-2.5 sm:mb-4 tracking-wide">
                      (Son of Amita & Ashish Sood)
                    </p>
                    
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-wedding-gold italic mb-1.5 sm:mb-3">with</p>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-wedding-pink italic font-light mb-0.5 sm:mb-2">Chhaya</h2>
                    <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-wedding-green/70 mb-4 sm:mb-8 tracking-wide">
                      (Daughter of Indra & Sanjeev Arora)
                    </p>
                  </>
                )}
                
                {/* Home Page - Generic invite with just "of" */}
                {location.pathname === '/invite' && (
                  <>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-wedding-green/80 mb-1.5 sm:mb-3">of</p>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-wedding-pink italic font-light mb-0.5 sm:mb-2">Aditya</h2>
                    <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-wedding-green/70 mb-2.5 sm:mb-4 tracking-wide">
                      (Son of Amita & Ashish Sood)
                    </p>
                    
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-wedding-gold italic mb-1.5 sm:mb-3">with</p>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-wedding-pink italic font-light mb-0.5 sm:mb-2">Chhaya</h2>
                    <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-wedding-green/70 mb-4 sm:mb-8 tracking-wide">
                      (Daughter of Indra & Sanjeev Arora)
                    </p>
                  </>
                )}
                
                {/* Decorative divider with flowers */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <MajesticFlower className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 opacity-60" color="#C5A065" />
                  <div className="w-6 sm:w-10 md:w-14 h-px bg-wedding-gold/50"></div>
                  <LotusFlower className="w-6 h-4 sm:w-8 sm:h-5 md:w-10 md:h-6 text-wedding-pink opacity-70" />
                  <div className="w-6 sm:w-10 md:w-14 h-px bg-wedding-gold/50"></div>
                  <MajesticFlower className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 opacity-60" color="#C5A065" />
                </div>
                
                {/* Wedding Date */}
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-wedding-gold font-semibold tracking-wide mb-4 sm:mb-6">
                  March 15, 2026
                </p>
                
                {/* RSVP Button - Bigger on all sizes */}
                <a 
                   href="https://www.theknot.com/us/chhaya-arora-and-aditya-sood-mar-2026/rsvp" 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-block px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 border border-wedding-green text-wedding-green hover:bg-wedding-green hover:text-white transition-colors uppercase tracking-widest text-[10px] sm:text-xs md:text-sm duration-300"
                >
                  RSVP
                </a>
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="absolute bottom-4 sm:bottom-10 left-0 right-0 flex flex-col items-center gap-2 opacity-60">
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-wedding-green sm:w-6 sm:h-6 md:w-8 md:h-8">
                   <path d="M7 13L12 18L17 13M7 6L12 11L17 6" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* SPACER FOR REVEAL */}
        <div className="h-[50vh] sm:h-[60vh]"></div>

        {/* SECTION 2: DETAILS CARD */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-6 sm:py-8 sm:pb-20" style={{ scrollSnapAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-wedding-cream/90 backdrop-blur-sm p-5 sm:p-10 md:p-12 border border-wedding-gold shadow-2xl max-w-sm sm:max-w-md md:max-w-lg w-full text-center relative"
          >
            {/* Corner decorations */}
            <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4">
              <MajesticFlower className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16" color="#E8B4B8" />
            </div>
            <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4">
              <MajesticFlower className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16" color="#E8B4B8" />
            </div>
            
            <p className="uppercase tracking-widest text-[10px] sm:text-sm md:text-base mb-2 sm:mb-4">Together with their families</p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-wedding-pink italic mb-3 sm:mb-6 font-light">Chhaya & Aditya</h2>
            
            <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-xl md:text-2xl mb-4 sm:mb-8 leading-relaxed">
              <p className="font-bold text-wedding-gold">Saturday, March 15, 2026</p>
              <p>Chino Hills, California</p>
            </div>

            <div className="flex items-center justify-center gap-2 my-3 sm:my-6">
              <div className="w-8 sm:w-12 md:w-16 h-[1px] bg-wedding-green/30"></div>
              <LotusFlower className="w-8 h-5 sm:w-10 sm:h-6 md:w-12 md:h-8 text-wedding-gold opacity-60" />
              <div className="w-8 sm:w-12 md:w-16 h-[1px] bg-wedding-green/30"></div>
            </div>
            
            <p className="text-[10px] sm:text-sm md:text-base italic mb-4 sm:mb-8">Formal Invitation to Follow</p>
            
            <a 
              href={generateCalendarLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 border border-wedding-green text-wedding-green hover:bg-wedding-green hover:text-white transition-colors uppercase tracking-widest text-[9px] sm:text-xs md:text-sm duration-300"
            >
              Add to Calendar
            </a>
            
            {/* Bottom corner decorations */}
            <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4">
              <MajesticFlower className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16" color="#C5A065" />
            </div>
            <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4">
              <MajesticFlower className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16" color="#C5A065" />
            </div>
          </motion.div>
        </section>

        {/* SECTION 3: WELCOME & STORY */}
        <section className="max-w-4xl mx-auto px-4 py-6 sm:py-8 mb-8 sm:mb-20 space-y-5 sm:space-y-8" style={{ scrollSnapAlign: 'start' }}>
          
          {/* Welcome Message Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-wedding-cream/95 backdrop-blur-sm p-5 sm:p-8 md:p-12 border border-wedding-gold shadow-xl text-center rounded-sm relative overflow-hidden"
          >
            {/* Decorative corners */}
            <div className="absolute top-2 left-2">
              <FloralCorner className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 text-wedding-pink opacity-40" />
            </div>
            <div className="absolute top-2 right-2">
              <FloralCorner className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 text-wedding-pink opacity-40" flip />
            </div>
            
            <h3 className="text-xl sm:text-3xl md:text-4xl text-wedding-gold italic mb-3 sm:mb-8">Welcome</h3>
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl leading-relaxed sm:leading-loose max-w-2xl mx-auto text-wedding-green">
              "We are so incredibly excited to celebrate this milestone with you. This isn't just about the two of us; it's about all of us coming together to celebrate love, community, and the future we're building. Thank you for everything. We can't wait to see you."
            </p>
            
            {/* Bottom decorative flowers */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-3">
                <SmallBlossom className="w-5 h-5 md:w-6 md:h-6 opacity-40" color="#E8B4B8" />
                <SmallBlossom className="w-6 h-6 md:w-8 md:h-8 opacity-50" color="#C5A065" />
                <SmallBlossom className="w-5 h-5 md:w-6 md:h-6 opacity-40" color="#E8B4B8" />
              </div>
            </div>
          </motion.div>

          {/* Our Story Card */}
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="bg-wedding-cream/95 backdrop-blur-sm p-5 sm:p-8 md:p-12 border border-wedding-gold shadow-xl rounded-sm"
          >
            <div className="grid md:grid-cols-2 gap-5 sm:gap-8 md:gap-12 items-center">
               <div className="space-y-3 sm:space-y-6 text-wedding-green">
                  <h3 className="text-xl sm:text-3xl md:text-4xl text-wedding-gold italic mb-2 sm:mb-4">Our Story</h3>
                  <h4 className="text-sm sm:text-lg md:text-xl lg:text-2xl uppercase tracking-widest mb-2 font-semibold">From Competitors to Partners</h4>
                  <p className="leading-relaxed text-xs sm:text-base md:text-lg lg:text-xl">
                    Chhaya and Aditya's story began back in high school at a Future Business Leaders of America (FBLA) competition. What started as a rivalry between two ambitious students quickly turned into a friendship grounded in shared drive and mutual respect.
                  </p>
                  <p className="leading-relaxed text-xs sm:text-base md:text-lg lg:text-xl">
                    Though they started as competitors, their connection deepened over time. They officially began dating while Aditya was in medical school, supporting each other through the long hours of study, career changes, and the challenges of long-distance.
                  </p>
               </div>
               <div className="bg-white p-1.5 sm:p-2 rotate-2 shadow-lg border border-wedding-green/10 order-first md:order-last relative">
                  {/* Decorative flower on photo */}
                  <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 z-10">
                    <MajesticFlower className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12" color="#E8B4B8" />
                  </div>
                  <div className="aspect-[3/4] overflow-hidden">
                     <img 
                       src="/initial-encounter.jpeg" 
                       alt="The Initial Encounter (2015)" 
                       className="w-full h-full object-cover"
                     />
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-center gap-3 my-6 sm:my-12">
              <SmallBlossom className="w-4 h-4 md:w-6 md:h-6 opacity-40" color="#E8B4B8" />
              <div className="w-12 sm:w-20 md:w-28 h-[1px] bg-wedding-gold/30"></div>
              <LotusFlower className="w-10 h-6 sm:w-12 sm:h-8 md:w-16 md:h-10 text-wedding-gold opacity-50" />
              <div className="w-12 sm:w-20 md:w-28 h-[1px] bg-wedding-gold/30"></div>
              <SmallBlossom className="w-4 h-4 md:w-6 md:h-6 opacity-40" color="#E8B4B8" />
            </div>

            <div className="grid md:grid-cols-2 gap-5 sm:gap-8 md:gap-12 items-center">
               <div className="bg-white p-1.5 sm:p-2 -rotate-2 shadow-lg md:order-2 border border-wedding-green/10 relative">
                  {/* Decorative flower on photo */}
                  <div className="absolute -top-2 -left-2 md:-top-3 md:-left-3 z-10">
                    <MajesticFlower className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12" color="#C5A065" />
                  </div>
                  <div className="aspect-[4/3] overflow-hidden">
                     <img 
                       src="/proposal.webp" 
                       alt="The Proposal (Dec 2024)" 
                       className="w-full h-full object-cover"
                     />
                  </div>
               </div>

               <div className="space-y-3 sm:space-y-6 md:order-1 text-wedding-green">
                  <h4 className="text-sm sm:text-lg md:text-xl lg:text-2xl uppercase tracking-widest mb-2 font-semibold">The Proposal</h4>
                  <p className="leading-relaxed text-xs sm:text-base md:text-lg lg:text-xl">
                    In December 2024, Aditya planned a special surprise in Long Island City. Against the backdrop of the waterfront, he asked Chhaya to marry him. It was the easiest "yes" of her life. 
                  </p>
                  <p className="leading-relaxed text-xs sm:text-base md:text-lg lg:text-xl">
                    Now, on March 15, 2026, they are thrilled to celebrate their journey from high school friends to husband and wife with all of you in California.
                  </p>
               </div>
            </div>
          </motion.div>

        </section>

        {/* FOOTER */}
        <footer className="py-6 sm:py-12 text-center text-wedding-green/60 text-[9px] sm:text-xs md:text-sm uppercase tracking-widest relative z-30 px-4">
           <div className="flex flex-col items-center justify-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <SmallBlossom className="w-4 h-4 md:w-6 md:h-6 opacity-40" color="#E8B4B8" />
                <LotusFlower className="w-12 h-8 sm:w-16 sm:h-10 md:w-20 md:h-12 text-wedding-gold opacity-40" />
                <SmallBlossom className="w-4 h-4 md:w-6 md:h-6 opacity-40" color="#E8B4B8" />
              </div>
              <p>Chhaya & Aditya • March 15, 2026</p>
              <p>Chino Hills, California</p>
           </div>
        </footer>

      </div>
    </div>
  );
}

export default App;
