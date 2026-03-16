import { useState } from "react";
import type WorkItem from "../types/WorkItem";
import type { WorkItemFormData, FormErrors } from "../types/WorkItem";
import WorkItemTrackerAPI from "../api/WorkItemTrackerAPI";

const EMPTY_FORM: WorkItemFormData = {
  title: "",
  description: "",
  status: "Open",
};

export function useWorkItemForm(onSuccess: () => void) {
  const api = WorkItemTrackerAPI();
  const [modal, setModal] = useState<"new" | WorkItem | null>(null);
  const [deleting, setDeleting] = useState<WorkItem | null>(null);
  const [form, setForm] = useState<WorkItemFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  function openNew() {
    setForm(EMPTY_FORM);
    setErrors({});
    setModal("new");
  }

  function openEdit(item: WorkItem) {
    setForm({
      title: item.title,
      description: item.description,
      status: item.status,
    });
    setErrors({});
    setModal(item);
  }

  function closeModal() {
    setModal(null);
  }

  async function save() {
    const e: FormErrors = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.description.trim()) e.description = "Required";
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    try {
      if (modal === "new") {
        await api.createWorkItem(form);
      } else if (modal !== null) {
        await api.updateWorkItem(modal.id, form);
      }
      setModal(null);
      onSuccess();
    } catch {
      console.error("Failed to save work item");
    }
  }

  async function doDelete(onDeleted?: (id: number) => void) {
    if (!deleting) return;
    try {
      await api.deleteWorkItem(deleting.id);
      onDeleted?.(deleting.id);
      setDeleting(null);
      onSuccess();
    } catch {
      console.error("Failed to delete work item");
    }
  }

  return {
    modal,
    form,
    errors,
    deleting,
    setForm,
    setDeleting,
    openNew,
    openEdit,
    closeModal,
    save,
    doDelete,
  };
}
