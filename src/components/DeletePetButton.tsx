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
      router.refresh();
      router.push('/');
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
        className="w-full md:w-auto px-8 py-3 rounded-md font-semibold transition-colors"
        style={{
          background: showConfirmation ? 'var(--danger)' : 'var(--secondary)',
          color: 'var(--text-primary)'
        }}
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
          className="mt-2 w-full md:w-auto px-8 py-3 rounded-md transition-colors"
          style={{
            background: 'var(--card-bg)',
            color: 'var(--text-primary)'
          }}
        >
          Cancelar
        </button>
      )}
    </div>
  );
}