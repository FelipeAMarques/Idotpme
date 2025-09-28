export type Species = 'dog' | 'cat';
export type AgeGroup = 'puppy' | 'adult' | 'senior';
export type Size = 'small' | 'medium' | 'large';
export type Gender = 'male' | 'female';

export interface Pet {
  id: string;
  name: string;
  species: Species;
  breed?: string;
  ageGroup: AgeGroup;
  approximateAge: string;
  size: Size;
  gender: Gender;
  description: string;
  images: string[];
  location: string;
  vaccinated: boolean;
  neutered: boolean;
  temperament: string[];
  requirements?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AdoptionApplication {
  id: string;
  petId: string;
  applicantName: string;
  email: string;
  phone: string;
  address: string;
  hasOtherPets: boolean;
  otherPetsDescription?: string;
  hasYard: boolean;
  familySize: number;
  experience: string;
  reasonForAdopting: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}