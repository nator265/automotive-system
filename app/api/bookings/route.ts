import { promises as fs } from "fs";
import path from "path";

type Incoming = {
  carId: string;
  mode: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  notes?: string;
};

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

export async function POST(req: Request) {
  try {
    const body: Incoming = await req.json();
    const { carId, mode, name, email, phone, date } = body;
    if (!carId || !name || !email || !phone || !date) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const bookings = await readBookings();
    const id = `BK-${Date.now()}`;
    const booking = {
      id,
      carId,
      mode,
      name,
      email,
      phone,
      date,
      notes: body.notes || "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    bookings.unshift(booking);
    await writeBookings(bookings);

    return new Response(JSON.stringify({ ok: true, booking }), { status: 201 });
  } catch (err) {
    console.error("/api/bookings error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const bookings = await readBookings();
    return new Response(JSON.stringify({ ok: true, bookings }), {
      status: 200,
    });
  } catch (err) {
    console.error("/api/bookings GET error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
