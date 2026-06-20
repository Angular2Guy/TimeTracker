#!/bin/sh

# npm run build
docker network create timetracker-network
docker build -t angular2guy/timetracker-frontend:latest --no-cache .

docker run --network=timetracker-network -p 8080:80 -e API_URL="http://timetracker-backend:8088" --name timetracker angular2guy/timetracker-frontend:latest

docker start timetracker
docker stop timetracker