import type WorkItem from "../../types/WorkItem";
import StatusBadge from "../../components/status-badge/StatusBadge";
import "./WorkItemList.css";
import { formatDistanceToNow } from "date-fns";
import { TWO_HOURS_IN_MS } from "../../types/WorkItem";

interface WorkItemListProps {
  items: WorkItem[];
  onView: (id: number) => void;
  onEdit: (item: WorkItem) => void;
  onDelete: (item: WorkItem) => void;
}

export default function WorkItemList({ items, onView, onEdit, onDelete }: WorkItemListProps) {
  if (items.length === 0) {
    return <div className="empty">No items found.</div>;
  }

  return (
    <div className="work-item-list">
      {items.map(item => (
        <div key={item.id} className="wi-row item" onClick={() => onView(item.id)}>
          <div className="item-main">
            <span className="meta-small">#{item.id}</span>
            <span className="item-title">{item.title}</span>
            <span className="item-desc">{item.description}</span>
          </div>
          <div className="item-meta" onClick={e => e.stopPropagation()}>
            <StatusBadge status={item.status} />
            <span className="meta-small">{formatDistanceToNow(new Date(new Date(item.updatedAt).getTime() + TWO_HOURS_IN_MS))} ago</span>
            <button className="icon-btn" onClick={() => onEdit(item)}>✎</button>
            <button className="icon-btn icon-btn--danger" onClick={() => onDelete(item)}>✕</button>
          </div>
        </div>
      ))}
    </div>
  );
}