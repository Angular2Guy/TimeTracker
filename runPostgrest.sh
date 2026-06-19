#!/bin/sh
docker network create timetracker-network
docker pull postgres:latest
docker run --name timetracker-postgres --network=timetracker-network -e POSTGRES_PASSWORD=sven1 -e POSTGRES_USER=sven1 -e POSTGRES_DB=timetracker -p 5432:5432 -d postgres:latest
# docker start timetracker-postgres
# docker stop timetracker-postgres