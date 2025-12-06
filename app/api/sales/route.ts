import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "sales.json");

async function readSales(): Promise<any[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    return [];
  }
}

async function writeSales(items: any[]) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
}

export async function GET() {
  try {
    const sales = await readSales();
    return new Response(JSON.stringify({ ok: true, sales }), { status: 200 });
  } catch (err) {
    console.error("/api/sales GET error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sales = await readSales();
    const id = `SL-${Date.now()}`;
    const sale = { id, ...body, createdAt: new Date().toISOString() };
    sales.unshift(sale);
    await writeSales(sales);
    return new Response(JSON.stringify({ ok: true, sale }), { status: 201 });
  } catch (err) {
    console.error("/api/sales POST error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
