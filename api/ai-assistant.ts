type VercelRequest = {
  method?: string;
  body?: {
    messages?: Partial<ChatMessage>[];
  };
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string | string[]) => void;
  end: () => void;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const systemPrompt = `Anda adalah asisten AI resmi untuk website Lilik Label.
Jawab dalam bahasa Indonesia yang ramah, singkat, dan praktis.
Fokus membantu pengunjung bertanya tentang label pakaian, label woven, label printing, label komputer, tag gantung, desain label, bahan, ukuran, proses order, estimasi produksi, dan informasi yang ada di website.
Jika pengunjung bertanya tentang lokasi, alamat, maps, toko, tempat produksi, atau cara datang, jawab: "Lokasi berada di maps Lilik Label: Jl. Raya Caturharjo, Malangrejo, Caturharjo, Kec. Sleman, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55515."
Jika pengunjung ingin harga final, desain spesifik, atau order, arahkan untuk konsultasi melalui WhatsApp Lilik Label.
Jangan mengarang promo, stok, atau kebijakan yang tidak tersedia di website.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method tidak didukung." });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      message: "GROQ_API_KEY belum dikonfigurasi di Vercel.",
    });
  }

  const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const safeMessages: ChatMessage[] = messages
    .filter((message): message is ChatMessage => {
      return (
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim().length > 0
      );
    })
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 1200),
    }));

  if (safeMessages.length === 0) {
    return res.status(400).json({ message: "Pesan tidak boleh kosong." });
  }

  try {
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
          temperature: 0.4,
          max_tokens: 500,
          messages: [{ role: "system", content: systemPrompt }, ...safeMessages],
        }),
      },
    );

    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      return res.status(groqResponse.status).json({
        message: data?.error?.message || "Groq gagal memproses pesan.",
      });
    }

    return res.json({
      message:
        data?.choices?.[0]?.message?.content ||
        "Maaf, saya belum bisa menjawab pertanyaan itu.",
    });
  } catch (error) {
    console.error("Groq assistant error:", error);
    return res.status(500).json({
      message: "Terjadi kendala saat menghubungi AI assistant.",
    });
  }
}
