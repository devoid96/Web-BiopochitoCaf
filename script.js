// Captura de elementos de la interfaz
const modal = document.getElementById('modal-reproductor');
const btnCerrar = document.getElementById('btn-cerrar');
const modalImagen = document.getElementById('modal-imagen');
const modalVideo = document.getElementById('modal-video');
const modalTitulo = document.getElementById('modal-titulo');
const modalDescripcion = document.getElementById('modal-descripcion');

const iconosEquipo = {
    rector: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 3l2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.3-4.5 2.3.9-5L4.8 8.2l5-.7L12 3z"></path>
            <path d="M8.5 17.5h7V20h-7z"></path>
        </svg>
    `,
    edificio: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M4 20h16v2H4z"></path>
            <path d="M6 10h3v10H6zM10.5 10h3v10h-3zM15 10h3v10h-3z"></path>
            <path d="M5 6l7-3 7 3v2H5z"></path>
        </svg>
    `,
    docente: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z"></path>
            <path d="M4.5 20a7.5 7.5 0 0 1 15 0"></path>
            <path d="M18 9h4v1h-4zM18 11h4v1h-4z"></path>
        </svg>
    `,
    asesor: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 3a9 9 0 0 0-7.4 14.1L4 21l3.2-.9A9 9 0 1 0 12 3z"></path>
            <path d="M8.2 11.2h7.6"></path>
            <path d="M8.2 14h4.4"></path>
        </svg>
    `,
    estudiante: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 4l8 4-8 4-8-4 8-4z"></path>
            <path d="M6 11v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4"></path>
            <path d="M19 12v5"></path>
        </svg>
    `
};

const equipoData = [
    { nombre: 'Dr. Juan Carlos Urriago Fontal', cargo: 'Rector', tipo: 'rector' },
    { nombre: 'Mag. Iván Darío Aristizábal Henao', cargo: 'Decano Facultad de Ingeniería', tipo: 'edificio' },
    { nombre: 'Ing. José Gabriel Pérez Canencio', cargo: 'Docente - IGSCLAC', tipo: 'docente' },
    { nombre: 'Ing. Mary Luz Ojeda Solarte', cargo: 'Docente - IGSCLAC', tipo: 'docente' },
    { nombre: 'Ing. Jorge Iván Tobar Cardozo', cargo: 'Docente colaborador', tipo: 'colaborador' },
    { nombre: 'Ing. Alexandra Trujillo Zapata', cargo: 'Docente - IGSCLAC', tipo: 'docente' },
    { nombre: 'Dr. Jorge Enrique Guevara Bejarano', cargo: 'Docente - IGSCLAC', tipo: 'docente' },
    { nombre: 'Kelly Vanesa Ávila Pérez', cargo: 'Estudiante desarrollador - IGSCLAC', tipo: 'estudiante' },
    { nombre: 'Juan Fernando Ramírez Delgado', cargo: 'Estudiante desarrollador - IGSCLAC', tipo: 'estudiante' },
    { nombre: 'Juan David Salazar Riascos', cargo: 'Estudiante desarrollador - IGSCLAC', tipo: 'estudiante' },
    { nombre: 'Cristian Alfonso Hoyos Gomez', cargo: 'Estudiante desarrollador - IGSCLAC', tipo: 'estudiante' },
    { nombre: 'Daniela Gomez Rios', cargo: 'Estudiante desarrollador - IGSCLAC', tipo: 'estudiante' },
    { nombre: 'Miguel Ángel Pérez Ojeda', cargo: 'Community manager', tipo: 'colaborador' },
    { nombre: 'Jerónimo Taborda Quiñones', cargo: 'Colaborador', tipo: 'colaborador' },
];


const equipoGrid = document.getElementById('equipo-grid');

// Escuchar clics en los elementos de la lista, los botones circulares y los botones de carteles
document.querySelectorAll('.btn-item, .circulo-btn, .cartel-btn, .btn-Biopochito').forEach(botonLista => {
    botonLista.addEventListener('click', () => {
        // Extraer los datos guardados en el botón HTML
        const titulo = botonLista.getAttribute('data-titulo');
        const descripcion = botonLista.getAttribute('data-desc');
        const imagenPreview = botonLista.getAttribute('data-preview-img');
        const videoSrc = botonLista.getAttribute('data-video');
        const imagenBoton = botonLista.querySelector('img');
        const usaVistaLateral = botonLista.classList.contains('circulo-btn') || botonLista.classList.contains('cartel-btn');
        const usaPreviewFase = imagenPreview && imagenPreview.includes('Fases imagenes previ/');

        // Asignar los textos e incorporar la ruta del archivo .wav
        if (imagenBoton) {
            modalImagen.src = imagenPreview || imagenBoton.currentSrc || imagenBoton.src || imagenBoton.getAttribute('src');
            modalImagen.alt = imagenBoton.getAttribute('alt') || titulo;
        }
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.removeAttribute('src');
            modalVideo.load();
            modalVideo.classList.toggle('oculto', !videoSrc);
            modalImagen.parentElement.classList.toggle('oculto', Boolean(videoSrc));
            if (videoSrc) {
                modalVideo.src = videoSrc;
                modalVideo.setAttribute('aria-label', `Video de ${titulo || 'la fase'}`);
                modalVideo.load();
            }
        }
        modal.querySelector('.modal-contenido').classList.toggle('modal-contenido-circular', usaVistaLateral);
        modalImagen.classList.toggle('modal-imagen-preview-fase', usaPreviewFase);
        modalImagen.parentElement.classList.toggle('modal-imagen-marco-preview-fase', usaPreviewFase);
        modalTitulo.textContent = titulo;
        modalDescripcion.textContent = descripcion;
        // Mostrar la ventana flotante quitando la clase 'oculto'
        modal.classList.remove('oculto');
    });
});

// Botón "Recorre el camino del café" -> lleva a la sección del recorrido
const btnDescubrir = document.querySelector('.btn-descubrir');
const seccionRecorrido = document.querySelector('.seccion-fondo');

if (btnDescubrir && seccionRecorrido) {
    btnDescubrir.addEventListener('click', () => {
        seccionRecorrido.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// Cerrar la ventana emergente
if (btnCerrar && modal) {
    btnCerrar.addEventListener('click', resetearYcerrar);
    window.addEventListener('click', (e) => { if (e.target === modal) resetearYcerrar(); });
}

function resetearYcerrar() {
    if (!modal) {
        return;
    }

    if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
        modalVideo.removeAttribute('src');
        modalVideo.load();
        modalVideo.classList.add('oculto');
        modalImagen.parentElement.classList.remove('oculto');
    }
    modal.classList.add('oculto');
}

function obtenerIconoEquipo(tipo) {
    return iconosEquipo[tipo] || iconosEquipo.docente;
}

function renderizarEquipo() {
    if (!equipoGrid) {
        return;
    }

    equipoGrid.innerHTML = equipoData.map((miembro, index) => {
        const categoria = miembro.tipo === 'rector' || miembro.tipo === 'edificio' ? 'institucional' : miembro.tipo === 'asesor' ? 'asesor' : 'academico';

        return `
            <article class="equipo-card" itemscope itemtype="https://schema.org/Person">
                <div class="equipo-card-icon equipo-card-icon--${miembro.tipo}" aria-hidden="true">
                    ${obtenerIconoEquipo(miembro.tipo)}
                </div>
                <div class="equipo-card-body">
                    <h3 itemprop="name">${miembro.nombre}</h3>
                    <p class="equipo-card-role equipo-card-role--${categoria}" itemprop="jobTitle">${miembro.cargo}</p>
                </div>
            </article>
        `;
    }).join('');
}

// --- SPLASH: entrada suave, visible 5s, salida suave ---
document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash-overlay');
    if (!splash) return;
    const splashImage = splash.querySelector('.splash-image');
    const splashPortraitSrc = 'imagenes/Biopochito vista movil.jpg';
    const splashLandscapeSrc = 'imagenes/Logo inicial biopochito caf hd.jpg';

    if (splashImage) {
        const isPortrait = window.matchMedia('(orientation: portrait)').matches;
        const nextSrc = isPortrait ? splashPortraitSrc : splashLandscapeSrc;
        if (splashImage.getAttribute('src') !== nextSrc) {
            splashImage.setAttribute('src', nextSrc);
        }
    }

    const visibleMs = 5000;
    const mostrarSplash = () => {
        splash.classList.remove('splash-hidden');
        splash.classList.add('splash-visible', 'no-transition');

        requestAnimationFrame(() => {
            splash.classList.remove('no-transition');
        });

        setTimeout(() => {
            splash.classList.remove('splash-visible');
            splash.classList.add('splash-hidden');

            splash.addEventListener('transitionend', () => {
                if (splash.parentElement) splash.parentElement.removeChild(splash);
            }, { once: true });
        }, visibleMs);
    };

    if (!splashImage || splashImage.complete) {
        mostrarSplash();
    } else {
        splashImage.addEventListener('load', mostrarSplash, { once: true });
        splashImage.addEventListener('error', mostrarSplash, { once: true });
    }
});

document.addEventListener('DOMContentLoaded', renderizarEquipo);

// Desvanecer a Biopochito gradualmente al llegar a la última estación.
const btnBiopochito = document.querySelector('.btn-Biopochito');
const ultimaEstacion = document.querySelector('.circulo-btn-16');

function actualizarVisibilidadBiopochito() {
    if (!btnBiopochito || !ultimaEstacion) {
        return;
    }

    const parteSuperiorEstacion = ultimaEstacion.getBoundingClientRect().top;
    const inicioDesvanecimiento = window.innerHeight * 0.92;
    const finalDesvanecimiento = window.innerHeight * 0.45;
    const progreso = Math.min(1, Math.max(0,
        (inicioDesvanecimiento - parteSuperiorEstacion) /
        (inicioDesvanecimiento - finalDesvanecimiento)
    ));

    btnBiopochito.style.opacity = String(1 - progreso);
    btnBiopochito.style.visibility = progreso >= 1 ? 'hidden' : 'visible';
    btnBiopochito.style.pointerEvents = progreso >= 1 ? 'none' : 'auto';
    btnBiopochito.style.transform = `translateY(-50%) translateX(${28 * progreso}px) scale(${1 - (0.06 * progreso)})`;
}

window.addEventListener('scroll', actualizarVisibilidadBiopochito, { passive: true });
window.addEventListener('resize', actualizarVisibilidadBiopochito);
actualizarVisibilidadBiopochito();

// --- Efecto de navbar transparente al hacer scroll ---
const navbar = document.querySelector('.navbar');
const scrollThreshold = 50; // píxeles antes de activar la transparencia

window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
        navbar.classList.add('navbar-transparent');
    } else {
        navbar.classList.remove('navbar-transparent');
    }
}, { passive: true });
