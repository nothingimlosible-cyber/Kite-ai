/**
 * KITE-AI ELITE MINER (FIXED ENDPOINT)
 * Alamat tujuan sudah disesuaikan dengan Agent Kite AI asli.
 */

const axios = require('axios');

const KITE_TOKEN = process.env.KITE_TOKEN;

// Alamat tujuan (Endpoint Agent) yang valid untuk nambang poin
const AGENT_URLS = [
    'https://deployment-u73tauojcnmda78tf.kite.ai/chat', // Prof. Sherlock
    'https://deployment-70678229837.kite.ai/chat',      // Kite Agent 2
    'https://deployment-51928374650.kite.ai/chat'       // Kite Agent 3
];

const QUESTIONS = [
    "What is the current state of decentralized AI?",
    "How does Kite AI optimize neural network inference?",
    "Explain the proof of AI interaction mechanism.",
    "Generate a summary of the latest blockchain AI trends."
];

async function mine() {
    if (!KITE_TOKEN) {
        console.error("❌ TOKEN KOSONG! Masukin token di GitHub Secrets: KITE_TOKEN");
        process.exit(1);
    }

    console.log("🚀 KITE-AI MINING SESSION STARTING...");
    
    for (const url of AGENT_URLS) {
        const randomQuestion = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
        
        try {
            console.log(`[TARGET] Alamat: ${url}`);
            console.log(`[PROMPT] Menanyakan: "${randomQuestion}"`);

            const response = await axios.post(url, {
                message: randomQuestion,
                stream: false
            }, {
                headers: {
                    'Authorization': `Bearer ${KITE_TOKEN}`,
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });

            if (response.status === 200) {
                console.log(`✅ SUCCESS: Poin berhasil ditambang dari agent ini.`);
                console.log(`💬 Response: ${JSON.stringify(response.data).substring(0, 60)}...`);
            }
        } catch (error) {
            console.error(`⚠️ FAILED: Alamat tujuan lagi sibuk atau token salah. | Status: ${error.response ? error.response.status : 'ERR'}`);
        }

        // Delay 10 detik biar gak dianggap spamming parah
        await new Promise(r => setTimeout(r, 10000));
    }
    
    console.log("🏁 MINING COMPLETED.");
}

mine();
