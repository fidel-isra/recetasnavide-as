// Inicializar AOS
AOS.init({
    duration: 1000,
    once: true
});

// --- Lógica para el Chatbot ---
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.add('active');
});

chatbotClose.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
});

// Base de conocimiento del chatbot con respuestas cortas y concisas
const knowledgeBase = {
    "beneficios": {
        "title": "Beneficios",
        "content": "Gana dinero desde casa con tu propio negocio de repostería navideña. Aprende fácilmente con recetas paso a paso. Ofrece variedad de productos desde galletas hasta pasteles únicos. Disfruta de flexibilidad de horario trabajando a tu ritmo. Accede a recetas exclusivas y obtén acceso de por vida."
    },
    "recetas": {
        "title": "Recetas",
        "content": "Ofrecemos 500 recetas navideñas en 5 categorías: Galletas (Galletas de Jengibre), Pasteles (Pastel de Frutas), Chocolate (Trufas), Panes (Panettone) y Bebidas (Chocolate Caliente). Cada receta incluye tiempo de preparación y nivel de dificultad."
    },
    "testimonios": {
        "title": "Testimonios",
        "content": "María González recuperó su inversión en 2 meses. Laura Martínez destaca que sus clientes siempre vuelven por más. Ana Silva obtuvo consejos valiosos sobre precios y venta de productos."
    },
    "oferta": {
        "title": "Oferta Especial",
        "content": "¡75% de descuento! De $49 a solo $19 por tiempo limitado. Incluye 4 bonos gratuitos valorados en más de $80: Actividades para Niños, Recetas Adicionales, Guía de Eventos y Acceso al Grupo Exclusivo."
    },
    "garantía": {
        "title": "Garantía",
        "content": "Garantía de devolución del dinero durante los primeros 7 días sin preguntas. Contamos con soporte dedicado y atención al cliente para resolver cualquier duda."
    },
    "e-book": {
        "title": "E-Book Gratuito",
        "content": "Descarga un e-book gratuito con 5 recetas navideñas exclusivas. Acceso inmediato en formato PDF fácil de usar. Es 100% gratis y una excelente muestra de la calidad de nuestro recetario completo."
    },
    "comprar": {
        "title": "Cómo Comprar",
        "content": "Haz clic en el botón 'COMPRAR AHORA' en cualquier parte de la página. Serás redirigido a una plataforma de pago segura donde podrás completar tu compra. Aceptamos múltiples métodos de pago."
    },
    "precio": {
        "title": "Precio",
        "content": "Precio regular: $49. Oferta especial: Solo $19 (75% de descuento). Incluye acceso de por vida a las 500 recetas y los 4 bonos exclusivos."
    },
    "acceso": {
        "title": "Acceso",
        "content": "Después de comprar, recibirás instrucciones por correo electrónico. El producto es digital, sin envíos. Tendrás acceso de por vida a todas las recetas y actualizaciones futuras."
    },
    "default": {
        "title": "Información General",
        "content": "500 Recetas Navideñas te ayudará a transformar tu pasión en un negocio rentable. Puedes preguntarme sobre beneficios, recetas, testimonios, oferta, garantía o nuestro e-book gratuito."
    }
};

// Función para procesar el mensaje del usuario
const processMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    // Buscar palabras clave en el mensaje
    if (lowerMessage.includes("beneficio") || lowerMessage.includes("ventaja")) {
        return knowledgeBase.beneficios;
    } else if (lowerMessage.includes("receta") || lowerMessage.includes("postre") || lowerMessage.includes("comida")) {
        return knowledgeBase.recetas;
    } else if (lowerMessage.includes("testimonio") || lowerMessage.includes("opinión") || lowerMessage.includes("experiencia")) {
        return knowledgeBase.testimonios;
    } else if (lowerMessage.includes("oferta") || lowerMessage.includes("descuento") || lowerMessage.includes("precio")) {
        return knowledgeBase.oferta;
    } else if (lowerMessage.includes("garantía") || lowerMessage.includes("devolución") || lowerMessage.includes("reembolso")) {
        return knowledgeBase.garantía;
    } else if (lowerMessage.includes("e-book") || lowerMessage.includes("libro") || lowerMessage.includes("gratis")) {
        return knowledgeBase.ebook;
    } else if (lowerMessage.includes("comprar") || lowerMessage.includes("adquirir") || lowerMessage.includes("pagar")) {
        return knowledgeBase.comprar;
    } else if (lowerMessage.includes("acceso") || lowerMessage.includes("entrar") || lowerMessage.includes("ingresar")) {
        return knowledgeBase.acceso;
    } else {
        return knowledgeBase.default;
    }
};

const sendMessage = () => {
    const messageText = chatbotInput.value.trim();
    if (messageText === '') return;

    // Añadir mensaje del usuario
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.textContent = messageText;
    chatbotMessages.appendChild(userMessage);

    // Limpiar input
    chatbotInput.value = '';

    // Procesar la respuesta del bot
    const response = processMessage(messageText);

    // Simular respuesta del bot
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot-message');
        botMessage.innerHTML = `<strong>${response.title}:</strong><br>${response.content}`;
        chatbotMessages.appendChild(botMessage);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Hacer scroll hacia abajo
    }, 1000);

    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Hacer scroll hacia abajo
};

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// --- Lógica para las Pestañas de Recetas ---
const recipeTabs = document.querySelectorAll('.recipe-tab');
const recipeContents = document.querySelectorAll('.recipe-content');

recipeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetCategory = tab.getAttribute('data-category');
        // Desactivar todas las pestañas y contenidos
        recipeTabs.forEach(t => t.classList.remove('active'));
        recipeContents.forEach(c => c.classList.remove('active'));
        // Activar la pestaña y el contenido correspondientes
        tab.classList.add('active');
        document.getElementById(targetCategory).classList.add('active');
    });
});

// --- Lógica para las Preguntas Frecuentes (FAQ) ---
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Cerrar todos los items
        faqItems.forEach(i => i.classList.remove('active'));
        // Abrir el item clickeado si no estaba activo
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// --- Lógica para la Notificación de Descarga ---
const downloadEbookBtn = document.getElementById('download-ebook');
const downloadFreeEbookBtn = document.getElementById('download-free-ebook');
const notification = document.getElementById('notification');
const notificationClose = document.getElementById('notification-close');
const notificationProgressBar = document.getElementById('notification-progress-bar');

const showNotification = () => {
    notification.classList.add('show');
    // Reiniciar y animar la barra de progreso
    notificationProgressBar.style.transition = 'none';
    notificationProgressBar.style.width = '0%';
    setTimeout(() => {
        notificationProgressBar.style.transition = 'width 5s linear';
        notificationProgressBar.style.width = '100%';
    }, 100);
    // Ocultar notificación después de un tiempo
    setTimeout(() => {
        notification.classList.remove('show');
    }, 6000);
};

if (downloadEbookBtn) {
    downloadEbookBtn.addEventListener('click', (e) => {
        // No prevenimos el comportamiento por defecto para permitir la descarga
        showNotification();
    });
}

if (downloadFreeEbookBtn) {
    downloadFreeEbookBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Desplazar a la sección de ebook
        document.getElementById('ebook').scrollIntoView({ behavior: 'smooth' });
    });
}

if (notificationClose) {
    notificationClose.addEventListener('click', () => {
        notification.classList.remove('show');
    });
}

// --- Lógica para la Cuenta Regresiva ---
// Función para establecer una fecha de finalización
const setCountdown = (endTime) => {
    const now = new Date().getTime();
    let distance = endTime - now;
    if (distance < 0) {
        distance = 0; // Evitar números negativos
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
};

// Función para actualizar el DOM
const updateCountdown = (ids, endTime) => {
    const { days, hours, minutes, seconds } = setCountdown(endTime);
    document.getElementById(ids.days).innerText = String(days).padStart(2, '0');
    document.getElementById(ids.hours).innerText = String(hours).padStart(2, '0');
    document.getElementById(ids.minutes).innerText = String(minutes).padStart(2, '0');
    document.getElementById(ids.seconds).innerText = String(seconds).padStart(2, '0');
};

// Establecer fecha de finalización (ej: 3 días desde ahora)
const countdownEndDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);

// Actualizar cada segundo
setInterval(() => {
    updateCountdown({ days: 'days1', hours: 'hours1', minutes: 'minutes1', seconds: 'seconds1' }, countdownEndDate);
    updateCountdown({ days: 'days2', hours: 'hours2', minutes: 'minutes2', seconds: 'seconds2' }, countdownEndDate);
    updateCountdown({ days: 'days3', hours: 'hours3', minutes: 'minutes3', seconds: 'seconds3' }, countdownEndDate);
}, 1000);

// --- Lógica para el Navbar al hacer scroll ---
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Lógica para el menú móvil ---
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Cerrar el menú al hacer clic en un enlace
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// --- Efecto Canvas (Nieve y Árbol) ---
// NOTA: Estos efectos son complejos y requieren JavaScript avanzado.
// Se proporciona un placeholder para la lógica.
const snowCanvas = document.getElementById('snow-canvas');
const snowCtx = snowCanvas.getContext('2d');
const treeCanvas = document.getElementById('tree-canvas');
const treeCtx = treeCanvas.getContext('2d');

function resizeCanvas() {
    snowCanvas.width = window.innerWidth;
    snowCanvas.height = window.innerHeight;
    treeCanvas.width = window.innerWidth;
    treeCanvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Placeholder para la animación de nieve
const snowflakes = [];
const maxSnowflakes = 100;

for (let i = 0; i < maxSnowflakes; i++) {
    snowflakes.push({
        x: Math.random() * snowCanvas.width,
        y: Math.random() * snowCanvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        wind: Math.random() * 0.5 - 0.25
    });
}

function drawSnowflakes() {
    snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
    snowCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    snowCtx.beginPath();
    for (let i = 0; i < maxSnowflakes; i++) {
        const flake = snowflakes[i];
        snowCtx.moveTo(flake.x, flake.y);
        snowCtx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    }
    snowCtx.fill();
    updateSnowflakes();
}

function updateSnowflakes() {
    for (let i = 0; i < maxSnowflakes; i++) {
        const flake = snowflakes[i];
        flake.y += flake.speed;
        flake.x += flake.wind;
        if (flake.y > snowCanvas.height) {
            flake.y = -flake.radius;
            flake.x = Math.random() * snowCanvas.width;
        }
        if (flake.x > snowCanvas.width) {
            flake.x = 0;
        } else if (flake.x < 0) {
            flake.x = snowCanvas.width;
        }
    }
}

// Placeholder para el árbol 3D
function draw3DTree() {
    treeCtx.clearRect(0, 0, treeCanvas.width, treeCanvas.height);
    // Lógica compleja de Three.js o WebGL iría aquí
    // Por ahora, dibujamos una forma simple como placeholder
    treeCtx.fillStyle = 'rgba(0, 100, 0, 0.1)';
    treeCtx.beginPath();
    treeCtx.moveTo(treeCanvas.width / 2, treeCanvas.height * 0.2);
    treeCtx.lineTo(treeCanvas.width * 0.3, treeCanvas.height * 0.8);
    treeCtx.lineTo(treeCanvas.width * 0.7, treeCanvas.height * 0.8);
    treeCtx.closePath();
    treeCtx.fill();
}

function animateCanvas() {
    drawSnowflakes();
    draw3DTree();
    requestAnimationFrame(animateCanvas);
}

animateCanvas();