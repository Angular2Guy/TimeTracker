#!/bin/sh

# npm run build
docker network create timetracker-network
docker build -t angular2guy/timetracker-frontend:latest --no-cache .

docker run --network=timetracker-network -p 8080:80  -e SPRING_PROFILES_ACTIVE="prod"  --name timetracker angular2guy/timetracker-frontend:latest

docker start timetracker
docker stop timetracker