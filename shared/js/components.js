async function loadComponent(id, file) {
	const element = document.getElementById(id);
	if (!element) return;

	const res = await fetch(file);
	element.innerHTML = await res.text();
}

document.addEventListener("DOMContentLoaded", () => {
	loadComponent("navbar", "../components/navbar.html");
	loadComponent("footer", "../components/footer.html");
});
