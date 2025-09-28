'use client';

import { useState } from "react";
import { AgeGroup, Pet, Size, Species } from "@/types/pet";
import { PetCard } from "./PetCard";
import { PetFilters } from "./PetFilters";

interface PetGridProps {
  initialPets: Pet[];
}

export function PetGrid({ initialPets }: PetGridProps) {
  const [filters, setFilters] = useState<{
    species: Species | 'all';
    ageGroup: AgeGroup | 'all';
    size: Size | 'all';
  }>({
    species: 'all',
    ageGroup: 'all',
    size: 'all'
  });

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const filteredPets = initialPets.filter(pet => {
    if (filters.species !== 'all' && pet.species !== filters.species) return false;
    if (filters.ageGroup !== 'all' && pet.ageGroup !== filters.ageGroup) return false;
    if (filters.size !== 'all' && pet.size !== filters.size) return false;
    return true;
  });

  return (
    <div>
      <div className="mb-8">
        <PetFilters
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
}