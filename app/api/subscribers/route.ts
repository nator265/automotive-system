import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "subscribers.json");

async function readSubscribers(): Promise<any[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    return [];
  }
}

async function writeSubscribers(items: any[]) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
}

export async function GET() {
  try {
    const subs = await readSubscribers();
    return new Response(JSON.stringify({ ok: true, subscribers: subs }), { status: 200 });
  } catch (err) {
    console.error("/api/subscribers GET error", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.email) return new Response(JSON.stringify({ error: "Missing email" }), { status: 400 });
    const subs = await readSubscribers();
    subs.unshift(body);
    await writeSubscribers(subs);
    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch (err) {
    console.error("/api/subscribers POST error", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
