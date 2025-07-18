'use client';

import { useEffect, useState } from 'react';
import LinkButton from './components/LinkButton';

type Sugestao = {
  id: number;
  tipo: string;
  nome: string;
  descricao: string | null;
  criadaEm: string;
};

export default function Home() {
  const [tipo, setTipo] = useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!tipo || !nome) {
      setMensagem('Preencha os campos obrigatórios.');
      return;
    }

    const metodo = editandoId ? 'PATCH' : 'POST';
    const url = editandoId ? `/api/sugestoes/${editandoId}` : '/api/sugestoes';

    const res = await fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tipo, nome, descricao }),
    });

    if (res.ok) {
      setMensagem(editandoId ? 'Sugestão atualizada!' : 'Sugestão enviada com sucesso!');
      setTipo('');
      setNome('');
      setDescricao('');
      setEditandoId(null);
      fetchSugestoes();
    } else {
      setMensagem('Erro ao enviar sugestão.');
    }
  }

  async function fetchSugestoes() {
    const res = await fetch('/api/sugestoes');
    if (res.ok) {
      const data = await res.json();
      setSugestoes(data);
    }
  }

  async function deletarSugestao(id: number) {
    const confirmacao = confirm('Tem certeza que deseja deletar esta sugestão?');
    if (!confirmacao) return;

    const res = await fetch(`/api/sugestoes/${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchSugestoes();
    } else {
      alert('Erro ao deletar sugestão.');
    }
  }

  function editarSugestao(s: Sugestao) {
    setTipo(s.tipo);
    setNome(s.nome);
    setDescricao(s.descricao || '');
    setEditandoId(s.id);
    setMensagem('Editando sugestão...');
  }

  useEffect(() => {
    fetchSugestoes();
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen px-6">
      <div className="flex flex-col md:flex-row gap-12 max-w-6xl w-full">
        {/* Coluna da esquerda - botões e lista */}
        <div className="md:w-1/2 flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Minhas Sugestões</h2>
            <div className="flex flex-col gap-2 mt-2">
              <LinkButton href="/musicas" cor="blue">Músicas</LinkButton>
              <LinkButton href="/artistas" cor="green">Artistas</LinkButton>
              <LinkButton href="/playlists" cor="purple">Playlists</LinkButton>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Sugestões de vocês</h3>
            <div className="bg-white border rounded p-4 max-h-[300px] overflow-y-auto">
              {sugestoes.length === 0 ? (
                <p className="text-gray-500 text-sm">Nenhuma sugestão enviada ainda.</p>
              ) : (
                sugestoes.map((sugestao) => (
                  <div key={sugestao.id} className="mb-3 border-b pb-2">
                    <p><strong>{sugestao.tipo.toUpperCase()}</strong>: {sugestao.nome}</p>
                    {sugestao.descricao && <p className="text-sm text-gray-600">{sugestao.descricao}</p>}
                    <p className="text-xs text-gray-400">
                      Enviado em {new Date(sugestao.criadaEm).toLocaleString()}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <button
                        className="text-sm text-blue-600 hover:underline"
                        onClick={() => editarSugestao(sugestao)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-sm text-red-600 hover:underline"
                        onClick={() => deletarSugestao(sugestao.id)}
                      >
                        Deletar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Coluna da direita - formulário */}
        <div className="md:w-1/2 bg-gray-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            {editandoId ? 'Editar sugestão' : 'Faça sua sugestão'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Tipo</label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded"
              >
                <option value="">Selecione</option>
                <option value="musica">Música</option>
                <option value="artista">Artista</option>
                <option value="playlist">Playlist</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Descrição (opcional)</label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded"
              />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
              {editandoId ? 'Salvar alterações' : 'Enviar sugestão'}
            </button>

            {mensagem && <p className="text-sm text-center">{mensagem}</p>}
          </form>
        </div>
      </div>
    </main>
  );
}
