import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.scss';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Image Parallax
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text Reveal
      gsap.from(textRef.current.children, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className={styles.aboutSection}>
      <div className={['container', styles.content].join(' ')}>
        <div className={styles.textContent} ref={textRef}>
          <h2 className={styles.subtitle}>Our Vision</h2>
          <h1 className={styles.title}>Crafting Spaces that Elevate Your Lifestyle.</h1>
          <p className={styles.description}>
            We believe that a home is more than just a place to live. It is a sanctuary, a reflection of your achievements, and a canvas for your future.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.readMoreBtn}
          >
            Discover Our Story
          </motion.button>
        </div>
        
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <img 
              ref={imageRef} 
              src="/assets/interior.png" 
              alt="Luxury Interior" 
              className={styles.image} 
            />
            <div className={styles.overlay}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
