"use client"

import { useEffect, useState } from "react"
import { Check, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export function AssignDialog({ open, onOpenChange, complaint }) {
  const [officers, setOfficers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOfficerId, setSelectedOfficerId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!open) return

    const fetchOfficers = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`${BASE_URL}/api/v1/search-officers`)
        const data = await res.json()
        setOfficers(data.data || [])
      } catch (error) {
        console.error("Failed to fetch officers", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOfficers()
  }, [open])

  const filteredOfficers = officers.filter(
    (officer) =>
      officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = async () => {
    if (!selectedOfficerId) return

    setIsSubmitting(true)

    try {
      console.log("the officer id is", selectedOfficerId)
      console.log("the complaint id is", complaint);
      const res = await fetch(`${BASE_URL}/api/v1/approve-complaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: complaint._id,
          officerId: selectedOfficerId,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to assign officer")
      }

      console.log("Successfully assigned complaint:", complaint, "to officer:", selectedOfficerId);
      // alert("Complaint assigned successfully");
      toast.success("Complaint assigned successfully");
    } catch (err) {
      console.error("Error assigning complaint:", err)
      toast.error("Failed to assign complaint. Please try again.");
    } finally {
      setIsSubmitting(false)
      setSelectedOfficerId("")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Complaint</DialogTitle>
          <DialogDescription>Select an officer to handle this complaint.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-sky-50 p-3 rounded-md">
            <h4 className="font-medium">{complaint.title}</h4>
            <p className="text-sm text-gray-600 mt-1">category: {complaint.category}</p>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by name or category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="border rounded-md max-h-[240px] overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Loading officers...</div>
            ) : (
              <RadioGroup value={selectedOfficerId} onValueChange={setSelectedOfficerId}>
                {filteredOfficers.map((officer) => (
                  <div
                    key={officer._id}
                    className={`flex items-center space-x-2 p-3 border-b last:border-0 hover:bg-gray-50 ${
                      selectedOfficerId === officer._id ? "bg-sky-50" : ""
                    }`}
                  >
                    <RadioGroupItem value={officer._id} id={`officer-${officer._id}`} />
                    <Label
                      htmlFor={`officer-${officer._id}`}
                      className="flex flex-1 items-center gap-3 cursor-pointer"
                    >
                      <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{officer.name}</div>
                        <div className="text-sm text-gray-500">{officer.category}</div>
                      </div>
                    </Label>
                  </div>
                ))}

                {filteredOfficers.length === 0 && !isLoading && (
                  <div className="p-4 text-center text-gray-500">
                    No officers found matching your search.
                  </div>
                )}
              </RadioGroup>
            )}
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button type="button" className="cursor-pointer" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedOfficerId || isSubmitting}
            className="bg-sky-500 hover:bg-sky-600 text-white gap-1 cursor-pointer"
          >
            <Check className="h-4 w-4" />
            {isSubmitting ? "Assigning..." : "Assign Officer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
