import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/models/db';
import Package from '@/lib/models/package';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Utility functions
const deleteImage = (imagePath: string) => {
  if (!imagePath) return;
  const filePath = path.join(process.cwd(), 'public', imagePath);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const handleFileUpload = async (file: File | null): Promise<string | null> => {
  if (!file || !(file instanceof File) || file.size === 0) return null;

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const buffer = await file.arrayBuffer();
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const filePath = path.join(uploadDir, filename);
  
  await fs.promises.writeFile(filePath, Buffer.from(buffer));
  return `/uploads/${filename}`;
};

// GET all packages
export async function GET() {
  await connectToDatabase();
  try {
    const packages = await Package.find({}).sort({ category: 1 });
    return NextResponse.json({ success: true, data: packages });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// CREATE new package
export async function POST(req: NextRequest) {
  await connectToDatabase();
  
  try {
    const formData = await req.formData();
    const category = formData.get('category') as string;
    const price = parseFloat(formData.get('price') as string);
    const description = formData.get('description') as string;
    const features = formData.getAll('features') as string[];
    const imageFile = formData.get('image') as File | null;

    // Check for existing package
    const existingPackage = await Package.findOne({ category });
    if (existingPackage) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Package "${category}" already exists. Use update instead.` 
        },
        { status: 400 }
      );
    }

    // Validate features
    const validFeatures = features.filter(f => f.trim().length > 0);
    if (validFeatures.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one feature is required' },
        { status: 400 }
      );
    }

    // Handle file upload
    const imagePath = await handleFileUpload(imageFile);

    const newPackage = new Package({
      category,
      price,
      description,
      features: validFeatures,
      image: imagePath,
    });

    const createdPackage = await newPackage.save();
    
    return NextResponse.json(
      { success: true, data: createdPackage },
      { status: 201 }
    );
    
  } catch (err: any) {
    console.error('Error creating package:', err);
    return NextResponse.json(
      { 
        success: false, 
        error: err.code === 11000 
          ? 'This package category already exists' 
          : err.message || 'Server error' 
      },
      { status: err.code === 11000 ? 400 : 500 }
    );
  }
}

// UPDATE package
// PUT: Update package details (without image)
export async function PUT(req: NextRequest): Promise<NextResponse> {
  await connectToDatabase();

  try {
    const { category, price, description, features } = await req.json();

    const packageToUpdate = await Package.findOne({ category });
    if (!packageToUpdate) {
      return NextResponse.json(
        { success: false, error: 'Package not found' },
        { status: 404 }
      );
    }

    packageToUpdate.price = price;
    packageToUpdate.description = description;
    packageToUpdate.features = features.filter((f: string) => f.trim() !== '');

    await packageToUpdate.save();
    
    return NextResponse.json({ success: true, data: packageToUpdate });
    
  } catch (err: any) {
    console.error('Error updating package:', err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// PATCH: Update package image only
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  await connectToDatabase();

  try {
    const formData = await req.formData();
    const category = formData.get('category') as string;
    const imageFile = formData.get('image') as File | null;

    const packageToUpdate = await Package.findOne({ category });
    if (!packageToUpdate) {
      return NextResponse.json(
        { success: false, error: 'Package not found' },
        { status: 404 }
      );
    }

    // Delete old image if exists
    if (packageToUpdate.image) {
      deleteImage(packageToUpdate.image);
    }

    // Upload new image
    const imagePath = await handleFileUpload(imageFile);
    packageToUpdate.image = imagePath;

    await packageToUpdate.save();
    
    return NextResponse.json({ success: true, data: packageToUpdate });
    
  } catch (err: any) {
    console.error('Error updating package image:', err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
// DELETE package
export async function DELETE(req: NextRequest) {
  await connectToDatabase();
  const { category } = await req.json();

  try {
    const packageToDelete = await Package.findOne({ category });
    if (!packageToDelete) {
      return NextResponse.json(
        { success: false, error: 'Package not found' },
        { status: 404 }
      );
    }

    // Delete associated image
    if (packageToDelete.image) {
      deleteImage(packageToDelete.image);
    }

    await packageToDelete.deleteOne();

    return NextResponse.json(
      { success: true, message: 'Package deleted successfully' }
    );
    
  } catch (err: any) {
    console.error('Error deleting package:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Server error' },
      { status: 500 }
    );
  }
}