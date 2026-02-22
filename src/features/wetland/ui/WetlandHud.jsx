import React from "react";
import {
  CLIMATE_CONFIG,
  PRESETS,
  formatHour,
  valueLabel,
} from "../simulation";
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

export default function WetlandHud({
  controls,
  setControls,
  state,
  setManualTime,
  onPreset,
  onReset,
  insights,
}) {
  const setField = (field, value) =>
    setControls((previousState) => ({ ...previousState, [field]: value }));

  const metrics = [
    { label: "Salinidad", value: state.salinity, kind: "salinity" },
    { label: "Renovacion", value: state.flushing, kind: "generic" },
    { label: "Biomasa algal", value: state.algae, kind: "algae" },
    { label: "Oxigeno", value: state.oxygen, kind: "oxygen" },
    { label: "Estado de peces", value: state.fishHealth, kind: "generic" },
    { label: "Estado sistemico", value: state.ecosystemHealth, kind: "generic" },
  ];

  return (
    <div className="wetland-hud">
      <section className="wetland-panel">
        <h3 className="wetland-panel-title">Controles del sistema</h3>
        <p className="wetland-panel-subtitle">
          Modelo conceptual TGS para la Cienaga Grande
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
            onChange={(event) => setField("freshwater", Number(event.target.value))}
          />
        </div>

        <div className="wetland-control-group">
          <div className="wetland-control-header">
            <span>Conectividad de canos</span>
            <strong>{controls.connectivity}</strong>
          </div>
          <input
            className="wetland-range"
            type="range"
            min={0}
            max={100}
            value={controls.connectivity}
            onChange={(event) => setField("connectivity", Number(event.target.value))}
          />
        </div>

        <div className="wetland-control-group">
          <div className="wetland-control-header">
            <span>Clima</span>
          </div>
          <select
            className="wetland-select"
            value={controls.climate}
            onChange={(event) => setField("climate", event.target.value)}
          >
            {Object.entries(CLIMATE_CONFIG).map(([value, config]) => (
              <option key={value} value={value}>
                {config.label}
              </option>
            ))}
          </select>
        </div>

        <div className="wetland-control-group">
          <div className="wetland-control-header">
            <span>Hora del dia</span>
            <strong>{formatHour(state.timeOfDay)}</strong>
          </div>
          <input
            className="wetland-range"
            type="range"
            min={0}
            max={23.75}
            step={0.25}
            value={state.timeOfDay}
            onChange={(event) => setManualTime(Number(event.target.value))}
          />
        </div>

        <div className="wetland-control-group">
          <div className="wetland-control-header">
            <span>Velocidad</span>
            <strong>{controls.speed.toFixed(1)}x</strong>
          </div>
          <input
            className="wetland-range"
            type="range"
            min={0.5}
            max={3}
            step={0.5}
            value={controls.speed}
            onChange={(event) => setField("speed", Number(event.target.value))}
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

        <div className="wetland-presets">
          {Object.entries(PRESETS).map(([key, preset]) => (
            <button
              key={key}
              type="button"
              className="wetland-button"
              onClick={() => onPreset(preset.controls)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </section>

      <section className="wetland-panel">
        <h3 className="wetland-panel-title">Estado ecologico en tiempo real</h3>
        <p className="wetland-panel-subtitle">
          Indices normalizados 0-100 para visualizacion didactica
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

        <div className="wetland-insights">
          {insights.map((insight) => (
            <article key={insight.title} className="wetland-insight">
              <p className="wetland-insight-title">{insight.title}</p>
              <p className="wetland-insight-text">{insight.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
