// Instagram Feed Simple - ShadowGlass
// Sistema simplificado para mostrar fotos de Instagram

document.addEventListener('DOMContentLoaded', function() {
    // Configuración de posts de Instagram
    const instagramPosts = [
        {
            image: 'assets/instagram/recent-1.jpg',
            caption: 'Tintado premium realizado esta semana. Resultado impecable 💯',
            date: 'Hace 2 días',
            link: 'https://www.instagram.com/tintadodelunaszgz/'
        },
        {
            image: 'assets/instagram/recent-2.jpg',
            caption: 'Otro cliente satisfecho con nuestro trabajo profesional ✨',
            date: 'Hace 4 días',
            link: 'https://www.instagram.com/tintadodelunaszgz/'
        },
        {
            image: 'assets/instagram/recent-3.jpg',
            caption: 'Resultado perfecto en este proyecto de tintado 🚗',
            date: 'Hace 1 semana',
            link: 'https://www.instagram.com/tintadodelunaszgz/'
        }
    ];

    // Función para actualizar el feed
    function updateInstagramFeed() {
        const feedContainer = document.getElementById('instafeed');
        if (!feedContainer) return;

        feedContainer.innerHTML = '';

        instagramPosts.forEach(post => {
            const item = document.createElement('div');
            item.className = 'instagram-item';
            
            item.innerHTML = `
                <img src="${post.image}" alt="Trabajo reciente en Instagram" loading="lazy">
                <div class="instagram-overlay">
                    <div class="instagram-info">
                        <p>${post.caption}</p>
                        <span class="instagram-date">${post.date}</span>
                    </div>
                    <a href="${post.link}" target="_blank" class="instagram-link-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </svg>
                    </a>
                </div>
            `;
            
            feedContainer.appendChild(item);
        });
    }

    // Inicializar el feed
    updateInstagramFeed();

    // Función para añadir nueva foto (para uso futuro)
    window.addInstagramPost = function(image, caption, date) {
        // Remover la más antigua si hay más de 3
        if (instagramPosts.length >= 3) {
            instagramPosts.pop();
        }
        
        // Añadir la nueva al principio
        instagramPosts.unshift({
            image: image,
            caption: caption,
            date: date,
            link: 'https://www.instagram.com/tintadodelunaszgz/'
        });
        
        // Actualizar el display
        updateInstagramFeed();
    };
});

// Función para actualizar automáticamente cada día (simulado)
// En producción, esto se haría con un script de servidor
function simulateAutoUpdate() {
    // Esta función simula la actualización diaria
    console.log('Sistema de Instagram feed activo - Actualización manual disponible');
}
