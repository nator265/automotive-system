import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "posts.json");

async function readPosts(): Promise<any[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    return [];
  }
}

async function writePosts(items: any[]) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
}

export async function GET() {
  try {
    const posts = await readPosts();
    return new Response(JSON.stringify({ ok: true, posts }), { status: 200 });
  } catch (err) {
    console.error("/api/posts GET error", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const posts = await readPosts();
    const id = `P-${Date.now()}`;
    const post = { id, ...body, createdAt: new Date().toISOString() };
    posts.unshift(post);
    await writePosts(posts);
    return new Response(JSON.stringify({ ok: true, post }), { status: 201 });
  } catch (err) {
    console.error("/api/posts POST error", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return new Response(JSON.stringify({ error: "Missing id" }), { status: 400 });
    const posts = await readPosts();
    const next = posts.filter((p) => p.id !== id);
    await writePosts(next);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("/api/posts DELETE error", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
