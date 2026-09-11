// Agent UI Kit — Core type system
// Shared across all components

import { ReactNode } from "react";

// ─── Message types ────────────────────────────────────────────────

export type MessageRole = "user" | "assistant" | "system" | "tool";

export type MessageStatus = "streaming" | "complete" | "error" | "pending";

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, string>;
  status: "running" | "complete" | "error";
  result?: string | null;
  durationMs?: number;
  error?: string;
}

export interface ThoughtStep {
  id: string;
  label: string;
  content: string;
  status: "thinking" | "complete" | "error";
  durationMs?: number;
}

export interface AgentMessage {
  id: string;
  role: MessageRole;
  content: string;
  status: MessageStatus;
  timestamp: number;
  toolCalls?: ToolCall[];
  thoughts?: ThoughtStep[];
  metadata?: Record<string, unknown>;
}

// ─── Agent status ──────────────────────────────────────────────────

export type AgentState =
  | "idle"
  | "thinking"
  | "generating"
  | "running_tool"
  | "error"
  | "complete";

export interface AgentStatus {
  state: AgentState;
  label: string;
  description?: string;
  progress?: number; // 0-1
}

// ─── Streaming ─────────────────────────────────────────────────────

export interface StreamingState {
  isStreaming: boolean;
  content: string;
  done: boolean;
  error?: string;
}

// ─── Component props ──────────────────────────────────────────────

export interface AgentChatProps {
  messages: AgentMessage[];
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  renderMessage?: (message: AgentMessage) => ReactNode;
}

export interface StreamingTextProps {
  content: string;
  speed?: "slow" | "normal" | "fast" | "instant";
  className?: string;
  onComplete?: () => void;
}

export interface ToolCallCardProps {
  toolCall: ToolCall;
  expanded?: boolean;
  className?: string;
}

export interface ThoughtTraceProps {
  steps: ThoughtStep[];
  className?: string;
}

export interface AgentStatusBadgeProps {
  status: AgentStatus;
  className?: string;
  showLabel?: boolean;
}

export interface MessageListProps {
  messages: AgentMessage[];
  className?: string;
  autoScroll?: boolean;
}