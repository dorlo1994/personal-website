FROM node:25-alpine3.22

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .
ENV VITE_HOST=0.0.0.0
ENV HOST=0.0.0.0

EXPOSE 5173

CMD ["npm", "run", "dev"]

