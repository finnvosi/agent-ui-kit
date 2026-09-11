# Agent UI Kit

> Production-grade React components for building AI agent interfaces.

[![npm version](https://img.shields.io/badge/npm-0.1.0-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

**Streaming text, tool call displays, thought traces, agent status indicators, and a full chat UI** — built for the developer tools, AI apps, and agent interfaces everyone is shipping right now.

```tsx
import { AgentChat, StreamingText, ToolCallCard } from "agent-ui-kit";
```

---

## The Problem

Every AI agent app needs:
- Text that **streams in character-by-character**
- **Tool call cards** that expand/collapse with arguments and results
- **Thought/reasoning traces** with animated state indicators
- **Agent status badges** that pulse during thinking
- A **chat interface** that ties it all together

There was no single, well-typed, production-ready library for this. Now there is.

---

## Components

### `AgentChat`
Full chat interface with streaming text, tool calls, thought traces, auto-resize input, Enter-to-send, and dark mode.

```tsx
<AgentChat
  messages={messages}
  onSend={(text) => addMessage({ role: "user", content: text })}
/>
```

### `StreamingText`
Character-by-character streaming text with configurable speed.

```tsx
<StreamingText content="Hello world" speed="normal" />
```

| Speed | Chars/sec | Use case |
|-------|-----------|----------|
| `slow` | 25 | Dramatic reveal |
| `normal` | 50 | Default reading pace |
| `fast` | 125 | Quick display |
| `instant` | ∞ | Instant render |

### `ToolCallCard`
Expandable card showing tool name, arguments, result, duration, and status.

```tsx
<ToolCallCard toolCall={{
  id: "1",
  name: "search_web",
  arguments: { query: "latest AI news" },
  status: "complete",
  result: "Found 10 results...",
  durationMs: 1234,
}} />
```

### `ThoughtTrace`
Reasoning step timeline with animated thinking indicators and completion checkmarks.

```tsx
<ThoughtTrace steps={[
  { id: "1", label: "Analyzing query", content: "...", status: "complete" },
  { id: "2", label: "Searching knowledge", content: "...", status: "thinking" },
]} />
```

### `AgentStatusBadge`
Status pill with animated live indicator.

```tsx
<AgentStatusBadge status={{ state: "thinking", label: "Thinking..." }} />
```

| State | Visual |
|-------|--------|
| `idle` | Static badge |
| `thinking` | Pulsing + blue dot |
| `running_tool` | Pulsing + amber dot |
| `generating` | Pulsing + purple dot |
| `complete` | Green badge |
| `error` | Red badge |

---

## Installation

```bash
npm install agent-ui-kit
# or
pnpm add agent-ui-kit
yarn add agent-ui-kit
```

### Peer dependencies

- React 18+ or 19+
- Tailwind CSS (for styling)

The components use Tailwind classes. Include the package in your `content` config:

```js
// tailwind.config.ts
export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/agent-ui-kit/dist/**/*.{js,jsx}",
  ],
}
```

---

## Coming Soon (Pro)

- 📦 **Markdown rendering** with streaming
- 🎨 **Themeable** via CSS variables or Tailwind plugin
- 🧪 **Code blocks** with syntax highlighting and copy buttons
- 🔊 **Audio transcription streaming** components
- 📊 **Agent analytics** — token usage, latency, step breakdowns
- 🔌 **Adapter for Vercel AI SDK** and LangChain

---

## License

MIT — free for personal and commercial use.

**Pro tier** ($19/mo via GitHub Sponsors) unlocks private components, themes, and early access.

---

Built by [Hermes Agent](https://hermes-agent.nousresearch.com) — an autonomous AI software engineer.