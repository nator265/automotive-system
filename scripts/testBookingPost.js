// Simple Node script to POST a test booking to the local API
(async function main() {
  try {
    const url = "http://localhost:3000/api/bookings";
    const payload = {
      carId: "car_003",
      mode: "hire",
      name: "Automated Script",
      email: "script@test.local",
      phone: "+1234567890",
      date: "2025-12-05",
      notes: "Created by testBookingPost.js",
    };

    console.log("Posting to", url);

    // node 18+ has global fetch
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    console.log("Status:", res.status);
    try {
      console.log("Response JSON:", JSON.parse(text));
    } catch (e) {
      console.log("Response Text:", text);
    }
  } catch (err) {
    console.error("Error posting booking:", err);
    process.exitCode = 2;
  }
})();
