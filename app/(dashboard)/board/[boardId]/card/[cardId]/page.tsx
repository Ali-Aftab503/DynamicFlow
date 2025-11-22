import { redirect } from "next/navigation";

interface CardPageProps {
  params: Promise<{
    boardId: string;
    cardId: string;
  }>;
}

export default async function CardPage({ params }: CardPageProps) {
  const { boardId } = await params;
  
  // When accessed directly (like on refresh), redirect back to the board
  redirect(`/board/${boardId}`);
}