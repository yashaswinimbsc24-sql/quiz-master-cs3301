import React, { useEffect } from "react";

export default function Timer({ seconds, onTimeUp }) {
  useEffect(() => {
    if (seconds <= 0) {
      onTimeUp();
      return undefined;
    }

    const timer = setInterval(() => {
      // The parent owns the timer state; this interval signals one second passing.
      onTimeUp("tick");
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onTimeUp]);

  return (
    <div className={`timer ${seconds <= 5 ? "timer-warning" : ""}`}>
      <span>⏱</span> {seconds}s
    </div>
  );
}