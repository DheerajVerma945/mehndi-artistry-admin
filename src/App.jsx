import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Posts from "./Posts";
import PostDetails from "./PostDetails";
import Account from "./Account";
import AddBlog from "./AddBlog";
import Footer from "./Footer";
import ErrorPage from "./Error";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/account" element={<Account />} />
        <Route path="/add-post" element={<AddBlog />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
};

export default App;
