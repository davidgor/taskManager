#!/bin/sh
echo "creating save file"

# build angular
ng build

# coppy backend files
cp src/www/* dist/project
