import { STATUS_COLORS } from "../../types/WorkItem";
import "./StatusBadge.css";

export default function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status] ?? "#6b7280";
  return (
    <span
      className="status-badge"
      style={{ background: color + "15", color, borderColor: color + "33" }}
    >
      {status}
    </span>
  );
}