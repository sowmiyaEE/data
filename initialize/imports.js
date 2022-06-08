const importRoute = require('./controllers/import-data/import.router');
const initialize = (app) => {
	app.use('/api/import', importRoute);
}
module.exports = { initialize };

