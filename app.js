const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send(getInfo(req));
});

function getInfo (req) {
	let ipaddress = req.ip || req.connection.remoteAddress;
	ipaddress = ipaddress.replace('::ffff:', '')
	const language = req['headers']['accept-language'].split(',')[0];
	const pattern = /\(.*?\)/;
	const software = pattern
		.exec(req['headers']['user-agent'])[0]
		.replace(/[\\(\\)]/g,'');
	
	
	return {
		ipaddress,
		language,
		software
	};
}

app.listen(port, () => console.log('Server started'));