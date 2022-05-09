# Pesmomat Nuxt app

## Build Setup

```bash
# Clone repository
$ git clone https://github.com/LGaljo/pesmomat-api
```

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Run
```bash
# Run 
$ npm run start
```
Page is accessible at url:  
http://localhost:3000/?apiUrl=http%3A%2F%2Flocalhost%3A4400  
The query parameter defines location of backend service

## Use PM2 to run at startup
```bash
# Have pm2 installed
pm2 start npm --name=pesmomat-app -- run start
pm2 save
```
