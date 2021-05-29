# Fiscal Code Generator Telegram Bot

Create a Telegram Bot that generates a Fiscal Code (https://it.wikipedia.org/wiki/Codice_fiscale)

## Rules and Usage
Lunch the server on https://fiscal-code-telegram.herokuapp.com/ and look for **"FiscalCodeLucaB"** on Telegram and digit "/start" to start the conversation with the bot.

## DESCRIPTION:
This application is a TELEGRAM BOT that generate a fiscal code of an Italian citizen by providing his name , surname, sex, birthday and birth city.
I used Telegraf to realize a multiple bot conversation and validation answers based on the user input.
The list of Cities and codes used to create the fiscal code is loaded from a CSV file (downloadable here: https://www.istat.it/storage/codici-unita-amministrative/Elenco-comuni-italiani.csv)

The application is built following **OOP** and **TDD** patterns. I used JEST for testing the inputs and the async functions


**TESTING**
1. run `npm install`
2. To run the tests, run `npm run test`

## The Three Rules of TDD
1. You are not allowed to write any production code unless it is to make a failing unit test pass.
2. You are not allowed to write any more of a unit test than is sufficient to fail; and compilation failures are failures.
3. You are not allowed to write any more production code than is sufficient to pass the one failing unit test.


**TECHNOLOGY**

I wrote this app using Node.js: Telegraf library for the bot and Express to build up the server. 
The app is deployed on **heroku**.


