import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { TipoSugestao } from "@prisma/client";


export async function DELETE(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const idStr = pathname.split("/").pop();
  const id = Number(idStr);

  if (isNaN(id)) {
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  }

  await prisma.sugestao.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Sugestão deletada com sucesso." });
}


export async function PATCH(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const idStr = pathname.split("/").pop();
  const id = Number(idStr);

  if (isNaN(id)) {
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  }

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

  const sugestaoAtualizada = await prisma.sugestao.update({
    where: { id },
    data: {
      tipo: tipoFormatado as TipoSugestao,
      nome,
      descricao,
    },
  });

  return NextResponse.json(sugestaoAtualizada);
}
