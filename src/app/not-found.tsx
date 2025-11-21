import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl font-bold mb-4 text-gray-100">
          Página não encontrada
        </h2>
        <p className="text-gray-400 mb-8">
          A página que você está procurando não existe.
        </p>
        <Link href="/">
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white">
            <Home className="w-5 h-5 mr-2" />
            Voltar para Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
