import { prisma } from "@/lib/prisma";
import { TipoSugestao } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { tipo, nome, descricao } = body;

  if (!tipo || !nome) {
    return NextResponse.json(
      { error: "Campos obrigatórios ausentes." },
      { status: 400 }
    );
  }

  const tipoFormatado = tipo.toUpperCase();
  if (!Object.values(TipoSugestao).includes(tipoFormatado as TipoSugestao)) {
    return NextResponse.json(
      { error: `Tipo inválido: ${tipo}. Valores esperados: ${Object.values(TipoSugestao).join(", ")}` },
      { status: 400 }
    );
  }

  const sugestao = await prisma.sugestao.create({
    data: {
      tipo: tipoFormatado as TipoSugestao,
      nome,
      descricao,
    },
  });

  return NextResponse.json(sugestao, { status: 201 });
}

export async function GET() {
  try {
    const sugestoes = await prisma.sugestao.findMany({
      orderBy: { criadaEm: 'desc' } // ordena da mais recente para a mais antiga (opcional)
    });

    return NextResponse.json(sugestoes);
  } catch (error) {
    console.error('Erro ao buscar sugestões:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar sugestões' },
      { status: 500 }
    );
  }
}
