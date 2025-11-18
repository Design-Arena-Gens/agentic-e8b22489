"use client";

import { useCallback, useMemo } from "react";
import ChatInput from "../components/ChatInput";
import MessageBubble from "../components/MessageBubble";
import PlanCard from "../components/PlanCard";
import ToolShelf from "../components/ToolShelf";
import { useAgentStore } from "../stores/useAgentStore";

export default function Home() {
  const {
    persona,
    plan,
    tools,
    messages,
    isLoading,
    error,
    pushMessage,
    setPersona,
    setPlan,
    setTools,
    setLoading,
    setError
  } = useAgentStore();

  const handleSubmit = useCallback(
    async (content) => {
      const userMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content
      };

      pushMessage(userMessage);
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/agent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ messages: [...messages, userMessage] })
        });

        if (!response.ok) {
          const payload = await response.json();
          throw new Error(payload.error || "Unexpected error");
        }

        const payload = await response.json();

        setPersona(payload.persona);
        setPlan(payload.plan);
        setTools(payload.tools);

        pushMessage({
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: payload.reply
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        pushMessage({
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          content: "I ran into an issue while processing that request. Please try again."
        });
      } finally {
        setLoading(false);
      }
    },
    [messages, pushMessage, setPersona, setPlan, setTools, setLoading, setError]
  );

  const recentMessages = useMemo(() => messages.slice(-12), [messages]);

  return (
    <main className="page">
      <div className="page__left-pane">
        <header className="page__header">
          <div>
            <h1>Agent Ops Console</h1>
            <p>Feed objectives, receive strategic plans, and track the agent&apos;s focus in real-time.</p>
          </div>
          <div className="status">
            <span className={isLoading ? "status-dot status-dot--pulse" : "status-dot"} />
            <span>{isLoading ? "Agent is synthesizing..." : "Standing by"}</span>
          </div>
        </header>

        <section className="chat-stream">
          {recentMessages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </section>

        {error && <p className="error-banner">{error}</p>}

        <ChatInput disabled={isLoading} onSubmit={handleSubmit} />
      </div>

      <aside className="page__right-pane">
        <PlanCard persona={persona} plan={plan} />
        <ToolShelf tools={tools} />
        <section className="notes">
          <h2>Operator Notes</h2>
          <p>Record insights, blockers, or context to share with the agent on your next prompt.</p>
          <textarea placeholder="Summaries, decisions, and follow-ups live here." rows={6} />
        </section>
      </aside>

      <style jsx>{`
        .page {
          display: grid;
          grid-template-columns: 1fr minmax(320px, 360px);
          gap: 2rem;
          width: 100%;
          padding: 2.5rem;
        }

        .page__left-pane {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .page__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        h1 {
          margin: 0;
          font-size: 2rem;
          letter-spacing: -0.02em;
          color: #eef1ff;
        }

        .page__header p {
          max-width: 520px;
          margin: 0.45rem 0 0;
          color: rgba(207, 214, 255, 0.75);
          font-size: 1rem;
        }

        .status {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(29, 40, 78, 0.6);
          border-radius: 999px;
          padding: 0.45rem 0.85rem;
          border: 1px solid rgba(93, 124, 255, 0.25);
          color: rgba(200, 214, 255, 0.8);
          font-size: 0.85rem;
        }

        .status-dot {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 999px;
          background: #5af2d9;
          box-shadow: 0 0 8px rgba(89, 240, 217, 0.9);
        }

        .status-dot--pulse {
          animation: pulse 1.8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.35);
            opacity: 0.4;
          }
        }

        .chat-stream {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          border-radius: 18px;
          background: rgba(8, 11, 19, 0.78);
          border: 1px solid rgba(71, 97, 210, 0.25);
          height: 100%;
          overflow-y: auto;
        }

        .error-banner {
          margin: 0;
          padding: 0.85rem 1rem;
          border-radius: 12px;
          background: rgba(255, 82, 118, 0.18);
          border: 1px solid rgba(255, 122, 155, 0.25);
          color: rgba(255, 188, 205, 0.9);
          font-size: 0.9rem;
        }

        .page__right-pane {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          position: sticky;
          top: 2rem;
          height: fit-content;
        }

        .notes {
          padding: 1.4rem;
          border-radius: 18px;
          background: rgba(14, 17, 27, 0.75);
          border: 1px solid rgba(78, 108, 223, 0.2);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .notes h2 {
          margin: 0;
          font-size: 1.05rem;
          color: #d4dbff;
        }

        .notes p {
          margin: 0;
          font-size: 0.85rem;
          line-height: 1.4;
          color: rgba(206, 214, 255, 0.7);
        }

        .notes textarea {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(98, 112, 214, 0.35);
          padding: 0.9rem;
          background: rgba(16, 20, 33, 0.9);
          min-height: 160px;
          resize: vertical;
        }

        @media (max-width: 1080px) {
          .page {
            grid-template-columns: 1fr;
          }

          .page__right-pane {
            position: static;
          }
        }
      `}</style>
    </main>
  );
}
