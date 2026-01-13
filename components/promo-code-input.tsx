"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, Loader2, Tag } from "lucide-react"
import strapiAPI, { PromoCodeValidation } from "@/lib/api/strapi"

interface PromoCodeInputProps {
  totalPrice: number
  tourId?: number
  onCodeApplied: (validation: PromoCodeValidation) => void
  onCodeRemoved?: () => void
}

export function PromoCodeInput({
  totalPrice,
  tourId,
  onCodeApplied,
  onCodeRemoved
}: PromoCodeInputProps) {
  const [code, setCode] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [validation, setValidation] = useState<PromoCodeValidation | null>(null)
  const { toast } = useToast()

  const handleApply = async () => {
    if (!code.trim()) return

    setIsValidating(true)
    setValidation(null)

    try {
      const result = await strapiAPI.promoCodes.validate({
        code: code.trim(),
        bookingAmount: totalPrice,
        tourId
      })

      setValidation(result)

      if (result.valid) {
        toast({
          title: "Promo code applied!",
          description: result.discountText || "Discount applied successfully",
        })
        onCodeApplied(result)
      } else {
        toast({
          title: "Invalid promo code",
          description: result.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Promo code validation error:", error)
      toast({
        title: "Error",
        description: "Failed to validate promo code. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsValidating(false)
    }
  }

  const handleRemove = () => {
    setCode("")
    setValidation(null)
    onCodeRemoved?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isValidating) {
      handleApply()
    }
  }

  return (
    <Card className="border-egyptian-gold/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="h-4 w-4 text-egyptian-gold" />
          <Label htmlFor="promo-code" className="text-base font-semibold">
            Promo Code
          </Label>
        </div>

        {!validation ? (
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                id="promo-code"
                placeholder="Enter promo code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase())
                  setValidation(null)
                }}
                onKeyDown={handleKeyDown}
                disabled={isValidating}
                className="uppercase"
              />
            </div>
            <Button
              onClick={handleApply}
              disabled={!code.trim() || isValidating}
              className="bg-egyptian-gold hover:bg-egyptian-gold-dark text-white"
            >
              {isValidating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Apply"
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {validation.valid ? (
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-semibold text-green-900 dark:text-green-100">
                      {validation.code} Applied
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      {validation.discountText}
                      {validation.discountAmount && (
                        <span className="ml-2">
                          (-${validation.discountAmount.toFixed(2)})
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  className="text-green-700 hover:text-green-900 hover:bg-green-100"
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-red-900 dark:text-red-100">
                    {validation.message}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  className="text-red-700 hover:text-red-900 hover:bg-red-100"
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>
        )}

        {!isValidating && !validation && code && (
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter or click Apply to validate your code
          </p>
        )}
      </CardContent>
    </Card>
  )
}
