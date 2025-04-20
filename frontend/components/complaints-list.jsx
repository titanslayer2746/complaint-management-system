"use client"

import { useEffect, useState } from "react"
import { Clock, Eye, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RejectDialog } from "./reject-dialog"
import { AssignDialog } from "./assign-dialog"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SearchX } from "lucide-react"
import { toast } from "sonner"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export function ComplaintsList() {
  const [location, setLocation] = useState(null)
  const [category, setCategory] = useState(null)
  const [complaints, setComplaints] = useState([])
  const [filteredComplaints, setFilteredComplaints] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const router = useRouter();
  

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `${BASE_URL}/api/v1/filtered-complaints?status=pending`
        )
        const data = await res.json()
        console.log("Fetched complaints:", data)
        setComplaints(data.data)
        setFilteredComplaints(data.data)
      } catch (error) {
        console.error("Failed to fetch complaints", error)
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  useEffect(() => {
    const fetchFilteredComplaints = async () => {
      setLoading(true)
      try {
        var url = `${BASE_URL}/api/v1/filtered-complaints?status=pending`
        if (category && category !== "all") {
          url += `&category=${category}`
        }
        if (location && location !== "all") {
          url+=`&location=${location}`
        }
    const res = await fetch(
      url
    )
    const data = await res.json()
    console.log("Fetched complaints:", data)
    setComplaints(data.data)
    toast.success("Complaints fetched successfully")
    setFilteredComplaints(data.data)
  }
  catch (error) {
    console.error("Failed to fetch complaints", error)
  }
  finally {
    setLoading(false)
  }
}
  fetchFilteredComplaints(); 

  }, [location, category])

  const handleReject = (complaint) => {
    setSelectedComplaint(complaint)
    setIsRejectDialogOpen(true)
  }

  const handleAssign = (complaint) => {
    setSelectedComplaint(complaint)
    setIsAssignDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold">Pending Complaints</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select onValueChange={(val) => setCategory(val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {[
                { val: "all", color: "white", label: "All" },
                { val: "Road Damage", color: "red", label: "Road Damage" },
                { val: "Water Leakage", color: "blue", label: "Water Leakage" },
                { val: "Garbage Collection", color: "green", label: "Garbage Collection" },
                { val: "Street Lights", color: "yellow", label: "Street Lights" },
                { val: "Traffic Signals", color: "orange", label: "Traffic Signals" },
                { val: "Illegal Construction", color: "purple", label: "Illegal Construction" },
                { val: "Sewage Issues", color: "teal", label: "Sewage Issues" },
                { val: "Noise Pollution", color: "pink", label: "Noise Pollution" },
                { val: "Harassment", color: "rose", label: "Harassment" },
                { val: "Discrimination", color: "indigo", label: "Discrimination" },
                { val: "Fraud", color: "amber", label: "Fraud" },
                { val: "Internet & Telecom Issues", color: "cyan", label: "Internet & Telecom Issues" },
              ].map(({ val, color, label }) => (
                <SelectItem key={val} value={val} className={`border-l-4 border-${color}-500 pl-3`}>
                  <span className={`text-${color}-600`}>{label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Filter by location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="max-w-xs"
          />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {loading ? (
        <p>Loading complaints...</p>
      ) : filteredComplaints.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-10">
          <SearchX className="h-20 w-20 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">No complaints found</h3>
          <p className="text-gray-500 mt-1 max-w-md">
            Looks like there are no pending complaints matching your selected filters.
            Try changing the category or location to see more results.
          </p>
        </div>
      ): (
        <div className="grid gap-4">
          {filteredComplaints.map((complaint) => (
            <Card key={complaint._id} className="overflow-hidden">
              <CardHeader className="pb-0">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-medium">
                    {complaint.title}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-full text-xs">
                    <Clock className="h-3 w-3" />
                    <span>Pending</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Department: {complaint.category}
                </div>
                <p className="text-xs text-gray-400">
                Date:{" "}
                {new Date(complaint.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {complaint.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Dialog>
                    
                      <Button onClick={()=>router.push(`/admin/complaints/${complaint._id}`)} variant="outline" size="sm" className="flex items-center gap-1 cursor-pointer">
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                    
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Complaint Details</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900">{complaint.title}</h4>
                        <p className="mt-2 text-gray-500">{complaint.description}</p>
                        <dl className="mt-4 space-y-2">
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Location</dt>
                            <dd className="text-sm text-gray-900">{complaint.location}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Category</dt>
                            <dd className="text-sm text-gray-900">{complaint.category}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                            <dd className="text-sm text-gray-900 capitalize">
                              {complaint.status}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Date Filed</dt>
                            <dd className="text-sm text-gray-900">{complaint.date}</dd>
                          </div>
                        </dl>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                    onClick={() => handleReject(complaint)}
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    className="bg-sky-500 hover:bg-sky-600 text-white cursor-pointer "
                    onClick={() => handleAssign(complaint)}
                  >
                    Assign
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedComplaint && (
        <>
          <RejectDialog
            open={isRejectDialogOpen}
            onOpenChange={setIsRejectDialogOpen}
            complaint={selectedComplaint}
          />
          <AssignDialog
            open={isAssignDialogOpen}
            onOpenChange={setIsAssignDialogOpen}
            complaint={selectedComplaint}
          />
        </>
      )}
    </div>
  )
}