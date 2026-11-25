import React from 'react';

// Triple-loop hand-drawn oval badge for section headers
export const DoodleBadge = ({ children, className = '', textClassName = '', color = '#99ab58', textColor = '#ea6f88' }) => {
  return (
    <div className={`relative inline-flex items-center justify-center px-6 py-2 my-2 ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
      >
        {/* Outer sketchy loop 1 */}
        <path
          d="M 20,30 C 18,12 55,7 100,7 C 145,7 182,12 180,30 C 178,48 145,53 100,53 C 55,53 22,48 20,30 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
        {/* Slightly shifted loop 2 */}
        <path
          d="M 17,28 C 15,10 52,5 102,5 C 152,5 184,10 182,28 C 180,46 148,55 98,55 C 48,55 19,46 17,28 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.75"
        />
        {/* Whimsical loop 3 */}
        <path
          d="M 23,32 C 20,15 58,9 99,8 C 140,7 178,14 176,32 C 174,49 141,52 101,52 C 61,52 26,49 23,32 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
      </svg>
      <span
        className={`relative z-10 font-serif text-center font-semibold uppercase px-2 ${textClassName || 'tracking-widest text-sm md:text-base'}`}
        style={{ color: textColor }}
      >
        {children}
      </span>
    </div>
  );
};

// 5-Petal Cute Flower Doodle
export const FlowerDoodle = ({
  size = 40,
  petalColor = '#F48FB1',
  centerColor = '#FFF9E6',
  className = '',
  style = {}
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`inline-block select-none pointer-events-none transition-transform duration-300 hover:scale-110 ${className}`}
      style={style}
    >
      <g transform="translate(50,50)">
        {/* 5 rounded petals */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-26"
            rx="15"
            ry="22"
            transform={`rotate(${angle})`}
            fill={petalColor}
            opacity="0.92"
          />
        ))}
        {/* Center circle */}
        <circle cx="0" cy="0" r="12" fill={centerColor} />
      </g>
    </svg>
  );
};

// Daisy / Star Flower with more pointed petals
export const StarFlowerDoodle = ({
  size = 36,
  color = '#F48FB1',
  centerColor = '#FFF',
  className = '',
  style = {}
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`inline-block select-none pointer-events-none ${className}`}
      style={style}
    >
      <g transform="translate(50,50)">
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <path
            key={i}
            d="M 0,-32 C 8,-20 8,-10 0,0 C -8,-10 -8,-20 0,-32 Z"
            transform={`rotate(${angle})`}
            fill="none"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        <circle cx="0" cy="0" r="7" fill={centerColor} stroke={color} strokeWidth="2.5" />
      </g>
    </svg>
  );
};

// Heart doodle around calendar date
export const HeartCircle = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 50 50"
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-visible ${className}`}
    >
      <path
        d="M 25,16 C 25,11 19,7 13,10 C 6,14 7,22 13,29 C 18,35 24,41 25,43 C 26,41 32,35 37,29 C 43,22 44,14 37,10 C 31,7 25,11 25,16 Z"
        fill="none"
        stroke="#F06292"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Hand-drawn ribbon bow
export const RibbonBow = ({ size = 48, color = '#FFFFFF', className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 80 60"
      className={`select-none pointer-events-none ${className}`}
    >
      {/* Left loop */}
      <path
        d="M 40,28 C 30,12 12,12 16,28 C 18,36 32,34 40,30"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right loop */}
      <path
        d="M 40,28 C 50,12 68,12 64,28 C 62,36 48,34 40,30"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center knot */}
      <circle cx="40" cy="29" r="4.5" fill={color} />
      {/* Dangling tails */}
      <path
        d="M 37,32 C 34,42 26,48 24,54"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 43,32 C 46,42 54,48 56,54"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

// Sketchy Arrow pointing down / curve
export const SketchyArrow = ({
  className = '',
  color = '#8EB8E5',
  direction = 'down-right'
}) => {
  return (
    <svg
      width="44"
      height="36"
      viewBox="0 0 60 50"
      className={`pointer-events-none ${className}`}
    >
      {direction === 'down-right' && (
        <>
          <path
            d="M 12,10 C 22,12 36,18 42,32"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 32,31 L 43,33 L 42,22"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {direction === 'curve-left' && (
        <>
          <path
            d="M 48,10 C 35,14 18,24 15,36"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 13,26 L 14,37 L 25,35"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {direction === 'curly-swirl' && (
        <>
          <path
            d="M 20,12 C 10,18 10,28 20,28 C 30,28 32,18 24,14 C 18,10 16,34 38,36"
            fill="none"
            stroke={color}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M 30,30 L 39,37 L 31,42"
            fill="none"
            stroke={color}
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
};

// Wavy Ocean Divider for Coordinator section
export const WavyDivider = ({ color = '#99C7EB', className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 28"
      className={`w-full max-w-[340px] mx-auto select-none pointer-events-none my-3 ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M 5,14 
           Q 15,4 25,14 T 45,14 T 65,14 T 85,14 T 105,14 T 125,14 T 145,14 
           T 165,14 T 185,14 T 205,14 T 225,14 T 245,14 T 265,14 T 285,14 T 305,14 T 315,14"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};

// Wavy Scalloped Box Outline for "ЧТО НАДЕТЬ?"
export const ScallopedBoxOutline = ({ children, className = '' }) => {
  return (
    <div className={`relative p-5 my-3 ${className}`}>
      {/* Cute corner tab decor */}
      <div className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-[#A8C8EC] rounded-tl-md border-t-2 border-l-2 border-[#82A8D4]" />
      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#A8C8EC] rounded-tr-md border-t-2 border-r-2 border-[#82A8D4]" />
      <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 bg-[#A8C8EC] rounded-bl-md border-b-2 border-l-2 border-[#82A8D4]" />
      <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 bg-[#A8C8EC] rounded-br-md border-b-2 border-r-2 border-[#82A8D4]" />

      {/* SVG scalloped border frame */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 320 180"
        preserveAspectRatio="none"
      >
        <path
          d="M 15,15 
             Q 30,12 45,15 Q 60,18 75,15 Q 90,12 105,15 Q 120,18 135,15 Q 150,12 165,15 Q 180,18 195,15 Q 210,12 225,15 Q 240,18 255,15 Q 270,12 285,15 Q 300,18 305,15
             Q 308,30 305,45 Q 302,60 305,75 Q 308,90 305,105 Q 302,120 305,135 Q 308,150 305,165
             Q 290,168 275,165 Q 260,162 245,165 Q 230,168 215,165 Q 200,162 185,165 Q 170,168 155,165 Q 140,162 125,165 Q 110,168 95,165 Q 80,162 65,165 Q 50,168 35,165 Q 20,162 15,165
             Q 12,150 15,135 Q 18,120 15,105 Q 12,90 15,75 Q 18,60 15,45 Q 12,30 15,15 Z"
          fill="none"
          stroke="#C4B0E8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
