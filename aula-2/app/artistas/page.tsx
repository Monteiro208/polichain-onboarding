import Ranking from "../components/Ranking";

export default function Artistas() {
  const artistas = [
  {
    nome: 'Abebe Bibikila "BK"',
    imagem: "/images/Artistas/Abebe_Bibikila.png",
  },
  {
    nome: "Arlindo Cruz",
    imagem: "/images/Artistas/Arlindo_Cruz.png",
  },
  {
    nome: "Sabotage",
    imagem: "/images/Artistas/Sabotage.png",
  },
  {
    nome: "Don Toliver",
    imagem: "/images/Artistas/Don_Toliver.png",
  },
  {
    nome: "Seu Jorge",
    imagem: "/images/Artistas/Seu_Jorge.png",
  },

];

  return (
    <main className="flex flex-col min-h-screen items-center bg-white text-black p-4">
      <h1 className="text-3xl font-bold mb-6">Principais Artistas</h1>
      <Ranking itens={artistas} />
    </main>
  );
}