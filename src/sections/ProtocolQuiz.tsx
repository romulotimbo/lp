import { useState, type FormEvent } from "react";
import { product } from "@/product/active";
import { useProtocolEmphasis } from "@/product/protocol-emphasis";
import { protocolDisplayName } from "@/components/dual-official-ctas";
import type { ProtocolId } from "@/product/types";

export function ProtocolQuiz() {
  const quiz = product.protocolQuiz;
  const { completeQuiz, score, emphasis } = useProtocolEmphasis();
  const [answers, setAnswers] = useState<Partial<Record<string, ProtocolId>>>({});

  if (!quiz) return null;

  const questions = quiz.questions;
  const allAnswered = questions.every((question) => answers[question.id]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!allAnswered) return;
    const ordered = questions.map((question) => answers[question.id]) as ProtocolId[];
    completeQuiz(ordered);
    document.getElementById("act-4")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const protocolName =
    emphasis === "unset" ? null : protocolDisplayName(emphasis);
  const banner = score
    ? (quiz.resultTemplate ??
        "Analyzing your answers: your profile has {affinity}% affinity with the {protocol} protocol…")
        .replace("{affinity}", String(score.affinity))
        .replace("{protocol}", protocolName ?? "")
    : null;

  return (
    <form className="skeptic-quiz" onSubmit={handleSubmit}>
      <ol className="skeptic-quiz-list">
        {questions.map((question, index) => (
          <li key={question.id} className="skeptic-quiz-item">
            <fieldset>
              <legend>
                <span className="skeptic-quiz-index">{index + 1}</span>
                {question.prompt}
              </legend>
              <div className="skeptic-quiz-answers">
                {question.answers.map((answer) => {
                  const inputId = `${question.id}-${answer.scores}`;
                  return (
                    <label key={inputId} className="skeptic-quiz-choice" htmlFor={inputId}>
                      <input
                        id={inputId}
                        type="radio"
                        name={question.id}
                        value={answer.scores}
                        checked={answers[question.id] === answer.scores}
                        onChange={() =>
                          setAnswers((current) => ({ ...current, [question.id]: answer.scores }))
                        }
                      />
                      <span>{answer.label}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>
      {banner ? <p className="skeptic-quiz-banner" role="status">{banner}</p> : null}
      <button className="skeptic-cta" type="submit" disabled={!allAnswered}>
        {quiz.diagnoseLabel}
      </button>
    </form>
  );
}
