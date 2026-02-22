import React from "react";
import { valueLabel } from "../simulation";
import "./WetlandHud.css";

function MetricCard({ label, value, kind }) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className="wetland-metric-card">
      <div className="wetland-metric-header">
        <p className="wetland-metric-label">{label}</p>
        <p className="wetland-metric-value">{Math.round(value)}</p>
      </div>
      <div className="wetland-metric-track">
        <div
          className="wetland-metric-fill"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      <p className="wetland-metric-status">{valueLabel(value, kind)}</p>
    </div>
  );
}

export default function WetlandHud({ controls, setControls, state, onReset }) {
  const setField = (field, value) =>
    setControls((previousState) => ({ ...previousState, [field]: value }));

  const metrics = [
    { label: "Salinidad", value: state.salinity, kind: "salinity" },
    { label: "Renovacion", value: state.flushing, kind: "generic" },
    { label: "Biomasa algal", value: state.algae, kind: "algae" },
    { label: "Oxigeno", value: state.oxygen, kind: "oxygen" },
    { label: "Estado de peces", value: state.fishHealth, kind: "generic" },
  ];

  return (
    <div className="wetland-hud">
      <section className="wetland-panel wetland-panel--controls">
        <h3 className="wetland-panel-title">Controles del sistema</h3>
        <p className="wetland-panel-subtitle">
          Modelo conceptual basado en dinamica hidrologica del humedal
        </p>

        <div className="wetland-control-group">
          <div className="wetland-control-header">
            <span>Aporte de agua dulce</span>
            <strong>{controls.freshwater}</strong>
          </div>
          <input
            className="wetland-range"
            type="range"
            min={0}
            max={100}
            value={controls.freshwater}
            onChange={(event) =>
              setField("freshwater", Number(event.target.value))
            }
          />
        </div>

        <div className="wetland-actions">
          <button
            type="button"
            className="wetland-button"
            onClick={() => setField("isPlaying", !controls.isPlaying)}
          >
            {controls.isPlaying ? "Pausar" : "Reproducir"}
          </button>
          <button type="button" className="wetland-button" onClick={onReset}>
            Reiniciar
          </button>
        </div>
      </section>

      <section className="wetland-panel wetland-panel--status">
        <h3 className="wetland-panel-title">Estado ecologico en tiempo real</h3>
        <p className="wetland-panel-subtitle">
          Indicadores relativos (0-100) de salinidad, oxigeno y salud biologica
        </p>

        <div className="wetland-metrics">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              kind={metric.kind}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
