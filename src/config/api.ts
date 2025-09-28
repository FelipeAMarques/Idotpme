export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const API_ROUTES = {
  pets: `${API_BASE_URL}/api/pets`,
  pet: (id: string) => `${API_BASE_URL}/api/pets/${id}`,
  upload: `${API_BASE_URL}/api/upload`,
} as const;