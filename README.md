# lorebot-api
example in node

## .env
`.env` file for use with `dotenv` should be structured in below fashion
```
DB_HOST=database_ip_address_here
DB_USER=your_username_here
DB_PASSWORD=your_password_here
DB_NAME=Lorebot
DB_PORT=3306
DB_PAGESIZE=10
```

`dotenv` will automatically install with `npm install` but to install discretely use following

```
npm i dotenv
```

### Code based on https://blog.logrocket.com/build-rest-api-node-express-mysql/