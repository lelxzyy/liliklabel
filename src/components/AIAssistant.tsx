import { FormEvent, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bot,
  Loader2,
  MessageCircle,
  Minus,
  Send,
  Sparkles,
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

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="fixed bottom-5 right-4 z-50 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="mb-4 flex h-[min(620px,calc(100vh-110px))] w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20 sm:w-[390px]"
          >
            <div className="flex items-center justify-between bg-slate-950 px-4 py-3 text-white">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600">
                  <Bot className="h-5 w-5" />
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
        onClick={() => setIsOpen((current) => !current)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/30 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
        aria-label={isOpen ? "Tutup AI assistant" : "Buka AI assistant"}
        title={isOpen ? "Tutup chat" : "Buka chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </button>
    </div>
  );
}
