import { useEffect, useState } from "react";

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeDelta(startISO: string): CountdownValue {
  // El ISO ya lleva el offset +02:00 (Europe/Madrid), por lo que
  // Date lo interpreta correctamente independientemente de dónde
  // se abra la web.
  const start = new Date(startISO).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - start);

  const seconds = Math.floor(diffMs / 1000) % 60;
  const minutes = Math.floor(diffMs / (1000 * 60)) % 60;
  const hours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds };
}

/**
 * Devuelve un contador en tiempo real desde `startISO`.
 * Solo corre mientras `active` es true, para no gastar ciclos
 * en escenas que no se están viendo.
 */
export function useCountdown(startISO: string, active: boolean = true): CountdownValue {
  const [value, setValue] = useState<CountdownValue>(() => computeDelta(startISO));

  useEffect(() => {
    if (!active) return;
    setValue(computeDelta(startISO));
    const id = window.setInterval(() => {
      setValue(computeDelta(startISO));
    }, 1000);
    return () => window.clearInterval(id);
  }, [startISO, active]);

  return value;
}
