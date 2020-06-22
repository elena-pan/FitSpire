# FitSpire
Full-stack MERN application for exercise tracking and challenges



### Technology Stack - MERN
* MongoDB and Mongoose
* Express.js
* React.js - using Redux and React router, bootstrapped with Create React App
* Node.js
* Materialize as CSS framework

### Features

Authentication
* Private routes
* Register and login with passport and JWT, passwords encrypted
  * Server and client-side form validation
* Email verification using tokens and sendgrid
* Forgot password
* Password changes and account deletion

Logging Exercises
* Log exercise, start datetime, end datetime - calculates duration
* Edit and delete logs
* View exercise diary for current day, past 7 or 30 days, all, or custom date range
  * Calculates total hours and number of logs for range selected

Challenges
* Server sends fitness challenges
* Next challenge is schedueled to be sent 1 day after the last one is completed

General
* Toast notifications
* Contact form

Todo
* Push notifications
* Achievements and badges
* More stats
* Competitions/social aspect
* Deploy
