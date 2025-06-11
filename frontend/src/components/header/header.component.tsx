import Link from "next/link";

export default function HeaderComponent() { 
    return (
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1 className="text-2xl font-bold">Guia de Livros</h1>

            <nav className="flex gap-4">
                <Link href="/books">Livros</Link>
            </nav>
        </header>
    )
}