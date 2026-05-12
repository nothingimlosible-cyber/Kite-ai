/**
 * Kite AI - Brain System
 * Biar Kite AI pinter koding dan asik diajak ngobrol.
 */

document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Fungsi nambahin chat ke UI
    function appendMessage(role, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `flex items-start gap-4 ${role === 'user' ? 'flex-row-reverse' : ''}`;
        
        const avatar = role === 'user' ? 
            `<div class="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white font-bold">ME</div>` :
            `<div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">K</div>`;

        const contentClass = role === 'user' ? 
            'bg-blue-900/30 border border-blue-800' : 
            'bg-[#161b22] border border-gray-800';

        msgDiv.innerHTML = `
            ${avatar}
            <div class="${contentClass} p-4 rounded-lg max-w-[80%]">
                <div class="text-sm whitespace-pre-wrap">${formatCode(text)}</div>
            </div>
        `;
        
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Fungsi biar kodingan di chat kelihatan cakep
    function formatCode(text) {
        // Simple regex untuk deteksi code block markdown
        return text.replace(/```([\s\S]*?)```/g, '<pre class="bg-black p-3 rounded my-2 overflow-x-auto text-green-400 font-mono text-xs"><code>$1</code></pre>');
    }

    // Simulasi Otak AI (Bisa Kakak hubungkan ke API OpenAI/Kite di sini)
    async function processAI(input) {
        const loading = document.createElement('div');
        loading.className = 'text-xs text-gray-500 animate-pulse';
        loading.innerText = 'Kite AI sedang berpikir...';
        chatBox.appendChild(loading);

        // Simulasi delay biar kayak mikir beneran
        setTimeout(() => {
            loading.remove();
            let response = "";
            
            const lowInput = input.toLowerCase();
            if (lowInput.includes('koding') || lowInput.includes('buatkan') || lowInput.includes('script')) {
                response = "Siap Kak! Ini contoh kodingan yang Kakak minta:\n\n```javascript\n// Kite AI Code Generator\nfunction solveProblem() {\n  console.log('Kodingan Kakak sudah siap!');\n  return true;\n}\nsolveProblem();\n```\nAda lagi yang mau dibantu?";
            } else if (lowInput.includes('halo') || lowInput.includes('hi')) {
                response = "Halo juga Kak! Ada yang bisa saya bantai hari ini kodingannya?";
            } else {
                response = "Oke Kak, saya paham. Jadi begini penjelasannya... [Kite AI sedang mode diskusi aktif]. Mau saya buatkan scriptnya sekalian?";
            }
            
            appendMessage('ai', response);
        }, 1000);
    }

    function handleSend() {
        const text = userInput.value.trim();
        if (!text) return;

        appendMessage('user', text);
        userInput.value = '';
        processAI(text);
    }

    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });
});
