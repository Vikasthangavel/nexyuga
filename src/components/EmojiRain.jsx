import { motion } from 'framer-motion';
import { useMemo } from 'react';

const emojis = ['📚', '✏️', '🎵', '⭐', '🎨', '🔢', '🌈', '💡', '🎓', '🧩', '🦋', '🌟', '🎪', '🎈', '🎺'];

export default function EmojiRain({ count = 20 }) {
  const items = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      emoji: emojis[i % emojis.length],
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      size: 14 + Math.random() * 18,
      wobble: 20 + Math.random() * 40,
    })),
    [count]
  );

  return null;
}