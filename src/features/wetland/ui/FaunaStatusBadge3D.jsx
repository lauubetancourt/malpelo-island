import React from "react";
import { Html } from "@react-three/drei";
import "./FaunaStatusBadge3D.css";

const DEFAULT_EMOJI_BY_TONE = Object.freeze({
  good: "🙂",
  neutral: "😐",
  warning: "😟",
  critical: "😵",
});

export default function FaunaStatusBadge3D({
  tone = "neutral",
  emoji,
  label,
  position = [0, 0, 0],
  distanceFactor = 14,
}) {
  const toneClass = DEFAULT_EMOJI_BY_TONE[tone] ? tone : "neutral";
  const content = emoji ?? DEFAULT_EMOJI_BY_TONE[toneClass];
  const ariaLabel = label ?? `Estado ${toneClass}`;

  return (
    <group position={position}>
      <Html center transform sprite distanceFactor={distanceFactor}>
        <div
          className={`fauna-status-badge fauna-status-badge--${toneClass}`}
          aria-label={ariaLabel}
          title={ariaLabel}
        >
          <span className="fauna-status-badge-emoji">{content}</span>
        </div>
      </Html>
    </group>
  );
}
