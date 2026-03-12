import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const contactInfo = [
  {
    icon: FaPhone,
    label: 'Call Us Now',
    value: '+91 70940 94815',
    href: 'tel:+917094094815',
  },
  {
    icon: FaEnvelope,
    label: 'Email Address',
    value: 'info@nexyuga.in',
    href: 'mailto:info@nexyuga.in',
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Office Location',
    value: 'Tiruchengode, Tamil Nadu',
    href: 'https://maps.google.com/?q=KSR+Kalvi+Nagar+Tiruchengode',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await addDoc(collection(db, 'enquiries'), {
        ...form,
        read: false,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Failed to save enquiry:', err);
    } finally {
      setSending(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };


  return (
    <section id="contact-page" className="py-24 px-6 sm:px-8 lg:px-12 bg-white relative overflow-hidden flex flex-col items-center">
      {/* Sleek animated background gradient */}
      <motion.div
        animate={{ filter: ['hue-rotate(0deg)', 'hue-rotate(15deg)', 'hue-rotate(0deg)'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-white to-secondary/5 pointer-events-none"
      />

      <div className="max-w-4xl w-full relative z-10 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-primary mb-3 block">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold text-dark tracking-tight">Let's Connect</h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg font-light leading-relaxed">
            Whether you have a question or want to collaborate, we're ready to hear from you. Drop us a message below.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-gray-100 mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { name: 'name', type: 'text', placeholder: 'Your Name' },
                { name: 'email', type: 'email', placeholder: 'Email Address' },
              ].map((field, idx) => (
                <div key={idx} className="relative">
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder={field.placeholder}
                    className="w-full bg-gray-50/50 border-b-2 border-transparent px-4 py-4 rounded-xl text-dark placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all duration-300"
                  />
                  <motion.div 
                    initial={false}
                    animate={{ width: focusedField === field.name ? '100%' : '0%' }}
                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  />
                </div>
              ))}
            </div>

            <div className="relative">
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField(null)}
                placeholder="Subject"
                className="w-full bg-gray-50/50 border-b-2 border-transparent px-4 py-4 rounded-xl text-dark placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all duration-300"
              />
              <motion.div 
                 initial={false}
                 animate={{ width: focusedField === 'subject' ? '100%' : '0%' }}
                 className="absolute bottom-0 left-0 h-0.5 bg-primary"
              />
            </div>

            <div className="relative">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                placeholder="How can we help you?"
                required
                rows={5}
                className="w-full bg-gray-50/50 border-b-2 border-transparent px-4 py-4 rounded-xl text-dark placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all duration-300 resize-none"
              />
               <motion.div 
                 initial={false}
                 animate={{ width: focusedField === 'message' ? '100%' : '0%' }}
                 className="absolute bottom-0 left-0 h-0.5 bg-primary"
              />
            </div>

            <div className="text-center pt-4">
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-10 py-4 bg-dark text-white rounded-full font-medium shadow-xl hover:bg-dark/90 transition-all overflow-hidden relative group disabled:opacity-70"
              >
                <div className="absolute inset-0 w-1/4 h-full bg-white/10 skew-x-12 -ml-16 group-hover:animate-shimmer" />
                <span>{submitted ? 'Message Sent' : sending ? 'Sending…' : 'Send Message'}</span>
                {submitted ? <span className="ml-2">✓</span> : <FaPaperPlane className="ml-2 text-sm" />}
              </motion.button>
              
              <AnimatePresence>
                {submitted && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-green-600 mt-4 text-sm font-medium"
                  >
                    Thank you! We will get back to you shortly.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>

        {/* Contact Information Horizontal Cards */}
        <div className="grid md:grid-cols-3 gap-6 w-full">
          {contactInfo.map((info, idx) => (
            <motion.a
              key={idx}
              href={info.href}
              target={info.icon === FaMapMarkerAlt ? '_blank' : undefined}
              rel={info.icon === FaMapMarkerAlt ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center mb-5 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <info.icon size={20} />
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">{info.label}</h3>
              <p className="text-dark font-bold text-lg">{info.value}</p>
            </motion.a>
          ))}
        </div>
      </div>
      
      {/* Tailwind custom shimmer animation added inline dynamically via index.css or arbitrary tailwind, using absolute classes above */}
    </section>
  );
}
