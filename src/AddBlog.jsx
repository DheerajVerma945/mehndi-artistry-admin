import React, { useState } from 'react'
import { axiosInstance } from './axios'
import toast from 'react-hot-toast'
import { Loader2, X, ImagePlus, FileText, Heading3, PlusCircle, Timer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AddDesign = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [time, setTime] = useState('')
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(file)
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageRemove = () => {
    setImage(null)
    setImagePreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !about || !image || !time) {
      toast.error('All fields are required')
      return
    }

    setLoading(true)

    const reader = new FileReader()
    reader.readAsDataURL(image)

    reader.onloadend = async () => {
      const base64Image = reader.result

      const data = {
        title,
        about,
        image: base64Image,
        time,
      }

      try {
        await axiosInstance.post('/admin/blogs', data)
        toast.success('Design uploaded')
        navigate('/designs')
      } catch {
        toast.error('Upload failed')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-8">
        <div className="flex items-center gap-3">
          <PlusCircle className="w-6 h-6 text-black" />
          <h1 className="text-2xl font-semibold text-gray-800">Upload New Design</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Enter title"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Description
            </label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Write something about the design"
              rows="5"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Timer className="w-4 h-4" />
              Application Time (minutes)
            </label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="e.g. 30"
              min="1"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <ImagePlus className="w-4 h-4" />
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block"
            />
            {imagePreview && (
              <div className="relative mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-52 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleImageRemove}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full shadow"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Upload Design'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddDesign
