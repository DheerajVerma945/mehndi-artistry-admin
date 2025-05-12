import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { axiosInstance } from "./axios";

const Account = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.put("/admin/update-password", {
        currentPassword: oldPassword,
        newPassword,
      });
      toast.success("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 pt-[90px] px-4 py-12">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
        <h2 className="text-2xl font-bold text-amber-900 mb-8 text-center">
          Account Settings
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Admin Email
            </label>
            <input
              value="admin@mehndiartistry.in"
              readOnly
              className="w-full px-4 py-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900"
            />
          </div>

          <div className="space-y-6">
            {[
              {
                label: "Old Password",
                value: oldPassword,
                setter: setOldPassword,
                show: showOld,
                setShow: setShowOld,
              },
              {
                label: "New Password",
                value: newPassword,
                setter: setNewPassword,
                show: showNew,
                setShow: setShowNew,
              },
              {
                label: "Confirm Password",
                value: confirmPassword,
                setter: setConfirmPassword,
                show: showConfirm,
                setShow: setShowConfirm,
              },
            ].map((field, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-amber-700 mb-2">
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    type={field.show ? "text" : "password"}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    className="w-full px-4 py-3 pr-11 bg-amber-50 rounded-lg border border-amber-200
                    focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => field.setShow(!field.show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-700"
                  >
                    {field.show ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleChangePassword}
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg
            font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
