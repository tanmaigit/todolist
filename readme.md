# Introduction

ToDo List Project is designed as Single Page Application with Microservice.
Using Lumen 5.3 framework, AngularJS 1.5 and Twitter Bootstrap 3

# Setup

**cd** to **your_project** and run these commands:

## Install dependencies
```
composer install
bower install
```

## Create the database schema
```
php artisan migrate
```

## Insert some data for testing
```
php artisan db:seed
```

## Start server
```
php -S localhost:8000 -t public
```