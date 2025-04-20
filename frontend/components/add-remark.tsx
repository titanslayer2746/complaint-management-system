"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";


interface AddRemarksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  complaint: any;
  onAddRemark: (complaintId: string, remark: string) => void;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export function AddRemarksDialog({
  open,
  onOpenChange,
  complaint,
  onAddRemark,
}: AddRemarksDialogProps) {
  const [remarks, setRemarks] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newStatus, setNewStatus] = useState(complaint?.status || "assigned");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    console.log("making request");

    console.log("complaint", complaint._id);
    console.log("newStatus", newStatus);
    console.log("remarks", remarks);

    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/complaint/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          body: JSON.stringify({
            id: complaint._id,
            status: newStatus,
            remarks: remarks,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      const data = await response.json();
      console.log("Status updated successfully:", data);
      toast.success("Status updated successfully");

      setRemarks("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status");
      // Optional: toast/error handling here
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form when dialog opens
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setRemarks("");
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Remarks</DialogTitle>
          <DialogDescription>
            Add additional information or updates about this complaint.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-sky-50 p-3 rounded-md">
            <h4 className="font-medium">{complaint?.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-600">Status:</span>
              <span className="text-sm font-medium capitalize">
                {complaint?.status.replace("_", " ")}
              </span>
            </div>
          </div>

          {complaint?.remarks.length > 0 && (
            <div className="space-y-2">
              <Label>Previous Remarks</Label>
              <div className="max-h-[150px] overflow-y-auto bg-gray-50 p-3 rounded-md space-y-2">
                {complaint.remarks.map((remark: [], index: number) => (
                  <div
                    key={index}
                    className="text-sm bg-sky-100 p-2 rounded-md"
                  >
                    <div className="text-gray-700">{remark}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="new-remarks" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-sky-500" />
              <span>New Remarks</span>
            </Label>
            <Textarea
              id="new-remarks"
              placeholder="Add your remarks or updates..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            className="cursor-pointer"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!remarks.trim() || isSubmitting}
            className="bg-sky-500 hover:bg-sky-600 text-white cursor-pointer"
          >
            {isSubmitting ? "Submitting..." : "Submit Remarks"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
