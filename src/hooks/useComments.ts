'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import {
  fetchCommentsService,
  createCommentService,
  likeCommentService,
  uploadCommentImageService,
} from '@/lib/commentService'

const DEFAULT_COMMENTS = [
  {
    id: 101,
    name: 'Sureshkumar R',
    comment:
      'Welcome to my portfolio! Feel free to leave your thoughts, project feedback, or say hello.',
    image_url: null,
    likes: 14,
    is_pinned: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 102,
    name: 'Engineering Lead',
    comment:
      'The multi-tenant architecture and LangGraph multi-LLM workflows in OneReach are brilliantly built. Great attention to detail and performance!',
    image_url: null,
    likes: 9,
    is_pinned: false,
    created_at: new Date().toISOString(),
  },
]

export default function useComments() {
  const [comments, setComments] = useState<any[]>(DEFAULT_COMMENTS)
  const [loading, setLoading] = useState(false)
  const isOnlineRef = useRef(true)

  useEffect(() => {
    fetchInitialComments()

    let channel: any = null

    try {
      channel = supabase
        .channel('comments-live')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'comments',
          },
          async () => {
            try {
              const data = await fetchCommentsService()
              if (data && data.length > 0) setComments(data)
            } catch {
              // Ignore background realtime fetch error
            }
          }
        )
        .subscribe((status: string) => {
          if (status === 'CHANNEL_ERROR') {
            isOnlineRef.current = false
          }
        })
    } catch {
      isOnlineRef.current = false
    }

    return () => {
      if (channel) {
        try {
          supabase.removeChannel(channel)
        } catch {
          // Ignore cleanup error
        }
      }
    }
  }, [])

  const fetchInitialComments = async () => {
    try {
      const data = await fetchCommentsService()
      if (data && data.length > 0) {
        setComments(data)
      } else {
        setComments(DEFAULT_COMMENTS)
      }
    } catch {
      // Supabase paused or DNS unresolvable — use default comments gracefully
      setComments(DEFAULT_COMMENTS)
    }
  }

  const addComment = async ({
    name,
    comment,
    image,
  }: {
    name: string
    comment: string
    image: File | null
  }) => {
    if (!name.trim()) return
    if (!comment.trim()) return

    setLoading(true)

    const fallbackComment = {
      id: Date.now(),
      name: name.trim(),
      comment: comment.trim(),
      image_url: image ? URL.createObjectURL(image) : null,
      likes: 0,
      is_pinned: false,
      created_at: new Date().toISOString(),
    }

    try {
      let imageUrl: string | null = null

      if (image) {
        try {
          imageUrl = await uploadCommentImageService(image)
        } catch {
          imageUrl = URL.createObjectURL(image)
        }
      }

      const newComment = await createCommentService({
        name,
        comment,
        imageUrl,
      })

      setComments((prev) => [newComment || fallbackComment, ...prev])
    } catch {
      // Local optimistic update if Supabase is offline
      setComments((prev) => [fallbackComment, ...prev])
    } finally {
      setLoading(false)
    }
  }

  const likeComment = async (id: number, currentLikes: number) => {
    const likedKey = `liked-${id}`
    if (typeof window !== 'undefined' && localStorage.getItem(likedKey)) return

    if (typeof window !== 'undefined') {
      localStorage.setItem(likedKey, 'true')
    }

    const updatedLikes = (currentLikes || 0) + 1

    // Optimistic UI update
    setComments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: updatedLikes } : item
      )
    )

    try {
      await likeCommentService(id, currentLikes)
    } catch {
      // Local state already updated
    }
  }

  return {
    comments,
    loading,
    addComment,
    likeComment,
  }
}