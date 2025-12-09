"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export default function VerifyPage() {
  const token = useSearchParams().get("token");
  const router = useRouter();
  const [alertOpen, setAlertOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState("Verifying...");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    async function verify() {
      if (!token) return;
      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();

        if (!res.ok) {
          setAlertMessage(data.message || "Verification failed");
          setAlertSeverity("error");
        } else {
          setAlertMessage("Email verified successfully!");
          setAlertSeverity("success");
          setTimeout(() => router.push("/login"), 1200);
        }
      } catch {
        setAlertMessage("Server error");
        setAlertSeverity("error");
      }
    }
    verify();
  }, [token, router]);

  return (
    <Snackbar
      open={alertOpen}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={4000}
      onClose={() => setAlertOpen(false)}
    >
      <Alert
        severity={alertSeverity}
        onClose={() => setAlertOpen(false)}
        sx={{ width: "100%" }}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}
