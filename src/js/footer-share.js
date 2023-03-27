const links = document.querySelectorAll('.share a');

function shareToFooter(event) {
	event.preventDefault();

	window.open(
		event.currentTarget.href,
		'Share to..',
		'width=600,height=500,location=no,menubar=no,toolbar=no'
	);
}

links.forEach((link) => {
	const url = encodeURIComponent(window.location.origin + window.location.pathname);
	const title = encodeURIComponent(document.title);

	link.href = link.href
		.replace('{url}', url)
		.replace('{title}', title);

	link.addEventListener('click', onClick);
});
