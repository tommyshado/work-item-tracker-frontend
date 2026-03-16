import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkItems } from "../../hooks/useWorkItems";
import { useWorkItemForm } from "../../hooks/useWorkItemForm";
import Header from "../../components/header/Header";
import WorkItemSearchBar from "./WorkItemSearchBar";
import WorkItemList from "./WorkItemList";
import Modal from "../../components/modal/Modal";
import DeleteConfirmDialog from "../../components/confirmation/DeleteConfirmDialog";
import "./index.css";

export default function WorkItemsPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilter] = useState("All");
  const [filterTimePeriod, setFilterTimePeriod] = useState<number | "All">(
    "All",
  );

  const { items, refetch } = useWorkItems(
    search,
    filterStatus,
    filterTimePeriod,
  );

  const {
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
  } = useWorkItemForm(refetch);

  return (
    <>
      <Header onNew={openNew} />

      <main className="main">
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
          onView={(id) => navigate(`/work-items/${id}`)}
          onEdit={openEdit}
          onDelete={setDeleting}
        />
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
          onConfirm={() => {
            doDelete(() => setDeleting(null));
            navigate("/");
          }}
          onCancel={() => setDeleting(null)}
        />
      )}
    </>
  );
}
