"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Clock, Filter, PlayCircle, Search, SearchX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { StatusChangeDialog } from "./status-change"
import { AddRemarksDialog } from "./add-remark"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export function AssignedComplaints() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const [isRemarksDialogOpen, setIsRemarksDialogOpen] = useState(false)
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`${BASE_URL}/api/v1/complaint-by-officer`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) throw new Error("Network response was not ok")
        const data = await response.json()
        setComplaints(data.data)
      } catch (error) {
        console.error("Error fetching complaints:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.status?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleStatusChange = (complaintId, newStatus, remark) => {
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) => {
        if (complaint.id === complaintId) {
          return {
            ...complaint,
            status: newStatus,
            remarks: [
              ...complaint.remarks,
              {
                text: remark,
                timestamp: new Date().toISOString(),
              },
            ],
          }
        }
        return complaint
      })
    )
  }

  const handleAddRemark = (complaintId, remark) => {
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) => {
        if (complaint.id === complaintId) {
          return {
            ...complaint,
            remarks: [
              ...complaint.remarks,
              {
                text: remark,
                timestamp: new Date().toISOString(),
              },
            ],
          }
        }
        return complaint
      })
    )
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-amber-600 bg-amber-50 border-amber-200">
            <Clock className="h-3 w-3" />
            <span>Assigned</span>
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-blue-600 bg-blue-50 border-blue-200">
            <PlayCircle className="h-3 w-3" />
            <span>In Progress</span>
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-green-600 bg-green-50 border-green-200">
            <CheckCircle className="h-3 w-3" />
            <span>Completed</span>
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold">Assigned Complaints</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Filter by location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 max-w-xs"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="h-8 w-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : filteredComplaints.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-10">
          <SearchX className="h-20 w-20 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">No complaints found</h3>
          <p className="text-gray-500 mt-1 max-w-md">
            Looks like there are no assigned complaints matching your selected filters.
            Try changing the location to see more results.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredComplaints.map((complaint) => (
            <Card key={complaint._id} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-medium">{complaint.title}</CardTitle>
                  {getStatusBadge(complaint.status)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Department: {complaint.category}
                </div>
                <p className="text-xs text-gray-400">
                  Assigned on:{" "}
                  {new Date(complaint.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{complaint.description}</p>

                {complaint.remarks.length > 0 && (
                  <div className="mb-4 bg-gray-50 p-3 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Recent Remarks:</h4>
                    <ul className="space-y-2">
                      {complaint.remarks.map((remark, index) => (
                        <li key={index} className="text-gray-900 bg-sky-100 py-1 rounded-md pl-4">
                          {remark}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {complaint.status !== "completed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100 cursor-pointer"
                      onClick={() => {
                        setSelectedComplaint(complaint)
                        setIsStatusDialogOpen(true)
                      }}
                    >
                      Change Status
                    </Button>
                  )}
                  <Button
                    size="sm"
                    className="bg-sky-500 hover:bg-sky-600 text-white cursor-pointer"
                    onClick={() => {
                      setSelectedComplaint(complaint)
                      setIsRemarksDialogOpen(true)
                    }}
                  >
                    Add Remarks
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedComplaint && (
        <>
          <StatusChangeDialog
            open={isStatusDialogOpen}
            onOpenChange={setIsStatusDialogOpen}
            complaint={selectedComplaint}
            onStatusChange={handleStatusChange}
          />
          <AddRemarksDialog
            open={isRemarksDialogOpen}
            onOpenChange={setIsRemarksDialogOpen}
            complaint={selectedComplaint}
            onAddRemark={handleAddRemark}
          />
        </>
      )}
    </div>
  )
}
