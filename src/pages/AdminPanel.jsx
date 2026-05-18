import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Trash2, Edit2, LogOut, Loader } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { supabase } from "../lib/supabase"

export default function AdminPanel() {
  const navigate = useNavigate()
  const { logout, adminEmail } = useAuthStore()

  const [memesList, setMemesList] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    videoFile: null,
    thumbnailFile: null,
  })

  /* ================= FETCH MEMES ================= */

  useEffect(() => {
    fetchMemes()
  }, [])

  const fetchMemes = async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from("memes")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.warn('Supabase fetch failed:', error.message)
        setMemesList([])
      } else {
        setMemesList(data || [])
      }
    } catch (err) {
      console.error('Error fetching memes:', err)
      setMemesList([])
    } finally {
      setLoading(false)
    }
  }

  /* ================= STORAGE UPLOAD ================= */

  const uploadFile = async (file, folder) => {
    const fileName = `${Date.now()}-${file.name}`

    const { error } = await supabase.storage
      .from("memes")
      .upload(`${folder}/${fileName}`, file)

    if (error) throw error

    const { data } = supabase.storage
      .from("memes")
      .getPublicUrl(`${folder}/${fileName}`)

    return data.publicUrl
  }

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  /* ================= ADD ================= */

  const handleAddNew = () => {
    setEditingId(null)
    setFormData({
      title: "",
      category: "",
      videoFile: null,
      thumbnailFile: null,
    })
    setShowForm(true)
  }

  /* ================= EDIT ================= */

  const handleEdit = (meme) => {
    setEditingId(meme.id)
    setFormData({
      title: meme.title,
      category: meme.category,
      videoFile: null,
      thumbnailFile: null,
    })
    setShowForm(true)
  }

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      let videoUrl = null
      let thumbnailUrl = null

      if (formData.videoFile) {
        videoUrl = await uploadFile(formData.videoFile, "videos")
      }

      if (formData.thumbnailFile) {
        thumbnailUrl = await uploadFile(
          formData.thumbnailFile,
          "thumbnails"
        )
      }

      if (editingId) {
        const updatePayload = {
          title: formData.title,
          category: formData.category,
        }
        if (videoUrl) updatePayload.video = videoUrl
        if (thumbnailUrl) updatePayload.thumbnail = thumbnailUrl

        const { error } = await supabase
          .from("memes")
          .update(updatePayload)
          .eq("id", editingId)

        if (error) throw error
      } else {
        const insertPayload = {
          title: formData.title,
          category: formData.category,
          video: videoUrl,
          thumbnail: thumbnailUrl,
          created_at: new Date(),
        }
        const { error } = await supabase
          .from("memes")
          .insert([insertPayload])

        if (error) throw error
      }

      fetchMemes()
      setShowForm(false)
    } catch (err) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this meme?")) return

    const { error } = await supabase
      .from("memes")
      .delete()
      .eq("id", id)

    if (!error) fetchMemes()
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-dark pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-4xl text-white font-bold">
              Admin Panel
            </h1>
            <p className="text-primary/70">
              Logged in as: {adminEmail}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 px-6 py-3 rounded-full text-red-400"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Add Button */}
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddNew}
          className="mb-8 flex items-center gap-2 bg-primary text-dark px-6 py-3 rounded-2xl"
        >
          <Plus />
          Add Meme
        </motion.button>

        {/* FORM */}
        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0a0a0a] p-8 rounded-3xl border border-primary/20 space-y-4 mb-8"
          >
            <input
              required
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-3 bg-[#111] text-white rounded-xl"
            />

            <input
              required
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
              className="w-full p-3 bg-[#111] text-white rounded-xl"
            />

            {/* VIDEO */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-primary/70">Video File</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    videoFile: e.target.files[0],
                  })
                }
                className="text-white bg-[#111] p-3 rounded-xl border border-primary/10 w-full"
                required={!editingId}
              />
            </div>

            {/* THUMBNAIL */}



            <div className="flex gap-3">
              <button
                disabled={submitting}
                className="flex-1 bg-primary text-dark py-3 rounded-xl flex justify-center items-center gap-2"
              >
                {submitting && (
                  <Loader className="animate-spin w-4 h-4" />
                )}
                {editingId ? "Update Meme" : "Add Meme"}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-[#222] text-white py-3 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}

        {/* TABLE */}
        {loading ? (
          <div className="text-center">
            <Loader className="animate-spin text-primary mx-auto" />
          </div>
        ) : (
          <div className="bg-[#0a0a0a] rounded-3xl border border-primary/20 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/10">
                  <th className="p-4 text-left text-white">Title</th>
                  <th className="p-4 text-left text-white">Category</th>
                  <th className="p-4 text-left text-white">Actions</th>
                </tr>
              </thead>

              <tbody>
                {memesList.map((meme) => (
                  <tr key={meme.id}>
                    <td className="p-4 text-white">{meme.title}</td>
                    <td className="p-4 text-primary/70">
                      {meme.category}
                    </td>

                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(meme)}
                        className="bg-primary/20 px-3 py-2 rounded-lg"
                      >
                        <Edit2 size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(meme.id)}
                        className="bg-red-500/20 px-3 py-2 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}