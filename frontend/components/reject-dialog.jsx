"use client"

import { useState } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export function RejectDialog({ open, onOpenChange, complaint }) {
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    console.log("Submit clicked")
    console.log("complaint at submit:", complaint)
  
    if (!complaint) return
  
    setIsSubmitting(true)
  
    try {
      const res = await fetch(`${BASE_URL}/api/v1/reject-complaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: complaint._id,
          rejectionReason: reason,
        }),
      })
  
      if (!res.ok) {
        throw new Error("Failed to reject complaint")
      }
  
      console.log("Rejected complaint:", complaint, "Reason:", reason)
      toast.success("Complaint rejected successfully")
    } catch (err) {
      console.error("Error rejecting complaint:", err)
      toast.error("Failed to reject complaint")
    } finally {
      setIsSubmitting(false)
      setReason("")
      onOpenChange(false)
    }
  }
  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reject Complaint</DialogTitle>
          <DialogDescription>Please provide a reason for rejecting this complaint.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-sky-50 p-3 rounded-md">
            <h4 className="font-medium">{complaint.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{complaint.description}</p>
          </div>
          <Textarea
            placeholder="Enter rejection reason... (optional)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter className="sm:justify-between">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="gap-1 cursor-pointer">
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              console.log("Button clicked")
              handleSubmit()
            }}
            disabled={isSubmitting}
            className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
          >
            {isSubmitting ? "Submitting..." : "Submit Rejection"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
