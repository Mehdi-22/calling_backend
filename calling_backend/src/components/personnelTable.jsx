import React, { useState } from "react";
import Table from "./common/table";

function PersonnelTable({ personnel, sortColumn, onSort, onDelete }) {
  const columns = [
    {
      path: "firstName",
      label: "Prénom",
    },
    {
      path: "lastName",
      label: "Nom",
    },
    {
      path: "grade",
      label: "Grade",
    },
    {
      path: "matricule",
      label: "Matricule",
    },
    {
      path: "unit",
      label: "Unité",
    },
    {
      key: "delete",
      content: (element) => (
        <button onClick={() => onDelete(element)} className="btn btn-danger">
          Supprimer
        </button>
      ),
      label: "Action",
    },
  ];

  return (
    <Table
      columns={columns}
      data={personnel}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
}

export default PersonnelTable;
