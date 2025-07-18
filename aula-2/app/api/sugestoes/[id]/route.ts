import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { TipoSugestao } from "@prisma/client";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const body = await request.json();
  const { tipo, nome, descricao } = body;

  
  const dataAtualizacao: any = {};
  if (tipo) {
    const tipoFormatado = tipo.toUpperCase();
    if (!Object.values(TipoSugestao).includes(tipoFormatado as TipoSugestao)) {
      return NextResponse.json(
        { error: `Tipo inválido: ${tipo}. Valores esperados: ${Object.values(TipoSugestao).join(", ")}` },
        { status: 400 }
      );
    }
    dataAtualizacao.tipo = tipoFormatado;
  }

  if (nome) dataAtualizacao.nome = nome;
  if (descricao !== undefined) dataAtualizacao.descricao = descricao;

  try {
    const sugestaoAtualizada = await prisma.sugestao.update({
      where: { id },
      data: dataAtualizacao,
    });

    return NextResponse.json(sugestaoAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar sugestão:", error);
    return NextResponse.json({ error: "Erro ao atualizar sugestão." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  try {
    await prisma.sugestao.delete({ where: { id } });
    return NextResponse.json({ message: "Sugestão deletada com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar sugestão:", error);
    return NextResponse.json({ error: "Erro ao deletar sugestão." }, { status: 500 });
  }
}
