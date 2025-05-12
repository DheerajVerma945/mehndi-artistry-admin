import React, { useEffect, useState } from 'react'
import { axiosInstance } from './axios'
import { Link } from 'react-router-dom'
import { Timer } from 'lucide-react'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get('/admin/blogs')
      setPosts(res.data)
    } catch (error) {
      console.error('Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 py-8 bg-amber-50 px-4">
      <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <Link
            to={`/post/${post._id}`}
            key={post._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-100 
            hover:shadow-xl transition-transform hover:-translate-y-1 duration-200"
          >
            <img
              src={post.src}
              alt={post.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-6 space-y-3">
              <h2 className="text-xl font-semibold text-amber-900">{post.title}</h2>
              <p className="text-sm text-amber-700 line-clamp-2">
                {post.about}
              </p>
              <div className="flex items-center gap-2 text-amber-600 text-sm">
                <Timer className="w-4 h-4" />
                <span>{post.time} minutes</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Posts