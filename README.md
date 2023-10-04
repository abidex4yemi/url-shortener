# Url shortener api

## Installation

- Clone the repo by clicking the green clone or download button to copy the url on github
- In your terminal, run `git clone [insert URL copied from first step]`
- Open the repository with your code editor
- Setup `.env => checkout sample (.env.example) in the codebase` for environment variable
- Run `npm install` to install all dependencies
- Type `npm run start:dev` to get the development server running
- The application runs on `http://localhost:4000` by default

## Encode a url

`POST api/v1/url/encode`

```js
  {
    "longUrl": '<insert-long-url>'
}
```

`GET /api/v1/url/decode/:shortUrlId`

## Decode a url

```js
  {
    "shortId": '<insert-short-url>'
}
```

`GET /api/v1/url/statistic/:shortUrlId`

## Gte a url statistics

```js
  {
    "shortId": '<insert-short-url>'
}
```

## Required features

- Encode a url **/encode url**
- Decode a url **/decode url**
- Get url statistics **get url statistics**

## Technologies

- ExpressJS
