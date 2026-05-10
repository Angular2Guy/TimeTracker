#!/bin/sh

# npm run build

docker build -t angular2guy/timetracker-backend:latest --no-cache .

docker run -p 8088:8088  -e PORT=8088 -e DB_USERNAME="sven1" -e DB_PASSWORD="sven1" -e DB_DATABASE="timetracker" --name timetracker-backend angular2guy/timetracker-backend:latest

docker start timetracker-backend
docker stop timetracker-backend