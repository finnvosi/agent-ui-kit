"use client";

import type { ThoughtTraceProps } from "../../types";

function getStepIcon(status: string) {
  switch (status) {
    case "thinking":
      return (
        <div className="w-5 h-5 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
      );
    case "complete":
      return (
        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5L20 7" />
          </svg>
        </div>
      );
    case "error":
      return (
        <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </div>
      );
  }
}

function formatDuration(ms?: number): string {
  if (!ms) return "";
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

export function ThoughtTrace({ steps, className = "" }: ThoughtTraceProps) {
  if (steps.length === 0) return null;

  return (
    <div className={`thought-trace space-y-2 ${className}`}>
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="flex gap-3 group"
        >
          {/* Timeline */}
          <div className="flex flex-col items-center">
            <div className="mt-1">{getStepIcon(step.status)}</div>
            {index < steps.length - 1 && (
              <div className="w-px flex-1 bg-zinc-200 dark:bg-zinc-800 min-h-[16px]" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-4 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {step.label}
              </span>
              {step.durationMs && (
                <span className="text-xs text-zinc-400 tabular-nums">
                  {formatDuration(step.durationMs)}
                </span>
              )}
            </div>

            {step.status === "thinking" && !step.content ? (
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            ) : (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap">
                {step.content}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}