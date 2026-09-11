"use client";

import type { AgentStatusBadgeProps } from "../../types";

const STATUS_STYLES: Record<string, string> = {
  idle: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  thinking: "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  generating: "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  running_tool: "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  error: "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400 border-red-200 dark:border-red-800",
  complete: "bg-green-50 text-green-600 dark:bg-green-950/50 dark:text-green-400 border-green-200 dark:border-green-800",
};

function getStateAnimation(state: string) {
  switch (state) {
    case "thinking":
    case "running_tool":
      return "animate-pulse";
    case "generating":
      return "animate-pulse";
    default:
      return "";
  }
}

export function AgentStatusBadge({
  status,
  className = "",
  showLabel = true,
}: AgentStatusBadgeProps) {
  const style = STATUS_STYLES[status.state] ?? STATUS_STYLES.idle;
  const animation = getStateAnimation(status.state);

  return (
    <div
      className={`agent-status-badge inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${style} ${animation} ${className}`}
      role="status"
      aria-label={`Agent status: ${status.label}`}
    >
      {/* Live indicator dot */}
      {(status.state === "thinking" || status.state === "running_tool" || status.state === "generating") && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
        </span>
      )}

      {showLabel && (
        <span className="truncate">{status.label}</span>
      )}
    </div>
  );
}