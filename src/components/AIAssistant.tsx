import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { FormEvent, KeyboardEvent, PointerEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Headset,
  Loader2,
  MessageCircle,
  Minus,
  Send,
  X,
} from "lucide-react";
import { CONFIG } from "../config/config";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const starterQuestions = [
  "Apa bedanya label woven dan printing?",
  "Label apa yang cocok untuk brand baju baru?",
  "Bisa bantu rekomendasi ukuran label?",
];

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Halo, saya asisten Lilik Label. Silakan tanya tentang label baju, woven, printing, komputer, tag gantung, desain, atau proses order.",
  },
];

const assistantUnavailableMessage =
  "Maaf, AI assistant belum aktif di server. Silakan hubungi WhatsApp Lilik Label untuk konsultasi cepat.";

const floatingButtonSize = 56;
const viewportMargin = 16;
const dragThreshold = 6;

type FloatingPosition = {
  x: number;
  y: number;
};

type ViewportSize = {
  width: number;
  height: number;
};

type DragState = {
  pointerId: number;
  startPointerX: number;
  startPointerY: number;
  startPosition: FloatingPosition;
  hasDragged: boolean;
};

const getViewportSize = (): ViewportSize => {
  if (typeof window === "undefined") {
    return { width: 1024, height: 768 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

const getDefaultPosition = (): FloatingPosition => {
  const viewport = getViewportSize();

  return {
    x: viewport.width - floatingButtonSize - viewportMargin,
    y: viewport.height - floatingButtonSize - 24,
  };
};

const clampPosition = (
  position: FloatingPosition,
  viewport = getViewportSize(),
): FloatingPosition => {
  return {
    x: Math.min(
      Math.max(position.x, viewportMargin),
      viewport.width - floatingButtonSize - viewportMargin,
    ),
    y: Math.min(
      Math.max(position.y, viewportMargin),
      viewport.height - floatingButtonSize - viewportMargin,
    ),
  };
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [viewport, setViewport] = useState<ViewportSize>(() => getViewportSize());
  const [position, setPosition] = useState<FloatingPosition>(() =>
    getDefaultPosition(),
  );
  const panelRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<DragState | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const nextViewport = getViewportSize();
      setViewport(nextViewport);
      setPosition((currentPosition) =>
        clampPosition(currentPosition, nextViewport),
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const whatsappLink = useMemo(() => {
    const baseWa = CONFIG.whatsapp.split("?")[0];
    return `${baseWa}?text=${encodeURIComponent(
      "Halo Lilik Label, saya ingin konsultasi label pakaian custom.",
    )}`;
  }, []);

  const askAssistant = async (question: string) => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedQuestion,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    requestAnimationFrame(() => {
      panelRef.current?.scrollTo({
        top: panelRef.current.scrollHeight,
        behavior: "smooth",
      });
    });

    try {
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : null;

      if (!response.ok) {
        throw new Error(data?.message || assistantUnavailableMessage);
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data?.message || assistantUnavailableMessage,
        },
      ]);
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Maaf, koneksi ke AI assistant sedang bermasalah.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        panelRef.current?.scrollTo({
          top: panelRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 80);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void askAssistant(input);
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStateRef.current = {
      pointerId: event.pointerId,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startPosition: position,
      hasDragged: false,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragState.startPointerX;
    const deltaY = event.clientY - dragState.startPointerY;

    if (
      !dragState.hasDragged &&
      Math.hypot(deltaX, deltaY) < dragThreshold
    ) {
      return;
    }

    dragState.hasDragged = true;
    setPosition(
      clampPosition(
        {
          x: dragState.startPosition.x + deltaX,
          y: dragState.startPosition.y + deltaY,
        },
        viewport,
      ),
    );
  };

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    dragStateRef.current = null;

    if (dragState.hasDragged) {
      return;
    }

    setIsOpen((current) => !current);
  };

  const handleKeyboardToggle = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((current) => !current);
    }
  };

  const spaceAbove = Math.max(position.y - viewportMargin, 0);
  const spaceBelow = Math.max(
    viewport.height - position.y - floatingButtonSize - viewportMargin,
    0,
  );
  const opensAbove = spaceAbove > spaceBelow;
  const panelHeight = Math.max(
    260,
    Math.min(620, (opensAbove ? spaceAbove : spaceBelow) - viewportMargin),
  );
  const panelVerticalClass = opensAbove ? "bottom-full mb-4" : "top-full mt-4";
  const panelHorizontalClass =
    position.x > viewport.width / 2 ? "right-0" : "left-0";

  return (
    <div
      className="fixed z-50"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className={`absolute ${panelVerticalClass} ${panelHorizontalClass} flex w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20 sm:w-[390px]`}
            style={{ height: `${panelHeight}px` }}
          >
            <div className="flex items-center justify-between bg-slate-950 px-4 py-3 text-white">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600">
                  <Headset className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold">
                    AI Asisten Lilik Label
                  </p>
                  <p className="truncate text-xs font-semibold text-slate-300">
                    Label baju, woven, komputer
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white"
                  aria-label="Minimalkan chat"
                  title="Minimalkan"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMessages(initialMessages);
                    setInput("");
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white"
                  aria-label="Reset chat"
                  title="Reset"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              ref={panelRef}
              className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm font-semibold leading-relaxed ${
                      message.role === "user"
                        ? "rounded-br-md bg-blue-600 text-white"
                        : "rounded-bl-md border border-slate-200 bg-white text-slate-700 shadow-sm"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-500 shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                    Mengetik
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 bg-white p-3">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {starterQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => void askAssistant(question)}
                    disabled={isLoading}
                    className="shrink-0 rounded-full border border-slate-200 px-3 py-2 text-xs font-extrabold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {question}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex items-end gap-2">
                <label htmlFor="ai-assistant-message" className="sr-only">
                  Tulis pertanyaan
                </label>
                <textarea
                  id="ai-assistant-message"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Tanya kebutuhan label Anda..."
                  rows={1}
                  className="max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading || input.trim().length === 0}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                  aria-label="Kirim pertanyaan"
                  title="Kirim"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-2.5 text-sm font-extrabold text-white transition hover:bg-emerald-700"
              >
                <MessageCircle className="h-4 w-4" />
                Konsultasi via WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragStateRef.current = null;
        }}
        onKeyDown={handleKeyboardToggle}
        className="flex h-14 w-14 touch-none select-none items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/30 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
        aria-label={isOpen ? "Tutup AI assistant" : "Buka AI assistant"}
        title={isOpen ? "Tutup chat" : "Buka chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Headset className="h-6 w-6" />}
      </button>
    </div>
  );
}
