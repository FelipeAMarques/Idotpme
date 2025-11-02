'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Pet } from '@/types/pet';
import { deletePet } from '@/services/pets';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!showConfirmation) {
      setShowConfirmation(true);
      return;
    }

    try {
      setIsDeleting(true);
      await deletePet(pet.id);
      router.refresh();
    } catch (error) {
      console.error('Error deleting pet:', error);
      alert('Erro ao excluir o animal. Por favor, tente novamente.');
    } finally {
      setIsDeleting(false);
      setShowConfirmation(false);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirmation(false);
  };

  return (
    <div className="rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative group" style={{ 
      background: 'var(--card-bg)',
      borderColor: 'var(--text-secondary)',
      borderWidth: '1px'
    }}>
      <div className="relative h-48">
        <Image
          src={pet.images[0]}
          alt={`Foto de ${pet.name}`}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
          {showConfirmation ? (
            <>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? '🗑️ ...' : 'Confirmar?'}
              </button>
              <button
                onClick={handleCancel}
                className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700"
              >
                ❌
              </button>
            </>
          ) : (
            <button
              onClick={handleDelete}
              className="p-2 rounded-full bg-[#2d2d2d] text-gray-300 hover:bg-red-600 hover:text-white shadow-md border border-gray-600"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-100">{pet.name}</h2>
        <div className="space-y-2">
          <p className="text-gray-300">
            {pet.species === 'dog' ? '🐕' : '🐱'} {pet.breed || (pet.species === 'dog' ? 'Cachorro' : 'Gato')}
          </p>
          <p className="text-gray-300">
            ⏳ {pet.approximateAge}
          </p>
          <p className="text-gray-300">
            📍 {pet.location}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {pet.temperament?.slice(0, 2).map((temp) => (
            <span
              key={temp}
              className="px-2 py-1 bg-blue-900/50 text-blue-200 text-sm rounded-full border border-blue-800"
            >
              {temp}
            </span>
          ))}
        </div>
        <Link 
          href={`/pets/${pet.id}`}
          className="block w-full mt-4"
        >
          <button 
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            Conhecer novo amigo 🐾
          </button>
        </Link>
      </div>
    </div>
  );
}