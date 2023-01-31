# lorebot-api
Lorebot microservice in NodeJS


## Dependencies

Dependencies can be installed with `npm install` but to install discretely run following
```
npm install moment
npm install express
npm install dotenv
npm install mysql2
```
## .env
`.env` file for use with `dotenv` should be structured in below fashion.
Generally `DB_PAGESIZE` should be kept at `3` to stay within Discord messaging limits.

```
DB_HOST=database_ip_address_here
DB_USER=your_username_here
DB_PASSWORD=your_password_here
DB_NAME=Lorebot
DB_PORT=3306
DB_PAGESIZE=3
```

`dotenv` is a design decision favored over `config.json` and will automatically install with `npm install` but to install discretely use following

```
npm i dotenv
```

### Code based on https://blog.logrocket.com/build-rest-api-node-express-mysql/