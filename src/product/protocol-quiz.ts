import type { ProtocolId } from "./types";

export interface QuizScore {
  winner: ProtocolId;
  affinity: number;
  pillsVotes: number;
  sprayVotes: number;
}

export function scoreProtocolQuiz(
  answers: ProtocolId[],
  defaultProtocol: ProtocolId,
): QuizScore {
  const pillsVotes = answers.filter((answer) => answer === "pills").length;
  const sprayVotes = answers.filter((answer) => answer === "spray").length;
  const winner =
    pillsVotes === sprayVotes ? defaultProtocol : pillsVotes > sprayVotes ? "pills" : "spray";
  const winningVotes = winner === "pills" ? pillsVotes : sprayVotes;
  return {
    winner,
    affinity: Math.round((winningVotes / 4) * 100),
    pillsVotes,
    sprayVotes,
  };
}

export function complementaryProtocol(id: ProtocolId): ProtocolId {
  return id === "pills" ? "spray" : "pills";
}

export const PROTOCOL_QUIZ_STORAGE_KEY = "review-skeptic-protocol-quiz";
