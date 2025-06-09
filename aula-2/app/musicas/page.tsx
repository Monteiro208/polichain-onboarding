import Ranking from "../components/Ranking";

export default function Musicas() {
  const musicas = [
  {
    nome: 'Bandit "Don Toliver"',
    imagem: "/images/Musicas/Bandit.png",
  },
  {
    nome: 'Quem Disse Que o Boombap Morreu? "2ZDiniz"',
    imagem: "/images/Playlists/Patrono.png",
  },
  {
    nome: 'Falando Segredo "Art Popular"',
    imagem: "/images/Musicas/Falando_Segredo.png",
  },
  {
    nome: 'Olha o kit "Bradockdan"',
    imagem: "/images/Musicas/Olha_o_Kit.png",
  },
  {
    nome: 'Open Arms "SZA e Travis Scott"',
    imagem: "/images/Musicas/Open_Arms.png",
  },

];

  return (
    <main className="flex flex-col min-h-screen items-center bg-white text-black p-4">
      <h1 className="text-3xl font-bold mb-6">Principais Musicas</h1>
      <Ranking itens={musicas} />
    </main>
  );
}