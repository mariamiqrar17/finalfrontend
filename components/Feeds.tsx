import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";

interface News {
  title: string;
  color: string;
  date: string;
  id: number;
  author: string;
}

const Feeds: React.FC = () => {
  const [feeds, setFeeds] = useState<News[]>([]);

  useEffect(() => {
    const fetchNewsByAuthor = async () => {
      try {
        const response = await axios.get("/api/news/author");
        setFeeds(response.data);
      } catch (error) {
        console.error("Error fetching news by author:", error);
      }
    };

    fetchNewsByAuthor();
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Feeds</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Widget you can use
        </CardSubtitle>
        <ListGroup flush className="mt-4">
          {feeds.map((feed) => (
            <ListGroupItem
              key={feed.author}
              action
              href="/"
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Button
                className="rounded-circle me-3"
                size="sm"
                color={feed.color}
              >
              </Button>
              {feed.title}
              <small className="ms-auto text-muted text-small">
                {feed.date}
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
