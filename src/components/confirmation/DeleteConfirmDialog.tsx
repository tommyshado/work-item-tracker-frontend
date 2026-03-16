import type WorkItem from "../../types/WorkItem";
import "./DeleteConfirmDialog.css";

interface DeleteConfirmDialogProps {
  item: WorkItem;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmDialog({ item, onConfirm, onCancel }: DeleteConfirmDialogProps) {
  return (
    <div className="modal-overlay">
      <div className="delete-dialog">
        <div className="delete-dialog-label">Delete this item?</div>
        <div className="delete-dialog-title">"{item.title}"</div>
        <div className="delete-dialog-actions">
          <button className="btn-outline" onClick={onCancel}>Cancel</button>
          <button className="btn-primary btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
