import Ranking from "../components/Ranking";

export default function Playlists() {
  const playlists = [
  {
    nome: 'Diamantes, Lágrimas e Rostos para Esquecer "BK"',
    imagem: "/images/Playlists/DLRE.png",
  },
  {
    nome: 'Patrono "2ZDiniz"',
    imagem: "/images/Playlists/Patrono.png",
  },
  {
    nome: 'HARDSTONE PSYCHO "Don Toliver"',
    imagem: "/images/Playlists/HARDSTONE_PSYCHO.png",
  },
  {
    nome: 'Castelos & Ruínas "BK"',
    imagem: "/images/Playlists/Castelos&Ruinas.png",
  },
  {
    nome: 'Nunca Tenha Medo "LPT Zlatan"',
    imagem: "/images/Playlists/Nunca_Tenha_Medo.png",
  },

];

  return (
    <main className="flex flex-col min-h-screen items-center bg-white text-black p-4">
      <h1 className="text-3xl font-bold mb-6">Principais Playlists</h1>
      <Ranking itens={playlists} />
    </main>
  );
}