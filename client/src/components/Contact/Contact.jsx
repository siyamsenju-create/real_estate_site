import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import styles from './Contact.module.scss';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');
  
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className={styles.contactSection} ref={sectionRef}>
      <div className={['container', styles.content].join(' ')}>
        <div className={styles.info}>
          <h2>Register Your Interest</h2>
          <p>Contact our luxury real estate advisors to arrange a private viewing or request our exclusive portfolio.</p>
          
          <div className={styles.details}>
            <div className={styles.item}>
              <h4>Address</h4>
              <p>1 Luxury Ave, Metropolis, NY 10001</p>
            </div>
            <div className={styles.item}>
              <h4>Contact</h4>
              <p>+1 (800) 123-4567<br/>inquiries@luxerealestate.com</p>
            </div>
          </div>
        </div>

        <form className={['glass-panel', styles.form].join(' ')} onSubmit={handleSubmit} ref={formRef}>
          <div className={styles.inputGroup}>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Full Name" 
              required 
            />
          </div>
          <div className={styles.inputGroup}>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Email Address" 
              required 
            />
          </div>
          <div className={styles.inputGroup}>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="Phone Number" 
              required 
            />
          </div>
          <div className={styles.inputGroup}>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              placeholder="Your Message..." 
              required 
              rows="4"
            ></textarea>
          </div>
          
          <motion.button 
            type="submit" 
            className={styles.submitBtn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
          </motion.button>
          
          {status === 'success' && <p className={styles.success}>Your inquiry has been sent successfully. We will contact you soon.</p>}
          {status === 'error' && <p className={styles.error}>There was an error sending your message. Please try again.</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
