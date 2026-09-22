import { useEffect, useState } from 'react';
import { getConsent, subscribeConsent } from '../utils/consent';

export default function useConsent() {
  const [choice, setChoice] = useState(getConsent);
  useEffect(() => {
    let timer;
    const sync = () => {
      clearTimeout(timer);
      const next = getConsent();
      setChoice(next);
      // Recheck long intervals without overflowing the browser timer limit.
      if (next) timer = setTimeout(sync, Math.min(next.expiresAt - Date.now() + 1, 2147483647));
    };
    const unsubscribe = subscribeConsent(sync);
    sync();
    return () => { clearTimeout(timer); unsubscribe(); };
  }, []);
  return choice;
}
