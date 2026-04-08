function createApiTable({
	containerId,
	title,
	columns,
	endpoint,
	deleteEndpoint = null,
	onEdit = null,
}) {
	const table = new TableComponent({
		containerId,
		title,
		columns,
		data: [],
		actions:
			deleteEndpoint || onEdit
				? {
						edit: onEdit
							? {
									onClick: function (item) {
										onEdit(item);
									},
								}
							: null,
						delete: deleteEndpoint
							? {
									onClick: function (item) {
										deleteRow(item);
									},
								}
							: null,
					}
				: null,
	});

	function load() {
		$.ajax({
			url: endpoint,
			method: "GET",
			success: function (response) {
				table.setData(response);
			},
			error: function (error) {
				console.error(`Error al cargar ${title}:`, error);
				table.setData([]);
			},
		});
	}

	function deleteRow(item) {
		if (!item || !item._id || !deleteEndpoint) return;

		const confirmado = confirm(`¿Deseas eliminar este registro de ${title}?`);
		if (!confirmado) return;

		$.ajax({
			url: `${deleteEndpoint}/${item._id}`,
			method: "DELETE",
			success: function () {
				table.setData(table.data.filter((row) => row._id !== item._id));
			},
			error: function (error) {
				console.error(`Error al eliminar en ${title}:`, error);
				alert("No se pudo eliminar el registro.");
			},
		});
	}

	return {
		table,
		load,
	};
}
