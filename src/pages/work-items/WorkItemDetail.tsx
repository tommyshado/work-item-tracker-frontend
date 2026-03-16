import type WorkItem from "../../types/WorkItem";
import StatusBadge from "../../components/status-badge/StatusBadge";
import "./WorkItemDetail.css";

interface WorkItemDetailProps {
  item: WorkItem;
  onBack: () => void;
  onEdit: (item: WorkItem) => void;
  onDelete: (item: WorkItem) => void;
}

export default function WorkItemDetail({ item, onBack, onEdit, onDelete }: WorkItemDetailProps) {
  return (
    <div>
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="detail-card">
        <div className="detail-top">
          <div>
            <div className="meta-small">#{item.id} · {item.createdAt}</div>
            <h1 className="detail-title">{item.title}</h1>
          </div>
          <div className="row">
            <button className="btn-outline" onClick={() => onEdit(item)}>Edit</button>
            <button className="btn-outline btn-outline--danger" onClick={() => onDelete(item)}>Delete</button>
          </div>
        </div>
        <StatusBadge status={item.status} />
        <p className="detail-desc">{item.description}</p>
      </div>
    </div>
  );
}
