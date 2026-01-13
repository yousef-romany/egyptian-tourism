"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Loader2, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react"
import { CommentForm } from "./comment-form"
import { CommentItem } from "./comment-item"
import strapiAPI, { BlogComment } from "@/lib/api/strapi"

interface CommentSectionProps {
  postId: number
  postSlug: string
}

export function CommentSection({ postId, postSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<BlogComment[]>([])
  const [commentCount, setCommentCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const fetchComments = async (page: number = 1) => {
    try {
      if (page === 1) {
        setIsLoading(true)
      } else {
        setIsLoadingMore(true)
      }

      const result = await strapiAPI.blogComments.getByPost(postId, page, 10)
      const count = await strapiAPI.blogComments.getCountByPost(postId)

      setComments(result.data)
      setCommentCount(count)
      setCurrentPage(result.meta.page)
      setTotalPages(result.meta.totalPages)
    } catch (error) {
      console.error("Failed to fetch comments:", error)
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  const handleCommentSuccess = () => {
    fetchComments(1) // Refresh comments
  }

  const handlePageChange = (newPage: number) => {
    fetchComments(newPage)
    // Scroll to comments section
    document.getElementById("comments-section")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div id="comments-section" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-egyptian-gold" />
            Comments ({commentCount})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Comment Form */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
            <CommentForm postId={postId} onSuccess={handleCommentSuccess} />
          </div>

          <Separator />

          {/* Comments List */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">
              {commentCount === 0
                ? "Be the first to comment!"
                : `${commentCount} ${commentCount === 1 ? "Comment" : "Comments"}`}
            </h3>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-egyptian-gold" />
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>No comments yet. Start the conversation!</p>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id}>
                      <CommentItem
                        comment={comment}
                        postId={postId}
                        onReplySuccess={handleCommentSuccess}
                      />
                      <Separator className="mt-6" />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || isLoadingMore}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>

                    <span className="text-sm text-muted-foreground px-4">
                      Page {currentPage} of {totalPages}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || isLoadingMore}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}

                {isLoadingMore && (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-egyptian-gold" />
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
