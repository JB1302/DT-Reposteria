class TableComponent {
	constructor({
		containerId,
		columns = [],
		data = [],
		title = "Tabla",
		actions = null,
	}) {
		this.container = document.getElementById(containerId);
		this.columns = columns;
		this.data = data;
		this.title = title;
		this.actions = actions;
	}

	setData(data) {
		this.data = data || [];
		this.render();
	}

	setColumns(columns) {
		this.columns = columns || [];
		this.render();
	}

	setTitle(title) {
		this.title = title || "Tabla";
		this.render();
	}

	render() {
		if (!this.container) return;

		const headers = this.columns.map((col) => `<th>${col.label}</th>`).join("");
		const actionsHeader = this.actions
			? `<th class="text-center">Acciones</th>`
			: "";

		let rows = "";

		if (!this.data || this.data.length === 0) {
			rows = `
				<tr>
					<td colspan="${this.columns.length + (this.actions ? 1 : 0)}" class="text-center py-4 text-muted">
						No hay registros disponibles
					</td>
				</tr>
			`;
		} else {
			rows = this.data
				.map((item, index) => {
					const cells = this.columns
						.map((col) => {
							let value =
								typeof col.render === "function"
									? col.render(item)
									: item[col.key];

							if (value === null || value === undefined) value = "";

							return `<td class="align-middle">${value}</td>`;
						})
						.join("");

					let actionsCell = "";

					if (this.actions) {
						const editBtn = this.actions.edit
							? `
								<button
									type="button"
									class="btn btn-sm btn-edit-row mr-2"
									data-index="${index}"
								>
									Editar
								</button>
							`
							: "";

						const deleteBtn = this.actions.delete
							? `
								<button
									type="button"
									class="btn btn-sm btn-delete-row"
									data-index="${index}"
								>
									Eliminar
								</button>
							`
							: "";

						actionsCell = `
							<td class="align-middle text-center">
								${editBtn}${deleteBtn}
							</td>
						`;
					}

					return `<tr>${cells}${actionsCell}</tr>`;
				})
				.join("");
		}

		this.container.innerHTML = `
			<div class="table-card-custom card border-0 shadow-sm">
				<div class="card-header table-card-header d-flex align-items-center justify-content-between">
					<h5 class="mb-0 font-weight-bold">${this.title}</h5>
				</div>

				<div class="card-body p-3">
					<div class="table-responsive">
						<table class="table table-sm table-hover mb-0 align-middle custom-table">
							<thead>
								<tr>${headers}${actionsHeader}</tr>
							</thead>
							<tbody>
								${rows}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<style>
				.table-card-custom {
					background: #fffafb;
					border-radius: 18px;
					overflow: hidden;
				}

				.table-card-header {
					background: linear-gradient(90deg, #e35d8f, #d94f83);
					color: #ffffff;
					padding: 1rem 1.25rem;
					border-bottom: none;
				}

				.custom-table {
					border-collapse: separate;
					border-spacing: 0;
					font-size: 0.95rem;
					color: #5b3b46;
				}

				.custom-table thead th {
					background-color: #fff1f5;
					color: #b34770;
					border-top: none;
					border-bottom: 2px solid #f3d6df;
					border-left: none;
					border-right: none;
					font-weight: 700;
					padding: 0.85rem 0.75rem;
					white-space: nowrap;
				}

				.custom-table tbody td {
					background-color: #ffffff;
					border-top: none;
					border-bottom: 1px solid #f4e3e8;
					border-left: none;
					border-right: none;
					padding: 0.85rem 0.75rem;
					vertical-align: middle;
				}

				.custom-table tbody tr:hover td {
					background-color: #fff7fa;
				}

				.custom-table tbody tr:last-child td {
					border-bottom: none;
				}

				.custom-table img {
					width: 56px;
					height: 56px;
					object-fit: cover;
					border-radius: 12px;
					border: 2px solid #f8d7e2;
				}

				.btn-edit-row {
					background: #fff;
					color: #8c4a69;
					border: 1px solid #e6c3d2;
					border-radius: 999px;
					padding: 0.35rem 0.85rem;
					font-weight: 600;
				}

				.btn-edit-row:hover {
					background: #fff3f7;
					color: #8c4a69;
				}

				.btn-delete-row {
					background: #fff;
					color: #c2547f;
					border: 1px solid #efb3c7;
					border-radius: 999px;
					padding: 0.35rem 0.85rem;
					font-weight: 600;
				}

				.btn-delete-row:hover {
					background: #fff3f7;
					color: #c2547f;
					border-color: #e996b5;
				}
			</style>
		`;

		this.bindEvents();
	}

	bindEvents() {
		if (!this.container || !this.actions) return;

		if (this.actions.edit?.onClick) {
			const editButtons = this.container.querySelectorAll(".btn-edit-row");

			editButtons.forEach((button) => {
				button.addEventListener("click", () => {
					const index = Number(button.dataset.index);
					const item = this.data[index];
					this.actions.edit.onClick(item, index, this);
				});
			});
		}

		if (this.actions.delete?.onClick) {
			const deleteButtons = this.container.querySelectorAll(".btn-delete-row");

			deleteButtons.forEach((button) => {
				button.addEventListener("click", () => {
					const index = Number(button.dataset.index);
					const item = this.data[index];
					this.actions.delete.onClick(item, index, this);
				});
			});
		}
	}
}
