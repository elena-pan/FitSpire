# FitSpire
Full-stack MERN application for exercise tracking and challenges.

https://fitspire.herokuapp.com

The web app is hosted on Heroku's free tier, which sleeps after 30 minutes of inactivity. It may take 20-30 seconds on first load for the dyno to wake up.

![Demo Animation](https://user-images.githubusercontent.com/52430997/85240978-6ae66700-b3f7-11ea-9d26-52931087383b.gif)

## Technology Stack - MERN
* MongoDB and Mongoose
* Express.js
* React.js - using Redux and React router, bootstrapped with Create React App
* Node.js
* Materialize CSS framework

## Features

#### Authentication
* Private routes
* Register and login with passport and JWT, passwords encrypted
  * Server and client-side form validation
* Email verification using tokens and sendgrid
* Forgot password
* Password changes and account deletion

#### Logging Exercises
* Log exercise, start datetime, end datetime - calculates duration
* Edit and delete logs
* View exercise diary for current day, past 7 or 30 days, all, or custom date range
  * Calculates total hours and number of logs for range selected

#### Challenges
* Server sends fitness challenges
* Next challenge is scheduled to be sent 1 day after the last one is completed

#### General
* Toast notifications
* Contact form

#### Todo
* Push notifications
* Achievements and badges
* More stats
* Competitions/social aspect
