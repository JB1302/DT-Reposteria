class FormComponent {
	constructor({
		containerId,
		modalId,
		title = "Formulario",
		fields = [],
		createEndpoint = "",
		updateEndpoint = "",
		submitCreateText = "Guardar",
		submitEditText = "Actualizar",
		onSuccess = null,
		mapEditData = null,
		transformPayload = null,
	}) {
		this.container = document.getElementById(containerId);
		this.modalId = modalId;
		this.title = title;
		this.fields = fields;
		this.createEndpoint = createEndpoint;
		this.updateEndpoint = updateEndpoint;
		this.submitCreateText = submitCreateText;
		this.submitEditText = submitEditText;
		this.onSuccess = onSuccess;
		this.mapEditData = mapEditData;
		this.transformPayload = transformPayload;

		this.mode = "create";
		this.currentId = null;

		this.formId = `${modalId}Form`;
		this.messageId = `${modalId}Message`;
		this.titleId = `${modalId}Title`;
		this.submitId = `${modalId}Submit`;
	}

	render() {
		if (!this.container) return;

		const fieldsHtml = this.fields
			.map((field) => this.buildField(field))
			.join("");

		this.container.innerHTML = `
			<div class="modal fade" id="${this.modalId}" tabindex="-1" role="dialog" aria-hidden="true">
				<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
					<div class="modal-content border-0 shadow-sm" style="border-radius: 18px; overflow: hidden;">
						<div class="modal-header" style="background: linear-gradient(90deg, #e35d8f, #d94f83); color: #fff; border-bottom: none;">
							<h5 class="modal-title font-weight-bold" id="${this.titleId}">${this.title}</h5>
							<button type="button" class="close text-white" data-dismiss="modal" aria-label="Close" style="opacity: 1;">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>

						<div class="modal-body p-4" style="background: #fffafb;">
							<div id="${this.messageId}" class="mb-3"></div>

							<form id="${this.formId}">
								<div class="form-row">
									${fieldsHtml}
								</div>

								<div class="mt-3">
									<button
										type="submit"
										id="${this.submitId}"
										class="btn"
										style="background: linear-gradient(90deg, #e35d8f, #d94f83); color: #fff; border: none; border-radius: 999px; padding: 0.7rem 1.4rem; font-weight: 600;"
									>
										${this.submitCreateText}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		`;

		this.bindEvents();
	}

	buildField(field) {
		const colClass = field.col || "col-md-6";
		const required = field.required ? "required" : "";
		const placeholder = field.placeholder || "";
		const min = field.min !== undefined ? `min="${field.min}"` : "";
		const step = field.step !== undefined ? `step="${field.step}"` : "";

		if (field.type === "textarea") {
			return `
				<div class="${colClass} mb-3">
					<label for="${field.name}" style="color:#b34770; font-weight:700;">${field.label}</label>
					<textarea
						id="${field.name}"
						name="${field.name}"
						class="form-control"
						rows="${field.rows || 3}"
						placeholder="${placeholder}"
						style="border:1px solid #f0d7df; border-radius:12px; min-height:110px;"
						${required}
					></textarea>
				</div>
			`;
		}

		if (field.type === "select") {
			const options = (field.options || [])
				.map(
					(option) =>
						`<option value="${option.value}">${option.label}</option>`,
				)
				.join("");

			return `
				<div class="${colClass} mb-3">
					<label for="${field.name}" style="color:#b34770; font-weight:700;">${field.label}</label>
					<select
						id="${field.name}"
						name="${field.name}"
						class="form-control"
						style="border:1px solid #f0d7df; border-radius:12px; min-height:46px;"
						${required}
					>
						<option value="">Seleccione una opción</option>
						${options}
					</select>
				</div>
			`;
		}

		if (field.type === "checkbox") {
			return `
				<div class="${colClass} mb-3 d-flex align-items-center">
					<div class="form-check mt-4">
						<input
							type="checkbox"
							id="${field.name}"
							name="${field.name}"
							class="form-check-input"
						>
						<label class="form-check-label" for="${field.name}" style="color:#8c4a69; font-weight:600;">
							${field.label}
						</label>
					</div>
				</div>
			`;
		}

		return `
			<div class="${colClass} mb-3">
				<label for="${field.name}" style="color:#b34770; font-weight:700;">${field.label}</label>
				<input
					type="${field.type || "text"}"
					id="${field.name}"
					name="${field.name}"
					class="form-control"
					placeholder="${placeholder}"
					style="border:1px solid #f0d7df; border-radius:12px; min-height:46px;"
					${min}
					${step}
					${required}
				>
			</div>
		`;
	}

	bindEvents() {
		const $form = $(`#${this.formId}`);

		$form.on("submit", (e) => {
			e.preventDefault();
			this.submit();
		});

		$(`#${this.modalId}`).on("hidden.bs.modal", () => {
			this.resetForm();
		});
	}

	openCreate() {
		this.mode = "create";
		this.currentId = null;

		$(`#${this.titleId}`).text(`Añadir ${this.title}`);
		$(`#${this.submitId}`).text(this.submitCreateText);

		this.resetForm();
		$(`#${this.modalId}`).modal("show");
	}

	openEdit(item) {
		this.mode = "edit";
		this.currentId = item?._id || null;

		$(`#${this.titleId}`).text(`Editar ${this.title}`);
		$(`#${this.submitId}`).text(this.submitEditText);

		this.resetForm();

		const source = this.mapEditData ? this.mapEditData(item) : item;

		this.fields.forEach((field) => {
			const value = source?.[field.name];
			this.setFieldValue(field, value);
		});

		$(`#${this.modalId}`).modal("show");
	}

	setFieldValue(field, value) {
		const $field = $(`#${field.name}`);

		if (!$field.length) return;

		if (field.type === "checkbox") {
			$field.prop("checked", Boolean(value));
			return;
		}

		$field.val(value ?? "");
	}

	getFieldValue(field) {
		const $field = $(`#${field.name}`);

		if (!$field.length) return null;

		if (field.type === "checkbox") {
			return $field.is(":checked");
		}

		if (field.type === "number") {
			const raw = $field.val();
			return raw === "" ? null : Number(raw);
		}

		return $field.val();
	}

	buildPayload() {
		const payload = {};

		this.fields.forEach((field) => {
			payload[field.name] = this.getFieldValue(field);
		});

		return this.transformPayload
			? this.transformPayload(payload, this.mode)
			: payload;
	}

	submit() {
		const payload = this.buildPayload();

		const url =
			this.mode === "edit"
				? `${this.updateEndpoint}/${this.currentId}`
				: this.createEndpoint;

		const method = this.mode === "edit" ? "PUT" : "POST";

		$.ajax({
			url,
			method,
			contentType: "application/json",
			data: JSON.stringify(payload),
			success: (response) => {
				this.showMessage(
					this.mode === "edit"
						? "Registro actualizado correctamente."
						: "Registro creado correctamente.",
					"success",
				);

				setTimeout(() => {
					$(`#${this.modalId}`).modal("hide");
					if (typeof this.onSuccess === "function") {
						this.onSuccess(response, this.mode);
					}
				}, 400);
			},
			error: (error) => {
				console.error("Error en formulario:", error);
				this.showMessage("No se pudo guardar el registro.", "danger");
			},
		});
	}

	resetForm() {
		$(`#${this.formId}`)[0]?.reset();
		$(`#${this.messageId}`).html("");
	}

	showMessage(text, type) {
		const className =
			type === "success" ? "alert alert-success" : "alert alert-danger";

		$(`#${this.messageId}`).html(`
			<div class="${className}" role="alert" style="border-radius:12px;">
				${text}
			</div>
		`);
	}
}
