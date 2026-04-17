import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import styles from './Properties.module.scss';

gsap.registerPlugin(ScrollTrigger);

const fallbackProperties = [
  {
    _id: '1',
    title: 'The Aurum Penthouse',
    location: 'Downtown Core',
    price: '$5,200,000',
    bedrooms: 4,
    bathrooms: 4.5,
    area: '4,500 sqft',
    image: '/assets/exterior.png'
  },
  {
    _id: '2',
    title: 'Azure Sky Villa',
    location: 'Marina Bay',
    price: '$3,800,000',
    bedrooms: 3,
    bathrooms: 3,
    area: '3,200 sqft',
    image: '/assets/interior.png'
  },
  {
    _id: '3',
    title: 'Obsidian Loft',
    location: 'Arts District',
    price: '$2,100,000',
    bedrooms: 2,
    bathrooms: 2,
    area: '1,800 sqft',
    image: '/assets/exterior.png'
  }
];

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Fetch from backend
    const fetchProperties = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/properties');
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        if (data.length > 0) {
          setProperties(data);
        } else {
          setProperties(fallbackProperties);
        }
      } catch (err) {
        console.log('Using fallback properties');
        setProperties(fallbackProperties);
      }
    };
    
    fetchProperties();
  }, []);

  useLayoutEffect(() => {
    if (properties.length === 0) return;

    let ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [properties]);

  return (
    <section id="properties" className={styles.propertiesSection} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <h2>Featured Properties</h2>
          <p>Curated selections of our most prestigious listings.</p>
        </div>

        <div className={styles.grid}>
          {properties.map((property, idx) => (
            <motion.div 
              key={property._id} 
              className={['glass-panel', styles.card].join(' ')}
              ref={el => cardsRef.current[idx] = el}
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className={styles.imageContainer}>
                <img src={property.image} alt={property.title} />
              </div>
              <div className={styles.content}>
                <div className={styles.price}>{property.price}</div>
                <h3>{property.title}</h3>
                <p className={styles.location}>{property.location}</p>
                
                <div className={styles.specs}>
                  <span>{property.bedrooms} Bed</span>
                  <span>{property.bathrooms} Bath</span>
                  <span>{property.area}</span>
                </div>
                
                <button className={styles.viewBtn}>View Details</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
