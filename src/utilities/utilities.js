const convertFromKelvin = temp => {
  return Math.floor(((temp - 273.15) * 9) / 5 + 32);
};

// Function to build string to display appropriate icon for weather types
// Handles simple day & night icons; but not speculative weather shifts very well
const getIcon = (dateTime, weather) => {
  if (dateTime === undefined) {
    return iconMap[weather['weather']];
  }
  let hour = Number(dateTime.split(':')[0]);
  if (hour > 3 && hour < 18) return iconMap[weather['description']];
  else {
    return iconMap[weather['description'] + ' night'];
  }
};

// formatForecastList converts the 40-item list retrieved by the API into 6 daily lists of forecasts
const formatForecastList = forecasts => {
  let date = new Date();
  let i = 0; // Index for day
  const returnForecasts = [[], [], [], [], [], []]; // array to hold forecasts that correspond to each upcoming day
  forecasts.forEach(forecast => {
    let evalDate = new Date(forecast['dt_txt']);
    if (date.getDay() !== evalDate.getDay()) {
      // If the day changes, change which array to push into.
      date = evalDate;
      i++;
    }

    forecast['dateTime'] = `${evalDate.getHours()}:00`;

    returnForecasts[i].push(forecast);
  });
  return returnForecasts;
};

// formatDayList aggregates the info from a day's worth of forecasts to display an average
// temperate, and most prominent weather type
const formatDayList = forecasts => {
  return forecasts.map(dailyForecast => {
    // If statement is quick fix for when the 0th or the 6th day has no forecasts
    if (dailyForecast.length !== 0) {
      let day = {};
      let date = new Date(dailyForecast[0]['dt_txt']);
      day['fullDay'] = `${date.toLocaleDateString('en-us', {
        weekday: 'short'
      })} - ${date.toLocaleDateString('en-us', {
        day: 'numeric',
        month: 'short'
      })}`;
      day['avg'] =
        dailyForecast.reduce((acc, dailyForecast) => {
          return acc + dailyForecast['main']['temp'];
        }, 0) / dailyForecast.length;
      day['weather'] = getLikelyWeather(dailyForecast);
      return day;
    }
    return {};
  });
};

// getLikelyWeather chooses which weather type is most likely for a day
// It builds a frequency map then sorts it to find which one has the highest value
// then returns the weather type with the highest frequency to represent a day
const getLikelyWeather = forecasts => {
  // Build a frequency map for weather types for the day
  const weatherMap = forecasts.reduce((acc, forecast) => {
    let weatherType = forecast['weather'][0]['description'];
    acc[weatherType] ? acc[weatherType]++ : (acc[weatherType] = 1);
    return acc;
  }, {});

  // Sort by frequency
  const weatherList = Object.keys(weatherMap);
  weatherList.sort((a, b) => weatherMap[a] - weatherMap[b]);

  return weatherList[weatherList.length - 1];
};

// iconMap is used to generate icons for display purposes
// these are based on weather type, and time of day when available
const iconMap = {
  'few clouds': 'cloud-sun',
  'few clouds night': 'cloud-moon',
  'clear sky': 'sun',
  'clear sky night': 'moon',
  'scattered clouds': 'cloud-sun',
  'scattered clouds night': 'cloud-moon',
  'overcast clouds': 'cloud',
  'overcast clouds night': 'cloud',
  'light rain': 'cloud-rain',
  'light rain night': 'cloud-rain',
  'moderate rain': 'cloud-showers-heavy',
  'moderate rain night': 'cloud-showers-heavy',
  'broken clouds': 'cloud-sun',
  'broken clouds night': 'cloud-moon',
  'light snow': 'snowflake',
  'light snow night': 'snowflake'
};

// abbreviationsMap is used to allow for shorthand inputs for either
// state or countries when searching for a city
const abbreviationsMap = {
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FM: 'Federated States Of Micronesia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
  CHN: 'China',
  IND: 'India',
  US: 'US',
  USA: 'US',
  UK: 'UK',
  IDN: 'Indonesia',
  BRA: 'Brazil',
  PAK: 'Pakistan',
  NGA: 'Nigeria',
  BGD: 'Bangladesh',
  RUS: 'Russia',
  JPN: 'Japan',
  MEX: 'Mexico',
  ETH: 'Ethiopia',
  PHL: 'Philippines',
  EGY: 'Egypt',
  VNM: 'Vietnam',
  IRN: 'Iran',
  TUR: 'Turkey',
  DEU: 'Germany',
  THA: 'Thailand'
};

export {
  formatForecastList,
  formatDayList,
  convertFromKelvin,
  getIcon,
  abbreviationsMap,
  getLikelyWeather
};
