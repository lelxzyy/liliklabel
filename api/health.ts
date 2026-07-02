type VercelRequest = {
  method?: string;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string | string[]) => void;
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method tidak didukung." });
  }

  return res.json({
    ok: true,
    aiConfigured: Boolean(process.env.GROQ_API_KEY),
    platform: "vercel",
  });
}
