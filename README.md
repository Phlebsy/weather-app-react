# Interacting with the application

The driving functionality of this application is through the search bar. Enter a city name along with a state name, country name, US state abbreviation or ISO-3166 3-character country abbreviation found here: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes separated by a comma(ie: 'New York, NY' or 'Moscow, RUS' and submit by pressing 'Go' to load the weather forecasts. Only the top ~20 populated country codes are supported at this time.<br>

From there, you can choose individual tri-hourly forecasts for the current day(provided there are any left) by clicking on the items within the first carousel, and change the day's worth of forecasts by clicking on the items within the second carousel.


## Available Scripts

In the project directory, you can run:

### `npm install` || `yarn install`

This will install all of the dependencies required for the project to run.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

### `npm test`

Tests the app using jest & enzyme. Includes unit testing for utility functions and rudimentary snapshot & render/mount testing for components. Context & actions are as yet lacking coverage; I've done testing on Redux stores but not Context stores so need to study up on that.


## Dependencies:

This project makes use of the following libraries/external resources:

#### OpenWeatherAPI

    Included for weather data

#### React

    For minimizing the DOM management, and for the Context API which was used to simplify state management without the excessive boilerplate of Redux for a small project.

#### create-react-app

    To get started quickly with no global dependencies required to build/run the application. Parcel is my go-to for a baseline in smaller projects typically however.

#### Bootstrap

    For minimizing the amount of time spent on CSS for a small project

#### FontAwesome

    Icons for weather images. This would be the first to go if I had more time.

#### react-owl-carousel

    Simple out-of-the-box carousel for making a display for the days & hourly forecasts.

All of these are available via NPM/Yarn or included via CDNs on the public.html page, and all other functionality within the application is modern native Javascript.


 
