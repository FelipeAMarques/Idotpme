'use client';

import Image from 'next/image';
import { Pet } from '@/types/pet';
import { getPet } from '@/services/pets';
import { DeletePetButton } from '@/components/DeletePetButton';

export default async function PetDetailsPage({ params }: { params: { id: string } }) {
  const pet = await getPet(params.id);

  if (!pet) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-red-600">Animal não encontrado</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <main className="container mx-auto py-8 px-4">
        <div className="rounded-lg shadow-md overflow-hidden" style={{ background: 'var(--card-bg)' }}>
          {/* Galeria de Imagens */}
          <div className="relative h-96">
            <Image
              src={pet.images[0]}
              alt={`Foto de ${pet.name}`}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6">
            {/* Informações Básicas */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">{pet.name}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Espécie</p>
                  <p className="font-semibold">{pet.species === 'dog' ? 'Cachorro' : 'Gato'}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Idade</p>
                  <p className="font-semibold">{pet.approximateAge}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Porte</p>
                  <p className="font-semibold">{
                    pet.size === 'small' ? 'Pequeno' :
                    pet.size === 'medium' ? 'Médio' : 'Grande'
                  }</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Localização</p>
                  <p className="font-semibold">{pet.location}</p>
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Sobre {pet.name}</h2>
              <p className="text-gray-700">{pet.description}</p>
            </div>

            {/* Características */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Características</h2>
              <div className="flex flex-wrap gap-2">
                {pet.temperament.map((temp) => (
                  <span
                    key={temp}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                  >
                    {temp}
                  </span>
                ))}
              </div>
            </div>

            {/* Saúde */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Saúde</h2>
              <div className="space-y-2">
                <p className="flex items-center">
                  <span className={`mr-2 ${pet.vaccinated ? 'text-green-500' : 'text-red-500'}`}>
                    {pet.vaccinated ? '✓' : '✗'}
                  </span>
                  Vacinado
                </p>
                <p className="flex items-center">
                  <span className={`mr-2 ${pet.neutered ? 'text-green-500' : 'text-red-500'}`}>
                    {pet.neutered ? '✓' : '✗'}
                  </span>
                  Castrado
                </p>
              </div>
            </div>

            {/* Requisitos para Adoção */}
            {pet.requirements && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Requisitos para Adoção</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {pet.requirements.map((req) => (
                    <li key={req}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ações */}
            <div className="mt-8 flex flex-col md:flex-row gap-4">
              <button className="w-full md:w-auto bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition-colors">
                Tenho interesse em adotar
              </button>
              <DeletePetButton petId={pet.id} petName={pet.name} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}