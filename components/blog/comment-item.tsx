"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageCircle, Calendar } from "lucide-react"
import { CommentForm } from "./comment-form"
import type { BlogComment } from "@/lib/api/strapi"

interface CommentItemProps {
  comment: BlogComment
  postId: number
  onReplySuccess?: () => void
}

export function CommentItem({ comment, postId, onReplySuccess }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleReplySuccess = () => {
    setShowReplyForm(false)
    onReplySuccess?.()
  }

  return (
    <div className="space-y-4">
      {/* Main Comment */}
      <div className="flex gap-4">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarFallback className="bg-egyptian-gold text-white">
            {getInitials(comment.author)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          {/* Comment Header */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm">{comment.author}</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(comment.createdAt)}
            </span>
            {comment.status === 'pending' && (
              <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                Pending Moderation
              </span>
            )}
          </div>

          {/* Comment Content */}
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </div>

          {/* Reply Button */}
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-egyptian-gold hover:text-egyptian-gold-dark h-8 px-2"
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              Reply
            </Button>
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <div className="mt-4 p-4 bg-muted/30 rounded-lg border">
              <CommentForm
                postId={postId}
                parentId={comment.id}
                onSuccess={handleReplySuccess}
                placeholder="Write your reply..."
                buttonText="Submit Reply"
              />
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-12 space-y-4 border-l-2 border-egyptian-gold/20 pl-6">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postId={postId}
              onReplySuccess={onReplySuccess}
            />
          ))}
        </div>
      )}
    </div>
  )
}
