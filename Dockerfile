FROM node:12

WORKDIR /app

COPY package.json ./

COPY node_modules ./node_modules

COPY dist ./dist

COPY .env ./

EXPOSE 3000

# Start
CMD [ "node" , "./dist/app.js" ]

