const API_BASE = "http://127.0.0.1:5000/api";

$(document).ready(function () {
	if (document.getElementById("clientesTableContainer")) {
		initClientesView();
	}

	if (document.getElementById("categoriasTableContainer")) {
		initCategoriasView();
	}

	if (document.getElementById("productosTableContainer")) {
		initProductosView();
	}

	if (document.getElementById("ordenesTableContainer")) {
		initOrdenesView();
	}
});

// =========================
// CLIENTES
// =========================
function initClientesView() {
	const clientesTable = createApiTable({
		containerId: "clientesTableContainer",
		title: "Clientes",
		endpoint: `${API_BASE}/clientes`,
		deleteEndpoint: `${API_BASE}/clientes`,
		columns: [
			{ key: "nombre", label: "Nombre" },
			{ key: "apellido", label: "Apellido" },
			{ key: "telefono", label: "Teléfono" },
			{ key: "correo", label: "Correo" },
			{ key: "direccion", label: "Dirección" },
			{
				key: "activo",
				label: "Activo",
				render: (item) => (item.activo ? "Sí" : "No"),
			},
		],
	});

	clientesTable.table.render();
	clientesTable.load();

	if (!document.getElementById("clientesFormContainer")) return;
	if (typeof FormComponent === "undefined") return;

	const clientesForm = new FormComponent({
		containerId: "clientesFormContainer",
		modalId: "clienteModal",
		title: "cliente",
		createEndpoint: `${API_BASE}/clientes`,
		updateEndpoint: `${API_BASE}/clientes`,
		submitCreateText: "Guardar cliente",
		submitEditText: "Actualizar cliente",
		fields: [
			{
				name: "nombre",
				label: "Nombre",
				type: "text",
				required: true,
				col: "col-md-6",
			},
			{
				name: "apellido",
				label: "Apellido",
				type: "text",
				required: true,
				col: "col-md-6",
			},
			{
				name: "telefono",
				label: "Teléfono",
				type: "text",
				required: true,
				col: "col-md-6",
			},
			{
				name: "correo",
				label: "Correo",
				type: "email",
				required: true,
				col: "col-md-6",
			},
			{
				name: "direccion",
				label: "Dirección",
				type: "textarea",
				required: true,
				col: "col-md-12",
				rows: 3,
			},
			{ name: "activo", label: "Activo", type: "checkbox", col: "col-md-12" },
		],
		mapEditData: (item) => ({
			nombre: item.nombre,
			apellido: item.apellido,
			telefono: item.telefono,
			correo: item.correo,
			direccion: item.direccion,
			activo: item.activo,
		}),
		transformPayload: (payload) => ({
			...payload,
			activo: Boolean(payload.activo),
		}),
		onSuccess: () => clientesTable.load(),
	});

	clientesForm.render();

	const btnAdd = document.getElementById("btnAddCliente");
	if (btnAdd) {
		btnAdd.addEventListener("click", function () {
			clientesForm.openCreate();
		});
	}

	clientesTable.table.actions = {
		edit: {
			onClick: function (item) {
				clientesForm.openEdit(item);
			},
		},
		delete: {
			onClick: function (item) {
				if (!item || !item._id) return;

				const confirmado = confirm("¿Deseas eliminar este cliente?");
				if (!confirmado) return;

				$.ajax({
					url: `${API_BASE}/clientes/${item._id}`,
					method: "DELETE",
					success: function () {
						clientesTable.table.setData(
							clientesTable.table.data.filter((row) => row._id !== item._id),
						);
					},
					error: function (error) {
						console.error("Error al eliminar cliente:", error);
						alert("No se pudo eliminar el cliente.");
					},
				});
			},
		},
	};

	clientesTable.table.render();
	clientesTable.load();
}

// =========================
// CATEGORÍAS
// =========================
function initCategoriasView() {
	const categoriasTable = createApiTable({
		containerId: "categoriasTableContainer",
		title: "Categorías",
		endpoint: `${API_BASE}/categorias`,
		deleteEndpoint: `${API_BASE}/categorias`,
		columns: [
			{ key: "nombre", label: "Nombre" },
			{ key: "categoria", label: "Categoría" },
			{ key: "descripcion", label: "Descripción" },
			{
				key: "estado",
				label: "Estado",
				render: (item) => (item.estado ? "Activa" : "Inactiva"),
			},
		],
	});

	categoriasTable.table.render();
	categoriasTable.load();

	if (!document.getElementById("categoriasFormContainer")) return;
	if (typeof FormComponent === "undefined") return;

	const categoriasForm = new FormComponent({
		containerId: "categoriasFormContainer",
		modalId: "categoriaModal",
		title: "categoría",
		createEndpoint: `${API_BASE}/categorias`,
		updateEndpoint: `${API_BASE}/categorias`,
		submitCreateText: "Guardar categoría",
		submitEditText: "Actualizar categoría",
		fields: [
			{
				name: "nombre",
				label: "Nombre",
				type: "text",
				required: true,
				col: "col-md-6",
			},
			{
				name: "categoria",
				label: "Categoría",
				type: "text",
				required: true,
				col: "col-md-6",
			},
			{
				name: "descripcion",
				label: "Descripción",
				type: "textarea",
				required: true,
				col: "col-md-12",
				rows: 3,
			},
			{ name: "estado", label: "Activa", type: "checkbox", col: "col-md-12" },
		],
		mapEditData: (item) => ({
			nombre: item.nombre,
			categoria: item.categoria,
			descripcion: item.descripcion,
			estado: item.estado,
		}),
		transformPayload: (payload) => ({
			...payload,
			estado: Boolean(payload.estado),
		}),
		onSuccess: () => categoriasTable.load(),
	});

	categoriasForm.render();

	const btnAdd = document.getElementById("btnAddCategoria");
	if (btnAdd) {
		btnAdd.addEventListener("click", function () {
			categoriasForm.openCreate();
		});
	}

	categoriasTable.table.actions = {
		edit: {
			onClick: function (item) {
				categoriasForm.openEdit(item);
			},
		},
		delete: {
			onClick: function (item) {
				if (!item || !item._id) return;

				const confirmado = confirm("¿Deseas eliminar esta categoría?");
				if (!confirmado) return;

				$.ajax({
					url: `${API_BASE}/categorias/${item._id}`,
					method: "DELETE",
					success: function () {
						categoriasTable.table.setData(
							categoriasTable.table.data.filter((row) => row._id !== item._id),
						);
					},
					error: function (error) {
						console.error("Error al eliminar categoría:", error);
						alert("No se pudo eliminar la categoría.");
					},
				});
			},
		},
	};

	categoriasTable.table.render();
	categoriasTable.load();
}

// =========================
// PRODUCTOS
// =========================
function initProductosView() {
	const productosTable = createApiTable({
		containerId: "productosTableContainer",
		title: "Productos",
		endpoint: `${API_BASE}/productos`,
		deleteEndpoint: `${API_BASE}/Productos`,
		columns: [
			{ key: "nombre", label: "Nombre" },
			{ key: "descripcion", label: "Descripción" },
			{
				key: "precio",
				label: "Precio",
				render: (item) => `₡ ${Number(item.precio).toLocaleString("es-CR")}`,
			},
			{ key: "stock", label: "Stock" },
			{
				key: "imagen",
				label: "Imagen",
				render: (item) =>
					item.imagen
						? `<img src="${item.imagen}" alt="${item.nombre}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">`
						: "Sin imagen",
			},
			{
				key: "categoria",
				label: "Categoría",
				render: (item) => item.categoria?.nombre || "",
			},
		],
	});

	productosTable.table.render();
	productosTable.load();

	if (!document.getElementById("productosFormContainer")) return;
	if (typeof FormComponent === "undefined") return;

	$.ajax({
		url: `${API_BASE}/categorias`,
		method: "GET",
		success: function (categorias) {
			const categoriaOptions = (categorias || []).map((categoria) => ({
				value: categoria._id,
				label: categoria.nombre,
			}));

			const productosForm = new FormComponent({
				containerId: "productosFormContainer",
				modalId: "productoModal",
				title: "producto",
				createEndpoint: `${API_BASE}/productos`,
				updateEndpoint: `${API_BASE}/Productos`,
				submitCreateText: "Guardar producto",
				submitEditText: "Actualizar producto",
				fields: [
					{
						name: "nombre",
						label: "Nombre",
						type: "text",
						required: true,
						col: "col-md-6",
					},
					{
						name: "precio",
						label: "Precio",
						type: "number",
						required: true,
						col: "col-md-6",
						min: 0,
						step: "0.01",
					},
					{
						name: "descripcion",
						label: "Descripción",
						type: "textarea",
						required: true,
						col: "col-md-12",
						rows: 3,
					},
					{
						name: "stock",
						label: "Stock",
						type: "number",
						required: true,
						col: "col-md-4",
						min: 0,
					},
					{
						name: "imagen",
						label: "Imagen (URL)",
						type: "text",
						required: true,
						col: "col-md-8",
					},
					{
						name: "categoria",
						label: "Categoría",
						type: "select",
						required: true,
						col: "col-md-12",
						options: categoriaOptions,
					},
				],
				mapEditData: (item) => ({
					nombre: item.nombre,
					descripcion: item.descripcion,
					precio: item.precio,
					stock: item.stock,
					imagen: item.imagen,
					categoria: item.categoria?._id || item.categoria || "",
				}),
				onSuccess: () => productosTable.load(),
			});

			productosForm.render();

			const btnAdd = document.getElementById("btnAddProducto");
			if (btnAdd) {
				btnAdd.addEventListener("click", function () {
					productosForm.openCreate();
				});
			}

			productosTable.table.actions = {
				edit: {
					onClick: function (item) {
						productosForm.openEdit(item);
					},
				},
				delete: {
					onClick: function (item) {
						if (!item || !item._id) return;

						const confirmado = confirm("¿Deseas eliminar este producto?");
						if (!confirmado) return;

						$.ajax({
							url: `${API_BASE}/Productos/${item._id}`,
							method: "DELETE",
							success: function () {
								productosTable.table.setData(
									productosTable.table.data.filter(
										(row) => row._id !== item._id,
									),
								);
							},
							error: function (error) {
								console.error("Error al eliminar producto:", error);
								alert("No se pudo eliminar el producto.");
							},
						});
					},
				},
			};

			productosTable.table.render();
			productosTable.load();
		},
		error: function (error) {
			console.error("Error al cargar categorías para productos:", error);
		},
	});
}

// =========================
// ÓRDENES
// =========================
function initOrdenesView() {
	const ordenesTable = createApiTable({
		containerId: "ordenesTableContainer",
		title: "Órdenes",
		endpoint: `${API_BASE}/ordenes`,
		deleteEndpoint: `${API_BASE}/ordenes`,
		columns: [
			{
				key: "cliente",
				label: "Cliente",
				render: (item) =>
					item.cliente
						? `${item.cliente.nombre || ""} ${item.cliente.apellido || ""}`.trim()
						: "",
			},
			{
				key: "productos",
				label: "Productos",
				render: (item) => {
					if (!item.productos || item.productos.length === 0) {
						return "Sin productos";
					}

					return item.productos
						.map((p) => {
							const nombreProducto = p.producto?.nombre || "Producto";
							return `${nombreProducto} x${p.cantidad}`;
						})
						.join("<br>");
				},
			},
			{ key: "cantidadTotal", label: "Cantidad total" },
			{
				key: "totalPagar",
				label: "Total a pagar",
				render: (item) =>
					`₡ ${Number(item.totalPagar).toLocaleString("es-CR")}`,
			},
			{ key: "estadoOrden", label: "Estado" },
			{ key: "metodoPago", label: "Método de pago" },
			{
				key: "observaciones",
				label: "Observaciones",
				render: (item) => item.observaciones || "-",
			},
			{
				key: "createdAt",
				label: "Fecha",
				render: (item) =>
					item.createdAt
						? new Date(item.createdAt).toLocaleString("es-CR")
						: "",
			},
		],
	});

	ordenesTable.table.render();
	ordenesTable.load();

	if (!document.getElementById("ordenesFormContainer")) return;
	if (typeof FormComponent === "undefined") return;

	const ordenesForm = new FormComponent({
		containerId: "ordenesFormContainer",
		modalId: "ordenModal",
		title: "orden",
		createEndpoint: `${API_BASE}/ordenes`,
		updateEndpoint: `${API_BASE}/ordenes`,
		submitCreateText: "Guardar orden",
		submitEditText: "Actualizar orden",
		fields: [
			{
				name: "estadoOrden",
				label: "Estado",
				type: "select",
				required: true,
				col: "col-md-6",
				options: [
					{ value: "Pendiente", label: "Pendiente" },
					{ value: "En preparación", label: "En preparación" },
					{ value: "Lista", label: "Lista" },
					{ value: "Entregada", label: "Entregada" },
					{ value: "Cancelada", label: "Cancelada" },
				],
			},
			{
				name: "metodoPago",
				label: "Método de pago",
				type: "select",
				required: true,
				col: "col-md-6",
				options: [
					{ value: "Efectivo", label: "Efectivo" },
					{ value: "Sinpe Móvil", label: "Sinpe Móvil" },
					{ value: "Tarjeta", label: "Tarjeta" },
					{ value: "Transferencia", label: "Transferencia" },
				],
			},
			{
				name: "observaciones",
				label: "Observaciones",
				type: "textarea",
				required: false,
				col: "col-md-12",
				rows: 3,
			},
		],
		mapEditData: (item) => ({
			estadoOrden: item.estadoOrden,
			metodoPago: item.metodoPago,
			observaciones: item.observaciones || "",
		}),
		onSuccess: () => ordenesTable.load(),
	});

	ordenesForm.render();

	ordenesTable.table.actions = {
		edit: {
			onClick: function (item) {
				ordenesForm.openEdit(item);
			},
		},
		delete: {
			onClick: function (item) {
				if (!item || !item._id) return;

				const confirmado = confirm("¿Deseas eliminar esta orden?");
				if (!confirmado) return;

				$.ajax({
					url: `${API_BASE}/ordenes/${item._id}`,
					method: "DELETE",
					success: function () {
						ordenesTable.table.setData(
							ordenesTable.table.data.filter((row) => row._id !== item._id),
						);
					},
					error: function (error) {
						console.error("Error al eliminar orden:", error);
						alert("No se pudo eliminar la orden.");
					},
				});
			},
		},
	};

	ordenesTable.table.render();
	ordenesTable.load();
}
