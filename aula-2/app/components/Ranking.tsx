'use client';

type Item = {
  nome: string;
  imagem: string;
};

type Props = {
  itens: Item[];
};

export default function Ranking({ itens }: Props) {
  return (
    <div className="w-full max-w-md space-y-4">
      {itens.map((item, index) => (
        <div
          key={index}
          className="flex items-center bg-gray-500 rounded-xl p-3 shadow"
        >
          <img
            src={item.imagem}
            alt={item.nome}
            className="w-24 h-24 rounded-full object-cover mr-4"
          />
          <div className="text-xl font-semibold">
            #{index + 1} - {item.nome}
          </div>
        </div>
      ))}
    </div>
  );
}