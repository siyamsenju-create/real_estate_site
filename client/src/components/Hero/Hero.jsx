import { useRef, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LuxuryBuilding from './LuxuryBuilding';
import styles from './Hero.module.scss';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const cameraRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          pin: true,
        }
      });

      // Simple DOM animations
      tl.to(textRef.current, {
        opacity: 0,
        y: -100,
        duration: 1,
      });

      // We handle the 3D camera zoom animation inside the Canvas 
      // through standard React state or a shared mutable ref if needed,
      // but for this Hero, tying it to window scroll listener directly or GSAP is possible.
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.heroContainer}>
      <div className={styles.canvasWrapper}>
        <Canvas>
          <PerspectiveCamera 
            makeDefault 
            ref={cameraRef} 
            position={[0, 2, 10]} 
            fov={50} 
          />
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} color="#d4af37" />
          <rectAreaLight width={10} height={10} position={[-5, 5, 0]} intensity={2} color="#ffffff" />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <LuxuryBuilding cameraRef={cameraRef} />
          <Environment preset="city" />
        </Canvas>
      </div>

      <div ref={textRef} className={styles.uiOverlay}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          className={styles.textContent}
        >
          <h1>Luxury Living<br /><span>Redefined</span></h1>
          <p>Find Your Dream Property in the Heart of the City.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.ctaButton}
          >
            Explore Properties
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
