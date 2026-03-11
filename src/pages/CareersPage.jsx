import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Careers from '../components/Careers';
import Footer from '../components/Footer';

export default function CareersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative">
      <Navbar />
      <Careers />
      <Footer />
    </main>
  );
}
