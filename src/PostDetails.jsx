import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "./axios";
import {
  Pencil,
  Loader2,
  Save,
  Trash2,
  X,
  Check,
  ArrowLeft,
  Timer,
} from "lucide-react";
import toast from "react-hot-toast";

const ConfirmDialog = ({ open, onClose, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl space-y-4 border border-amber-100">
        <h3 className="text-lg font-semibold text-amber-900">
          Delete this post?
        </h3>
        <p className="text-sm text-amber-700">This action cannot be undone.</p>
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 flex items-center gap-1"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
          >
            <Check className="w-4 h-4" /> Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [time, setTime] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const fetchPost = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await axiosInstance.get(`/admin/blogs/${id}`);
      setPost(res.data);
      setTitle(res.data.title);
      setAbout(res.data.about);
      setTime(res.data.time);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await axiosInstance.put(`/admin/blogs/${id}`, { title, about, time });
      toast.success("Post updated successfully");
      setIsEditing(false);
      fetchPost();
    } catch {
      toast.error("Failed to update post");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axiosInstance.delete(`/admin/blogs/${id}`);
      toast.success("Post deleted successfully");
      navigate("/posts");
    } catch {
      toast.error("Failed to delete post");
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4 bg-amber-50">
        <p className="text-lg text-amber-700">Blog post not found.</p>
        <button
          onClick={() => navigate("/posts")}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Designs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 py-10 bg-amber-50">
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8 border border-amber-100">
        <div className="aspect-video overflow-hidden rounded-xl border border-amber-100">
          <img
            src={post.src}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1">
            {isEditing ? (
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-2xl font-semibold px-4 py-2 rounded-lg bg-amber-50 border-amber-200 
                focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            ) : (
              <h2 className="text-2xl font-semibold text-amber-900">
                {post.title}
              </h2>
            )}
          </div>

          <div className="flex flex-wrap gap-2 flex-shrink-0">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdate}
                  disabled={updating}
                  className="text-white bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg 
                  flex items-center gap-2 transition disabled:opacity-50"
                >
                  {updating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-amber-700 bg-amber-100 hover:bg-amber-200 px-4 py-2 rounded-lg 
                  flex items-center gap-2 transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="text-white bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg 
                flex items-center gap-2 transition"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>
            )}
            <button
              onClick={() => setConfirmOpen(true)}
              disabled={updating || deleting}
              className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg 
              flex items-center gap-2 transition disabled:opacity-50"
            >
              {deleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Delete
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-amber-700">
              Application Time
            </label>
            {isEditing ? (
              <div className="relative mt-1">
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-amber-50 border border-amber-200 
                  focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  min="1"
                />
                <Timer className="absolute right-3 top-2.5 text-amber-500 w-5 h-5" />
              </div>
            ) : (
              <p className="text-amber-800 font-medium mt-1 flex items-center gap-2">
                <Timer className="w-5 h-5 text-amber-600" /> {post.time} minutes
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-amber-700">
              Design Description
            </label>
            {isEditing ? (
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full px-4 py-3 mt-1 rounded-lg bg-amber-50 border border-amber-200 
                focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[180px]"
              />
            ) : (
              <p className="text-amber-700 text-base leading-relaxed whitespace-pre-line mt-2">
                {post.about}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
