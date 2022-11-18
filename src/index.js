const countryMap = {
	SG: 'https://1.1.1.1/'
};

function redirect(request) {
	const clientIP = request.headers.get('CF-Connecting-IP');
	const country = request.cf.country;
	const asn = request.cf.asn;

	if (country != null && country in countryMap) {
		const url = countryMap[country];
		return Response.redirect(url);
	} else {
		const html = `<!DOCTYPE html>
		<body>
  		<h1>Geo Workers</h1>
  		<p>This is your ${clientIP} and you are accessing this site from ${country} | ${asn}.</p>
		</body>`;
		return new Response(html, {
			headers: {
				'content-type': 'text/html;charset=UTF-8',
			},
		});
	}
}

addEventListener('fetch', event => {
	event.respondWith(redirect(event.request));
});