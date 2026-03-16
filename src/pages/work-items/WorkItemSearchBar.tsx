import { STATUSES, TIME_PERIODS } from "../../types/WorkItem";
import "./WorkItemSearchBar.css";

interface WorkItemSearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  filterStatus: string;
  setFilter: (value: string) => void;
  filterTimePeriod: number | "All";
  setFilterTimePeriod: (value: number | "All") => void;
}

export default function WorkItemSearchBar({ search, setSearch, filterStatus, setFilter, filterTimePeriod, setFilterTimePeriod }: WorkItemSearchBarProps) {
  return (
    <div className="search-bar">
      <input className="search-input" placeholder="Search using title or description…" value={search} onChange={e => setSearch(e.target.value)} />
      <select className="search-select" value={filterStatus} onChange={e => setFilter(e.target.value)}>
        <option value="All">Select Status</option>
        {STATUSES.map(st => <option key={st} value={st}>{st}</option>)}
      </select>
      <select className="search-select" value={filterTimePeriod} onChange={e => setFilterTimePeriod(Number(e.target.value))}>
        <option value="All">Select Time Period</option>
        {TIME_PERIODS.map(period => <option key={period.key} value={period.period}>{period.key}</option>)}
      </select>
    </div>
  );
}