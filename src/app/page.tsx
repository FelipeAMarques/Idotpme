import { PetGrid } from "@/components/PetGrid";
import { getPets } from "@/services/pets";

// Server Component
export default async function Home() {
  const pets = await getPets();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">iPet</h1>
              <p className="text-lg">Encontre seu novo melhor amigo</p>
            </div>
            <a
              href="/pets/new"
              className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-blue-50 transition-colors"
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
