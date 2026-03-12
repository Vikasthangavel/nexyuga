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
import PageAnimations from '../components/PageAnimations';
import { SpacerDivider, CenterLineDivider, DotAccent, GlowingOrbDivider } from '../components/SectionDivider';

gsap.registerPlugin(ScrollTrigger);

/* Nimo-inspired easing */
const NIMO_EASE = 'power4.out';

export default function Home() {
  useEffect(() => {
    /* Cinematic fade-up reveal with 3D perspective rotation */
    gsap.utils.toArray('.gsap-fade-up').forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 100, rotateX: 8, transformPerspective: 1400, transformOrigin: 'center bottom', filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: NIMO_EASE,
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    /* Scale entrance with blur reveal */
    gsap.utils.toArray('.gsap-scale-in').forEach((el) => {
      gsap.fromTo(
        el,
        { scale: 0.85, opacity: 0, filter: 'blur(10px)', transformPerspective: 1200 },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: NIMO_EASE,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    /* Slide from left */
    gsap.utils.toArray('.gsap-slide-left').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: -80, rotateY: 10 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1.2,
          ease: NIMO_EASE,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    /* Slide from right */
    gsap.utils.toArray('.gsap-slide-right').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: 80, rotateY: -10 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1.2,
          ease: NIMO_EASE,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    /* Parallax floating shapes */
    gsap.utils.toArray('.gsap-parallax').forEach((el) => {
      gsap.fromTo(
        el,
        { yPercent: 30 },
        {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            scrub: 3,
          },
        }
      );
    });

    /* Stagger reveal for children */
    gsap.utils.toArray('.gsap-stagger-container').forEach((container) => {
      const children = container.querySelectorAll('.gsap-stagger-item');
      if (children.length) {
        gsap.fromTo(
          children,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: NIMO_EASE,
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    /* Rotation reveal */
    gsap.utils.toArray('.gsap-rotate-in').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, rotation: -15, scale: 0.9 },
        {
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      <PageAnimations />

      <Navbar />
      <Hero />

      {/* Minimal spacer after Hero */}
      <SpacerDivider />

      <div className="gsap-scale-in">
        <Trusted />
      </div>

      {/* Clean center line divider */}
      <CenterLineDivider />

      <div className="gsap-fade-up">
        <SDGGoals />
      </div>

      {/* Subtle dot accent */}
      <DotAccent />

      <div className="gsap-slide-left">
        <Journey />
      </div>

      {/* Minimal spacer */}
      <SpacerDivider />

      <div className="gsap-slide-right">
        <VideoSection />
      </div>

      {/* No divider before Studies - it has dark bg */}

      <div className="gsap-fade-up">
        <Studies />
      </div>

      {/* Subtle orb divider */}
      <GlowingOrbDivider />

      <div className="gsap-rotate-in">
        <Testimonials />
      </div>

      {/* Center line divider */}
      <CenterLineDivider />

      <div className="gsap-scale-in">
        <Gallery />
      </div>

      <Footer />
    </main>
  );
}
