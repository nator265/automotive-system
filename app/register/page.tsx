"use client";

import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Failed to create account");
      setLoading(false);
      return;
    }

    setMessage("Account created!");
    setTimeout(() => router.push("/login"), 1200);

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-white">
      <div className="absolute top-8 left-8 flex gap-5">
        <ArrowBackIcon className="text-gray-700" />
        <div className="text-gray-700 font-semibold">Automotive</div>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6">Create an account!</h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
                required
              />
            </div>

            <div>
              <label>Email</label>
              <div className="relative">
                <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="border p-2 pl-10 rounded-md w-full"
                  required
                />
              </div>
            </div>

            <div>
              <label>Password</label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="border p-2 pl-10 rounded-md w-full"
                  required
                />
              </div>
            </div>

            <div>
              <label>Contact</label>
              <input
                type="tel"
                name="contact"
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

            {message && (
              <p className="text-center text-sm text-red-500">{message}</p>
            )}
          </form>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
