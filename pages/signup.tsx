import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await fetch(
        "https://finalbackend-rho.vercel.app/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("User registered successfully:", data);
        toast.success("User registered successfully");
        router.push("/login");
      } else {
        const errorData = await response.json();
        console.error("Failed to register user:", errorData);
        toast.error("Failed to register user");

        if (
          response.status === 409 &&
          errorData.message === "User with this email already exists"
        ) {
          toast.error("Email already exists");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-500 h-screen flex items-center rounded-2xl justify-center">
      <Form method="POST" className="bg-white border border-gray-300 rounded-lg shadow-lg px-5 py-5">
        <FormGroup>
          <Label className="text-black font-extrabold text-3xl">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label className="text-black font-extrabold text-3xl">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label className="text-black font-extrabold text-3xl">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </FormGroup>

        <Button type="button" onClick={handleSignUp}>
          Sign Up
        </Button>

        <ToastContainer />
      </Form>
    </div>
  );
};

export default SignUpPage;
