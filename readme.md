# Traxcal

> Simple calorie tracking website

## Development

- Set up and run Postgres (see [this gist](https://gist.github.com/phortuin/2fe698b6c741fd84357cec84219c6667)) with role `traxcal` and database `traxcal`
- Install dependencies
- Copy `.env.example` to `.env`
- Migrate & seed database
- Run with Vercel

```bash
$ npm i
$ npm run data:migrate
$ npm run data:seed
$ npm run dev:vercel
```
