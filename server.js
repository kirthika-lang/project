const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// POST route for doubt solving
app.post("/api/ask", async (req, res) => {
    try {
        const { question } = req.body;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful academic tutor. Explain answers clearly and step-by-step."
                },
                {
                    role: "user",
                    content: question
                }
            ]
        });

        res.json({
            answer: completion.choices[0].message.content
        });

    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});