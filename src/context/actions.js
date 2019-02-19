import { WEATHER_API_KEY, WEATHER_URL } from '../utilities/config';
import {
  formatForecastList,
  formatDayList,
  abbreviationsMap
} from '../utilities/utilities';

// Function to retrieve weather data and convert it into a more usable format.
const retrieveWeatherData = async (dispatch, searchInput) => {
  try {
    // Format input into usable format
    let queryString = searchInput.replace(/, /, ',');
    queryString = queryString.replace(/ /g, '%20');

    let splitString = queryString.split(',');
    if (splitString[1].length <= 3) {
      // Use abbreviation map to convert state/country to full name
      splitString[1] = abbreviationsMap[splitString[1].toUpperCase()];
      queryString = splitString.join(',');
    }

    const weatherString = `${WEATHER_URL}/weather?q=${queryString}&appid=${WEATHER_API_KEY}`;
    const forecastString = `${WEATHER_URL}/forecast?q=${queryString}&appid=${WEATHER_API_KEY}`;

    const fetchPromise = await Promise.all([
      fetch(weatherString),
      fetch(forecastString)
    ]);

    const data = await Promise.all([
      fetchPromise[0].json(),
      fetchPromise[1].json()
    ]);

    // Format the 40 forecasts into 6 days worth of forecasts
    data[1] = formatForecastList(data[1].list);
    data.push(formatDayList(data[1]));
    let date = new Date();
    let hours = date.getHours();
    let minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    data[0]['dateTime'] = `${hours}:${minutes}`; // Used to grab appropriate icon for current data

    dispatch({
      type: 'UPDATE_SEARCH',
      payload: data
    });
  } catch (err) {
    dispatch({
      type: 'FETCH_ERROR'
    });
  }
};

const changeDay = (dispatch, dayIndex) => {
  dispatch({
    type: 'CHANGE_DAY',
    payload: dayIndex
  });
};

const changeForecast = (dispatch, forecastIndex) => {
  dispatch({
    type: 'CHANGE_FORECAST',
    payload: forecastIndex
  });
};

export { retrieveWeatherData, changeDay, changeForecast };
