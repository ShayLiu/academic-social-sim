'use client'

import { useEffect, useRef, useCallback } from 'react'

export function useGameTimer(
  onTick: () => void,
  intervalMs: number = 1000,
  enabled: boolean = true
) {
  const callbackRef = useRef(onTick)
  callbackRef.current = onTick

  useEffect(() => {
    if (!enabled) return
    const id = setInterval(() => callbackRef.current(), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs, enabled])
}
