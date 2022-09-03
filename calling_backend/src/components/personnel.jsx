import React, { useState, useEffect } from "react";
import { getPersonnel, deletePersonnel } from "../services/personnelService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
//import ListGroup from "./common/listGroup";
import PersonnelTable from "./personnelTable";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
//import SearchBox from "./common/searchBox";

function Personnel() {
  const [personnel, setPersonnel] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  let [totalCount, setTotalCount] = useState(0);
  const [sortColumn, setSortColumn] = useState({
    path: "firstName",
    order: "asc",
  });

  useEffect(() => {
    async function fetchData() {
      const { data: object } = await getPersonnel();
      const personnel = object._embedded.personalList;
      setPersonnel(personnel);
    }
    fetchData();
  });

  const getPageData = () => {
    let filtered = personnel;
    if (searchQuery)
      filtered = personnel.filter((m) =>
        m._id.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    personnel = paginate(sorted, currentPage, pageSize);
    setTotalCount(filtered.length);

    setPersonnel(personnel);
  };

  const handleDelete = async (element) => {
    const originalPersonnel = personnel;
    const personnel = originalPersonnel.filter((m) => m._id !== element._id);
    setPersonnel(personnel);
    try {
      await deletePersonnel(element._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Cet élément est déjà supprimé");
      setPersonnel(originalPersonnel);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  return (
    <React.StrictMode>
      <div className="row">
        <div className="col-2"></div>

        <div className="col">
          <h3> {totalCount} éléments.</h3>

          <PersonnelTable
            personnel={personnel}
            sortColumn={sortColumn}
            onDelete={handleDelete}
            onSort={handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </React.StrictMode>
  );
}

export default Personnel;
