const API_CLIENTES = "http://localhost:5000/api/clientes";
const API_PRODUCTOS = "http://localhost:5000/api/productos";
const API_HACER_PEDIDO = "http://localhost:5000/api/ordenes/hacer-pedido";

let clientes = [];
let productos = [];

$(document).ready(function () {
	cargarClientes();
	cargarProductos();

	$("#btnAgregarProducto").on("click", function () {
		agregarFilaProducto();
	});

	$("#pedidoForm").on("submit", function (e) {
		e.preventDefault();
		enviarPedido();
	});

	agregarFilaProducto();
});

function cargarClientes() {
	$.ajax({
		url: API_CLIENTES,
		method: "GET",
		success: function (response) {
			clientes = response || [];
			renderClientes();
		},
		error: function (error) {
			console.error("Error al cargar clientes:", error);
		},
	});
}

function cargarProductos() {
	$.ajax({
		url: API_PRODUCTOS,
		method: "GET",
		success: function (response) {
			productos = response || [];
			actualizarSelectsProductos();
		},
		error: function (error) {
			console.error("Error al cargar productos:", error);
		},
	});
}

function renderClientes() {
	const $clienteSelect = $("#clienteSelect");
	$clienteSelect.html(`<option value="">Seleccione un cliente</option>`);

	clientes.forEach((cliente) => {
		$clienteSelect.append(`
			<option value="${cliente._id}">
				${cliente.nombre} ${cliente.apellido}
			</option>
		`);
	});
}

function getOpcionesProductos() {
	let options = `<option value="">Seleccione un producto</option>`;

	productos.forEach((producto) => {
		options += `
			<option value="${producto._id}">
				${producto.nombre} - ₡ ${Number(producto.precio).toLocaleString("es-CR")}
			</option>
		`;
	});

	return options;
}

function agregarFilaProducto() {
	const filaId = `producto-row-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

	const filaHtml = `
		<div class="producto-row" id="${filaId}">
			<div class="form-row align-items-end">
				<div class="form-group col-md-7">
					<label class="pedido-label">Producto</label>
					<select class="form-control pedido-input producto-select" required>
						${getOpcionesProductos()}
					</select>
				</div>

				<div class="form-group col-md-3 mt-3 mt-md-0">
					<label class="pedido-label">Cantidad</label>
					<input
						type="number"
						class="form-control pedido-input cantidad-input"
						min="1"
						value="1"
						required
					>
				</div>

				<div class="form-group col-md-2 mt-3 mt-md-0">
					<button
						type="button"
						class="btn btn-block btn-eliminar-producto btnEliminarFila"
					>
						Quitar
					</button>
				</div>
			</div>
		</div>
	`;

	$("#productosContainer").append(filaHtml);

	$(`#${filaId} .btnEliminarFila`).on("click", function () {
		$(`#${filaId}`).remove();
	});
}

function actualizarSelectsProductos() {
	$(".producto-select").each(function () {
		const valorActual = $(this).val();
		$(this).html(getOpcionesProductos());
		$(this).val(valorActual);
	});
}

function construirPayloadPedido() {
	const cliente = $("#clienteSelect").val();
	const metodoPago = $("#metodoPago").val();
	const observaciones = $("#observaciones").val().trim();

	const productosSeleccionados = [];

	$(".producto-row").each(function () {
		const producto = $(this).find(".producto-select").val();
		const cantidad = Number($(this).find(".cantidad-input").val());

		if (producto && cantidad > 0) {
			productosSeleccionados.push({
				producto,
				cantidad,
			});
		}
	});

	return {
		cliente,
		productos: productosSeleccionados,
		metodoPago,
		observaciones,
	};
}

function validarPedido(payload) {
	if (!payload.cliente) {
		mostrarMensaje("Debe seleccionar un cliente.", "danger");
		return false;
	}

	if (!payload.productos || payload.productos.length === 0) {
		mostrarMensaje("Debe agregar al menos un producto.", "danger");
		return false;
	}

	if (!payload.metodoPago) {
		mostrarMensaje("Debe seleccionar un método de pago.", "danger");
		return false;
	}

	return true;
}

function enviarPedido() {
	const payload = construirPayloadPedido();

	if (!validarPedido(payload)) return;

	$.ajax({
		url: API_HACER_PEDIDO,
		method: "POST",
		contentType: "application/json",
		data: JSON.stringify(payload),
		success: function (response) {
			console.log("Pedido creado:", response);
			mostrarMensaje("Pedido creado correctamente.", "success");
			limpiarFormulario();
		},
		error: function (error) {
			console.error("Error al crear pedido:", error);
			mostrarMensaje("No se pudo crear el pedido.", "danger");
		},
	});
}

function limpiarFormulario() {
	$("#clienteSelect").val("");
	$("#metodoPago").val("");
	$("#observaciones").val("");
	$("#productosContainer").html("");
	agregarFilaProducto();
}

function mostrarMensaje(texto, tipo) {
	$("#mensajePedido").html(`
		<div class="alert alert-${tipo}" role="alert">
			${texto}
		</div>
	`);
}
