"use client";

import { create } from "zustand";

const now = () => new Date().toISOString();

export const useAgentStore = create((set, get) => ({
  persona: "",
  plan: [],
  tools: [],
  messages: [
    {
      id: `system-${now()}`,
      role: "assistant",
      content: "Hi! I'm your execution agent. Drop a task and I'll map out the path forward.",
      createdAt: now()
    }
  ],
  isLoading: false,
  error: null,

  setPersona: (persona) => set({ persona }),
  setPlan: (plan) => set({ plan }),
  setTools: (tools) => set({ tools }),
  pushMessage: (message) => set({ messages: [...get().messages, { ...message, createdAt: now() }] }),
  setLoading: (state) => set({ isLoading: state }),
  setError: (error) => set({ error }),

  reset: () =>
    set({
      persona: "",
      plan: [],
      tools: [],
      messages: [
        {
          id: `system-${now()}`,
          role: "assistant",
          content: "Workspace cleared! Ready for the next objective.",
          createdAt: now()
        }
      ],
      isLoading: false,
      error: null
    })
}));
