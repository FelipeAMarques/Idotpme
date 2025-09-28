'use client';

import { createPet, uploadImage } from "@/services/pets";
import { AgeGroup, Gender, Size, Species } from "@/types/pet";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPetPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      const temperamentString = formData.get('temperament') as string;
      const requirementsString = formData.get('requirements') as string;
      
      const pet = {
        name: formData.get('name') as string,
        species: formData.get('species') as Species,
        breed: formData.get('breed') as string,
        ageGroup: formData.get('ageGroup') as AgeGroup,
        approximateAge: formData.get('approximateAge') as string,
        size: formData.get('size') as Size,
        gender: formData.get('gender') as Gender,
        description: formData.get('description') as string,
        images,
        location: formData.get('location') as string,
        vaccinated: formData.get('vaccinated') === 'true',
        neutered: formData.get('neutered') === 'true',
        temperament: temperamentString.split(',').map(t => t.trim()),
        requirements: requirementsString.split(',').map(r => r.trim()),
      };

      const newPet = await createPet(pet);
      router.push(`/pets/${newPet.id}`);
    } catch (error) {
      console.error('Error creating pet:', error);
      alert('Erro ao criar animal. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const result = await uploadImage(file);
        return result.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setImages(prev => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Erro ao fazer upload das imagens. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Adicionar Novo Animal</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informações Básicas */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="species" className="block text-sm font-medium text-gray-700">Espécie</label>
                <select
                  id="species"
                  name="species"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="dog">Cachorro</option>
                  <option value="cat">Gato</option>
                </select>
              </div>

              <div>
                <label htmlFor="breed" className="block text-sm font-medium text-gray-700">Raça</label>
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700">Faixa Etária</label>
                <select
                  id="ageGroup"
                  name="ageGroup"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="puppy">Filhote</option>
                  <option value="adult">Adulto</option>
                  <option value="senior">Idoso</option>
                </select>
              </div>

              <div>
                <label htmlFor="approximateAge" className="block text-sm font-medium text-gray-700">Idade Aproximada</label>
                <input
                  type="text"
                  id="approximateAge"
                  name="approximateAge"
                  required
                  placeholder="ex: 2 anos"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Mais Informações */}
            <div className="space-y-4">
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700">Porte</label>
                <select
                  id="size"
                  name="size"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="small">Pequeno</option>
                  <option value="medium">Médio</option>
                  <option value="large">Grande</option>
                </select>
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gênero</label>
                <select
                  id="gender"
                  name="gender"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="male">Macho</option>
                  <option value="female">Fêmea</option>
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Localização</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  placeholder="ex: São Paulo, SP"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Status de Saúde</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="vaccinated"
                      value="true"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">Vacinado</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="neutered"
                      value="true"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">Castrado</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Seção de Fotos */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Fotos</label>
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            {images.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {images.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="h-20 w-20 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Descrição */}
          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Temperamento */}
          <div className="mt-6">
            <label htmlFor="temperament" className="block text-sm font-medium text-gray-700">
              Temperamento (separado por vírgulas)
            </label>
            <input
              type="text"
              id="temperament"
              name="temperament"
              required
              placeholder="ex: Amigável, Brincalhão, Dócil"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Requisitos */}
          <div className="mt-6">
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
              Requisitos para Adoção (separado por vírgulas)
            </label>
            <input
              type="text"
              id="requirements"
              name="requirements"
              placeholder="ex: Ter espaço adequado, Ter disponibilidade para passeios"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Botão de Envio */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-md text-white font-semibold ${
                isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar Animal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}