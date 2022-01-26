/** @format */

import { fetchData } from './utilites/fetchData.mjs';
import fs from 'fs/promises';

export const handleApiRequest = async (req, res) => {
	/**
	 * Get the query parameter from the request.query object and name them accordingly.
	 */

	const { timeframe: timeFrame, omitmetadata: omitMetaData } = req.query;
	let metaData = null;
	let jsonData;
	let history;

	/**
	 * Fetch the data from the source according to the query parameters and return the result of the fetch.
	 * If the fetch fails, return the error instead.
	 */

	try {
		history = await fetchData({ timeFrame });
		jsonData = await fs.readFile('./api/metaData.json', 'utf-8');
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}

	if (!omitMetaData) {
		const requestTimeStamp = Date.now();
		const numberOfDataSets = history.length;

		metaData = {
			...JSON.parse(jsonData),
			requestTimeStamp,
			numberOfDataSets,
		};
	}

	res.json({ history, metaData });
};
