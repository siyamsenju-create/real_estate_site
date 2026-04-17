import { useEffect } from 'react';
import Lenis from 'lenis';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Properties from './components/Properties/Properties';
// import VirtualTour from './components/VirtualTour/VirtualTour';
// import Amenities from './components/Amenities/Amenities';
// import Gallery from './components/Gallery/Gallery';
// import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import Navbar from './components/Navbar/Navbar';
// import Footer from './components/Footer/Footer';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <main>
        <About />
        <Properties />
        {/* <VirtualTour /> */}
        {/* <Amenities /> */}
        {/* <Gallery /> */}
        {/* <Testimonials /> */}
        <Contact />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
