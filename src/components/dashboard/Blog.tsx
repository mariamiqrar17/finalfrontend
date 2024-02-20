import { Card, CardBody, CardSubtitle, CardText, CardTitle, Button } from "reactstrap";
import Image from "next/image";
import { useState } from "react";

interface BlogProps {
  image: string;
  title: string;
  subtitle: string;
  text: string;
  color: string;
}

const Blog: React.FC<BlogProps> = ({ image, title, subtitle, text, color }) => {
  const [comment, setComment] = useState("");
  const [reaction, setReaction] = useState("");

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleReactionSelect = (reaction: string) => {
    setReaction(reaction);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implement your logic to submit the comment and reaction
    console.log("Comment submitted:", comment);
    console.log("Reaction selected:", reaction);
    setComment("");
    setReaction("");
  };

  return (
    <Card>
      <Image alt="Card image cap" src={image} width={240} height={200} />
      <CardBody className="p-4 text-black flex flex-col items-center">
        <CardTitle tag="h5" className="mt-2 mb-1">{title}</CardTitle>
        <CardSubtitle className="mb-1">{subtitle}</CardSubtitle>
        <CardText className="mt-3 mb-2">{text}</CardText>
        
        <Button color={color} className="mb-2">Read More</Button>
        
      </CardBody>
    </Card>
  );
};

export default Blog;
