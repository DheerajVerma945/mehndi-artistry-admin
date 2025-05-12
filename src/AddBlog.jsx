import React, { useState } from "react";
import { axiosInstance } from "./axios";
import toast from "react-hot-toast";
import { Loader2, X, Camera, FileText, PlusCircle, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddDesign = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !about || !image || !time) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      const data = { title, about, image: base64Image, time };

      try {
        await axiosInstance.post("/admin/blogs", data);
        toast.success("Design uploaded successfully");
        navigate("/posts");
      } catch {
        toast.error("Upload failed");
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <div className="min-h-screen bg-amber-50 pt-24 px-4 pb-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
        <div className="flex items-center gap-3 mb-8">
          <PlusCircle className="w-7 h-7 text-amber-600" />
          <h1 className="text-2xl font-bold text-amber-900">
            Upload New Design
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Design Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-amber-50 rounded-lg border border-amber-200
              focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              placeholder="Enter design title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Design Description
            </label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-4 py-3 bg-amber-50 rounded-lg border border-amber-200
              focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              placeholder="Describe the design details..."
              rows="4"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-amber-700 mb-2">
                Application Time
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 bg-amber-50 rounded-lg border border-amber-200
                  focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="Minutes (e.g. 45)"
                  min="1"
                />
                <Timer className="absolute right-3 top-3.5 text-amber-500 w-5 h-5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-700 mb-2">
                Design Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="imageInput"
                />
                <label
                  htmlFor="imageInput"
                  className={`block cursor-pointer w-full h-full p-8 border-2 border-dashed
                  ${
                    imagePreview ? "border-amber-200" : "border-amber-300"
                  } rounded-lg
                  bg-amber-50 hover:border-amber-400 transition-colors text-center`}
                >
                  {imagePreview ? (
                    <div className="relative group">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={handleImageRemove}
                        className="absolute -top-3 -right-3 bg-white p-1.5 rounded-full
                        shadow-lg hover:bg-amber-50 transition-colors"
                      >
                        <X className="w-5 h-5 text-amber-600" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Camera className="w-8 h-8 text-amber-500 mx-auto" />
                      <p className="text-sm text-amber-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-amber-500">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3.5 rounded-lg
            font-medium transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <PlusCircle className="w-5 h-5" />
                Upload Design
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDesign;
