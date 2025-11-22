import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{
    cardId: string;
  }>;
}

// POST add a link to a card
export async function POST(req: Request, { params }: RouteParams) {
  try {
    const { userId } = await auth();
    const { cardId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, url } = body;

    if (!title || !url) {
      return new NextResponse("Title and URL are required", { status: 400 });
    }

    // Verify card exists and user has access
    const card = await prisma.card.findUnique({
      where: { id: cardId },
      include: {
        list: {
          include: {
            board: true,
          },
        },
      },
    });

    if (!card) {
      return new NextResponse("Card not found", { status: 404 });
    }

    if (card.list.board.userId !== userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const link = await prisma.cardLink.create({
      data: {
        cardId,
        title,
        url,
      },
    });

    return NextResponse.json(link);
  } catch (error) {
    console.error("[CARD_LINKS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}