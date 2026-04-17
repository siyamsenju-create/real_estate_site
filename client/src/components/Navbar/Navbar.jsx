import { useState, useEffect } from 'react';
import styles from './Navbar.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={[styles.navbar, scrolled ? styles.scrolled : ''].join(' ')}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className={styles.logo}>
        <span>LUXE</span> EST.
      </div>
      
      <nav className={styles.navLinks}>
        <a href="#about">About</a>
        <a href="#properties">Properties</a>
        <a href="#amenities">Amenities</a>
        <a href="#contact">Contact</a>
      </nav>

      <button className={styles.menuBtn}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </button>
    </motion.header>
  );
};

export default Navbar;
