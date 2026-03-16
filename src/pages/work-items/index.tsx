import { useEffect, useState, useCallback } from "react";
import type WorkItem from "../../types/WorkItem";
import type { WorkItemFormData, FormErrors } from "../../types/WorkItem";
import WorkItemTrackerAPI from "../../api/WorkItemTrackerAPI";
import Header from "../../components/header/Header";
import WorkItemSearchBar from "./WorkItemSearchBar";
import WorkItemList from "./WorkItemList";
import WorkItemDetail from "./WorkItemDetail";
import Modal from "../../components/modal/Modal";
import DeleteConfirmDialog from "../../components/confirmation/DeleteConfirmDialog";
import "./index.css";

const EMPTY_FORM: WorkItemFormData = { title: "", description: "", status: "Open" };

export default function WorkItemsPage() {
  const api = WorkItemTrackerAPI();

  const [items, setItems] = useState<WorkItem[]>([]);
  const [viewId, setViewId] = useState<number | null>(null);
  const [modal, setModal] = useState<"new" | WorkItem | null>(null);
  const [deleting, setDeleting] = useState<WorkItem | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilter] = useState("All");
  const [form, setForm] = useState<WorkItemFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [filterTimePeriod, setFilterTimePeriod] = useState<number | "All">("All");

  const viewItem = viewId != null ? items.find(i => i.id === viewId) ?? null : null;

  const fetchItems = useCallback(async () => {
    try {
      let result: WorkItem[];

      if (filterTimePeriod !== "All") {
        result = await api.filterWorkItemsByTimePeriod(filterTimePeriod);
      } else if (search.trim()) {
        result = await api.searchWorkItems(search);
      } else if (filterStatus !== "All") {
        result = await api.filterWorkItems(filterStatus);
      } else {
        result = await api.getWorkItems();
      }
      setItems(result);
    } catch {
      console.error("Failed to fetch work items");
    }
  }, [search, filterStatus, filterTimePeriod]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  function openNew() {
    setForm(EMPTY_FORM);
    setErrors({});
    setModal("new");
  }

  function openEdit(item: WorkItem) {
    setForm({ title: item.title, description: item.description, status: item.status });
    setErrors({});
    setModal(item);
  }

  function closeModal() { setModal(null); }

  async function save() {
    const e: FormErrors = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.description.trim()) e.description = "Required";
    if (Object.keys(e).length) { setErrors(e); return; }

    try {
      if (modal === "new") {
        await api.createWorkItem(form);
      } else if (modal != null) {
        await api.updateWorkItem(modal.id, form);
      }
      setModal(null);
      fetchItems();
    } catch {
      console.error("Failed to save work item");
    }
  }

  async function doDelete() {
    if (!deleting) return;
    try {
      await api.deleteWorkItem(deleting.id);
      if (viewId === deleting.id) setViewId(null);
      setDeleting(null);
      fetchItems();
    } catch {
      console.error("Failed to delete work item");
    }
  }

  return (
    <>
      <Header onNew={openNew} />

      <main className="main">
        {viewItem ? (
          <WorkItemDetail
            item={viewItem}
            onBack={() => setViewId(null)}
            onEdit={openEdit}
            onDelete={setDeleting}
          />
        ) : (
          <>
            <WorkItemSearchBar
              search={search}
              setSearch={setSearch}
              filterStatus={filterStatus}
              setFilter={setFilter}
              filterTimePeriod={filterTimePeriod}
              setFilterTimePeriod={setFilterTimePeriod}
            />
            <WorkItemList
              items={items}
              onView={setViewId}
              onEdit={openEdit}
              onDelete={setDeleting}
            />
          </>
        )}
      </main>

      {modal !== null && (
        <Modal
          type={modal === "new" ? "new" : "edit"}
          form={form}
          errors={errors}
          setForm={setForm}
          onSave={save}
          onClose={closeModal}
        />
      )}

      {deleting && (
        <DeleteConfirmDialog
          item={deleting}
          onConfirm={doDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </>
  );
}