import Image from "next/image";
import Link from "next/link";
import Button from "./components/Button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center">
        Conheça um pouco do que estou escutando recentemente !
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button href="/artistas" cor="blue">
          Principais Artistas
        </Button>
        <Button href="/musicas" cor="green">
          Principais Músicas
        </Button>
        <Button href="/playlists" cor="purple">
          Principais Playlists
        </Button>
      </div>
    </main>
  );
}
