// src/pages/AdminPage.jsx
import { useState, useRef, useEffect } from 'react';
import logoUrl from '../assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import {
  collection, addDoc, deleteDoc, doc, updateDoc, serverTimestamp, setDoc, getDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { uploadToCloudinary } from '../lib/cloudinary';
import { useCollection } from '../hooks/useCollection';
import { FaTrash, FaPlus, FaEdit, FaCheck, FaTimes, FaUpload, FaStar, FaEye, FaEyeSlash } from 'react-icons/fa';
import { HiPhotograph } from 'react-icons/hi';

/* ─── Reusable helpers ───────────────────────────────────────── */
function Spinner() {
  return (
    <div className="inline-block w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
  );
}

function StatusBadge({ loading, error }) {
  if (loading) return <span className="text-xs text-gray-600 animate-pulse">Loading…</span>;
  if (error)   return <span className="text-xs text-red-500">Error: {error}</span>;
  return null;
}

function DeleteBtn({ onClick, busy }) {
  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition disabled:opacity-50"
      title="Delete"
    >
      {busy ? <Spinner /> : <FaTrash size={13} />}
    </button>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-semibold text-white/60 uppercase tracking-wide">{label}</label>}
      <input
        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200 transition placeholder-gray-500"
        {...props}
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-semibold text-white/60 uppercase tracking-wide">{label}</label>}
      <textarea
        rows={3}
        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200 transition placeholder-gray-500 resize-none"
        {...props}
      />
    </div>
  );
}

function ImageUploadField({ label, onUpload, folder }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [url, setUrl] = useState('');
  const inputRef = useRef();

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const result = await uploadToCloudinary(file, folder);
      setUrl(result.url);
      onUpload(result.url);
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-semibold text-dark/60 uppercase tracking-wide">{label}</label>}
      <div
        onClick={() => inputRef.current.click()}
        className="border-2 border-dashed border-gray-200 hover:border-gray-900 rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center gap-2 transition min-h-[100px]"
      >
        {uploading ? (
          <Spinner />
        ) : preview ? (
          <img src={preview} alt="preview" className="h-20 object-contain rounded-lg" />
        ) : (
          <>
            <HiPhotograph size={28} className="text-gray-300" />
            <span className="text-xs text-dark/40">Click to upload image</span>
          </>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {url && <p className="text-xs text-gray-700 truncate">✓ Uploaded</p>}
    </div>
  );
}

/* ─── GALLERY TAB ────────────────────────────────────────────── */
function GalleryTab() {
  const { data, loading, error } = useCollection('gallery');
  const [caption, setCaption] = useState('');
  const [queue, setQueue] = useState([]); // { file, name, status: 'pending'|'uploading'|'done'|'error' }
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const inputRef = useRef();

  function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    setQueue(files.map(f => ({ file: f, name: f.name, status: 'pending' })));
    e.target.value = '';
  }

  async function handleUploadAll() {
    if (queue.length === 0) return;
    setUploading(true);
    for (let i = 0; i < queue.length; i++) {
      setQueue(q => q.map((item, idx) => idx === i ? { ...item, status: 'uploading' } : item));
      try {
        const result = await uploadToCloudinary(queue[i].file, 'nexyuga/gallery');
        await addDoc(collection(db, 'gallery'), {
          imageUrl: result.url,
          caption,
          createdAt: serverTimestamp(),
        });
        setQueue(q => q.map((item, idx) => idx === i ? { ...item, status: 'done' } : item));
      } catch (err) {
        setQueue(q => q.map((item, idx) => idx === i ? { ...item, status: 'error' } : item));
      }
      if (i < queue.length - 1) await new Promise(r => setTimeout(r, 1000)); // 1s between uploads
    }
    setUploading(false);
    setTimeout(() => { setQueue([]); setCaption(''); }, 1500);
  }

  async function handleDelete(id) {
    setDeleting(id);
    await deleteDoc(doc(db, 'gallery', id));
    setDeleting(null);
  }

  const statusIcon = s => ({ pending: '⏳', uploading: '🔄', done: '✅', error: '❌' }[s]);

  return (
    <div className="space-y-6">
      {/* Add form */}
      <div className="bg-gray-50/80 rounded-3xl border border-gray-100/50 p-6 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-dark text-lg">Add Gallery Images</h3>

        {/* Drop zone */}
        <div
          onClick={() => inputRef.current.click()}
          className="border-2 border-dashed border-gray-200 hover:border-gray-900 rounded-xl p-6 cursor-pointer flex flex-col items-center justify-center gap-2 transition min-h-[100px]"
        >
          <HiPhotograph size={32} className="text-gray-300" />
          <span className="text-sm text-dark/50">Click to select <strong>multiple images</strong></span>
          {queue.length > 0 && <span className="text-xs text-gray-900 font-semibold">{queue.length} file(s) selected</span>}
        </div>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileSelect} />

        {/* Per-file status rows */}
        {queue.length > 0 && (
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {queue.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs px-3 py-1.5 bg-white rounded-lg border border-gray-100">
                <span className="text-base">{statusIcon(item.status)}</span>
                <span className="flex-1 truncate text-dark/70">{item.name}</span>
                <span className={`font-semibold ${ item.status === 'done' ? 'text-gray-700' : item.status === 'error' ? 'text-red-500' : item.status === 'uploading' ? 'text-gray-600 animate-pulse' : 'text-gray-400' }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}

        <Input label="Caption for all (optional)" value={caption} onChange={e => setCaption(e.target.value)} placeholder="e.g. Empower 2025, IIT Delhi" />

        <div className="flex gap-2">
          <button
            onClick={handleUploadAll}
            disabled={uploading || queue.length === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {uploading ? <Spinner /> : <FaUpload size={12} />}
            {uploading ? 'Uploading…' : `Upload ${queue.length > 0 ? queue.length : ''} Image${queue.length !== 1 ? 's' : ''}`}
          </button>
          {queue.length > 0 && !uploading && (
            <button onClick={() => setQueue([])} className="px-4 py-2.5 bg-gray-200 text-dark rounded-xl text-sm font-semibold hover:bg-gray-300 transition">
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Existing images */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-heading font-bold text-dark text-lg">Gallery Images</h3>
          <StatusBadge loading={loading} error={error} />
          <span className="ml-auto text-xs text-dark/40">{data.length} items</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {data.map(item => (
            <div key={item.id} className="relative group rounded-xl overflow-hidden border border-gray-100">
              <img src={item.imageUrl} alt={item.caption} className="w-full h-28 object-cover" />
              {item.caption && <p className="text-xs text-dark/60 px-2 py-1 bg-white">{item.caption}</p>}
              <button onClick={() => handleDelete(item.id)} disabled={deleting === item.id}
                className="absolute top-1.5 right-1.5 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                {deleting === item.id ? <Spinner /> : <FaTrash size={10} />}
              </button>
            </div>
          ))}
          {!loading && data.length === 0 && <p className="col-span-full text-sm text-dark/40 text-center py-6">No gallery images yet</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── JOURNEY TAB ────────────────────────────────────────────── */

function JourneyTab() {
  const { data, loading, error } = useCollection('journey', 'year');
  const blank = { year: '', title: '', desc: '', badge: '', color: '#0197B2', step: '' };
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [editing, setEditing] = useState(null); // id being edited

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleSave() {
    if (!form.year || !form.title) return alert('Year and Title are required');
    setSaving(true);
    if (editing) {
      await updateDoc(doc(db, 'journey', editing), { ...form });
      setEditing(null);
    } else {
      await addDoc(collection(db, 'journey'), { ...form, createdAt: serverTimestamp() });
    }
    setForm(blank);
    setSaving(false);
  }

  async function handleDelete(id) {
    setDeleting(id);
    await deleteDoc(doc(db, 'journey', id));
    setDeleting(null);
  }

  function startEdit(item) {
    setEditing(item.id);
    setForm({ year: item.year, title: item.title, desc: item.desc, badge: item.badge, color: item.color, step: item.step || '' });
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50/80 rounded-3xl border border-gray-100/50 p-6 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-dark text-lg">{editing ? 'Edit Milestone' : 'Add Milestone'}</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <Input label="Year" value={form.year} onChange={e => set('year', e.target.value)} placeholder="2025" />
          <Input label="Badge label" value={form.badge} onChange={e => set('badge', e.target.value)} placeholder="e.g. Milestone" />
        </div>
        <Input label="Title" value={form.title} onChange={e => set('title', e.target.value)} placeholder="Award Winning Impact" />
        <Textarea label="Description" value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="What happened this year…" />
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-dark/60 uppercase tracking-wide">Accent Colour</label>
            <input type="color" value={form.color} onChange={e => set('color', e.target.value)} className="w-full h-10 rounded-xl border border-gray-200 cursor-pointer" />
          </div>
          <Input label="Step Number" value={form.step} onChange={e => set('step', e.target.value)} placeholder="01" />
        </div>
        <div className="flex gap-2">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-50">
            {saving ? <Spinner /> : <FaCheck size={12} />} {editing ? 'Update' : 'Add'}
          </button>
          {editing && (
            <button onClick={() => { setEditing(null); setForm(blank); }} className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-dark rounded-full hover:bg-gray-300 hover:-translate-y-0.5 transition-all text-sm font-semibold hover:bg-gray-300 transition">
              <FaTimes size={12} /> Cancel
            </button>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-heading font-bold text-dark text-lg">Milestones</h3>
          <StatusBadge loading={loading} error={error} />
          <span className="ml-auto text-xs text-dark/40">{data.length} items</span>
        </div>
        <div className="space-y-2">
          {data.map(item => (
            <div key={item.id} className="flex items-start gap-3 bg-white border border-gray-100/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs" style={{ backgroundColor: item.color }}>
                {item.year?.slice(-2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-dark">
                  <span className="text-gray-900 mr-2 opacity-80">{item.step ? `#${item.step}` : ''}</span>
                  {item.title}
                </p>
                <p className="text-xs text-dark/50 truncate">{item.desc}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => startEdit(item)} className="p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition"><FaEdit size={13} /></button>
                <DeleteBtn onClick={() => handleDelete(item.id)} busy={deleting === item.id} />
              </div>
            </div>
          ))}
          {!loading && data.length === 0 && <p className="text-sm text-dark/40 text-center py-6">No milestones yet</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── PARTNERS TAB ───────────────────────────────────────────── */
function PartnersTab() {
  const { data, loading, error } = useCollection('partners');
  const [queue, setQueue] = useState([]); // { file, name, partnerName, status }
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const inputRef = useRef();

  function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    setQueue(files.map(f => ({ file: f, name: f.name, partnerName: '', status: 'pending' })));
    e.target.value = '';
  }

  async function handleUploadAll() {
    if (queue.length === 0) return;
    setUploading(true);
    for (let i = 0; i < queue.length; i++) {
      setQueue(q => q.map((item, idx) => idx === i ? { ...item, status: 'uploading' } : item));
      try {
        const result = await uploadToCloudinary(queue[i].file, 'nexyuga/partners');
        await addDoc(collection(db, 'partners'), {
          name: queue[i].partnerName,
          imageUrl: result.url,
          createdAt: serverTimestamp(),
        });
        setQueue(q => q.map((item, idx) => idx === i ? { ...item, status: 'done' } : item));
      } catch {
        setQueue(q => q.map((item, idx) => idx === i ? { ...item, status: 'error' } : item));
      }
      if (i < queue.length - 1) await new Promise(r => setTimeout(r, 1000));
    }
    setUploading(false);
    setTimeout(() => setQueue([]), 1500);
  }

  async function handleDelete(id) {
    setDeleting(id);
    await deleteDoc(doc(db, 'partners', id));
    setDeleting(null);
  }

  const statusIcon = s => ({ pending: '⏳', uploading: '🔄', done: '✅', error: '❌' }[s]);

  return (
    <div className="space-y-6">
      <div className="bg-gray-50/80 rounded-3xl border border-gray-100/50 p-6 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-dark text-lg">Add Partner Logos</h3>

        <div
          onClick={() => inputRef.current.click()}
          className="border-2 border-dashed border-gray-200 hover:border-gray-900 rounded-xl p-6 cursor-pointer flex flex-col items-center justify-center gap-2 transition min-h-[100px]"
        >
          <HiPhotograph size={32} className="text-gray-300" />
          <span className="text-sm text-dark/50">Click to select <strong>multiple logos</strong></span>
          {queue.length > 0 && <span className="text-xs text-gray-900 font-semibold">{queue.length} file(s) selected</span>}
        </div>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileSelect} />

        {/* Name inputs per logo + status */}
        {queue.length > 0 && (
          <div className="space-y-2 max-h-52 overflow-y-auto">
            {queue.map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-3 py-2">
                <span className="text-base shrink-0">{statusIcon(item.status)}</span>
                <span className="text-xs text-dark/60 truncate w-28 shrink-0">{item.name}</span>
                <input
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-gray-900"
                  placeholder="Partner name"
                  value={item.partnerName}
                  disabled={uploading}
                  onChange={e => setQueue(q => q.map((it, idx) => idx === i ? { ...it, partnerName: e.target.value } : it))}
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleUploadAll}
            disabled={uploading || queue.length === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {uploading ? <Spinner /> : <FaUpload size={12} />}
            {uploading ? 'Uploading…' : `Upload ${queue.length > 0 ? queue.length : ''} Logo${queue.length !== 1 ? 's' : ''}`}
          </button>
          {queue.length > 0 && !uploading && (
            <button onClick={() => setQueue([])} className="px-4 py-2.5 bg-gray-200 text-dark rounded-xl text-sm font-semibold hover:bg-gray-300 transition">Clear</button>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-heading font-bold text-dark text-lg">Partners</h3>
          <StatusBadge loading={loading} error={error} />
          <span className="ml-auto text-xs text-dark/40">{data.length} items</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {data.map(item => (
            <div key={item.id} className="relative group flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-xl p-3 text-center">
              <img src={item.imageUrl} alt={item.name} className="h-12 object-contain" />
              <p className="text-xs font-semibold text-dark/70 truncate w-full">{item.name}</p>
              <button onClick={() => handleDelete(item.id)} disabled={deleting === item.id}
                className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-[10px]">
                {deleting === item.id ? <Spinner /> : <FaTrash size={9} />}
              </button>
            </div>
          ))}
          {!loading && data.length === 0 && <p className="col-span-full text-sm text-dark/40 text-center py-6">No partners yet</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── TESTIMONIALS TAB ───────────────────────────────────────── */
function TestimonialsTab() {
  const { data, loading, error } = useCollection('testimonials');
  const blank = { quote: '', name: '', designation: '', location: '', rating: 5, color: '#0197B2', imageUrl: '' };
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [editing, setEditing] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleSave() {
    if (!form.quote || !form.name) return alert('Quote and Name are required');
    setSaving(true);
    if (editing) {
      await updateDoc(doc(db, 'testimonials', editing), { ...form });
      setEditing(null);
    } else {
      await addDoc(collection(db, 'testimonials'), { ...form, createdAt: serverTimestamp() });
    }
    setForm(blank);
    setSaving(false);
  }

  async function handleDelete(id) {
    setDeleting(id);
    await deleteDoc(doc(db, 'testimonials', id));
    setDeleting(null);
  }

  function startEdit(item) {
    setEditing(item.id);
    setForm({ quote: item.quote, name: item.name, designation: item.designation, location: item.location, rating: item.rating, color: item.color, imageUrl: item.imageUrl });
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50/80 rounded-3xl border border-gray-100/50 p-6 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-dark text-lg">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
        <ImageUploadField label="Photo" folder="nexyuga/testimonials" onUpload={url => set('imageUrl', url)} />
        <Textarea label="Quote *" value={form.quote} onChange={e => set('quote', e.target.value)} placeholder="What they said…" />
        <div className="grid sm:grid-cols-2 gap-3">
          <Input label="Name *" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Dr. Rajesh" />
          <Input label="Designation" value={form.designation} onChange={e => set('designation', e.target.value)} placeholder="Founder, XYZ" />
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-dark/60 uppercase tracking-wide">Rating</label>
            <select value={form.rating} onChange={e => set('rating', Number(e.target.value))} className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-900">
              {[5, 4.5, 4, 3.5, 3].map(r => <option key={r} value={r}>{r} ★</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-dark/60 uppercase tracking-wide">Card Colour</label>
            <input type="color" value={form.color} onChange={e => set('color', e.target.value)} className="w-full h-10 rounded-xl border border-gray-200 cursor-pointer" />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-50">
            {saving ? <Spinner /> : <FaCheck size={12} />} {editing ? 'Update' : 'Add'}
          </button>
          {editing && (
            <button onClick={() => { setEditing(null); setForm(blank); }} className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-dark rounded-full hover:bg-gray-300 hover:-translate-y-0.5 transition-all text-sm font-semibold hover:bg-gray-300 transition">
              <FaTimes size={12} /> Cancel
            </button>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-heading font-bold text-dark text-lg">Testimonials</h3>
          <StatusBadge loading={loading} error={error} />
          <span className="ml-auto text-xs text-dark/40">{data.length} items</span>
        </div>
        <div className="space-y-2">
          {data.map(item => (
            <div key={item.id} className="flex items-start gap-3 bg-white border border-gray-100/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              {item.imageUrl
                ? <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-full object-cover shrink-0 border-2" style={{ borderColor: item.color }} />
                : <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: item.color }}>{item.name?.[0]}</div>
              }
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-dark">{item.name} <span className="font-normal text-dark/50 text-xs">— {item.designation}</span></p>
                <p className="text-xs text-dark/50 truncate">"{item.quote}"</p>
                <div className="flex gap-0.5 mt-1">{[...Array(Math.floor(item.rating))].map((_, i) => <FaStar key={i} className="text-amber-400 text-xs" />)}</div>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => startEdit(item)} className="p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition"><FaEdit size={13} /></button>
                <DeleteBtn onClick={() => handleDelete(item.id)} busy={deleting === item.id} />
              </div>
            </div>
          ))}
          {!loading && data.length === 0 && <p className="text-sm text-dark/40 text-center py-6">No testimonials yet</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── ACHIEVEMENTS TAB ────────────────────────────────────────── */
function AchievementsTab() {
  const { data, loading, error } = useCollection('achievements');
  const [title, setTitle] = useState('');
  const [eventImage, setEventImage] = useState('');
  const [poweredByImages, setPoweredByImages] = useState([]); // Changed from poweredByImage to poweredByImages
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [editing, setEditing] = useState(null);

  async function handleSave() {
    if (!title) return alert('Title is required');
    setSaving(true);
    if (editing) {
      await updateDoc(doc(db, 'achievements', editing), { title, eventImage, poweredByImages });
      setEditing(null);
    } else {
      await addDoc(collection(db, 'achievements'), {
        title,
        eventImage,
        poweredByImages, // Array of URLs
        order: data.length, // simple ordering
        createdAt: serverTimestamp(),
      });
    }
    setTitle('');
    setEventImage('');
    setPoweredByImages([]); // Reset after save
    setSaving(false);
  }

  async function handleDelete(id) {
    setDeleting(id);
    await deleteDoc(doc(db, 'achievements', id));
    setDeleting(null);
  }

  function startEdit(item) {
    setEditing(item.id);
    setTitle(item.title);
    setEventImage(item.eventImage);
    setPoweredByImages(item.poweredByImages || []);
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50/80 rounded-3xl border border-gray-100/50 p-6 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-dark text-lg">{editing ? 'Edit Achievement' : 'Add Achievement'}</h3>
        <Input label="Title *" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Best Startup Award" />
        <ImageUploadField label="Event Image (optional)" folder="nexyuga/achievements" onUpload={url => setEventImage(url)} />
        <ImageUploadField
          label="Powered By Logo (Add Multiple)"
          folder="nexyuga/achievements"
          onUpload={(url) => setPoweredByImages(prev => [...prev, url])}
        />

        {/* Preview selected URLs */}
        {(eventImage || poweredByImages.length > 0) && (
          <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 flex-wrap items-center">
            {eventImage && <img src={eventImage} className="h-16 object-contain border-r pr-4 border-gray-100" alt="Event" />}
            {poweredByImages.map((src, i) => (
              <div key={i} className="relative group">
                <img src={src} className="h-10 object-contain opacity-70" alt={`Powered By ${i}`} />
                <button
                  type="button"
                  onClick={() => setPoweredByImages(prev => prev.filter((_, idx) => idx !== i))}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaTimes size={8} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-50">
            {saving ? <Spinner /> : <FaCheck size={12} />} {editing ? 'Update' : 'Add'}
          </button>
          {editing && (
            <button onClick={() => { setEditing(null); setTitle(''); setEventImage(''); setPoweredByImages([]); }} className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-dark rounded-full hover:bg-gray-300 hover:-translate-y-0.5 transition-all text-sm font-semibold hover:bg-gray-300 transition">
              <FaTimes size={12} /> Cancel
            </button>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-heading font-bold text-dark text-lg">Achievements</h3>
          <StatusBadge loading={loading} error={error} />
          <span className="ml-auto text-xs text-dark/40">{data.length} items</span>
        </div>
        <div className="space-y-2">
          {data.map(item => (
            <div key={item.id} className="flex items-start gap-3 bg-white border border-gray-100/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              {item.eventImage && <img src={item.eventImage} alt={item.title} className="w-12 h-12 object-contain shrink-0" />}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-dark text-sm">{item.title}</h4>
                {item.poweredByImages?.length > 0 && (
                  <span className="text-xs text-gray-600">Includes {item.poweredByImages.length} 'Powered By' logo(s)</span>
                )}
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => startEdit(item)} className="p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition"><FaEdit size={13} /></button>
                <DeleteBtn onClick={() => handleDelete(item.id)} busy={deleting === item.id} />
              </div>
            </div>
          ))}
          {!loading && data.length === 0 && <p className="text-sm text-dark/40 text-center py-6">No achievements yet</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── CAREERS TAB ────────────────────────────────────────────── */
function CareersTab() {
  const { data, loading, error } = useCollection('careers');
  const blank = { title: '', type: 'Full-time', location: '', description: '', active: true };
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [editing, setEditing] = useState(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleSave() {
    if (!form.title) return alert('Title is required');
    setSaving(true);
    if (editing) {
      await updateDoc(doc(db, 'careers', editing), { ...form });
      setEditing(null);
    } else {
      await addDoc(collection(db, 'careers'), { ...form, createdAt: serverTimestamp() });
    }
    setForm(blank);
    setSaving(false);
  }

  async function handleDelete(id) {
    setDeleting(id);
    await deleteDoc(doc(db, 'careers', id));
    setDeleting(null);
  }

  function startEdit(item) {
    setEditing(item.id);
    setForm({ title: item.title, type: item.type, location: item.location, description: item.description, active: item.active });
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50/80 rounded-3xl border border-gray-100/50 p-6 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-dark text-lg">{editing ? 'Edit Position' : 'Add Position'}</h3>
        <Input label="Job Title *" value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Frontend Developer" />
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-dark/60 uppercase tracking-wide">Type</label>
            <select value={form.type} onChange={e => set('type', e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-900">
              {['Full-time', 'Part-time', 'Internship', 'Contract', 'Remote'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <Input label="Location" value={form.location} onChange={e => set('location', e.target.value)} placeholder="Tiruchengode, TN / Remote" />
        </div>
        <Textarea label="Description" value={form.description} onChange={e => set('description', e.target.value)} placeholder="Role overview…" />
        <div className="flex items-center gap-2">
          <input type="checkbox" id="active" checked={form.active} onChange={e => set('active', e.target.checked)} className="w-4 h-4 accent-gray-900" />
          <label htmlFor="active" className="text-sm font-medium text-dark/70">Show on public site</label>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-50">
            {saving ? <Spinner /> : <FaCheck size={12} />} {editing ? 'Update' : 'Add'}
          </button>
          {editing && (
            <button onClick={() => { setEditing(null); setForm(blank); }} className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-dark rounded-full hover:bg-gray-300 hover:-translate-y-0.5 transition-all text-sm font-semibold hover:bg-gray-300 transition">
              <FaTimes size={12} /> Cancel
            </button>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-heading font-bold text-dark text-lg">Positions</h3>
          <StatusBadge loading={loading} error={error} />
          <span className="ml-auto text-xs text-dark/40">{data.length} items</span>
        </div>
        <div className="space-y-2">
          {data.map(item => (
            <div key={item.id} className="flex items-start gap-3 bg-white border border-gray-100/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-sm text-dark">{item.title}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: '#0197B2' }}>{item.type}</span>
                  {!item.active && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Hidden</span>}
                </div>
                {item.location && <p className="text-xs text-dark/50 mt-0.5">📍 {item.location}</p>}
                {item.description && <p className="text-xs text-dark/50 truncate mt-1">"{item.description}"</p>}
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => startEdit(item)} className="p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition"><FaEdit size={13} /></button>
                <DeleteBtn onClick={() => handleDelete(item.id)} busy={deleting === item.id} />
              </div>
            </div>
          ))}
          {!loading && data.length === 0 && <p className="text-sm text-dark/40 text-center py-6">No positions yet</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── ENQUIRIES TAB ──────────────────────────────────────────── */
function EnquiriesTab() {
  const { data, loading, error } = useCollection('enquiries', 'createdAt');
  const [deleting, setDeleting] = useState(null);
  const [toggling, setToggling] = useState(null);

  const unread = data.filter(e => !e.read).length;

  async function toggleRead(item) {
    setToggling(item.id);
    await updateDoc(doc(db, 'enquiries', item.id), { read: !item.read });
    setToggling(null);
  }

  async function handleDelete(id) {
    setDeleting(id);
    await deleteDoc(doc(db, 'enquiries', id));
    setDeleting(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="font-heading font-bold text-dark text-lg">Contact Enquiries</h3>
        <StatusBadge loading={loading} error={error} />
        {unread > 0 && <span className="ml-1 px-2 py-0.5 rounded-full text-white text-xs font-bold" style={{ backgroundColor: '#5ACB2A' }}>{unread} new</span>}
        <span className="ml-auto text-xs text-dark/40">{data.length} total</span>
      </div>

      {loading && <p className="text-sm text-dark/40 text-center py-8">Loading…</p>}

      <div className="space-y-3">
        {[...data].reverse().map(item => (
          <div key={item.id} className={`bg-white border rounded-xl p-4 transition ${!item.read ? 'border-gray-300 shadow-sm' : 'border-gray-100'}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {!item.read && <span className="w-2 h-2 rounded-full bg-gray-900 shrink-0" />}
                  <span className="font-semibold text-sm text-dark">{item.name}</span>
                  <a href={`mailto:${item.email}`} className="text-xs text-gray-900 hover:underline">{item.email}</a>
                  {item.createdAt?.toDate && (
                    <span className="text-xs text-dark/30 ml-auto shrink-0">
                      {item.createdAt.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </div>
                {item.subject && <p className="text-xs font-semibold text-dark/60 mb-1">Re: {item.subject}</p>}
                <p className="text-sm text-dark/70 leading-relaxed whitespace-pre-wrap">{item.message}</p>
              </div>
              <div className="flex flex-col gap-1.5 shrink-0">
                <button
                  onClick={() => toggleRead(item)}
                  disabled={toggling === item.id}
                  title={item.read ? 'Mark unread' : 'Mark read'}
                  className="p-2 rounded-lg bg-green-50 text-gray-700 hover:bg-green-100 transition disabled:opacity-50"
                >
                  {toggling === item.id ? <Spinner /> : <FaCheck size={12} />}
                </button>
                <DeleteBtn onClick={() => handleDelete(item.id)} busy={deleting === item.id} />
              </div>
            </div>
          </div>
        ))}
        {!loading && data.length === 0 && <p className="text-sm text-dark/40 text-center py-8">No enquiries yet</p>}
      </div>
    </div>
  );
}

/* ─── APPLICATIONS TAB ────────────────────────────────────────── */
function ApplicationsTab() {
  const { data, loading, error } = useCollection('applications', 'createdAt');
  const [deleting, setDeleting] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const newCount = data.filter(a => a.status === 'New').length;

  const STATUS_COLORS = { New: '#0197B2', Reviewing: '#F59E0B', Accepted: '#5ACB2A', Rejected: '#EF4444' };

  async function changeStatus(id, status) {
    setUpdatingStatus(id);
    await updateDoc(doc(db, 'applications', id), { status });
    setUpdatingStatus(null);
  }

  async function handleDelete(id) {
    setDeleting(id);
    await deleteDoc(doc(db, 'applications', id));
    setDeleting(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="font-heading font-bold text-dark text-lg">Job Applications</h3>
        <StatusBadge loading={loading} error={error} />
        {newCount > 0 && (
          <span className="px-2 py-0.5 rounded-full text-white text-xs font-bold" style={{ backgroundColor: '#5ACB2A' }}>
            {newCount} new
          </span>
        )}
        <span className="ml-auto text-xs text-dark/40">{data.length} total</span>
      </div>

      {loading && <p className="text-sm text-dark/40 text-center py-8">Loading…</p>}

      <div className="space-y-3">
        {[...data].reverse().map(item => (
          <div key={item.id}
            className={`bg-white border rounded-xl overflow-hidden transition ${
              item.status === 'New' ? 'border-gray-300 shadow-sm' : 'border-gray-100'
            }`}
          >
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ backgroundColor: STATUS_COLORS[item.status] ?? '#0197B2' }}>
                {item.name?.[0]?.toUpperCase() ?? '?'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm text-dark">{item.name}</span>
                  <a href={`mailto:${item.email}`} className="text-xs text-gray-900 hover:underline truncate">{item.email}</a>
                  {item.phone && <span className="text-xs text-dark/40">{item.phone}</span>}
                  {item.createdAt?.toDate && (
                    <span className="text-xs text-dark/30 ml-auto shrink-0">
                      {item.createdAt.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </div>
                <p className="text-xs text-dark/50 mt-0.5">For: <span className="font-medium text-dark/70">{item.positionTitle}</span></p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={item.status}
                  onChange={e => changeStatus(item.id, e.target.value)}
                  disabled={updatingStatus === item.id}
                  className="text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none"
                  style={{ backgroundColor: (STATUS_COLORS[item.status] ?? '#0197B2') + '20', color: STATUS_COLORS[item.status] ?? '#0197B2' }}>
                  {['New', 'Reviewing', 'Accepted', 'Rejected'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                  className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-dark/40 transition text-xs">
                  {expanded === item.id ? '▲' : '▼'}
                </button>
                <DeleteBtn onClick={() => handleDelete(item.id)} busy={deleting === item.id} />
              </div>
            </div>
            {expanded === item.id && (
              <div className="px-4 pb-4 pt-1 border-t border-gray-50 bg-gray-50/50 space-y-3">
                {item.coverLetter && (
                  <div>
                    <p className="text-xs font-semibold text-dark/50 uppercase tracking-wide mb-1">Cover Letter</p>
                    <p className="text-sm text-dark/70 leading-relaxed whitespace-pre-wrap">{item.coverLetter}</p>
                  </div>
                )}
                {item.resumeUrl && (
                  <div>
                    <p className="text-xs font-semibold text-dark/50 uppercase tracking-wide mb-1">Resume</p>
                    <a href={item.resumeUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-semibold hover:opacity-90 transition">
                      📄 {item.resumeName ?? 'Download Resume'}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {!loading && data.length === 0 && (
          <p className="text-sm text-dark/40 text-center py-8">No applications yet</p>
        )}
      </div>
    </div>
  );
}

/* ─── SETTINGS TAB ────────────────────────────────────────────── */
function SettingsTab() {
  const [heroText, setHeroText] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#5BCB2B');
  const [darkColor, setDarkColor] = useState('#0197B2');
  const [headingFont, setHeadingFont] = useState('Fredoka');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, 'settings', 'global'));
      if (snap.exists()) {
        const d = snap.data();
        if (d.heroText) setHeroText(d.heroText);
        if (d.primaryColor) setPrimaryColor(d.primaryColor);
        if (d.darkColor) setDarkColor(d.darkColor);
        if (d.headingFont) setHeadingFont(d.headingFont);
      }
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'global'), { heroText, primaryColor, darkColor, headingFont }, { merge: true });
      alert('Settings saved! Reloading...');
      window.location.reload();
    } catch (e) {
      alert(e.message);
    }
    setSaving(false);
  }

  return (
    <div className="space-y-8">
      
      {/* GLOBAL THEME SETTINGS */}
      <div className="bg-gray-50/80 rounded-3xl border border-gray-100/50 p-6 shadow-sm border border-gray-100 shadow-sm space-y-5">
        <h3 className="font-heading font-semibold text-dark text-lg border-b border-gray-200 pb-2">🎨 Global Theme Settings</h3>
        <p className="text-xs text-dark/60 leading-relaxed mb-4">
          Change the active colors and typography used across the entire website instantly.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-dark/70 uppercase tracking-wide">Primary Color (Highlights)</label>
            <div className="flex items-center gap-3">
              <input 
                type="color" 
                value={primaryColor} 
                onChange={e => setPrimaryColor(e.target.value)}
                className="w-12 h-12 rounded cursor-pointer border-0 p-0"
              />
              <span className="text-sm font-mono text-dark/60">{primaryColor}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-dark/70 uppercase tracking-wide">Secondary Color (Dark Text)</label>
            <div className="flex items-center gap-3">
              <input 
                type="color" 
                value={darkColor} 
                onChange={e => setDarkColor(e.target.value)}
                className="w-12 h-12 rounded cursor-pointer border-0 p-0"
              />
              <span className="text-sm font-mono text-dark/60">{darkColor}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-xs font-semibold text-dark/70 uppercase tracking-wide">Heading Font Family</label>
            <select 
              value={headingFont} 
              onChange={e => setHeadingFont(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-900 focus:ring-2 bg-white"
            >
              <option value="Fredoka">Fredoka (Rounded & Thick)</option>
              <option value="Outfit">Outfit (Modern & Clean)</option>
              <option value="Inter">Inter (Professional & Neutral)</option>
            </select>
          </div>
        </div>
      </div>

      {/* HERO TEXT SETTINGS */}
      <div className="bg-gray-50/80 rounded-3xl border border-gray-100/50 p-6 shadow-sm border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-heading font-semibold text-dark text-lg border-b border-gray-200 pb-2">📝 Hero Section Content</h3>
        <p className="text-xs text-dark/60 leading-relaxed mb-4">
          Determine which words on the main homepage banner should be highlighted in your Primary Color.<br/>
          Use asterisks <code className="bg-gray-200 px-1 py-0.5 rounded text-gray-900 font-mono">*like this*</code> to wrap words that should be highlighted.
        </p>

        <Textarea 
          label="Hero Heading Text" 
          value={heroText} 
          onChange={e => setHeroText(e.target.value)} 
          placeholder="e.g. Empowering *Future Leaders* in Technology" 
        />
        
        {heroText && (
          <div className="p-4 bg-white border border-gray-100 rounded-xl mt-2">
            <p className="text-xs text-dark/50 uppercase tracking-wide mb-2 font-semibold">Live Preview</p>
            <h2 className={`text-2xl font-bold`} style={{ fontFamily: headingFont }}>
              {heroText.split('*').map((part, i) => 
                i % 2 === 1 ? <span key={i} style={{ color: primaryColor }}>{part}</span> : part
              )}
            </h2>
          </div>
        )}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full py-3.5 rounded-xl bg-gray-900 text-white text-sm font-bold shadow-lg hover:bg-gray-800 transition disabled:opacity-50 flex justify-center items-center gap-2"
      >
        {saving ? <Spinner /> : <FaCheck size={14} />} {saving ? 'Saving...' : 'Save All Settings'}
      </button>
    </div>
  );
}

/* ─── MAIN ADMIN PAGE ────────────────────────────────────────── */
const TABS = [
  { key: 'settings',     label: '⚙️ Settings',       component: SettingsTab },
  { key: 'gallery',      label: '🖼 Gallery',        component: GalleryTab },
  { key: 'journey',      label: '🗺 Journey',         component: JourneyTab },
  { key: 'partners',     label: '🤝 Supported By',   component: PartnersTab },
  { key: 'testimonials', label: '💬 Testimonials',   component: TestimonialsTab },
  { key: 'careers',      label: '💼 Careers',         component: CareersTab },
  { key: 'achievements', label: '🏆 Achievements',   component: AchievementsTab }, // Added AchievementsTab
  { key: 'applications', label: '📝 Applications',   component: ApplicationsTab },
  { key: 'enquiries',    label: '📩 Enquiries',       component: EnquiriesTab },
];


const CORRECT_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

/* ── Login Gate ─────────────────────────────────────── */
function LoginGate({ onAuth }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (pw === CORRECT_PASSWORD) {
      sessionStorage.setItem('nx_admin_auth', '1');
      onAuth();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 relative overflow-hidden font-sans">
      {/* Site-matching blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-gray-100 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-gray-50 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo mark */}
        <div className="flex flex-col items-center mb-8">
          <motion.img
            src={logoUrl}
            alt="Nexyuga Admin"
            className="h-12 w-auto mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <h1 className="text-2xl font-bold text-dark tracking-tight">Nexyuga Admin</h1>
          <p className="text-sm text-gray-400 mt-1">Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl shadow-lg p-8 space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-dark/60 uppercase tracking-wide">Password</label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={pw}
                onChange={e => { setPw(e.target.value); setError(false); }}
                placeholder="Enter admin password"
                className={`w-full border rounded-xl px-4 py-3 text-sm pr-12 focus:outline-none focus:ring-2 transition ${
                  error ? 'border-red-400 ring-red-200' : 'border-gray-200 ring-gray-200'
                }`}
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition"
              >
                {show ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            {error && (
              <p className="text-xs text-red-500 font-medium mt-1">Incorrect password. Please try again.</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gray-900 text-white text-sm font-bold shadow-lg hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Admin Navbar ───────────────────────────────────── */
function AdminNavbar({ activeTab, setActiveTab }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navBgClass = scrolled
    ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100'
    : 'bg-white/90 backdrop-blur-md border-b border-gray-100';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBgClass}`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <a href="/" title="Back to main site">
              <motion.img
                src={logoUrl}
                alt="Nexyuga Admin"
                className="h-10 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </a>
            <div className="hidden sm:block border-l-2 border-gray-200 pl-4 py-1">
              <h1 className="font-bold text-dark text-base leading-none">Admin Panel</h1>
              <p className="text-xs text-gray-400 mt-1">Content Management</p>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative text-sm font-medium transition-colors group py-2 ${
                  activeTab === tab.key ? 'text-gray-900' : 'text-dark/70 hover:text-gray-900'
                }`}
              >
                {tab.label.replace(/[\u{1F300}-\u{1F9FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2000}-\u{2B55}\s]+/gu, '')}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gray-900 transition-transform duration-300 origin-left ${
                  activeTab === tab.key ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4">
              <a href="/" className="text-xs text-gray-900 hover:underline font-medium">← View Site</a>
            </div>

            <button
              className="lg:hidden p-2 text-dark hover:text-gray-900 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <motion.div animate={{ rotate: mobileOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                {mobileOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl absolute w-full"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {TABS.map((tab, i) => (
                <motion.div
                  key={tab.key}
                  initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <button
                    onClick={() => { setActiveTab(tab.key); setMobileOpen(false); }}
                    className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                      activeTab === tab.key ? 'bg-gray-100 text-gray-900 font-bold' : 'text-dark/70 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                </motion.div>
              ))}
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between px-4">
                <a href="/" className="text-sm text-gray-900 font-medium">← View Site</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ── Main Admin Shell ───────────────────────────────── */
export default function AdminPage() {
  const [authed, setAuthed] = useState(!!sessionStorage.getItem('nx_admin_auth'));
  const [activeTab, setActiveTab] = useState('settings');
  const Tab = TABS.find(t => t.key === activeTab)?.component ?? (() => null);

  if (!authed) return <LoginGate onAuth={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-white font-sans relative overflow-hidden">
      {/* Site-matching background blobs */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-gray-100 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-gray-50 rounded-full blur-[150px] pointer-events-none -z-10" />

      <AdminNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={() => { sessionStorage.removeItem('nx_admin_auth'); setAuthed(false); }}
      />

      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 mt-24">

        {/* Tab content */}
        <div className="bg-white rounded-3xl border border-gray-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 lg:p-8">
          <Tab />
        </div>

      </div>
    </div>
  );
}

