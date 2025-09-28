import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();
  
  try {
    const pet = await prisma.pet.findUnique({
      where: { id },
    });
    
    if (!pet) {
      return NextResponse.json(
        { error: 'Pet not found' },
        { status: 404 }
      );
    }
    
    // Parse JSON strings back to arrays
    const formattedPet = {
      ...pet,
      images: JSON.parse(pet.images),
      temperament: JSON.parse(pet.temperament),
      requirements: JSON.parse(pet.requirements),
    };
    
    return NextResponse.json(formattedPet);
  } catch (error) {
    console.error('Error fetching pet:', error);
    return NextResponse.json(
      { error: 'Error fetching pet' },
      { status: 500 }
    );
  }
}

// PUT /api/pets/[id] - Atualiza um pet
export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();
  const data = await request.json();
  
  try {
    // Convert arrays to JSON strings
    const petData = {
      ...data,
      images: typeof data.images === 'string'
        ? data.images
        : JSON.stringify(data.images),
      temperament: typeof data.temperament === 'string'
        ? data.temperament
        : JSON.stringify(data.temperament),
      requirements: typeof data.requirements === 'string'
        ? data.requirements
        : JSON.stringify(data.requirements || []),
    };
    
    const pet = await prisma.pet.update({
      where: { id },
      data: petData,
    });
    
    // Parse JSON strings back to arrays for response
    const formattedPet = {
      ...pet,
      images: JSON.parse(pet.images),
      temperament: JSON.parse(pet.temperament),
      requirements: JSON.parse(pet.requirements),
    };
    
    return NextResponse.json(formattedPet);
  } catch (error) {
    console.error('Error updating pet:', error);
    return NextResponse.json(
      { error: 'Error updating pet' },
      { status: 500 }
    );
  }
}

// DELETE /api/pets/[id] - Remove um pet
export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();
  
  try {
    await prisma.pet.delete({
      where: { id },
    });
    
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting pet:', error);
    return NextResponse.json(
      { error: 'Error deleting pet' },
      { status: 500 }
    );
  }
}