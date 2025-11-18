"use client";

import { useState } from "react";

export default function ChatInput({ disabled, onSubmit }) {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue("");
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <textarea
        value={value}
        placeholder="Describe the objective, constraints, or questions for the agent."
        onChange={(event) => setValue(event.target.value)}
        disabled={disabled}
        rows={3}
      />
      <div className="chat-input__actions">
        <button type="submit" disabled={disabled || !value.trim()}>
          {disabled ? "Thinking..." : "Send"}
        </button>
      </div>
      <style jsx>{`
        .chat-input {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1.5rem;
          border-radius: 18px;
          background: rgba(10, 13, 22, 0.85);
          border: 1px solid rgba(85, 113, 207, 0.25);
          backdrop-filter: blur(12px);
        }

        textarea {
          resize: vertical;
          min-height: 96px;
          max-height: 240px;
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid rgba(103, 115, 210, 0.35);
          background: rgba(15, 18, 30, 0.85);
          outline: none;
          line-height: 1.4;
        }

        textarea:focus {
          border-color: rgba(146, 168, 255, 0.8);
          box-shadow: 0 0 0 2px rgba(82, 97, 255, 0.35);
        }

        textarea::placeholder {
          color: rgba(160, 173, 210, 0.65);
        }

        .chat-input__actions {
          display: flex;
          justify-content: flex-end;
        }

        button {
          min-width: 124px;
          padding: 0.85rem 1.2rem;
          border-radius: 999px;
          background: linear-gradient(120deg, #5460ff, #50dbd4);
          border: none;
          color: #0b0e17;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }

        button:hover:not(:disabled) {
          transform: translateY(-1px);
          opacity: 0.95;
        }

        button:disabled {
          cursor: progress;
          opacity: 0.6;
        }
      `}</style>
    </form>
  );
}
