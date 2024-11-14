let messages = [];
let messageId = 0;

// Show login page on load
document.getElementById('login').style.display = 'block';

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-message');
    errorMsg.textContent = '';

    if (username === 'admin' && password === 'admin') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('admin').style.display = 'block';
        document.getElementById('logoutButton').style.display = 'block';
        loadMessages('admin');
    } else {
        errorMsg.textContent = 'Invalid credentials. Please try again.';
    }
}

function enterUserPanel() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('user').style.display = 'flex';
    document.getElementById('logoutButton').style.display = 'block';
    loadMessages('user');
}

function logout() {
    document.getElementById('login').style.display = 'block';
    document.getElementById('admin').style.display = 'none';
    document.getElementById('user').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function sendUserMessage() {
    const message = document.getElementById('userMessage').value;
    if (message) {
        const timestamp = new Date().toLocaleTimeString();
        messages.push({ id: messageId++, text: message, timestamp, type: 'user', readByAdmin: false });
        document.getElementById('userMessage').value = '';
        loadMessages('user');
        loadMessages('admin'); // Load messages for admin as well
    }
}

function sendAdminMessage() {
    const message = document.getElementById('adminMessage').value;
    if (message) {
        const timestamp = new Date().toLocaleTimeString();
        messages.push({ id: messageId++, text: message, timestamp, type: 'admin', readByUser: false });
        document.getElementById('adminMessage').value = '';
        loadMessages('admin');
        loadMessages('user'); // Load messages for user as well
    }
}

function loadMessages(panel) {
    const chatboxUser = document.getElementById('chatboxUser');
    const chatboxAdmin = document.getElementById('chatbox');

    if (panel === 'user') {
        chatboxUser.innerHTML = messages
            .filter(msg => msg.type === 'user')
            .map(msg => {
                const readStatus = msg.readByAdmin ? `<span class="read-status"><i class="fas fa-check-double"></i></span>` : '';
                return `<div class="message user-message">
                            ${msg.text}
                            <div class="timestamp">${msg.timestamp} ${readStatus}</div>
                         </div>`;
            }).join('');
    } else if (panel === 'admin') {
        chatboxAdmin.innerHTML = messages
            .filter(msg => msg.type === 'admin' || msg.type === 'user')
            .map(msg => {
                const readStatus = msg.type === 'user' && msg.readByAdmin ? `<span class="read-status"><i class="fas fa-check-double"></i></span>` : '';
                return `<div class="message ${msg.type}-message" onclick="markAsRead(${msg.id})">
                            ${msg.text}
                            <div class="timestamp">${msg.timestamp} ${readStatus}</div>
                         </div>`;
            }).join('');

        messages.forEach(msg => {
            if (msg.type === 'user' && !msg.readByAdmin) {
                msg.readByAdmin = true;
            }
        });
    }
}

function markAsRead(id) {
    const message = messages.find(msg => msg.id === id && msg.type === 'user');
    if (message && !message.readByUser) {
        message.readByUser = true;
        loadMessages('admin');
    }
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const showPasswordCheckbox = document.getElementById('showPassword');
    passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
}

function toggleChatbox() {
    const chatboxUser = document.getElementById('chatboxUser');
    chatboxUser.style.display = chatboxUser.style.display === 'none' ? 'block' : 'none';
}

function openMedicalBot() {
    alert('Medical Bot opened!');
}

function openAnalysis() {
    alert('Analysis opened!');
}

function openDatabase() {
    alert('Database opened!');
}

function openPredictions() {
    alert('Predictions opened!');
}

function openAlerts() {
    alert('Alerts opened!');
}

function toggleTheme() {
    const body = document.body;
    const themeLabel = document.getElementById('themeLabel');
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        themeLabel.textContent = 'Light Mode';
        localStorage.setItem('theme', 'light');
    } else {
        themeLabel.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'dark');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        document.getElementById('themeToggle').checked = true;
        document.getElementById('themeLabel').textContent = 'Light Mode';
    }
});

// Glow effect on header when mouse is near
const header = document.getElementById('header');
header.addEventListener('mouseenter', () => {
    header.style.textShadow = '0 0 20px rgba(0, 255, 0, 1), 0 0 30px rgba(0, 255, 0, 0.5)';
});
header.addEventListener('mouseleave', () => {
    header.style.textShadow = '0 0 10px rgba(0, 255, 0, 0.5)';
});

setInterval(() => {
    if (document.getElementById('admin').style.display === 'block') {
        loadMessages('admin');
    }
}, 1000);
