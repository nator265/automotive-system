"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ClipLoader } from "react-spinners";

// Validation schema
const carSchema = z.object({
  type: z.enum(["hire", "sale"], { message: "Select car type" }),
  make: z.string().min(2),
  model: z.string().min(1),
  year: z.number().min(1980).max(new Date().getFullYear()),
  price: z.number().min(1),
  mileage: z.number().optional(),
  transmission: z.string().min(1),
  fuel: z.string().min(1),
  description: z.string().optional(),
});

// Form types
type CarForm = z.infer<typeof carSchema>;

export default function AddCarPage() {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CarForm>({
    resolver: zodResolver(carSchema),
  });

  // Handle drag & drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    setImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith("image/")
    );
    setImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const onSubmit = async (data: CarForm) => {
    if (images.length === 0) return alert("Please upload at least one image");
    setLoading(true);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    images.forEach((img) => formData.append("images", img));

    const res = await fetch("/api/cars/add", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    setLoading(false);

    if (result.success) {
      if (data.type === "hire") router.push("/dashboard/hires");
      else router.push("/dashboard/sales");
    } else {
      alert(result.error || "Failed to add car");
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Go Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Add Car</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        encType="multipart/form-data"
      >
        {/* Left Column */}
        <div className="space-y-4">
          <select {...register("type")} className="border p-2 rounded w-full">
            <option value="">Select car purpose</option>
            <option value="hire">For Hire</option>
            <option value="sale">For Sale</option>
          </select>
          {errors.type && <p className="text-red-500">{errors.type.message}</p>}

          <input
            {...register("make")}
            placeholder="Make"
            className="border p-2 rounded w-full"
          />
          {errors.make && <p className="text-red-500">{errors.make.message}</p>}

          <input
            {...register("model")}
            placeholder="Model"
            className="border p-2 rounded w-full"
          />
          {errors.model && (
            <p className="text-red-500">{errors.model.message}</p>
          )}

          <input
            {...register("year", { valueAsNumber: true })}
            type="number"
            placeholder="Year"
            min={1980}
            max={new Date().getFullYear()}
            className="border p-2 rounded w-full"
          />
          {errors.year && <p className="text-red-500">{errors.year.message}</p>}

          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            placeholder="Price"
            className="border p-2 rounded w-full"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}

          <input
            {...register("mileage", { valueAsNumber: true })}
            type="number"
            placeholder="Mileage"
            className="border p-2 rounded w-full"
          />

          <input
            {...register("transmission")}
            placeholder="Transmission (Auto/Manual)"
            className="border p-2 rounded w-full"
          />
          {errors.transmission && (
            <p className="text-red-500">{errors.transmission.message}</p>
          )}

          <input
            {...register("fuel")}
            placeholder="Fuel Type"
            className="border p-2 rounded w-full"
          />
          {errors.fuel && <p className="text-red-500">{errors.fuel.message}</p>}

          <textarea
            {...register("description")}
            placeholder="Description"
            className="border p-2 rounded w-full"
            rows={4}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-dashed border-2 border-gray-400 p-6 rounded text-center cursor-pointer"
          >
            <p>Drag & Drop Images Here</p>
            <p>or click to select</p>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Preview */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {imagePreviews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  className="w-full h-32 object-cover rounded shadow"
                  alt={`Preview ${idx + 1}`}
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full flex items-center justify-center"
          >
            {loading && <ClipLoader size={20} color="#fff" className="mr-2" />}
            {loading ? "Uploading..." : "Add Car"}
          </button>
        </div>
      </form>
    </div>
  );
}
