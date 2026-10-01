import React from 'react';
import { motion } from 'framer-motion';

/**
 * BackgroundAtmosphere
 * 
 * Renders soft, serene atmospheric motion:
 * 1. Slowly drifting and breathing luminous teal & warm-gold orbs
 * 2. Subtle rising memory particles (ethereal shimmer)
 * 3. Soft organic resonance waves that gently breathe
 */
export const BackgroundAtmosphere: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none" 
      aria-hidden="true"
    >
      {/* 1. Large Top-Right Breathing Teal Aurora Orb */}
      <motion.div
        animate={{
          x: [0, 35, -25, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.12, 0.95, 1],
          opacity: [0.45, 0.65, 0.5, 0.45],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-24 -right-24 w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full bg-radial from-teal-200/40 via-teal-300/20 to-transparent blur-3xl"
      />

      {/* 2. Left-Center Warm Amber & Honey Memory Orb */}
      <motion.div
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 45, -20, 0],
          scale: [1, 1.18, 0.92, 1],
          opacity: [0.3, 0.5, 0.35, 0.3],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute top-[28%] -left-32 w-[420px] sm:w-[620px] h-[420px] sm:h-[620px] rounded-full bg-radial from-amber-100/40 via-teal-100/25 to-transparent blur-3xl"
      />

      {/* 3. Lower Right Soft Mint Resonance Orb */}
      <motion.div
        animate={{
          x: [0, 30, -35, 0],
          y: [0, -40, 25, 0],
          scale: [0.95, 1.15, 1, 0.95],
          opacity: [0.35, 0.55, 0.4, 0.35],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 7,
        }}
        className="absolute top-[65%] -right-20 w-[480px] sm:w-[680px] h-[480px] sm:h-[680px] rounded-full bg-radial from-teal-300/25 via-emerald-100/20 to-transparent blur-3xl"
      />

      {/* 4. Center Subtle Pulse Orb */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.2, 0.38, 0.2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute top-[45%] left-[35%] -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-radial from-teal-200/30 via-transparent to-transparent blur-2xl"
      />

      {/* 5. Soft SVG Vocal Frequency Contour Wave Lines */}
      <svg
        className="absolute top-1/4 left-0 w-full h-[600px] opacity-[0.14] stroke-teal-700"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M-100,200 C300,100 600,320 1000,180 C1300,60 1500,240 1600,200"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          animate={{
            d: [
              "M-100,200 C300,100 600,320 1000,180 C1300,60 1500,240 1600,200",
              "M-100,240 C350,160 550,260 950,220 C1250,120 1480,200 1600,240",
              "M-100,200 C300,100 600,320 1000,180 C1300,60 1500,240 1600,200",
            ],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M-100,340 C250,420 650,240 1050,380 C1350,460 1480,300 1600,340"
          strokeWidth="1.2"
          strokeDasharray="4 10"
          animate={{
            d: [
              "M-100,340 C250,420 650,240 1050,380 C1350,460 1480,300 1600,340",
              "M-100,300 C300,360 700,290 1100,320 C1300,400 1520,340 1600,300",
              "M-100,340 C250,420 650,240 1050,380 C1350,460 1480,300 1600,340",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </svg>

      {/* 6. Floating Ambient Memory Dust Particles */}
      {[
        { top: '15%', left: '20%', size: 4, delay: 0, duration: 9 },
        { top: '25%', left: '78%', size: 5, delay: 2, duration: 11 },
        { top: '42%', left: '12%', size: 3, delay: 1, duration: 8 },
        { top: '55%', left: '85%', size: 4, delay: 3.5, duration: 10 },
        { top: '68%', left: '30%', size: 5, delay: 2.5, duration: 12 },
        { top: '82%', left: '70%', size: 3, delay: 4, duration: 9.5 },
        { top: '35%', left: '50%', size: 4, delay: 5, duration: 13 },
        { top: '88%', left: '15%', size: 4, delay: 1.8, duration: 10.5 },
      ].map((p, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-teal-400/40 blur-[0.5px]"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -35, -70, -35, 0],
            x: [0, (idx % 2 === 0 ? 15 : -15), 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};
