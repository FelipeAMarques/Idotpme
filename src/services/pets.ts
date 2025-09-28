import { Pet } from '@/types/pet';
import { API_ROUTES } from '@/config/api';

export async function getPets() {
  const response = await fetch(API_ROUTES.pets, {
    cache: 'no-store',
    next: { revalidate: 0 },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch pets');
  }
  return response.json();
}

export async function getPet(id: string) {
  const response = await fetch(API_ROUTES.pet(id), {
    cache: 'no-store',
    next: { revalidate: 0 },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch pet');
  }
  return response.json();
}

export async function createPet(pet: Omit<Pet, 'id' | 'createdAt' | 'updatedAt'>) {
  const response = await fetch(API_ROUTES.pets, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pet),
  });
  if (!response.ok) {
    throw new Error('Failed to create pet');
  }
  return response.json();
}

export async function updatePet(id: string, pet: Partial<Pet>) {
  const response = await fetch(API_ROUTES.pet(id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pet),
  });
  if (!response.ok) {
    throw new Error('Failed to update pet');
  }
  return response.json();
}

export async function deletePet(id: string) {
  const response = await fetch(API_ROUTES.pet(id), {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete pet');
  }
  return response.json();
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(API_ROUTES.upload, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to upload image');
  }
  return response.json();
}