FROM node:12

WORKDIR /app

COPY . ./

EXPOSE 3000

# Start
CMD [ "npm", "start" ]

