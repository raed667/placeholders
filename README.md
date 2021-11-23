# Unsplash Placeholders

Generate placeholders images using unsplash's API.

## Usage

```html
<img
  src="https://unsplash-placeholders.herokuapp.com/image/restaurant?size=small"
/>
```

**Click here to test it out [https://unsplash-placeholders.herokuapp.com/image/restaurant?size=regular&orientation=landscape](https://unsplash-placeholders.herokuapp.com/image/restaurant?size=regular&orientation=landscape)**

### Detailed usage

The endpoint is fairly simple to call:

```
/image/:search?size=[full|raw|regular|small|thumb]&orientation=[landscape|portrait|squarish]
```

You can call this endpoint using a search term to look for some specific images on Unsplash.
This allows for domain-specific placeholders, e.g. `/restaurant`, `/architecture` or `/landscape`.
It downloads and caches 30 results for the query, then randomly serves one.

- You can provide a `size` parameter (default value `thumb`)
- You can provide an `orientation` parameter (default value `squarish`)

## FAQ

### Attribution

For proper attribution following [Unsplash guidelines](https://unsplash.com/documentation#guidelines--crediting).

### The service doesn't answer or answers with a 429.

If loaded, the service might not answer to your request because it has been rate-limited.
Retry an hour later.

### How to host this application?

- First you need to specify the environnement variable `UNSPLASH_ACCESS_KEY`. For this you will need to create an [unsplash application](https://unsplash.com/developers), and copy the access key provided.
- This project is ran on heroku, but it is just a simple NodeJS application and will run on whatever server you can provide.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/RaedsLab/placeholders)

### Limit who can use the placeholders

In the environment variables, you can set `CORS_ALLOWED_ORIGINS` as a list of domains (example `raed.dev,raed.it,raed.tn`) These domains will be the only ones allowed to embed the images. If the variable is not set, or left empty, everyone can use the placeholder service.

## Acknowledgements

All pictures are provided by [Unsplash](https://unsplash.com/), and the service is built on their API.

Inspired by [Jerska's placeholders](https://github.com/Jerska/placeholders) project.
