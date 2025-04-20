"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export default function ComplaintFormDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !location || !category) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("category", category);
      if (image) {
        formData.append("image", image);
      }

      console.log("Form Data:", {
        title,
        description,
        location,
        category,
        image,
      });

      console.log("Submitting complaint...");
      toast.info("Submitting your complaint...");

      const response = await fetch(`${BASE_URL}/api/v1/complaint`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      console.log("Complaint submitted successfully:", data);
      toast.success("Complaint submitted successfully!");      // Optionally, you can reset the form fields here
    } catch (error) {
    } finally {
      setTitle("");
      setDescription("");
      setLocation("");
      setCategory("");
      setImage(null);

      setLoading(false);
      setOpen(false); // Close the dialog
    }

    // Simulate API delay

    // Reset fields
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4 bg-sky-600 text-white hover:bg-blue-700 cursor-pointer">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Complaint
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit New Complaint</DialogTitle>
          <DialogDescription>
            Fill out the form below to register a new complaint. Fields marked
            with * are required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 mt-4">
          {/* Title */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              type="text"
              placeholder="Street light not working..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Location */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              type="text"
              placeholder="Filter by location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col space-y-2">
            <Label className="">Category *</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="cursor-pointer">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem
                  value="Road Damage"
                  className="border-l-4 border-red-500 pl-3 cursor-pointer"
                >
                  <span className="text-red-600">Road Damage</span>
                </SelectItem>

                <SelectItem
                  value="Water Leakage"
                  className="border-l-4 border-blue-500 pl-3 cursor-pointer"
                >
                  <span className="text-blue-600">Water Leakage</span>
                </SelectItem>

                <SelectItem
                  value="Garbage Collection"
                  className="border-l-4 border-green-500 pl-3 cursor-pointer"
                >
                  <span className="text-green-600">Garbage Collection</span>
                </SelectItem>

                <SelectItem
                  value="Street Lights"
                  className="border-l-4 border-yellow-500 pl-3 cursor-pointer"
                >
                  <span className="text-yellow-600">Street Lights</span>
                </SelectItem>

                <SelectItem
                  value="Traffic Signals"
                  className="border-l-4 border-orange-500 pl-3 cursor-pointer"
                >
                  <span className="text-orange-600">Traffic Signals</span>
                </SelectItem>

                <SelectItem
                  value="Illegal Construction"
                  className="border-l-4 border-purple-500 pl-3 cursor-pointer"
                >
                  <span className="text-purple-600">Illegal Construction</span>
                </SelectItem>

                <SelectItem
                  value="Sewage Issues"
                  className="border-l-4 border-teal-500 pl-3 cursor-pointer"
                >
                  <span className="text-teal-600">Sewage Issues</span>
                </SelectItem>

                <SelectItem
                  value="Noise Pollution"
                  className="border-l-4 border-pink-500 pl-3 cursor-pointer"
                >
                  <span className="text-pink-600">Noise Pollution</span>
                </SelectItem>

                <SelectItem
                  value="Harassment"
                  className="border-l-4 border-rose-500 pl-3 cursor-pointer"
                >
                  <span className="text-rose-600">Harassment</span>
                </SelectItem>

                <SelectItem
                  value="Discrimination"
                  className="border-l-4 border-indigo-500 pl-3 cursor-pointer"
                >
                  <span className="text-indigo-600">Discrimination</span>
                </SelectItem>

                <SelectItem
                  value="Fraud"
                  className="border-l-4 border-amber-500 pl-3 cursor-pointer"
                >
                  <span className="text-amber-600">Fraud</span>
                </SelectItem>

                <SelectItem
                  value="Internet & Telecom Issues"
                  className="border-l-4 border-cyan-500 pl-3 cursor-pointer"
                >
                  <span className="text-cyan-600">
                    Internet & Telecom Issues
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="image">Upload Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="file:bg-gray-300 file:text-white file:border-0 file:px-4 file:py-2 file:rounded file:cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-sky-600 text-white hover:bg-blue-700 cursor-pointer"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Submitting...
              </>
            ) : (
              "Submit Complaint"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
