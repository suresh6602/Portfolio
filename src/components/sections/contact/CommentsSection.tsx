'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Upload, Heart, Pin, Check, AlertCircle, Sparkles } from 'lucide-react'
import useComments from '@/hooks/useComments'
import { useTheme } from '@/context/ThemeContext'

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
}

export default function CommentsSection() {
  const { comments, loading, addComment, likeComment } = useComments()
  const { playSound } = useTheme()

  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [toast, setToast] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    if (!name.trim() || !comment.trim()) {
      setToast({
        type: 'error',
        message: 'Please provide both your name and a comment.',
      })
      setTimeout(() => setToast(null), 3500)
      return
    }

    try {
      await addComment({
        name,
        comment,
        image,
      })

      setName('')
      setComment('')
      setImage(null)
      setPreview(null)
      playSound('select')

      setToast({
        type: 'success',
        message: 'Comment published successfully! 💬 ✨',
      })
      setTimeout(() => setToast(null), 4000)
    } catch {
      setToast({
        type: 'error',
        message: 'Could not post comment. Please try again.',
      })
      setTimeout(() => setToast(null), 4000)
    }
  }

  const handleLike = (id: number, currentLikes: number) => {
    likeComment(id, currentLikes)
    playSound('click')
    setToast({
      type: 'success',
      message: 'Thank you for the like! ❤️',
    })
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          ease: smoothEase,
        }}
        viewport={{ once: false, amount: 0.2 }}
        className="rounded-[28px] md:rounded-[34px] border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-8 h-full"
      >
        {/* HEADER */}
        <div className="mb-5 md:mb-6">
          <h3 className="text-xl md:text-2xl font-semibold mb-1">
            Comments
          </h3>

          <p className="text-xs md:text-sm text-white/65">
            Leave your thoughts here
          </p>
        </div>

        {/* FORM */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="space-y-3 md:space-y-4 mb-5 md:mb-6"
        >
          <motion.input
            variants={itemVariants}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            aria-label="Your name"
            autoComplete="name"
            className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 md:py-4 outline-none focus:border-white"
          />

          <motion.textarea
            variants={itemVariants}
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your Comment"
            aria-label="Your comment"
            className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 md:py-4 outline-none resize-none focus:border-white"
          />

          <motion.label
            variants={itemVariants}
            className="rounded-2xl border border-dashed border-white/15 bg-black/20 p-3 md:p-4 flex items-center gap-3 cursor-pointer"
          >
            <Upload size={16} />

            <span className="text-xs md:text-sm text-white/80">
              Upload Image (Optional)
            </span>

            <input
              hidden
              type="file"
              accept="image/*"
              aria-label="Upload an image with your comment"
              onChange={handleImage}
            />
          </motion.label>

          <AnimatePresence>
            {preview && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={preview}
                alt="Preview"
                className="rounded-2xl h-36 md:h-44 w-full object-cover border border-white/10"
              />
            )}
          </AnimatePresence>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-2xl py-3 md:py-4 bg-white/10 border border-white/10 hover:bg-white/15 transition-all cursor-pointer font-medium"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </motion.button>
        </motion.div>

        {/* COMMENTS LIST */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="rounded-[24px] md:rounded-[28px] border border-white/10 bg-black/20 p-3 h-[320px] md:h-[420px] overflow-y-auto custom-scroll"
        >
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {comments.map((item, i) => (
                <motion.div
                  key={item.id || i}
                  layout
                  initial={{
                    opacity: 0,
                    y: 18,
                    scale: 0.96,
                    filter: 'blur(6px)',
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: smoothEase,
                    layout: {
                      duration: 0.45,
                      ease: smoothEase,
                    },
                  }}
                  className={`rounded-[20px] md:rounded-[24px] border p-3 md:p-4 ${
                    item.is_pinned
                      ? 'border-purple-500/30 bg-purple-500/5'
                      : 'border-white/10 bg-white/[0.03]'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold shrink-0">
                      {item.name?.charAt(0)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-sm font-medium">
                          {item.name}
                        </p>

                        {item.is_pinned && (
                          <div className="flex items-center gap-1 px-2 py-[3px] rounded-full bg-purple-500/15 border border-purple-500/20 text-[10px] text-purple-300">
                            <Pin size={10} />
                            PINNED
                          </div>
                        )}
                      </div>

                      <p className="text-[12px] md:text-[13px] text-white/75 leading-relaxed">
                        {item.comment}
                      </p>

                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt="Comment"
                          className="mt-3 rounded-xl w-full max-h-48 md:max-h-56 object-cover border border-white/10"
                        />
                      )}
                    </div>

                    <button
                      onClick={() => handleLike(item.id, item.likes)}
                      className="flex items-center gap-1 text-[11px] text-white/60 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-white/5 active:scale-90"
                    >
                      <Heart size={13} className="text-rose-400" />
                      {item.likes || 0}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Global Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[99999] flex items-center gap-3 px-6 py-3.5 rounded-full border shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl pointer-events-none"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor:
                toast.type === 'success' ? 'var(--accent)' : 'rgba(239,68,68,0.5)',
              color: 'var(--text-primary)',
              boxShadow:
                toast.type === 'success'
                  ? '0 20px 50px rgba(0,0,0,0.5), 0 0 25px var(--accent-glow)'
                  : '0 20px 50px rgba(239,68,68,0.2)',
            }}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shadow-inner ${
                toast.type === 'success' ? 'text-emerald-400' : 'text-red-400'
              }`}
              style={{
                backgroundColor:
                  toast.type === 'success'
                    ? 'rgba(16,185,129,0.15)'
                    : 'rgba(239,68,68,0.15)',
              }}
            >
              {toast.type === 'success' ? (
                <Check size={14} className="stroke-[3]" />
              ) : (
                <AlertCircle size={14} className="stroke-[3]" />
              )}
            </div>

            <div className="flex items-center gap-2">
              <p className="text-[13.5px] font-bold tracking-wide">
                {toast.message}
              </p>
              {toast.type === 'success' && (
                <Sparkles size={14} className="text-amber-400" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}