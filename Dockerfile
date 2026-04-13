# --- build stage ---
FROM node:20-alpine AS build

LABEL authors="Jonas Lobe"

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci || npm i

COPY public ./public
COPY src ./src

ARG REACT_APP_API_BASE=localhost
ENV REACT_APP_API_BASE=$REACT_APP_API_BASE

RUN npm run build

# --- runtime stage ---
FROM php:8.2-apache

WORKDIR /var/www/html

# Apache Rewrite aktivieren für React-Routing
# RUN a2enmod rewrite

# Build-Dateien ins Webroot
COPY --from=build /app/build/ /var/www/html/

# Falls du eine .htaccess nutzt, wird sie mitkopiert,
# sofern sie im build/public enthalten ist.

EXPOSE 80
