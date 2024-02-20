import React, { useState, useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
} from "reactstrap";

interface TableDataItem {
  author: string;
  language: string;
  type: string;
  participants_count: number;
  domain_rank: number;
  site_url: string;
  spam_score: number;
}

const ProjectTables: React.FC = () => {
  const [tableData, setTableData] = useState<TableDataItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:3000/articles")
      .then((response) => response.json())
      .then((data: TableDataItem[]) => setTableData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <CardBody className="mb-4">
  <CardTitle tag="h3" className="text-black">Project Listing</CardTitle>
  <CardSubtitle className="mb-2 text-black" tag="h6">
    Overview of the projects
  </CardSubtitle>
  <div className="table-responsive">
    <Table className="table table-striped" style={{ backgroundColor: 'white', color: 'black' }}>
      <thead className="bg-white">
        <tr>
          <th className="text-center bg-white">Author</th>
          <th className="text-center bg-white">Language</th>
          <th className="text-center bg-white">Spam Score</th>
          <th className="text-center bg-white">URL</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((data, index) => (
          <tr key={index}>
            <td className="text-center bg-white">{data.author}</td>
            <td className="text-center bg-white">{data.language}</td>
            <td className="text-center bg-white">{data.spam_score}</td>
            <td className="text-center bg-white">{data.site_url}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
  <div
    className="mt-4"
    style={{ display: "flex", justifyContent: "center" }}
  >
    <Button
      disabled={currentPage === 1}
      onClick={() => handlePageChange(currentPage - 1)}
      className="me-2"
    >
      <BiChevronLeft />
    </Button>
    <Button className="text-2xl"
      disabled={currentItems.length < itemsPerPage}
      onClick={() => handlePageChange(currentPage + 1)}
    >
      <BiChevronRight />
    </Button>
  </div>
</CardBody>

  );
};

export default ProjectTables;
