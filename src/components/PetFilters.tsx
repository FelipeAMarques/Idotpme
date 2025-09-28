'use client';

import { AgeGroup, Size, Species } from '@/types/pet';

interface FilterProps {
  filters: {
    species: Species | 'all';
    ageGroup: AgeGroup | 'all';
    size: Size | 'all';
  };
  onFilterChange: (filterName: string, value: string) => void;
}

export function PetFilters({ filters, onFilterChange }: FilterProps) {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-sm">
      <select
        className="p-2 border rounded-md min-w-[200px]"
        value={filters.species}
        onChange={(e) => onFilterChange('species', e.target.value)}
      >
        <option value="all">Todos os animais</option>
        <option value="dog">Cachorros</option>
        <option value="cat">Gatos</option>
      </select>

      <select
        className="p-2 border rounded-md min-w-[200px]"
        value={filters.ageGroup}
        onChange={(e) => onFilterChange('ageGroup', e.target.value)}
      >
        <option value="all">Todas as idades</option>
        <option value="puppy">Filhote</option>
        <option value="adult">Adulto</option>
        <option value="senior">Idoso</option>
      </select>

      <select
        className="p-2 border rounded-md min-w-[200px]"
        value={filters.size}
        onChange={(e) => onFilterChange('size', e.target.value)}
      >
        <option value="all">Todos os portes</option>
        <option value="small">Pequeno</option>
        <option value="medium">Médio</option>
        <option value="large">Grande</option>
      </select>
    </div>
  );
}