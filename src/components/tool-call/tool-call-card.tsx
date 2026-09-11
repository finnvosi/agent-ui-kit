"use client";

import { useState } from "react";
import type { ToolCallCardProps } from "../../types";

function getStatusIcon(status: string) {
  switch (status) {
    case "running":
      return (
        <svg className="w-4 h-4 animate-spin text-blue-500" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "complete":
      return (
        <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="m8 12 3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "error":
      return (
        <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="m15 9-6 6m0-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function formatDuration(ms?: number): string {
  if (!ms) return "";
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

export function ToolCallCard({
  toolCall,
  expanded: defaultExpanded = false,
  className = "",
}: ToolCallCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div
      className={`tool-call-card border rounded-lg overflow-hidden bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 ${className}`}
    >
      {/* Header — always visible */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        {getStatusIcon(toolCall.status)}
        <span className="text-sm font-mono font-medium text-zinc-700 dark:text-zinc-300 flex-1">
          {toolCall.name}
        </span>
        {toolCall.durationMs && (
          <span className="text-xs text-zinc-400 tabular-nums">
            {formatDuration(toolCall.durationMs)}
          </span>
        )}
        <svg
          className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${expanded ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Expanded body */}
      {expanded && (
        <div className="px-3 pb-3 space-y-2 border-t border-zinc-200 dark:border-zinc-800">
          {/* Arguments */}
          <div className="mt-2">
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Arguments</div>
            <pre className="text-xs font-mono bg-zinc-100 dark:bg-zinc-950 rounded p-2 overflow-x-auto text-zinc-700 dark:text-zinc-300">
              {JSON.stringify(toolCall.arguments, null, 2)}
            </pre>
          </div>

          {/* Result */}
          {toolCall.result && (
            <div>
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Result</div>
              <pre className="text-xs font-mono bg-green-50 dark:bg-green-950/30 rounded p-2 overflow-x-auto text-zinc-700 dark:text-zinc-300">
                {toolCall.result}
              </pre>
            </div>
          )}

          {/* Error */}
          {toolCall.status === "error" && toolCall.error && (
            <div>
              <div className="text-xs font-medium text-red-500 mb-1">Error</div>
              <pre className="text-xs font-mono bg-red-50 dark:bg-red-950/30 rounded p-2 overflow-x-auto text-red-600 dark:text-red-400">
                {toolCall.error}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}