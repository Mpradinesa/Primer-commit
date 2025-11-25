// ===== CONFIGURACIÓN =====
const productos = [
    {
        id: 1,
        nombre: "Cuaderno de Arte",
        precio: 14930,
        imagen: "assets/img/cuaderno-arte.png",
        descripcion: "Cuaderno premium para artistas",
        categoria: "Arte",
        destacado: true,
    },
    {
        id: 2,
        nombre: "Set Marcadores Acrilicos",
        precio: 25990,
        imagen: "assets/img/marcadores.png",
        descripcion: "Set de 24 colores acrilicos",
        categoria: "Arte",
        destacado: true,
    },
    {
        id: 3,
        nombre: "Pluma Fuente Elegante",
        precio: 11950,
        imagen: "assets/img/pluma-fuente.png",
        descripcion: "Pluma estilográfica con estuche de regalo",
        categoria: "Arte",
        destacado: false,
    },
    {
        id: 4,
        nombre: "Mochila para arte",
        precio: 28790,
        imagen: "assets/img/mochila.png",
        descripcion: "Mochila especiales para artistas, amplia capacidad.",
        categoria: "Accesorios",
        destacado: true,
    },
    {
        id: 5,
        nombre: "Calculadora cientifica",
        precio: 25990,
        imagen: "assets/img/calculadora.png",
        descripcion: "Calculadora cientifica con cable de carga de datos",
        categoria: "Accesorios",
        destacado: false,
    },
    {
        id: 7,
        nombre: "Cien Años de Soledad",
        precio: 15890,
        imagen: "assets/img/cien_anos_soledad.png",
        descripcion: "La épica historia de los Buendia",
        categoria: "Libros",
        destacado: false,
    },
    {
        id: 8,
        nombre: "El mundo de Sofia",
        precio: 28590,
        imagen: "assets/img/el_mundo_sofia.png",
        descripcion: "La edicion del clasico de siempre",
        categoria: "Libros",
        destacado: true,
    },
    {
        id: 9,
        nombre: "Guillotina Plástica Oficio",
        precio: 8590,
        imagen: "assets/img/guillotina.png",
        descripcion: "La edicion del clasico de siempre",
        categoria: "Oficina",
        destacado: true,
    },
];

let carrito = JSON.parse(localStorage.getItem("carritoLibreria")) || [];
let seccionActual = "inicio";

// ===== FUNCIONES DE NAVEGACIÓN =====
function mostrarSeccion(seccionId) {
    // Ocultar todas las secciones
    document.querySelectorAll("section[id]").forEach((seccion) => {
        seccion.classList.remove("seccion-activa");
        seccion.classList.add("seccion-oculta");
    });

    // Mostrar sección solicitada
    const seccion = document.getElementById(seccionId);
    if (seccion) {
        seccion.classList.remove("seccion-oculta");
        seccion.classList.add("seccion-activa");
        seccionActual = seccionId;
    }

    // Actualizar navegación y contenido
    actualizarNavegacionActiva(seccionId);
    ejecutarAccionesSeccion(seccionId);
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function actualizarNavegacionActiva(seccionActiva) {
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${seccionActiva}`
        );
    });
}

function ejecutarAccionesSeccion(seccionId) {
    const acciones = {
        productos: renderizarProductos,
        carrito: mostrarCarrito,
    };
    if (acciones[seccionId]) acciones[seccionId]();
}

// ===== FUNCIONES DE PRODUCTOS =====
function renderizarProductos() {
    const grid = document.getElementById("productos-grid");
    if (!grid) return;

    grid.innerHTML = productos
        .map(
            (producto) => `
        <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="card h-100 shadow-sm">
                <img src="${
                    producto.imagen
                }" class="card-img-top producto-img" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column">
                    <span class="badge bg-primary mb-2">${
                        producto.categoria
                    }</span>
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text text-muted small flex-grow-1">${
                        producto.descripcion
                    }</p>
                    <div class="mt-auto">
                        <p class="fw-bold text-primary fs-4 mb-3">$${producto.precio.toLocaleString()}</p>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary" onclick="agregarAlCarrito(${
                                producto.id
                            })">
                                <i class="bi bi-cart-plus"></i> Agregar
                            </button>
                            <button class="btn btn-outline-secondary" onclick="mostrarDetalleProducto(${
                                producto.id
                            })">
                                <i class="bi bi-eye"></i> Ver Detalle
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
        )
        .join("");
}

function mostrarDetalleProducto(productoId) {
    const producto = productos.find((p) => p.id === productoId);
    if (!producto) return;

    const detalle = document.getElementById("detalle-contenido");
    detalle.innerHTML = `
        <div class="col-md-6 mb-4">
            <img src="${producto.imagen}" alt="${
        producto.nombre
    }" class="img-fluid rounded-3 shadow">
        </div>
        <div class="col-md-6">
            <button class="btn btn-outline-secondary mb-4" onclick="mostrarSeccion('productos')">
                <i class="bi bi-arrow-left"></i> Volver a Productos
            </button>
            
            <span class="badge bg-primary mb-2">${producto.categoria}</span>
            <h1 class="display-5 fw-bold mb-3">${producto.nombre}</h1>
            
            <div class="d-flex align-items-center mb-3">
                <div class="text-warning me-2">
                    ${'<i class="bi bi-star-fill"></i>'.repeat(
                        4
                    )}<i class="bi bi-star-half"></i>
                </div>
                <span class="text-muted">(4.5/5)</span>
            </div>
            
            <p class="fs-2 text-primary fw-bold mb-4">$${producto.precio.toLocaleString()}</p>
            <p class="fs-5 mb-4">${
                producto.descripcion
            }. Producto de calidad premium.</p>

            <div class="mb-4">
                <h5><i class="bi bi-check-circle text-success"></i> Características:</h5>
                <ul class="list-unstyled">
                    <li><i class="bi bi-check text-success"></i> Materiales de primera calidad</li>
                    <li><i class="bi bi-check text-success"></i> Garantía de satisfacción</li>
                    <li><i class="bi bi-check text-success"></i> Envío gratis en compras +$100</li>
                </ul>
            </div>

            <div class="d-grid">
                <button class="btn btn-primary btn-lg py-3" onclick="agregarAlCarrito(${
                    producto.id
                })">
                    <i class="bi bi-cart-plus"></i> Agregar al Carrito - $${producto.precio.toLocaleString()}
                </button>
            </div>
        </div>
    `;

    mostrarSeccion("detalle");
}

// ===== FUNCIONES DEL CARRITO =====
function actualizarContadorCarrito() {
    const contador = document.getElementById("carrito-count");
    if (contador) {
        contador.textContent = carrito.reduce(
            (sum, item) => sum + item.cantidad,
            0
        );
    }
}

function agregarAlCarrito(productoId) {
    const producto = productos.find((p) => p.id === productoId);
    if (!producto) return;

    const productoExistente = carrito.find((item) => item.id === productoId);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carritoLibreria", JSON.stringify(carrito));
    actualizarContadorCarrito();
    mostrarNotificacion(`✅ ${producto.nombre} agregado al carrito`);
}

function mostrarCarrito() {
    const carritoItems = document.getElementById("carrito-items");
    const carritoVacio = document.getElementById("carrito-vacio");
    const carritoContenido = document.getElementById("carrito-contenido");

    if (!carritoItems) return;

    // Mostrar/ocultar estados
    const tieneItems = carrito.length > 0;
    carritoVacio.classList.toggle("d-none", tieneItems);
    carritoContenido.classList.toggle("d-none", !tieneItems);

    if (!tieneItems) return;

    // Renderizar items
    carritoItems.innerHTML = "";
    let subtotal = 0;

    carrito.forEach((item, index) => {
        const itemTotal = item.precio * item.cantidad;
        subtotal += itemTotal;

        const itemElement = document.createElement("div");
        itemElement.className =
            "carrito-item d-flex align-items-center p-3 border-bottom";
        itemElement.innerHTML = `
            <img src="${item.imagen}" alt="${
            item.nombre
        }" class="carrito-item-img me-3 rounded" style="width: 80px; height: 80px; object-fit: cover;">
            <div class="flex-grow-1">
                <h6 class="mb-1 fw-bold">${item.nombre}</h6>
                <p class="text-muted mb-2">$${item.precio.toLocaleString()} c/u</p>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${index}, -1)">
                        <i class="bi bi-dash"></i>
                    </button>
                    <span class="mx-3 fw-bold">${item.cantidad}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${index}, 1)">
                        <i class="bi bi-plus"></i>
                    </button>
                </div>
            </div>
            <div class="text-end">
                <p class="fw-bold text-primary mb-2">$${itemTotal.toLocaleString()}</p>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;

        carritoItems.appendChild(itemElement);
    });

    // Calcular totales
    const envio = subtotal > 100000 ? 0 : 5000; // $100.000 para envío gratis
    const total = subtotal + envio;

    document.getElementById(
        "subtotal"
    ).textContent = `$${subtotal.toLocaleString()}`;
    document.getElementById("envio").textContent =
        envio === 0 ? "Gratis" : `$${envio.toLocaleString()}`;
    document.getElementById("total").textContent = `$${total.toLocaleString()}`;
}

function cambiarCantidad(index, cambio) {
    const nuevoTotal = carrito[index].cantidad + cambio;

    if (nuevoTotal < 1) {
        eliminarDelCarrito(index);
    } else {
        carrito[index].cantidad = nuevoTotal;
        guardarYActualizarCarrito();
    }
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarYActualizarCarrito();
}

function vaciarCarrito() {
    if (
        carrito.length === 0 ||
        !confirm("¿Estás seguro de que quieres vaciar el carrito?")
    )
        return;

    carrito = [];
    guardarYActualizarCarrito();
}

function procesarPago() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    const total = carrito.reduce(
        (sum, item) => sum + item.precio * item.cantidad,
        0
    );
    const envio = total > 100000 ? 0 : 5000;
    const totalFinal = total + envio;

    alert(
        `🎉 ¡Compra realizada con éxito!\n\nTotal: $${totalFinal.toLocaleString()}\n\nGracias por tu compra en Papel & Creatividad.`
    );

    carrito = [];
    guardarYActualizarCarrito();
    mostrarSeccion("inicio");
}

function guardarYActualizarCarrito() {
    localStorage.setItem("carritoLibreria", JSON.stringify(carrito));
    actualizarContadorCarrito();
    mostrarCarrito();
}

// ===== UTILIDADES =====
function mostrarNotificacion(mensaje) {
    // Eliminar notificación existente
    const notificacionExistente = document.querySelector(".notification");
    if (notificacionExistente) notificacionExistente.remove();

    // Crear nueva notificación
    const notificacion = document.createElement("div");
    notificacion.className = "notification alert alert-success shadow";
    notificacion.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-check-circle-fill me-2"></i>
            <span>${mensaje}</span>
        </div>
    `;

    document.body.appendChild(notificacion);

    // Animación de entrada
    setTimeout(() => notificacion.classList.add("show"), 100);

    // Eliminar después de 3 segundos
    setTimeout(() => {
        notificacion.classList.remove("show");
        setTimeout(() => notificacion.remove(), 300);
    }, 3000);
}

// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", function () {
    actualizarContadorCarrito();
    renderizarProductos();

    // Manejar formulario de contacto si existe
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("📧 Gracias por tu mensaje. Te contactaremos pronto.");
            this.reset();
        });
    }
});
