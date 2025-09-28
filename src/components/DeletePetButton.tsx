'use client';

import { deletePet } from "@/services/pets";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeletePetButtonProps {
  petId: string;
  petName: string;
}

export function DeletePetButton({ petId, petName }: DeletePetButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async () => {
    if (!showConfirmation) {
      setShowConfirmation(true);
      return;
    }

    try {
      setIsDeleting(true);
      await deletePet(petId);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error deleting pet:', error);
      alert('Erro ao excluir o animal. Por favor, tente novamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={`w-full md:w-auto px-8 py-3 rounded-md text-white font-semibold ${
          showConfirmation 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-gray-600 hover:bg-gray-700'
        } transition-colors`}
      >
        {isDeleting
          ? 'Excluindo...'
          : showConfirmation
          ? `Clique novamente para confirmar a exclusão de ${petName}`
          : 'Excluir Animal'}
      </button>
      {showConfirmation && (
        <button
          onClick={() => setShowConfirmation(false)}
          className="mt-2 w-full md:w-auto px-8 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancelar
        </button>
      )}
    </div>
  );
}