// src/hooks/useCollection.js
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

/**
 * Real-time Firestore collection listener.
 * @param {string} collectionName
 * @param {string} [orderByField='createdAt']  - field to order results by
 * @returns {{ data: Array, loading: boolean, error: string|null }}
 */
export function useCollection(collectionName, orderByField = 'createdAt') {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      orderBy(orderByField, 'asc')
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        setData(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error(`useCollection(${collectionName}):`, err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [collectionName, orderByField]);

  return { data, loading, error };
}
