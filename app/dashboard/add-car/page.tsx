
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ClipLoader } from "react-spinners";
import { Car } from "@/types/car";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

// Validation schema
const carSchema = z.object({
  type: z.enum(["hire", "sale", "both"], { message: "Select car type" }),
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
  const [showPreview, setShowPreview] = useState(false);
  const [editingCar, setEditingCar] = useState<Partial<CarForm> | null>(null);
  const [formData, setFormData] = useState<CarForm | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CarForm>({
    resolver: zodResolver(carSchema),
  });

  const watchedData = watch();

  // Handle drag & drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    addImages(files);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith("image/")
    );
    addImages(files);
  };

  const addImages = (newFiles: File[]) => {
    setImages((prev) => [...prev, ...newFiles]);
    setImagePreviews((prev) => [
      ...prev,
      ...newFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const generatePreview = () => {
    if (images.length === 0) {
      alert("Please upload at least one image before previewing");
      return;
    }
    setFormData(watchedData);
    setEditingCar(watchedData);
    setShowPreview(true);
  };

  const handleEditFromPreview = (field: string, value: any) => {
    if (editingCar) {
      const updatedCar = { ...editingCar, [field]: value };
      setEditingCar(updatedCar);
      // Update form values
      Object.entries(updatedCar).forEach(([key, value]) => {
        setValue(key as keyof CarForm, value);
      });
    }
  };

  const saveChanges = () => {
    if (editingCar) {
      setFormData(editingCar as CarForm);
    }
    setShowPreview(false);
  };

  const onSubmit = async (data: CarForm) => {
    if (images.length === 0) return alert("Please upload at least one image");
    setLoading(true);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    images.forEach((img) => formData.append("images", img));

    try {
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
    } catch (error) {
      setLoading(false);
      alert("Failed to add car. Please try again.");
    }
  };

  const getBadge = (car: any) => {
    if (car.price && car.price < 8000)
      return { text: "Great Price", color: "bg-green-500" };
    if (car.mileage && car.mileage < 60000)
      return { text: "Low Mileage", color: "bg-indigo-500" };
    return null;
  };

  const PreviewCarCard = ({ car, editable = false }: { car: any; editable?: boolean }) => {
    const badge = getBadge(car);
    const subtitle = `${car.transmission} • ${car.type}`;

    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
        <div className="relative">
          <img
            src={imagePreviews[0] || "/cars/placeholder.jpg"}
            alt={`${car.make} ${car.model}`}
            className="w-full h-48 md:h-56 object-cover"
          />

          {badge && (
            <span
              className={`absolute top-3 left-3 text-white text-sm px-3 py-1 rounded-full ${badge.color}`}
            >
              {badge.text}
            </span>
          )}

          <button
            aria-label="bookmark"
            className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow"
          >
            <BookmarkBorderIcon fontSize="small" />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <div>
            {editable ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    value={car.make || ""}
                    onChange={(e) => handleEditFromPreview("make", e.target.value)}
                    className="text-lg font-semibold text-gray-800 border p-1 rounded flex-1"
                    placeholder="Make"
                  />
                  <input
                    value={car.model || ""}
                    onChange={(e) => handleEditFromPreview("model", e.target.value)}
                    className="text-lg font-semibold text-gray-800 border p-1 rounded flex-1"
                    placeholder="Model"
                  />
                </div>
                <input
                  value={car.year || ""}
                  onChange={(e) => handleEditFromPreview("year", parseInt(e.target.value))}
                  type="number"
                  className="font-normal text-gray-500 border p-1 rounded"
                  placeholder="Year"
                />
              </div>
            ) : (
              <h3 className="text-lg font-semibold text-gray-800">
                {car.make} {car.model} —{" "}
                <span className="font-normal text-gray-500">{car.year}</span>
              </h3>
            )}
            <p className="text-sm text-gray-500 truncate max-w-[18rem] md:max-w-full">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <SpeedIcon fontSize="small" className="text-gray-400" />
              {editable ? (
                <input
                  value={car.mileage || ""}
                  onChange={(e) => handleEditFromPreview("mileage", parseInt(e.target.value))}
                  type="number"
                  className="border p-1 rounded w-20"
                  placeholder="Miles"
                />
              ) : (
                <span>{car.mileage?.toLocaleString()} Miles</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <LocalGasStationIcon fontSize="small" className="text-gray-400" />
              {editable ? (
                <input
                  value={car.fuel || ""}
                  onChange={(e) => handleEditFromPreview("fuel", e.target.value)}
                  className="border p-1 rounded w-16"
                  placeholder="Fuel"
                />
              ) : (
                <span>{car.fuel}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <SettingsIcon fontSize="small" className="text-gray-400" />
              {editable ? (
                <input
                  value={car.transmission || ""}
                  onChange={(e) => handleEditFromPreview("transmission", e.target.value)}
                  className="border p-1 rounded w-20"
                  placeholder="Trans"
                />
              ) : (
                <span>{car.transmission}</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="text-xl font-extrabold text-gray-900">
              {editable ? (
                <input
                  value={car.price || ""}
                  onChange={(e) => handleEditFromPreview("price", parseInt(e.target.value))}
                  type="number"
                  className="border p-1 rounded"
                  placeholder="Price"
                />
              ) : (
                <>MWK{car.price?.toLocaleString()}</>
              )}
            </div>
            <span className="text-sm text-blue-600 hover:underline flex items-center gap-2">
              View Details <span aria-hidden>↗</span>
            </span>
          </div>

          {editable && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={saveChanges}
                className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <SaveIcon fontSize="small" />
                Save Changes
              </button>
              <button
                onClick={() => setShowPreview(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Close Preview
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (showPreview && formData) {
    return (
      <div className="p-6">
        <button
          onClick={() => setShowPreview(false)}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Back to Form
        </button>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Car Preview</h1>
          <button
            onClick={() => setEditingCar(editingCar || formData)}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <EditIcon fontSize="small" />
            Edit Details
          </button>
        </div>

        <div className="max-w-2xl mx-auto">
          <PreviewCarCard car={editingCar || formData} editable={!!editingCar} />
          
          {/* Image Gallery */}
          {imagePreviews.length > 1 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">All Images</h3>
              <div className="grid grid-cols-3 gap-4">
                {imagePreviews.map((src, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={src}
                      className="w-full h-24 object-cover rounded shadow"
                      alt={`Image ${idx + 1}`}
                    />
                    {editingCar && (
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-3 rounded flex items-center gap-2 flex-1 justify-center"
            >
              {loading && <ClipLoader size={20} color="#fff" />}
              {loading ? "Saving..." : "Save to Database"}
            </button>
            <button
              onClick={() => setShowPreview(false)}
              className="bg-gray-600 text-white px-6 py-3 rounded"
            >
              Back to Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Go Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Add Car</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div className="space-y-4 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Car Details</h2>
            
            <select {...register("type")} className="border p-2 rounded w-full">
              <option value="">Select car purpose</option>
              <option value="hire">For Hire</option>
              <option value="sale">For Sale</option>
            </select>
            {errors.type && <p className="text-red-500">{errors.type.message}</p>}

            <div className="grid grid-cols-2 gap-4">
              <input
                {...register("make")}
                placeholder="Make"
                className="border p-2 rounded w-full"
              />
              <input
                {...register("model")}
                placeholder="Model"
                className="border p-2 rounded w-full"
              />
            </div>
            {errors.make && <p className="text-red-500">{errors.make.message}</p>}
            {errors.model && <p className="text-red-500">{errors.model.message}</p>}

            <div className="grid grid-cols-2 gap-4">
              <input
                {...register("year", { valueAsNumber: true })}
                type="number"
                placeholder="Year"
                min={1980}
                max={new Date().getFullYear()}
                className="border p-2 rounded w-full"
              />
              <input
                {...register("price", { valueAsNumber: true })}
                type="number"
                placeholder="Price (MWK)"
                className="border p-2 rounded w-full"
              />
            </div>
            {errors.year && <p className="text-red-500">{errors.year.message}</p>}
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}

            <div className="grid grid-cols-2 gap-4">
              <input
                {...register("mileage", { valueAsNumber: true })}
                type="number"
                placeholder="Mileage"
                className="border p-2 rounded w-full"
              />
              <input
                {...register("transmission")}
                placeholder="Transmission"
                className="border p-2 rounded w-full"
              />
            </div>

            <input
              {...register("fuel")}
              placeholder="Fuel Type"
              className="border p-2 rounded w-full"
            />
            {errors.transmission && (
              <p className="text-red-500">{errors.transmission.message}</p>
            )}
            {errors.fuel && <p className="text-red-500">{errors.fuel.message}</p>}

            <textarea
              {...register("description")}
              placeholder="Description"
              className="border p-2 rounded w-full"
              rows={4}
            />

            {/* Image Upload */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Images</label>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-dashed border-2 border-gray-400 p-6 rounded text-center cursor-pointer hover:border-blue-400 transition-colors"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <p className="text-gray-600">Drag & Drop Images Here</p>
                <p className="text-sm text-gray-500">or click to select multiple files</p>
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Selected Images ({imagePreviews.length})</p>
                  <div className="grid grid-cols-3 gap-4">
                    {imagePreviews.map((src, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={src}
                          className="w-full h-24 object-cover rounded shadow"
                          alt={`Preview ${idx + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={generatePreview}
                disabled={images.length === 0}
                className="bg-blue-600 text-white px-4 py-2 rounded flex-1 disabled:bg-gray-400"
              >
                Preview Car
              </button>
              <button
                type="submit"
                disabled={loading || images.length === 0}
                className="bg-green-600 text-white px-4 py-2 rounded flex items-center justify-center flex-1 disabled:bg-gray-400"
              >
                {loading && <ClipLoader size={20} color="#fff" className="mr-2" />}
                {loading ? "Saving..." : "Save to Database"}
              </button>
            </div>
          </div>
        </form>

        {/* Quick Preview Section */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Preview</h2>
            {watchedData.make && watchedData.model ? (
              <PreviewCarCard car={watchedData} />
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>Fill in the car details to see a preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
