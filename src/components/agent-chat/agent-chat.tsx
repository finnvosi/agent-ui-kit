"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import type { AgentChatProps } from "../../types";
import { StreamingText } from "../streaming-text/streaming-text";
import { ToolCallCard } from "../tool-call/tool-call-card";
import { ThoughtTrace } from "../thought-trace/thought-trace";

function DefaultMessage({ content }: { content: string }) {
  return (
    <div className="whitespace-pre-wrap text-sm leading-relaxed">
      {content}
    </div>
  );
}

export function AgentChat({
  messages,
  onSend,
  placeholder = "Ask anything...",
  disabled = false,
  className = "",
  renderMessage,
}: AgentChatProps) {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      ref={chatRef}
      className={`agent-chat flex flex-col h-full bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden ${className}`}
    >
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] space-y-2 ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-2.5"
                  : ""
              }`}
            >
              {/* Thought trace */}
              {msg.thoughts && msg.thoughts.length > 0 && (
                <ThoughtTrace steps={msg.thoughts} className="mb-2" />
              )}

              {/* Message content */}
              {renderMessage ? (
                renderMessage(msg)
              ) : msg.status === "streaming" ? (
                <StreamingText content={msg.content} speed="normal" />
              ) : (
                <DefaultMessage content={msg.content} />
              )}

              {/* Tool calls */}
              {msg.toolCalls && msg.toolCalls.length > 0 && (
                <div className="space-y-1.5 mt-2">
                  {msg.toolCalls.map((tc) => (
                    <ToolCallCard key={tc.id} toolCall={tc} />
                  ))}
                </div>
              )}

              {/* Error state */}
              {msg.status === "error" && (
                <div className="text-xs text-red-500 mt-1 font-medium">
                  Error generating response
                </div>
              )}

              {/* Timestamp */}
              <div
                className={`text-[10px] ${
                  msg.role === "user"
                    ? "text-blue-200 text-right"
                    : "text-zinc-400"
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 p-3">
        <div
          className={`flex items-end gap-2 rounded-xl border bg-white dark:bg-zinc-900 transition-colors ${
            isFocused
              ? "border-blue-400 dark:border-blue-500 shadow-sm"
              : "border-zinc-200 dark:border-zinc-800"
          }`}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="flex-1 bg-transparent resize-none px-3 py-2.5 text-sm outline-none placeholder:text-zinc-400 disabled:opacity-50 min-h-[38px] max-h-[160px]"
            aria-label="Chat input"
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!input.trim() || disabled}
            className="flex-shrink-0 mr-2 mb-1.5 p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </button>
        </div>
        <p className="text-[11px] text-zinc-400 mt-1.5 px-1">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}