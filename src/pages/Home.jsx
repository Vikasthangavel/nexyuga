import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Trusted from '../components/Trusted';
import SDGGoals from '../components/SDGGoals';
import Journey from '../components/Journey';
import VideoSection from '../components/VideoSection';
import Studies from '../components/Studies';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import EmojiRain from '../components/EmojiRain';
import PageAnimations from '../components/PageAnimations';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // 3D parallax on blobs
    gsap.utils.toArray('.parallax-blob').forEach((el) => {
      gsap.to(el, {
        y: -80,
        rotateZ: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    // Fade-up sections with 3D flip
    gsap.utils.toArray('.gsap-fade-up').forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 80, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Fun section scale bounce
    gsap.utils.toArray('.gsap-bounce-in').forEach((el) => {
      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <main className="relative">
      <PageAnimations />
      {/* Emoji rain disabled */}
      <EmojiRain count={15} />

      <Navbar />
      <Hero />

      <div className="gsap-bounce-in">
        <Trusted />
      </div>

      <div className="gsap-fade-up">
        <SDGGoals />
      </div>

      <div className="gsap-fade-up">
        <Journey />
      </div>

      <div className="gsap-fade-up">
        <VideoSection />
      </div>

      <div className="gsap-fade-up">
        <Studies />
      </div>

      <div className="gsap-bounce-in">
        <Testimonials />
      </div>

      <div className="gsap-fade-up">
        <Gallery />
      </div>

      <Footer />
    </main>
  );
}
