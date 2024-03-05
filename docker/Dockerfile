FROM php:8.2.12-apache

WORKDIR /

RUN apt-get update && apt-get install -y curl zip unzip && docker-php-ext-install pdo_mysql

RUN a2enmod rewrite

COPY ./php/php.ini /usr/local/etc/php/
COPY ./php/composer.json /
COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN /usr/bin/composer install

