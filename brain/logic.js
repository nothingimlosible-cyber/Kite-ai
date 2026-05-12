/**
 * Kite AI - Advanced Brain System v2.0
 * Status: Heavy Coding & Reasoning Logic Enabled
 */

document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // --- KNOWLEDGE BASE (Otak Tambahan) ---
    const KNOWLEDGE_BASE = {
        coding: {
            html: "HTML itu tulang punggung web. Gunakan tag semantik kayak <main>, <article>, dan <section> biar SEO-nya gacor!",
            css: "Biar tampilan cakep, kuasai Flexbox dan Grid. Jangan lupa 'box-sizing: border-box;' biar layout nggak berantakan.",
            javascript: "JS itu nyawa web. Pahami Async/Await dan ES6+ Features. Contoh function: const kite = () => console.log('Kite AI Aktif!');",
            python: "Python itu rajanya data & automasi. Gunakan 'pip' buat manage library. Indentasi itu harga mati di sini!",
            php: "PHP masih hidup! Laravel bikin PHP jadi modern dan powerful buat backend skala besar.",
            sql: "Gunakan 'JOIN' buat gabungin tabel, dan jangan lupa index biar query nggak lemot kayak siput."
        },
        logic: {
            algorithm: "Langkah pertama: Pahami masalah. Kedua: Pecahkan jadi sub-masalah kecil. Ketiga: Tulis pseudocode baru koding.",
            debugging: "Cek console/log dulu! Biasanya cuma kurang titik koma atau typo variabel doang, Kak."
        },
        curhat: {
            pusing: "Kalau pusing koding, mending kopi dulu Kak. Kadang solusi muncul pas kita nggak di depan monitor.",
            semangat: "Gas terus Kak! Error itu guru paling galak tapi paling pinter. Jangan nyerah!"
        }
    };

    // --- THINKING ENGINE ---
    async function getSmartResponse(input) {
        const text = input.toLowerCase();
        
        // Simulasi mikir berdasarkan panjang pertanyaan
        const thinkingTime = Math.min(2000, Math.max(500, text.length * 10));
        await new Promise(r => setTimeout(r, thinkingTime));

        // Logic Jawaban
        if (text.includes("buatkan") || text.includes("koding") || text.includes("script")) {
            if (text.includes("html")) return `Ini struktur HTML5 mantap buat Kakak:\n\n\`\`\`html\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Kite AI Project</title>\n</head>\n<body>\n  <h1>Siap Beraksi!</h1>\n</body>\n</html>\n\`\`\``;
            if (text.includes("js") || text.includes("javascript")) return `Ini logic JS-nya Kak:\n\n\`\`\`javascript\nconst helloKite = () => {\n  console.log("Kite AI siap bantu koding!");\n};\nhelloKite();\n\`\`\``;
            return "Kakak mau script bahasa apa? Sebutin aja, nanti saya bantai kodingannya!";
        }

        if (text.includes("belajar")) {
            for (let key in KNOWLEDGE_BASE.coding) {
                if (text.includes(key)) return KNOWLEDGE_BASE.coding[key];
            }
            return "Mau belajar apa Kak? Saya punya data HTML, CSS, JS, Python, sampe SQL.";
        }

        if (text.includes("error") || text.includes("bug")) {
            return "Coba kirim kode errornya ke sini Kak, biar saya diagnosa penyakitnya.";
        }

        if (text.includes("siapa") || text.includes("kite")) {
            return "Saya Kite AI, asisten koding elit Kakak. Saya didesain buat bikin hidup developer lebih gampang.";
        }

        // Default response jika tidak ada keyword cocok
        return "Pertanyaan menarik, Kak. Secara logika, kita bisa mulai dari fundamentalnya dulu. Ada bagian spesifik yang mau dibahas atau mau langsung saya buatin script-nya?";
    }

    // --- UI INTERACTION ---
    function appendMessage(role, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `flex items-start gap-4 ${role === 'user' ? 'flex-row-reverse' : ''} fade-in`;
        
        const avatar = role === 'user' ? 
            `<div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded flex items-center justify-center text-white font-bold shadow-lg">ME</div>` :
            `<div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded flex items-center justify-center text-white font-bold shadow-lg">K</div>`;

        const contentClass = role === 'user' ? 
            'bg-blue-900/40 border border-blue-700/50' : 
            'bg-[#1c2128] border border-gray-700 shadow-xl';

        msgDiv.innerHTML = `
            ${avatar}
            <div class="${contentClass} p-4 rounded-2xl max-w-[85%] transition-all">
                <div class="text-sm leading-relaxed">${formatResponse(text)}</div>
            </div>
        `;
        
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function formatResponse(text) {
        // Handle Code Blocks
        text = text.replace(/```(.*?)\n([\s\S]*?)```/g, (match, lang, code) => {
            return `<div class="mt-2 rounded-lg overflow-hidden border border-gray-700">
                        <div class="bg-gray-800 px-3 py-1 text-[10px] text-gray-400 uppercase font-bold">${lang || 'code'}</div>
                        <pre class="bg-black p-4 text-green-400 font-mono text-xs overflow-x-auto"><code>${code.trim()}</code></pre>
                    </div>`;
        });
        // Handle Bold
        return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400 font-semibold">$1</strong>')
                   .replace(/\n/g, '<br>');
    }

    async function handleSend() {
        const text = userInput.value.trim();
        if (!text) return;

        appendMessage('user', text);
        userInput.value = '';

        // Tampilkan Typing Indicator
        const typing = document.createElement('div');
        typing.className = 'flex items-center gap-2 text-xs text-gray-500 italic ml-12 animate-pulse';
        typing.innerHTML = `<i class="fas fa-microchip"></i> Kite AI sedang berpikir...`;
        typing.id = 'typing-indicator';
        chatBox.appendChild(typing);
        chatBox.scrollTop = chatBox.scrollHeight;

        const response = await getSmartResponse(text);
        
        document.getElementById('typing-indicator').remove();
        appendMessage('ai', response);
    }

    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });
});
