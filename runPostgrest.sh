#!/bin/sh
docker pull postgres:latest
docker run --name timetracker-postgres -e POSTGRES_PASSWORD=sven1 -e POSTGRES_USER=sven1 -e POSTGRES_DB=timetracker -p 5432:5432 -d postgres:latest
# docker start timetracker-postgres
# docker stop timetracker-postgres