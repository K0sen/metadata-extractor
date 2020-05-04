### Extracts books from rdf files and saves them to the db in convinient format

Usage:

- Specify path to the books folder in `.env` **PATH_TO_BOOKS** variable
- Folder structure should be like
```
PATH_TO_BOOKS/
              1/
                pg1.rdf
              2/
                pg2.rdf
```

- Run `docker-compose up`
- Run `npm start`

Tests could be run with `npm test`
