import { PetGrid } from "@/components/PetGrid";
import { getPets } from "@/services/pets";

// Server Component
export default async function Home() {
  const pets = await getPets();

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="bg-[#2d2d2d] text-white p-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-blue-400">iPet</h1>
              <p className="text-lg text-gray-300">Encontre seu novo melhor amigo</p>
            </div>
            <a
              href="/pets/new"
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
            >
              Cadastrar Animal
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <PetGrid initialPets={pets} />
      </main>
    </div>
  );
}
