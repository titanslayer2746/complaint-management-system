'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input";

export default function ComplaintFilters({setStatus, setCategory, setLocation}) {
  

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
      <div className="flex items-center space-x-2">
        <label htmlFor="category" className="text-sm font-medium text-gray-700">
          Category:
        </label>
        <Select onValueChange={(value) => {console.log("category changed"); setCategory(value === "all" ? null : value)}}>
          <SelectTrigger className="w-[180px] cursor-pointer">
            <SelectValue placeholder="Select category" className="cursor-pointer" />
          </SelectTrigger>
          <SelectContent>
          <SelectItem value="all" className="border-l-4 border-gray-400 pl-3 cursor-pointer">
                <span className="border-gray-400">All</span>
            </SelectItem>
            <SelectItem value="Road Damage" className="border-l-4 border-red-500 pl-3 cursor-pointer">
                <span className="text-red-600">Road Damage</span>
            </SelectItem>

            <SelectItem value="Water Leakage" className="border-l-4 border-blue-500 pl-3 cursor-pointer">
                <span className="text-blue-600">Water Leakage</span>
            </SelectItem>

            <SelectItem value="Garbage Collection" className="border-l-4 border-green-500 pl-3 cursor-pointer">
                <span className="text-green-600">Garbage Collection</span>
            </SelectItem>

            <SelectItem value="Street Lights" className="border-l-4 border-yellow-500 pl-3 cursor-pointer">
                <span className="text-yellow-600">Street Lights</span>
            </SelectItem>

            <SelectItem value="Traffic Signals" className="border-l-4 border-orange-500 pl-3 cursor-pointer">
                <span className="text-orange-600">Traffic Signals</span>
            </SelectItem>

            <SelectItem value="Illegal Construction" className="border-l-4 border-purple-500 pl-3 cursor-pointer">
                <span className="text-purple-600">Illegal Construction</span>
            </SelectItem>

            <SelectItem value="Sewage Issues" className="border-l-4 border-teal-500 pl-3 cursor-pointer">
                <span className="text-teal-600">Sewage Issues</span>
            </SelectItem>

            <SelectItem value="Noise Pollution" className="border-l-4 border-pink-500 pl-3 cursor-pointer">
                <span className="text-pink-600">Noise Pollution</span>
            </SelectItem>

            <SelectItem value="Harassment" className="border-l-4 border-rose-500 pl-3 cursor-pointer">
                <span className="text-rose-600">Harassment</span>
            </SelectItem>

            <SelectItem value="Discrimination" className="border-l-4 border-indigo-500 pl-3 cursor-pointer">
                <span className="text-indigo-600">Discrimination</span>
            </SelectItem>

            <SelectItem value="Fraud" className="border-l-4 border-amber-500 pl-3 cursor-pointer">
                <span className="text-amber-600">Fraud</span>
            </SelectItem>

            <SelectItem value="Internet & Telecom Issues" className="border-l-4 border-cyan-500 pl-3 cursor-pointer">
                <span className="text-cyan-600">Internet & Telecom Issues</span>
            </SelectItem>
            </SelectContent>

        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="status" className="text-sm font-medium text-gray-700">
          Status:
        </label>
        <Select onValueChange={(value) => {console.log("status changes"); setStatus(value === "all" ? null : value)}}>
          <SelectTrigger className="w-[180px] cursor-pointer">
            <SelectValue placeholder="Select status" className="cursor-pointer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="border-l-4 border-gray-400 pl-3 cursor-pointer">
                <span className="text-gray-600">All Status</span>
            </SelectItem>

            <SelectItem value="pending" className="border-l-4 border-yellow-500 pl-3 cursor-pointer">
                <span className="text-yellow-600">Pending</span>
            </SelectItem>

            <SelectItem value="in-progress" className="border-l-4 border-blue-500 pl-3 cursor-pointer">
                <span className="text-blue-600">In Progress</span>
            </SelectItem>

            <SelectItem value="approved" className="border-l-4 border-green-500 pl-3 cursor-pointer">
                <span className="text-green-600">Approved</span>
            </SelectItem>

            <SelectItem value="completed" className="border-l-4 border-emerald-500 pl-3 cursor-pointer">
                <span className="text-emerald-600">Completed</span>
            </SelectItem>
            <SelectItem value="rejected" className="border-l-4 border-rose-500 pl-3 cursor-pointer">
                <span className="text-rose-600">Rejected</span>
            </SelectItem>
            </SelectContent>

        </Select>
      </div>
      <div className="flex items-center space-x-2">
  <label htmlFor="location" className="text-sm font-medium text-gray-700">
    Location:
  </label>
  <Input
    id="location"
    type="text"
    placeholder="Filter by location"
    className="w-[180px]"
    onChange={(e) => {console.log("location changed"); setLocation(e.target.value)}}
  />
</div>

    </div>
  );
}
