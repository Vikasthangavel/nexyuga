import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import PageAnimations from '../components/PageAnimations';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      <PageAnimations />
      <Navbar />
      <Contact />
      <Footer />
    </main>
  );
}
