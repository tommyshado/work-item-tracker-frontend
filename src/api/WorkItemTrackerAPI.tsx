import axios from "axios";
import type WorkItem from "../types/WorkItem";

export default function WorkItemTrackerAPI() {
    async function createWorkItem(data: Partial<WorkItem>) {
        try {
            const response = await axios.post("/api/workitems", data);
            return response.data as WorkItem;
        } catch (error) {
            console.error("Error creating work item:", error);
            throw error;
        }
    }

    async function getWorkItems() {
        try {
            const response = await axios.get("/api/workitems");
            return response.data as WorkItem[];
        } catch (error) {
            console.error("Error fetching work items:", error);
            throw error;
        }
    }

    async function getWorkItem(id: number) {
        try {
            const response = await axios.get(`/api/workitems/${id}`);
            return response.data as WorkItem;
        } catch (error) {
            console.error(`Error fetching work item ${id}:`, error);
            throw error;
        }
    }

    async function updateWorkItem(id: number, data: Partial<WorkItem>) {
        try {
            const response = await axios.put(`/api/workitems/${id}`, {...data, id});
            return response.data as WorkItem;
        } catch (error) {
            console.error(`Error updating work item ${id}:`, error);
            throw error;
        }
    }

    async function deleteWorkItem(id: number) {
        try {
            await axios.delete(`/api/workitems/${id}`);
        } catch (error) {
            console.error(`Error deleting work item ${id}:`, error);
            throw error;
        }
    }

    async function searchWorkItems(query: string) {
        try {
            const response = await axios.get(`/api/workitems/search?query=${encodeURIComponent(query)}`);
            return response.data as WorkItem[];
        } catch (error) {
            console.error(`Error searching work items with query "${query}":`, error);
            throw error;
        }
    }

    async function filterWorkItems(status: string) {
        try {
            const response = await axios.get(`/api/workitems/status/${encodeURIComponent(status)}`);
            return response.data as WorkItem[];
        } catch (error) {
            console.error(`Error filtering work items with status "${status}":`, error);
            throw error;
        }
    }

    async function filterWorkItemsByTimePeriod(hours: number) {
        try {
            const response = await axios.get(`/api/workitems/timeframe/${hours}`);
            return response.data as WorkItem[];
        } catch (error) {
            console.error(`Error filtering work items by time period "${hours}" hours:`, error);
            throw error;
        }
    }

    return {
        createWorkItem,
        getWorkItems,
        getWorkItem,
        updateWorkItem,
        deleteWorkItem,
        searchWorkItems,
        filterWorkItems,
        filterWorkItemsByTimePeriod,
    };
}