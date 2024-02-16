// Import necessary dependencies from zustand
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// Set domain of URL to avoid from complexity
const domain = "http://localhost:3001";
// Define the AuthStore function to create and manage the state of your store
const AuthStore = (set: any) => ({
  isLoggedin: false,
  token: "",
  user: {
    name: "",
    email: "",
    password: "",
    confirmPass: "",
    profileImage: "",
    profileData: "",
  },
  // Async function to handle user login
  login: async (loginData: any) => {
    try {
      console.log(loginData);
      // Make a POST request to the login endpoint
      const res = await fetch(`${domain}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      // Check if the response status is not 200 OK
      if (!res.ok) {
        // You can handle the error here, throw an error, or return a specific value
        const errorMessage = await res.text();
        throw new Error(`Login failed: ${errorMessage}`);
      }
      // Parse the response as JSON
      const loginToken = await res.json();
      console.log(loginToken);
      // Update the state with the received token
      set({
        isLoggedin: true,
        token: loginToken.token,
      });
    } catch (error) {
      // Log any errors that occur during the login process
      console.error(error);
    }
  },
  // Function to handle user signup
  signUp: (signupData: any) =>
    set(async (state: any) => {
      try {
        // Make a POST request to the signup endpoint
        const res = await fetch(`${domain}/auth/register`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(signupData),
        });
        // Parse the response as JSON
        const signupToken = await res.json();
        console.log(signupToken);
        // Update the state with the received token
      } catch (error) {
        console.log(error);
      }
    }),
});
// Create the store named 'useAuthStore' with middleware for devtools and localStorage persistence
const useAuthStore = create(
  devtools(
    persist(AuthStore, {
      name: "Auth", // Name for localStorage persistence
    })
  )
);
// Export the useAuthStore for use in other parts of your application
export default useAuthStore;
