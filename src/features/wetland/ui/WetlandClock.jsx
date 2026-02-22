import React, { useMemo } from "react";
import {
  daylightFactor,
  formatSimulationHour,
  getClockAngles,
} from "../simulation";
import "./WetlandClock.css";

export default function WetlandClock({ timeOfDay }) {
  const { hourAngle, minuteAngle } = useMemo(
    () => getClockAngles(timeOfDay),
    [timeOfDay],
  );

  const phaseLabel =
    daylightFactor(timeOfDay) >= 0.45 ? "Fase diurna" : "Fase nocturna";

  const hourRadians = ((hourAngle - 90) * Math.PI) / 180;
  const minuteRadians = ((minuteAngle - 90) * Math.PI) / 180;
  const hourHand = {
    x: 50 + Math.cos(hourRadians) * 20,
    y: 50 + Math.sin(hourRadians) * 20,
  };
  const minuteHand = {
    x: 50 + Math.cos(minuteRadians) * 29,
    y: 50 + Math.sin(minuteRadians) * 29,
  };

  return (
    <section className="wetland-clock" aria-label="Reloj de simulacion">
      <svg
        className="wetland-clock-face"
        viewBox="0 0 100 100"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="wetlandClockGradient" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="62%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </radialGradient>
        </defs>

        <circle
          className="wetland-clock-bezel"
          cx="50"
          cy="50"
          r="47"
          fill="url(#wetlandClockGradient)"
        />

        {Array.from({ length: 12 }).map((_, index) => {
          const angle = ((index * 30 - 90) * Math.PI) / 180;
          const outerRadius = 43;
          const innerRadius = index % 3 === 0 ? 35 : 38;
          const x1 = 50 + Math.cos(angle) * innerRadius;
          const y1 = 50 + Math.sin(angle) * innerRadius;
          const x2 = 50 + Math.cos(angle) * outerRadius;
          const y2 = 50 + Math.sin(angle) * outerRadius;

          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className={`wetland-clock-tick-line ${
                index % 3 === 0 ? "wetland-clock-tick-line--major" : ""
              }`}
            />
          );
        })}

        <line
          className="wetland-clock-hand-line wetland-clock-hand-line--hour"
          x1="50"
          y1="50"
          x2={hourHand.x}
          y2={hourHand.y}
        />
        <line
          className="wetland-clock-hand-line wetland-clock-hand-line--minute"
          x1="50"
          y1="50"
          x2={minuteHand.x}
          y2={minuteHand.y}
        />
        <circle className="wetland-clock-center" cx="50" cy="50" r="3.5" />
      </svg>

      <div className="wetland-clock-meta">
        <p className="wetland-clock-time">{formatSimulationHour(timeOfDay)}</p>
        <p className="wetland-clock-phase">{phaseLabel}</p>
      </div>
    </section>
  );
}
