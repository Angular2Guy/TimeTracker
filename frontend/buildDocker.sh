#!/bin/sh

# npm run build

docker build -t angular2guy/timetracker-frontend:latest --no-cache .

docker run -p 8080:8080  -e SPRING_PROFILES_ACTIVE="prod"  --name timetracker angular2guy/timetracker-frontend:latest

docker start timetracker
docker stop timetracker