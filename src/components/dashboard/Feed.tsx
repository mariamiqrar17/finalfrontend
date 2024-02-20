import React, { useState } from "react";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";

const FeedData = [
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "primary",
    date: "6 minute ago",
    id: 1,
  },
  {
    title: "New user registered.",
    icon: "bi bi-person",
    color: "info",
    date: "6 minute ago",
    id: 2,
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "danger",
    date: "6 minute ago",
    id: 3,
  },
  {
    title: "New order received.",
    icon: "bi bi-bag-check",
    color: "success",
    date: "6 minute ago",
    id: 4,
  },
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "dark",
    date: "6 minute ago",
    id: 5,
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "warning",
    date: "6 minute ago",
    id: 6,
  },
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "dark",
    date: "6 minute ago",
    id: 5,
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "warning",
    date: "6 minute ago",
    id: 6,
  },
];

const Feeds = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = FeedData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Card className="bg-white">
      <CardBody>
        <CardTitle tag="h5" className=" bg-white text-black">
          Feeds
        </CardTitle>
        <CardSubtitle className="mb-2 text-black bg-white" tag="h6">
          Widget you can use
        </CardSubtitle>
        <ListGroup flush className="mt-4 bg-white">
          {currentItems.map((feed) => (
            <ListGroupItem
              key={feed.id}
              action
              href="/"
              tag="a"
              className="d-flex align-items-center p-3 border-0 text-black custom-list-group-item"
            >
              <Button className="rounded-circle me-3 " size="sm">
                <i className={feed.icon} />
              </Button>
              {feed.title}
              <small className="ms-auto text-small text-black">
                {feed.date}
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
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
    </Card>
  );
};

export default Feeds;
