import React, { useState, useEffect } from 'react';
import { RecognitionHistory } from '../components/RecognitionHistory';
import { StorageService } from '../services/StorageService';
import type { RecognitionHistoryItem } from '../types/recognition';

export const History: React.FC = () => {
  const [historyItems, setHistoryItems] = useState<RecognitionHistoryItem[]>([]);

  useEffect(() => {
    setHistoryItems(StorageService.getHistory());
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Recognition History
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Chronological record of high-confidence Indian Sign Language gestures recognized during this session.
        </p>
      </div>

      <RecognitionHistory
        history={historyItems}
        onHistoryUpdated={setHistoryItems}
      />
    </div>
  );
};
