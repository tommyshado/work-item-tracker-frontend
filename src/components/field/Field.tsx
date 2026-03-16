import type { ReactNode } from "react";
import "./Field.css";

export default function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div className="field">
      <label className={`field-label ${error ? "field-label--error" : ""}`}>
        {label}
        {error && <span className="field-error">{error}</span>}
      </label>
      {children}
    </div>
  );
}
