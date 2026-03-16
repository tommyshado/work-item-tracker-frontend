import { useState, useEffect } from "react";
import type WorkItem from "../types/WorkItem";
import WorkItemTrackerAPI from "../api/WorkItemTrackerAPI";

export function useWorkItems(search: string, filterStatus: string, filterTimePeriod: number | "All") {
  const api = WorkItemTrackerAPI();
  const [items, setItems] = useState<WorkItem[]>([]);

  async function fetchItems() {
    try {
        const data = await api.getWorkItems();
        setItems(data);
    } catch {
      console.error("Failed to fetch work items");
    }
  }

  // Initial load
  useEffect(() => { fetchItems(); }, []);

  // Search
  useEffect(() => {
    if (search.trim() === "") { fetchItems(); return; }
    api.searchWorkItems(search)
      .then(setItems)
      .catch(() => console.error("Failed to search work items"));
  }, [search]);

  // Status filter
  useEffect(() => {
    if (filterStatus === "All") { fetchItems(); return; }
    api.filterWorkItems(filterStatus)
      .then(setItems)
      .catch(() => console.error("Failed to filter by status"));
  }, [filterStatus]);

  // Time period filter
  useEffect(() => {
    if (filterTimePeriod === "All") { fetchItems(); return; }
    api.filterWorkItemsByTimePeriod(filterTimePeriod)
      .then(setItems)
      .catch(() => console.error("Failed to filter by time period"));
  }, [filterTimePeriod]);

  return { items, refetch: fetchItems };
}