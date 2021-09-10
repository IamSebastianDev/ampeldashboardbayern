/** @format */

/*

    A small express server is set up to serve the apiEndpoints and static content

*/

import Express from 'express';

const App = Express();

/*

    Define the public folder as static resource

*/

App.use(Express.static('./public'));

/*

    Set up the API routes

    - data route fetches the data from the backend

*/

import { getData } from './api/getData.mjs';

App.get('/api/data', getData);

/*

    Define a PORT for the application and start the server

*/

const PORT = process.env.PORT || 5000;

App.listen(PORT, () => {
	console.log(`App up on Port: ${PORT}`);
});
