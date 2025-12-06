import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "bookings.json");

async function readBookings(): Promise<any[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    return [];
  }
}

async function writeBookings(items: any[]) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status } = body;

    if (!status || !["pending", "accepted", "denied"].includes(status)) {
      return new Response(
        JSON.stringify({ error: "Invalid status. Must be 'pending', 'accepted', or 'denied'" }),
        { status: 400 }
      );
    }

    const bookings = await readBookings();
    const bookingIndex = bookings.findIndex((b) => b.id === id);

    if (bookingIndex === -1) {
      return new Response(JSON.stringify({ error: "Booking not found" }), {
        status: 404,
      });
    }

    bookings[bookingIndex].status = status;
    await writeBookings(bookings);

    return new Response(JSON.stringify({ ok: true, booking: bookings[bookingIndex] }), {
      status: 200,
    });
  } catch (err) {
    console.error("/api/bookings/[id] PUT error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
