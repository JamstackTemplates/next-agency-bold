'use client';

import { useEffect, useState } from 'react';
import { studioOpeningStatus, type OpeningHours, type StudioStatus } from '../lib/hours';
import { site } from '../lib/site';

const STATIC_STATUS: StudioStatus = {
  isOpen: null,
  label: 'Studio hours, visits by appointment',
  detail: '',
};

/**
 * Neutral in static/no-JS HTML; computes "In the studio now" / "Studio closed now"
 * in the configured Europe/London zone in the browser and refreshes every minute.
 */
export function OpenBadge({ hours }: { hours: readonly OpeningHours[] }) {
  const [status, setStatus] = useState<StudioStatus>(STATIC_STATUS);

  useEffect(() => {
    const update = () => setStatus(studioOpeningStatus(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  const badgeTone =
    status.isOpen === true
      ? 'bg-yellow text-on-yellow border-[#111111]'
      : status.isOpen === false
        ? 'bg-[#141311] text-[#F3EEE2] border-[#111111] dark:border-[#F3EEE2]'
        : 'bg-surface text-ink border-ink';

  return (
    <span
      className={`inline-flex flex-wrap items-center gap-2 border-2 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0_var(--text)] ${badgeTone}`}
    >
      <span
        aria-hidden="true"
        className={`inline-block size-2.5 rounded-full border border-[#111111] ${
          status.isOpen === true
            ? 'bg-[#C8301B]'
            : status.isOpen === false
              ? 'bg-[#B3AC9E]'
              : 'bg-yellow'
        }`}
      />
      <span>{status.label}</span>
      {status.detail ? <span className="opacity-80">· {status.detail}</span> : null}
    </span>
  );
}
