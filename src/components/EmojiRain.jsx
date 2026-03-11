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

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute select-none"
          style={{
            left: `${item.x}%`,
            top: -40,
            fontSize: item.size,
          }}
          animate={{
            y: ['0vh', '105vh'],
            x: [0, item.wobble, -item.wobble, 0],
            rotate: [0, 360],
          }}
          transition={{
            y: { duration: item.duration, repeat: Infinity, delay: item.delay, ease: 'linear' },
            x: { duration: item.duration / 2, repeat: Infinity, delay: item.delay, ease: 'easeInOut' },
            rotate: { duration: item.duration, repeat: Infinity, delay: item.delay, ease: 'linear' },
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}
