import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { db } from '@/app/lib/db';

// --- Setup uploads folder ---
const uploadDir = path.join(process.cwd(), 'public/uploads/cars');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const type = formData.get('type') as string;
    const make = formData.get('make') as string;
    const model = formData.get('model') as string;
    const year = formData.get('year') as string;
    const price = formData.get('price') as string;
    const mileage = formData.get('mileage') as string;
    const transmission = formData.get('transmission') as string;
    const fuel = formData.get('fuel') as string;
    const description = formData.get('description') as string;

    const images = formData.getAll('images') as File[];

    if (images.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Please upload at least one image' },
        { status: 400 }
      );
    }

    const imagePaths = [];
    for (const image of images) {
      const buffer = await image.arrayBuffer();
      const filename = Date.now() + '-' + image.name;
      const filepath = path.join(uploadDir, filename);
      fs.writeFileSync(filepath, Buffer.from(buffer));
      imagePaths.push('/uploads/cars/' + filename);
    }

    const car = {
      type,
      make,
      model,
      year: Number(year),
      price: Number(price),
      mileage: mileage ? Number(mileage) : undefined,
      transmission,
      fuel,
      description,
      images: imagePaths,
      createdAt: new Date(),
    };

    const result = await db.collection('cars').insertOne(car);

    return NextResponse.json(
      { success: true, carId: result.insertedId },
      { status: 201 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
}
