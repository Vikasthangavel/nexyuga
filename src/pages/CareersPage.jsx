import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Careers from '../components/Careers';
import Footer from '../components/Footer';
import PageAnimations from '../components/PageAnimations';

export default function CareersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      <PageAnimations />
      <Navbar />
      <Careers />
      <Footer />
    </main>
  );
}
