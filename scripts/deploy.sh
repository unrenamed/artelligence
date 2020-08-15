#!/bin/bash

APP_NAME=my-app-7165

echo "Deploying $APP_NAME to Heroku Registry..."

echo "Log in Heroku Registry"
heroku container:login

cd ./services

echo "Build and push client service"
cd ./client
heroku container:push web -a $APP_NAME

echo "Release client service"
heroku container:release web -a $APP_NAME

echo "Open app in browser"
heroku open