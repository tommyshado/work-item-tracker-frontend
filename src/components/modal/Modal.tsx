import { STATUSES } from "../../types/WorkItem";
import type { WorkItemFormData, FormErrors } from "../../types/WorkItem";
import Field from "../field/Field";
import "./Modal.css";

interface ModalProps {
  type: "new" | "edit";
  form: WorkItemFormData;
  errors: FormErrors;
  setForm: React.Dispatch<React.SetStateAction<WorkItemFormData>>;
  onSave: () => void;
  onClose: () => void;
}

export default function Modal({ type, form, errors, setForm, onSave, onClose }: ModalProps) {
  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content">
        <div className="modal-head">
          <span className="modal-title">{type === "new" ? "New Item" : "Edit Item"}</span>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <Field label="Title" error={errors.title}>
            <input className="input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Short title…" />
          </Field>
          <Field label="Description" error={errors.description}>
            <textarea className="input textarea" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="What needs to be done…" />
          </Field>
          <Field label="Status">
            {type !== "new" ? (
              <>
                <select className="input" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  {STATUSES.map(st => <option key={st}>{st}</option>)}
                </select>
              </>
            ) : (
              <span className="meta-small">Open (default)</span>
            )}
          </Field>
        </div>
        <div className="modal-foot">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
}