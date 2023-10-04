# Testing URL Shortener API

## Prerequisites

Before testing the API, make sure you have the following prerequisites:

- The API server is running. Refer to the `README.md` for instructions on how to start the server.
- Ensure that you are using the API with the following base URL: `http://localhost:4000/api/v1/url`.

## To Generate a Short URL

- Use `/encode` with a POST request method, e.g., `http://localhost:4000/api/v1/url/encode`.
- The body of your request must include a `longUrl` key. For example:

```json
{
  "longUrl": "insert-long-url"
}
```

## To Generate a Long URL

- Use `/decode` with a GET request method. For example: `http://localhost:4000/api/v1/url/decode/Czre6J`.
- Your request must include a `shortUrlId` key.
- **Note:** `Czre6J` is a shortUrlId generated from the `/encode` API.

## Get URL Statistics

- Use `/statistic` with a GET request method. For example: `http://localhost:4000/api/v1/url/statistic/Czre6J`.
- Your request must include a `shortUrlId` key.
- **Note:** `Czre6J` is a shortUrlId generated from the `/encode` API.
