import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function ThemeWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'global'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Inject dynamic values into CSS variables
        if (data.primaryColor) {
          document.documentElement.style.setProperty('--color-primary', data.primaryColor);
          // Auto-generate a darker shade for hovers (very simple approximation)
          document.documentElement.style.setProperty('--color-primary-dark', data.primaryColor + 'cc'); 
        }
        if (data.darkColor) {
          document.documentElement.style.setProperty('--color-dark', data.darkColor);
          document.documentElement.style.setProperty('--color-dark-light', data.darkColor + 'cc');
        }
        if (data.headingFont) {
          document.documentElement.style.setProperty('--font-heading', `"${data.headingFont}", sans-serif`);
        }
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Optionally block rendering until theme loads to prevent Flash of Unstyled Content (FOUC), 
  // but for a landing page, it's usually better to let the default CSS load first and snap update.
  return <>{children}</>;
}
