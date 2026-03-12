<<<<<<< HEAD
import { motion } from 'framer-motion';

const EASE = [0.55, 0.085, 0, 0.99];

const perks = [
  { title: 'Innovation First', desc: 'Work on cutting-edge tactile and audio learning tools that are changing lives.' },
  { title: 'Collaborative Culture', desc: 'A close-knit team of engineers, designers, and educators building together.' },
  { title: 'Social Impact', desc: 'Every line of code, every design — directly helps visually impaired children learn.' },
  { title: 'Growth & Learning', desc: 'Mentorship, workshops, and the freedom to experiment with new ideas.' },
];

const openPositions = [];
=======
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaUsers, FaLightbulb, FaHandsHelping, FaPaperPlane, FaMapMarkerAlt, FaTimes, FaFileAlt, FaCheckCircle } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { useCollection } from '../hooks/useCollection';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { uploadRawToCloudinary } from '../lib/cloudinary';

const perks = [
  { icon: FaLightbulb, title: 'Innovation First', desc: 'Work on cutting-edge tactile and audio learning tools that are changing lives.', color: '#06B6D4' },
  { icon: FaUsers, title: 'Collaborative Culture', desc: 'A close-knit team of engineers, designers, and educators building together.', color: '#0197B2' },
  { icon: FaHandsHelping, title: 'Social Impact', desc: 'Every line of code, every design — directly helps visually impaired children learn.', color: '#5ACB2A' },
  { icon: FaBriefcase, title: 'Growth & Learning', desc: 'Mentorship, workshops, and the freedom to experiment with new ideas.', color: '#14B8A6' },
];

/* ── Apply Modal ─────────────────────────────────────── */
function ApplyModal({ position, onClose }) {
  const blank = { name: '', email: '', phone: '', coverLetter: '' };
  const [form, setForm] = useState(blank);
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef();
>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!resumeFile) { setError('Please attach your resume (PDF/DOC).'); return; }
    setError('');
    setSubmitting(true);
    try {
      const { url: resumeUrl } = await uploadRawToCloudinary(resumeFile, 'nexyuga/resumes');
      await addDoc(collection(db, 'applications'), {
        ...form,
        positionId: position.id,
        positionTitle: position.title,
        resumeUrl,
        resumeName: resumeFile.name,
        status: 'New',
        createdAt: serverTimestamp(),
      });
      setDone(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-dark/50 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
          initial={{ scale: 0.92, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-dark">Apply for Position</h2>
              <p className="text-sm text-primary font-medium mt-0.5">{position.title}
                {position.location && <span className="text-dark/40 font-normal"> · {position.location}</span>}
              </p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition shrink-0 ml-4">
              <FaTimes size={13} className="text-dark/60" />
            </button>
          </div>

          {done ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="text-6xl mb-4"
              >
                <FaCheckCircle className="text-[#5ACB2A]" />
              </motion.div>
              <h3 className="text-xl font-bold text-dark mb-2">Application Submitted!</h3>
              <p className="text-dark/50 text-sm mb-6">We'll review your application and get back to you soon.</p>
              <button onClick={onClose}
                className="px-6 py-2.5 rounded-full text-white text-sm font-semibold bg-primary hover:bg-primary-dark transition">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-dark/60 uppercase tracking-wide mb-1.5">Full Name *</label>
                <input required value={form.name} onChange={e => set('name', e.target.value)}
                  placeholder="Your full name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-dark/60 uppercase tracking-wide mb-1.5">Email *</label>
                  <input required type="email" value={form.email} onChange={e => set('email', e.target.value)}
                    placeholder="you@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition" />
                </div>
                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-dark/60 uppercase tracking-wide mb-1.5">Phone</label>
                  <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition" />
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-xs font-semibold text-dark/60 uppercase tracking-wide mb-1.5">Cover Letter</label>
                <textarea value={form.coverLetter} onChange={e => set('coverLetter', e.target.value)}
                  rows={4} placeholder="Tell us why you're a great fit…"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition resize-none" />
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-xs font-semibold text-dark/60 uppercase tracking-wide mb-1.5">Resume / CV *</label>
                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                  onChange={e => { setResumeFile(e.target.files[0]); setError(''); }} />
                <button type="button" onClick={() => fileRef.current.click()}
                  className="w-full border-2 border-dashed border-gray-200 hover:border-primary rounded-xl p-4 flex items-center gap-3 transition group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-primary/10 flex items-center justify-center transition shrink-0">
                    <FaFileAlt size={18} className="text-gray-400 group-hover:text-primary transition" />
                  </div>
                  {resumeFile
                    ? <div className="text-left"><p className="text-sm font-semibold text-dark">{resumeFile.name}</p><p className="text-xs text-dark/40">{(resumeFile.size / 1024).toFixed(1)} KB</p></div>
                    : <div className="text-left"><p className="text-sm font-semibold text-dark/60">Click to attach resume</p><p className="text-xs text-dark/40">PDF, DOC, DOCX — up to 10 MB</p></div>
                  }
                  {resumeFile && <FaCheckCircle className="text-[#5ACB2A] ml-auto shrink-0" size={18} />}
                </button>
              </div>

              {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

              <button type="submit" disabled={submitting}
                className="w-full py-3.5 rounded-2xl text-white font-bold text-sm shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 bg-primary hover:bg-primary-dark">
                {submitting ? 'Submitting…' : 'Submit Application 🚀'}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Main Careers Component ──────────────────────────── */
export default function Careers() {
  const { data: openPositions, loading } = useCollection('careers');
  const [applyingTo, setApplyingTo] = useState(null);

  const active = openPositions.filter(p => p.active !== false);

  return (
<<<<<<< HEAD
    <section id="careers" className="relative overflow-hidden">
      {/* Hero Banner */}
      <div className="pt-36 sm:pt-44 pb-20 sm:pb-28 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark tracking-tight mb-4"
        >
          Join <span className="gradient-text">Our Team</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-sm"
        >
          <a href="/" className="hover:text-dark transition-colors">Home</a>
          <span className="mx-2">/</span>
          <span className="text-primary">Careers</span>
        </motion.div>
      </div>

      {/* About Section */}
      <div className="py-20 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/60 mb-4 block"
            >
              We're Hiring
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-3xl sm:text-4xl font-bold text-dark tracking-tight mb-5"
            >
              Join Our Team at <span className="gradient-text">Nexyuga</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 font-light max-w-2xl mx-auto"
            >
              We're on a mission to make learning accessible for everyone. If you're passionate about creating impact and love experimenting with ideas, this is the place for you.
=======
    <section id="careers" className="relative overflow-hidden" aria-label="Careers">
      {/* Apply Modal */}
      {applyingTo && <ApplyModal position={applyingTo} onClose={() => setApplyingTo(null)} />}

      {/* ── Hero Banner ── */}
      <div className="relative bg-gradient-to-br from-dark via-dark-light to-[#0a3d4d] pt-36 sm:pt-44 pb-24 sm:pb-32 overflow-hidden">
        <motion.div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity }} aria-hidden="true" />
        <motion.div className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 8, repeat: Infinity, delay: 2 }} aria-hidden="true" />
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-accent/5 rounded-full blur-3xl"
          animate={{ scaleX: [1, 1.3, 1] }} transition={{ duration: 6, repeat: Infinity }} aria-hidden="true" />
        {['🎯', '💼', '🚀', '✨', '🌟'].map((e, i) => (
          <motion.div key={i} className="absolute text-xl pointer-events-none opacity-15"
            style={{ left: `${10 + i * 20}%`, top: `${20 + (i % 3) * 20}%` }}
            animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }} aria-hidden="true">
            {e}
          </motion.div>
        ))}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">
            Join{' '}
            <motion.span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent inline-block"
              style={{ WebkitBackgroundClip: 'text' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 5, repeat: Infinity }}>
              Us
            </motion.span>{' '}
            <motion.span className="inline-block"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              🤝
            </motion.span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.3 }} className="flex items-center justify-center gap-2 text-white/50 text-sm">
            <a href="#home" className="hover:text-white/80 transition-colors">Home</a>
            <span>/</span>
            <span className="text-primary-light">Join Us</span>
          </motion.div>
        </div>
      </div>

      {/* ── About / Intro ── */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-bg relative">
        <div className="absolute top-10 right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl" aria-hidden="true" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-secondary/5 rounded-full blur-2xl" aria-hidden="true" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }} className="text-center mb-12">
            <motion.span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-5"
              whileHover={{ scale: 1.05 }}>
              <HiSparkles className="text-base" /> We're Hiring
            </motion.span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-6">
              Join Our Team at{' '}
              <motion.span className="text-primary inline-block" whileHover={{ scale: 1.05, rotate: -2 }}>
                Nexyuga Innovations
              </motion.span>
            </h2>
            <motion.p className="text-dark/60 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              We're on a mission to make learning accessible for everyone, especially visually impaired learners.
              If you're passionate about creating impact, love experimenting with ideas, and want to grow in a
              collaborative environment, this is the place for you. 🚀
>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f
            </motion.p>
          </div>

<<<<<<< HEAD
          {/* Perks */}
          <div className="grid sm:grid-cols-2 gap-5 mt-10">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary/15 hover:shadow-md hover:-translate-y-0.5 transition-all duration-500"
              >
                <h3 className="font-bold text-dark text-[15px] mb-1">{perk.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{perk.desc}</p>
=======
          <div className="grid sm:grid-cols-2 gap-5 mt-12">
            {perks.map((perk, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.1, type: 'spring', stiffness: 150 }}
                whileHover={{ y: -8, scale: 1.03, boxShadow: `0 20px 40px ${perk.color}25` }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm group cursor-default relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${perk.color}, ${perk.color}80)` }} />
                <div className="flex items-start gap-4">
                  <motion.div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: perk.color + '15' }} whileHover={{ scale: 1.15 }} transition={{ duration: 0.3 }}>
                    <perk.icon size={22} style={{ color: perk.color }} />
                  </motion.div>
                  <div>
                    <h3 className="font-heading font-bold text-dark text-base mb-1">{perk.title}</h3>
                    <p className="text-dark/55 text-sm leading-relaxed">{perk.desc}</p>
                  </div>
                </div>
>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f
              </motion.div>
            ))}
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Open Positions */}
      <div className="py-20 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-3xl sm:text-4xl font-bold text-dark tracking-tight text-center mb-10"
          >
            Open <span className="gradient-text">Positions</span>
          </motion.h2>

          {openPositions.length > 0 ? (
            <div className="space-y-4">
              {openPositions.map((pos, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div>
                    <h3 className="font-bold text-dark mb-1">{pos.title}</h3>
                    <p className="text-gray-500 text-sm font-light">{pos.type} · {pos.location}</p>
=======
      {/* ── Open Positions ── */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 relative">
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-secondary/5 rounded-full blur-3xl" aria-hidden="true" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark mb-2">
              Open{' '}
              <motion.span className="text-primary inline-block"
                animate={{ rotate: [0, 2, -2, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                Positions
              </motion.span>{' '}
              <motion.span className="inline-block"
                animate={{ y: [0, -6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                💼
              </motion.span>
            </h2>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : active.length > 0 ? (
            <div className="space-y-5">
              {active.map((pos, i) => (
                <motion.div key={pos.id}
                  initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, type: 'spring' }}
                  whileHover={{ y: -4, boxShadow: '0 15px 40px rgba(0,0,0,0.08)' }}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="font-heading font-bold text-lg text-dark mb-1">{pos.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-dark/50">
                        <span className="inline-flex items-center gap-1"><FaBriefcase className="text-primary" size={12} /> {pos.type}</span>
                        {pos.location && <span className="inline-flex items-center gap-1"><FaMapMarkerAlt className="text-accent" size={12} /> {pos.location}</span>}
                      </div>
                      {pos.description && <p className="text-dark/60 text-sm mt-2 leading-relaxed">{pos.description}</p>}
                    </div>
                    <motion.button
                      onClick={() => setApplyingTo(pos)}
                      whileHover={{ scale: 1.08, boxShadow: '0 5px 20px rgba(1,151,178,0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark transition text-white text-sm font-semibold rounded-full shadow-md whitespace-nowrap">
                      Apply Now <FaPaperPlane size={12} />
                    </motion.button>
>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-dark text-white text-sm font-medium rounded-full hover:bg-dark/90 transition-colors"
                  >
                    Apply Now
                  </a>
                </motion.div>
              ))}
            </div>
          ) : (
<<<<<<< HEAD
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-14"
            >
              <p className="text-primary font-medium mb-1">No openings right now.</p>
              <p className="text-gray-400 text-sm font-light mb-6">Check back later — we're always growing!</p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 bg-dark text-white text-sm font-medium rounded-full hover:bg-dark/90 transition-colors"
              >
                Send Your Resume
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </a>
=======
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.5, type: 'spring' }} className="text-center py-16">
              <motion.div className="text-6xl mb-6"
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                🔍
              </motion.div>
              <p className="text-primary font-medium text-base mb-2">Currently we do not have any openings now.</p>
              <p className="text-dark/40 text-sm">Please check back later. We're always growing! 🌱</p>
              <motion.button
                onClick={() => setApplyingTo({ id: 'general', title: 'General Application', location: '' })}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(1,151,178,0.25)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 mt-8 px-7 py-3 bg-primary hover:bg-primary-dark transition text-white font-semibold rounded-full shadow-lg text-sm">
                <FaPaperPlane size={13} /> Send Your Resume Anyway
              </motion.button>
>>>>>>> 9c561776da4a6ce87c05557ab683098087f0b50f
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
