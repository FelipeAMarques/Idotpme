'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Pet } from '@/types/pet';

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  return (
    <Link href={`/pets/${pet.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative h-48">
          <Image
            src={pet.images[0]}
            alt={`Foto de ${pet.name}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{pet.name}</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              {pet.species === 'dog' ? '🐕' : '🐱'} {pet.breed || (pet.species === 'dog' ? 'Cachorro' : 'Gato')}
            </p>
            <p className="text-gray-600">
              ⏳ {pet.approximateAge}
            </p>
            <p className="text-gray-600">
              📍 {pet.location}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {pet.temperament.slice(0, 2).map((temp) => (
              <span
                key={temp}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {temp}
              </span>
            ))}
          </div>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            Conhecer {pet.name}
          </button>
        </div>
      </div>
    </Link>
  );
}