import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { product } from "@/product/active";
import {
  PROTOCOL_QUIZ_STORAGE_KEY,
  scoreProtocolQuiz,
  type QuizScore,
} from "@/product/protocol-quiz";
import type { ProtocolEmphasis, ProtocolId } from "@/product/types";

interface ProtocolEmphasisValue {
  emphasis: ProtocolEmphasis;
  score: QuizScore | null;
  completeQuiz: (answers: ProtocolId[]) => QuizScore;
}

const ProtocolEmphasisContext = createContext<ProtocolEmphasisValue | null>(null);

function readStoredScore(): QuizScore | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PROTOCOL_QUIZ_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as QuizScore;
    if (parsed?.winner !== "pills" && parsed?.winner !== "spray") return null;
    if (typeof parsed.affinity !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function ProtocolEmphasisProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState<QuizScore | null>(null);

  useEffect(() => {
    setScore(readStoredScore());
  }, []);

  const completeQuiz = useCallback((answers: ProtocolId[]) => {
    const defaultProtocol = product.catalog?.defaultProtocol ?? "pills";
    const next = scoreProtocolQuiz(answers, defaultProtocol);
    setScore(next);
    try {
      sessionStorage.setItem(PROTOCOL_QUIZ_STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* sessionStorage can throw in private mode */
    }
    return next;
  }, []);

  const value = useMemo<ProtocolEmphasisValue>(
    () => ({
      emphasis: score?.winner ?? "unset",
      score,
      completeQuiz,
    }),
    [completeQuiz, score],
  );

  return (
    <ProtocolEmphasisContext.Provider value={value}>{children}</ProtocolEmphasisContext.Provider>
  );
}

export function useProtocolEmphasis(): ProtocolEmphasisValue {
  const value = useContext(ProtocolEmphasisContext);
  if (!value) {
    return {
      emphasis: "unset",
      score: null,
      completeQuiz: (answers) =>
        scoreProtocolQuiz(answers, product.catalog?.defaultProtocol ?? "pills"),
    };
  }
  return value;
}
