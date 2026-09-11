"use client";

import { useEffect, useState, useRef } from "react";
import type { StreamingTextProps } from "../../types";

const SPEED_MAP: Record<string, number> = {
  slow: 40,
  normal: 20,
  fast: 8,
  instant: 0,
};

export function StreamingText({
  content,
  speed = "normal",
  className = "",
  onComplete,
}: StreamingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (speed === "instant") {
      setDisplayed(content);
      setIsDone(true);
      onComplete?.();
      return;
    }

    const ms = SPEED_MAP[speed];
    indexRef.current = 0;
    setDisplayed("");
    setIsDone(false);

    const interval = setInterval(() => {
      if (indexRef.current < content.length) {
        const chunk = content.slice(0, indexRef.current + 1);
        setDisplayed(chunk);
        indexRef.current++;
      } else {
        clearInterval(interval);
        setIsDone(true);
        onComplete?.();
      }
    }, ms);

    return () => clearInterval(interval);
  }, [content, speed, onComplete]);

  return (
    <span className={`streaming-text ${className}`} data-done={isDone}>
      {displayed}
      {!isDone && speed !== "instant" && (
        <span className="streaming-cursor inline-block w-[2px] h-[1em] bg-current ml-[1px] align-text-bottom animate-pulse" />
      )}
    </span>
  );
}