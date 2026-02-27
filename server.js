const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Vercel doesn't always use a 'public' folder the same way a local machine does.
// This line allows you to serve your HTML files if they are in the root or a public folder.
app.use(express.static("public"));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// POST route for doubt solving
app.post("/api/ask", async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ error: "Question is required" });
        }

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
        console.error("OpenAI Error:", error);
        res.status(500).json({ error: "Something went wrong with the AI service" });
    }
});

// IMPORTANT FOR VERCEL: 
// Use process.env.PORT because Vercel assigns a port dynamically.
const PORT = process.env.PORT || 5000;

// This allows the server to run locally
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

// IMPORTANT FOR VERCEL: 
// You must export the app for Vercel's serverless functions to work.
module.exports = app;
