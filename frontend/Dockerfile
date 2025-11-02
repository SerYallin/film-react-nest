FROM node:20-alpine AS builder
WORKDIR /var/www/app
COPY package*.json ./
ENV VITE_API_URL=/api/afisha
ENV VITE_CDN_URL=/content/afisha
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS production
COPY --from=builder /var/www/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]