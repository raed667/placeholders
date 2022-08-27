# Unsplash Placeholders

Generate placeholders images using unsplash's API.

## Usage

```html
<img
  src="https://placeholder.raed.dev/image/restaurant?w=200&h=200&fit=crop"
/>
```

**Click here to test it out [https://placeholder.raed.dev/image/restaurant?w=200&h=200&fit=crop](https://placeholder.raed.dev/image/restaurant?w=200&h=200&fit=crop)**

### Detailed usage

The endpoint is fairly simple to call:

```
/image/:search
```

You can call this endpoint using a search term to look for some specific images on Unsplash.
This allows for domain-specific placeholders, e.g. `/restaurant`, `/architecture` or `/landscape`.
It downloads and caches 30 results for the query, then randomly serves one.

You can pass as query parameters all the [supported parameters](https://unsplash.com/documentation#supported-parameters) to manipulate the picture, e.g. `?w=200&h=200&fit=crop`.

## FAQ

### Attribution

For proper attribution following [Unsplash guidelines](https://unsplash.com/documentation#guidelines--crediting).

### The service doesn't answer or answers with a 429.

If loaded, the service might not answer to your request because it has been rate-limited.
Retry an hour later.

### How to host this application?

- You need to specify the environnement variable `UNSPLASH_ACCESS_KEY`. For this you will need to create an [unsplash application](https://unsplash.com/developers), and copy the access key provided.

### Limit who can use the placeholders

In the environment variables, you can set `CORS_ALLOWED_ORIGINS` as a list of domains (example `raed.dev,raed.it,raed.tn`) These domains will be the only ones allowed to embed the images. If the variable is not set, or left empty, everyone can use the placeholder service.

## TODO

- [ ] Use Redis for cache instead of filesystem
- [ ] Monitor usage

## Acknowledgements

All pictures are provided by [Unsplash](https://unsplash.com/), and the service is built on their API.

Inspired by [Jerska's placeholders](https://github.com/Jerska/placeholders) project.
