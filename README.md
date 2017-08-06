# My API
> My private API for personal projects

This is my personal REST-API which I use for my projects. Currently there's only one part in it, a handler for the Wallet-API. [Wallet](https://budgetbakers.com) is a money manager which offers a great [API](https://budgetbakers.com/api/) but I needed to have my own to connect it to IFTTT and then make it work with the Google Assistant.

## Getting started

To try it for your own you first need to fill out the `.env` file and run following commands:

```sh
yarn
yarn start
```

If you don't have [yarn](https://yarnpkg.com/lang/en/) installed, go ahead and do it. It's definitely worth it ;)

If you have [nvm](https://github.com/creationix/nvm), you also should run `nvm use` to use node v8.2.

## Use it

I recommend [postman](https://www.getpostman.com/) to use the API, but any HTTP client will do the job. To get your overall balance you can make a `GET` request to `localhost:3000/wallet/get-balance/`. Note that there isn't any authentication yet so it's totally not production ready.
And to make a new record you can make a `POST` request to `localhost:3000/wallet/add-record/?amount=AMOUNT&category=KEYWORD`. A list of keywords is found in `/src/api_wallet/controller/addRecord.js`.
