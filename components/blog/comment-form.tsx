"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send } from "lucide-react"
import strapiAPI, { getStoredUser } from "@/lib/api/strapi"

const commentSchema = z.object({
  content: z.string().min(10, "Comment must be at least 10 characters").max(1000, "Comment must not exceed 1000 characters"),
  author: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
})

type CommentFormData = z.infer<typeof commentSchema>

interface CommentFormProps {
  postId: number
  parentId?: number
  onSuccess?: () => void
  placeholder?: string
  buttonText?: string
}

export function CommentForm({
  postId,
  parentId,
  onSuccess,
  placeholder = "Share your thoughts...",
  buttonText = "Submit Comment"
}: CommentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const user = getStoredUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      author: user?.username || user?.firstName || "",
      email: user?.email || "",
    },
  })

  const onSubmit = async (data: CommentFormData) => {
    setIsSubmitting(true)

    try {
      const result = await strapiAPI.blogComments.submit({
        ...data,
        postId,
        parentId,
      })

      toast({
        title: "Comment Submitted!",
        description: result.message || "Your comment is awaiting moderation.",
      })

      reset()
      onSuccess?.()
    } catch (error: any) {
      console.error("Comment submission error:", error)
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit comment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="author">Name *</Label>
          <Input
            id="author"
            {...register("author")}
            placeholder="Your name"
            className={errors.author ? "border-red-500" : ""}
          />
          {errors.author && (
            <p className="text-sm text-red-500 mt-1">{errors.author.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="your@email.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="content">Comment *</Label>
        <Textarea
          id="content"
          {...register("content")}
          placeholder={placeholder}
          rows={4}
          className={errors.content ? "border-red-500" : ""}
        />
        {errors.content && (
          <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Your email won't be published. All comments are moderated.
        </p>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-white"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {buttonText}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
