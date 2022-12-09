# Required

nodejs, yarn, mysql, tsc

## Installation and Usage


```bash
yarn
yarn db:seed
yarn dev
```

## Explanation

```python
yarn db:seed
# to generate some sample data

yarn swagger
# to generate swagger file, it is served at /docs

yarn test
# to run test

```

# Apis

```bash
GET /matches
```
This api take 3 query filters
 - date
 - page
 - size

"page" and "size" is used for pagination, when user scroll down/up and reach to bottom/top of the page, it will fetch data for next/previous page

"date" is used for filter at database level
```
GET /matches/availabilities
```
This api take only one query filter
 - date

this api return the date which has match with date is unique, so at FE will visualize it on calendar, the date which included in response is available for clicking