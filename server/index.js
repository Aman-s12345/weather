const express = require("express");
const app = express();
require("dotenv").config()
const cors = require('cors'); 
app.use(express.json());
const PORT = process.env.PORT || 4000;
app.use(express.json());
const axios = require('axios');



app.use(cors());
app.post('/getWeather', async (req, res) => {
	try {
		const { cities } = req.body;
		
		if (!cities || !Array.isArray(cities) || cities.length === 0) {
			return res.status(400).json({ error: 'Invalid input' });
		}
		const weatherData = await getWeatherData(cities);
		res.json({ weather: weatherData });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

async function getWeatherData(cities) {
	const weatherData = {};
	await Promise.all(
		cities.map(async (city) => {
			try {
			
				const response = await axios.get(
					`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`
				);
				weatherData[city] = response.data;
				console.log(response.data);
				

			} catch (error) {
				console.error(`Error fetching weather for ${city}: ${error.message}`);
				
				weatherData[city] = 'N/A';
			}
		})
	);

	return weatherData;
}















app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});


app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

