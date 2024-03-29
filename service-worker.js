const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    'Index.html',
    'Contact.html',
    'Barroco.html',
    'ArteContemporaneo.html',
    'AboutUs.html',
    'Renacimiento.html',
    'LoginAndRegister.php',
    'CSS/AboutusStyle.css',
    'CSS/ArteContemporaneo.css',
    'CSS/Barroco.css',
    'CSS/ContactStyle.css',
    'CSS/LoginAndRegisterStyle.css',
    'CSS/Renacimiento.css',
    'CSS/video-js.css',
    'CSS/style.css',
    'Images/anciana.jpg',
    'Images/Angeles.jpg',
    'Images/Art.mp4',
    'Images/Bodegones.jpg',
    'Images/Cristo.jpg',
    'Images/Danubio.jpg',
    'Images/ElGrito.jpg',
    'Images/Girasol.jpeg',
    'Images/Jardin.jpg',
    'Images/Johannes.jpg',
    'Images/leonardo1.jpg',
    'Images/michelangelo1.jpg',
    'Images/Mona.jpg',
    'Images/rafael1.jpg',
    'Images/VanGogh.jpg',
    'Images/Ventura.jpg',
    'Scripts/LoginAndRegisterScript.js',
    'Scripts/video.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
self.addEventListener('DOMContentLoaded', () => {
    const messageElement = document.getElementById('message');

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registrado con éxito:', registration);
            })
            .catch((error) => {
                console.error('Error al registrar el Service Worker:', error);
            });
    }

    // Actualizar el mensaje después de cargar el Service Worker
    if (navigator.serviceWorker.controller) {
        messageElement.textContent = 'Service Worker listo para cachear contenido.';
    } else {
        messageElement.textContent = 'La aplicación puede no funcionar correctamente sin conexión.';
    }
});

