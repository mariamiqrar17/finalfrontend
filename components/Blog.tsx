'use client'
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import PropTypes from "prop-types";
import Image from "next/image";

const Blog: React.FC<any> = ({ title, author, site_url, language }) => {
  return (
    <Card>
      <CardBody className="p-4">
        <CardTitle tag="h5">{title}</CardTitle>
        <CardSubtitle>{author}</CardSubtitle>
        <CardText className="mt-3">{site_url}</CardText>
        <Button color={language}>Read More</Button>
      </CardBody>
    </Card>
  );
};

Blog.propTypes = {
  title: PropTypes.string,
  image: PropTypes.any,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
};
export default Blog;
