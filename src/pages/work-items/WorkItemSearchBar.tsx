import { STATUSES } from "../../types/WorkItem";
import "./WorkItemSearchBar.css";

interface WorkItemSearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  filterStatus: string;
  setFilter: (value: string) => void;
}

export default function WorkItemSearchBar({ search, setSearch, filterStatus, setFilter }: WorkItemSearchBarProps) {
  return (
    <div className="search-bar">
      <input className="search-input" placeholder="Search using title or description…" value={search} onChange={e => setSearch(e.target.value)} />
      <select className="search-select" value={filterStatus} onChange={e => setFilter(e.target.value)}>
        <option value="All">All</option>
        {STATUSES.map(st => <option key={st}>{st}</option>)}
      </select>
    </div>
  );
}