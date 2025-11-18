"use client";

import clsx from "clsx";

export default function MessageBubble({ message }) {
  const { role, content } = message;
  const isAssistant = role !== "user";

  return (
    <div
      className={clsx("message", {
        "message--assistant": isAssistant,
        "message--user": !isAssistant
      })}
    >
      <span className="message__role">{isAssistant ? "Agent" : "You"}</span>
      <pre className="message__content">{content}</pre>
      <style jsx>{`
        .message {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.45rem;
          background: rgba(17, 20, 29, 0.85);
          border: 1px solid rgba(92, 112, 205, 0.25);
          border-radius: 16px;
          padding: 1.1rem 1.2rem;
          width: fit-content;
          max-width: 620px;
          backdrop-filter: blur(6px);
          white-space: pre-wrap;
          line-height: 1.55;
        }

        .message--user {
          margin-left: auto;
          background: linear-gradient(135deg, rgba(82, 97, 255, 0.65), rgba(66, 210, 210, 0.5));
          border-color: rgba(133, 144, 255, 0.4);
        }

        .message__role {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(200, 210, 255, 0.85);
        }

        .message__content {
          font-family: "JetBrains Mono", "SFMono-Regular", ui-monospace, "Menlo", monospace;
          margin: 0;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
}
