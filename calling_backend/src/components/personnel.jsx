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
  const [totalCount, setTotalCount] = useState(0);
  const [sortColumn, setSortColumn] = useState({
    path: "firstName",
    order: "asc",
  });

  const fetchData = async () => {
    const { data: object } = await getPersonnel();
    const personnel = object._embedded.personalList;
    setPersonnel(personnel);
    getPageData(personnel);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getPageData = (personnel) => {
    let filtered = personnel;
    if (searchQuery)
      filtered = personnel.filter((m) =>
        m._id.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    setPersonnel(paginate(sorted, currentPage, pageSize));
    setTotalCount(filtered.length);
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
    getPageData(personnel);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
    getPageData(personnel);
  };

  useEffect(() => {
    fetchData();
  }, [sortColumn]);

  return (
    <div>
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
    </div>
  );
}

export default Personnel;
