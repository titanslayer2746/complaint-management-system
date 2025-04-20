"use client"

import { useState } from "react"
import { CheckCircle, PlayCircle } from "lucide-react"

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {toast} from "sonner"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export function StatusChangeDialog({ open, onOpenChange, complaint, onStatusChange }) {
  const [newStatus, setNewStatus] = useState(complaint?.status || "assigned")
  const [remarks, setRemarks] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    

    setIsSubmitting(true);
    console.log("making request");

    console.log("complaint", complaint._id);
    console.log("newStatus", newStatus);
    console.log("remarks", remarks);


    try {
      const response = await fetch(`${BASE_URL}/api/v1/complaint/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        
        body: JSON.stringify({
          id: complaint._id,
          status: newStatus,
          remarks: remarks,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update status")
      }
      const data = await response.json()
      console.log("Status updated successfully:", data)
      toast.success("Status updated successfully")
      onStatusChange(complaint._id, newStatus, remarks)
      setRemarks("")
      onOpenChange(false)
    } catch (error) {
      console.error("Error updating status:", error)
      toast.error("Failed to update status")
      // Optional: toast/error handling here
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenChange = (open) => {
    if (open) {
      setNewStatus(complaint?.status || "assigned")
      setRemarks("")
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Complaint Status</DialogTitle>
          <DialogDescription>Update the status of this complaint and add remarks.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-sky-50 p-3 rounded-md">
            <h4 className="font-medium">{complaint?.title}</h4>
            <p className="text-sm text-gray-600 mt-1">Current Status: {complaint?.status.replace("_", " ")}</p>
          </div>

          <div className="space-y-2">
            <Label>New Status</Label>
            <RadioGroup value={newStatus} onValueChange={setNewStatus} className="flex flex-col space-y-1">
              {complaint?.status !== "in_progress" && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in-progress" id="in-progress" />
                  <Label htmlFor="in_progress" className="flex items-center gap-2 cursor-pointer">
                    <PlayCircle className="h-4 w-4 text-blue-500" />
                    <span>In Progress</span>
                  </Label>
                </div>
              )}
              {complaint?.status !== "completed" && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="completed" id="completed" />
                  <Label htmlFor="completed" className="flex items-center gap-2 cursor-pointer">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Completed</span>
                  </Label>
                </div>
              )}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              placeholder="Add your remarks about this status change..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button type="button" variant="outline"className="cursor-pointer" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!remarks.trim() || isSubmitting || newStatus === complaint?.status}
            className="bg-sky-500 hover:bg-sky-600 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Updating..." : "Update Status"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
