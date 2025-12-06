import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "newsletters.json");
const SUB_FILE = path.join(process.cwd(), "data", "subscribers.json");

async function readFile(file: string) {
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    return [];
  }
}

async function writeFile(file: string, data: any[]) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subject, content } = body;
    if (!subject || !content) return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });

    const subs = await readFile(SUB_FILE);
    const sentTo = subs.map((s: any) => s.email || s.emailAddress).filter(Boolean);

    // Simulate sending by saving a record
    const newsletters = await readFile(DATA_FILE);
    const id = `NL-${Date.now()}`;
    const rec = { id, subject, content, sentTo, createdAt: new Date().toISOString() };
    newsletters.unshift(rec);
    await writeFile(DATA_FILE, newsletters);

    return new Response(JSON.stringify({ ok: true, sent: sentTo.length, recipients: sentTo }), { status: 200 });
  } catch (err) {
    console.error("/api/newsletter POST error", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
