const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send(getInfo(req));
});

function getInfo (req) {
	const ipaddress = req.ip || req.connection.remoteAddress;
	const language = req['headers']['accept-language'].split(',')[0];
	const pattern = /\(.*?\)/;
	const software = pattern
		.exec(req['headers']['user-agent'])[0]
		.replace('::ffff:', '')
		.replace(/[\\(\\)]/g,'');
	return {
		ipaddress,
		language,
		software
	};
}

app.listen(port, () => console.log('Server started'));