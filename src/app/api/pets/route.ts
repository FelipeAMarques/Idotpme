import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    const pets = await prisma.pet.findMany({
      where: query ? {
        OR: [
          { name: { contains: query } },
          { breed: { contains: query } },
          { description: { contains: query } },
        ],
      } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formattedPets = pets.map(pet => ({
      ...pet,
      images: JSON.parse(pet.images),
      temperament: JSON.parse(pet.temperament),
      requirements: JSON.parse(pet.requirements),
    }));

    return new NextResponse(JSON.stringify(formattedPets), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching pets:', error);
    return new NextResponse(JSON.stringify({ error: 'Error fetching pets' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// POST /api/pets - Cria um novo pet
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Convert arrays to JSON strings
    const petData = {
      ...data,
      images: JSON.stringify(data.images),
      temperament: JSON.stringify(data.temperament),
      requirements: JSON.stringify(data.requirements || []),
    }
    
    const pet = await prisma.pet.create({
      data: petData,
    })
    
    // Parse JSON strings back to arrays for response
    const formattedPet = {
      ...pet,
      images: JSON.parse(pet.images),
      temperament: JSON.parse(pet.temperament),
      requirements: JSON.parse(pet.requirements),
    }
    
    return NextResponse.json(formattedPet)
  } catch (error) {
    console.error('Error creating pet:', error)
    return NextResponse.json(
      { error: 'Error creating pet' },
      { status: 500 }
    )
  }
}