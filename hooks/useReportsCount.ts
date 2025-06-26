import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';

export const useReportsCount = () => {
  const [reportCount, setReportCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Real-time listener for reports count
    const unsubscribe = onSnapshot(
      collection(db, 'reports'),
      (snapshot) => {
        setReportCount(snapshot.size);
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching reports count:', err);
        setError('Failed to fetch reports count');
        setIsLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { reportCount, isLoading, error };
};

