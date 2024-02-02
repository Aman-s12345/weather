import { useState, useEffect } from "react";

const Home = () => {
  const [cityInput, setCityInput] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedText(cityInput);

    const citiesArray = convertToRequiredFormat(submittedText);
    
    console.log(JSON.stringify({ cities: citiesArray }));
    
    try {
      const response = await fetch('http://localhost:4000/getWeather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cities: citiesArray }),
      });

      const data = await response.json();
      setWeatherData(data.weather);
      console.log(weatherData)

      // Log the updated weatherData here

    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  function convertToRequiredFormat(inputString) {
    // Split the input string by spaces and trim whitespace
    const citiesArray = inputString.split(' ').map(city => city.trim());
    return citiesArray;
  }

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-auto w-full max-w-6xl mx-auto pt-5">
      <div className="flex flex-row">
        <form onSubmit={handleSubmit} className="flex flex-row gap-3 pt-4">
          <input
            className="w-full h-8"
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="toronto mumbai london"
          />

          <button type="submit" className="bg-white text-black h-6 w-20 rounded-full border border-black">
            Submit
          </button>

        </form>
      </div>
    </div>
  );
};

export default Home;


