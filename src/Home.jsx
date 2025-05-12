import React from "react";
import { FileText, User, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Manage Posts",
      icon: <FileText className="text-amber-600" size={32} />,
      onClick: () => navigate("/posts"),
    },
    {
      title: "Account Details",
      icon: <User className="text-amber-600" size={32} />,
      onClick: () => navigate("/account"),
    },
    {
      title: "Add New Post",
      icon: <Plus className="text-amber-600" size={32} />,
      onClick: () => navigate("/add-post"),
    },
  ];

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <h1 className="text-4xl font-bold text-amber-900 text-center mb-12">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={section.onClick}
              className="group bg-white rounded-2xl p-8 flex flex-col items-center justify-center transition-all 
              shadow-lg hover:shadow-xl border border-amber-100 hover:border-amber-200"
            >
              <div className="mb-4 text-amber-600 group-hover:text-amber-700 transition-colors">
                {section.icon}
              </div>
              <h3 className="text-xl font-semibold text-amber-900 group-hover:text-amber-800 transition-colors">
                {section.title}
              </h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
