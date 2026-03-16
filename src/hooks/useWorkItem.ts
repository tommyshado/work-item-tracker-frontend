import { useState, useEffect } from "react";
import type WorkItem from "../types/WorkItem";
import WorkItemTrackerAPI from "../api/WorkItemTrackerAPI";

export default function useWorkItem(id: number | null) {
  const api = WorkItemTrackerAPI();
  const [workItem, setWorkItem] = useState<WorkItem | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchWorkItem() {
    if (id === null) {
      setWorkItem(null);
      return;
    }
    setLoading(true);
    try {
      const item = await api.getWorkItem(id);
      setWorkItem(item);
    } catch {
      console.error(`Failed to fetch work item ${id}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWorkItem();
  }, [id]);

  return { workItem, setWorkItem, loading, refetch: fetchWorkItem };
}
