import { useParams, useNavigate } from "react-router-dom";
import { useWorkItemForm } from "../../hooks/useWorkItemForm";
import Header from "../../components/header/Header";
import WorkItemDetail from "./WorkItemDetail";
import Modal from "../../components/modal/Modal";
import DeleteConfirmDialog from "../../components/confirmation/DeleteConfirmDialog";
import useWorkItem from "../../hooks/useWorkItem";

export default function WorkItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const numericId = id ? Number(id) : null;

  const { workItem, refetch } = useWorkItem(numericId);

  const {
    modal,
    form,
    errors,
    deleting,
    setForm,
    setDeleting,
    openEdit,
    closeModal,
    save,
    doDelete,
    openNew, // Not used but required by the hook
  } = useWorkItemForm(() => {
    // Re-fetch after edit by refreshing the item in state
    if (numericId) refetch();
  });

  if (!workItem) return null; // or a loading/skeleton component

  return (
    <>
      <Header onNew={openNew} />

      <main className="main">
        <WorkItemDetail
          item={workItem}
          onBack={() => navigate("/work-items")}
          onEdit={() => {
            openEdit(workItem);
            refetch();
          }}
          onDelete={setDeleting}
        />
      </main>

      {modal !== null && (
        <Modal
          type="edit"
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
          onConfirm={() =>
            doDelete((deletedId) => {
              if (deletedId === numericId) navigate("/");
            })
          }
          onCancel={() => setDeleting(null)}
        />
      )}
    </>
  );
}
