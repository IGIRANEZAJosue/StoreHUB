import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import MainComponentArea from "../components/MainComponentArea";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Menu, X } from "lucide-react";
import apiClient from "../utils/apiClient";

const Dashboard = () => {
  const sampleComponents = [
    {
      image: "",
      title: "Modern Button Component",
      summary: "A sleek, responsive button with multiple variants",
      framework: "React",
      type: "Button",
      author: "John Doe",
      likes: 234,
      dislikes: 12,
    },
  ];

  const [posts, setPosts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle Sidebar

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get("/posts");
        console.log("Fetched posts:", response.data);
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 lg:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Toggle Button */}
      <button
        className="lg:hidden fixed size-10 flex items-center justify-center top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 z-40 
          transform transition-transform duration-300 ease-in-out
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="p-4 lg:p-6">
          <MainComponentArea
            components={posts.length > 0 ? posts : sampleComponents}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
