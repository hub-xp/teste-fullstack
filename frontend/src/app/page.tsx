import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <main className="flex flex-col items-center justify-center h-[calc(100vh-120px)]">
   
      <h1 className="text-gray-500 text-2xl font-bold">Seja Bem-vindo ao Guia de Livros</h1>

      <div className="flex gap-4 mt-20">
      <Link href="/books" className="text-white text-2xl font-bold">Acessar Livros</Link>

      </div>
     
    </main>
  );
}
