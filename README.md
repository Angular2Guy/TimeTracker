# TimeTracker
This is a project to manage working time per month. It shows how to split the frontend and the backend into separate applications and deploy both as serverless applications. The data is persisted in PostgreSQL. The frontend is implemented with React, and the backend is implemented with NestJS. 

Author: Sven Loesekann

[![CodeQL](https://github.com/Angular2Guy/TimeTracker/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Angular2Guy/TimeTracker/actions/workflows/codeql-analysis.yml)

## Articles
[When and how to use serverless architecture](https://angular2guy.wordpress.com/2026/11/20/when-and-how-to-use-serverless-architecture/)

## Features 
1. Frontend implemented with React and deployed as a Docker image.
2. Backend implemented with NestJS and deployed as a Docker image.
3. Local setup for development to test the frontend and the backend working together with the PostgreSQL database as a Docker image.
4. Minikube configuration with Knative installation.
5. Helm charts to deploy the frontend and backend as Knative services, and a Helm chart to deploy PostgreSQL as a Kubernetes pod.

## Mission Statement
The TimeTracker project shows how to create a serverless-deployed application based on Kubernetes and Knative. The project uses a PostgreSQL database for data storage, deployed as a Kubernetes pod. The frontend is implemented as a React SPA and is packaged as a Docker image running on Nginx. The backend is implemented as a NestJS application with REST endpoints, using the PostgreSQL database and packaged as a Docker image running on Node. Knative is used to run the frontend and the backend as serverless instances that are started on demand. Both services start very fast due to the chosen technology stack (under 100ms). The PostgreSQL database is deployed as a pod that runs permanently because the database does not start fast enough. The database could be shared between different services, with different schemas per service, to limit the impact of the database on the Kubernetes cluster. 

With this architecture, the frontend remains a standard React application, and the backend remains a standard NestJS application. No changes are needed for serverless deployment. 
The PostgreSQL deployment does not change either. Only the deployment of the frontend and the backend with Knative needs to be configured differently. 

## Goal
Many companies have applications that are used by staff and create value for the company, but are small to medium-sized in complexity. 
These applications do not have to run all the time on a Kubernetes cluster. To save resources (primarily memory), these applications can be run as serverless deployments. 
The database can be shared among many such applications and deployed as a standard Kubernetes pod.

This enables an efficient use of resources in the Kubernetes cluster and saves money. With the chosen technology stack, the development experience remains the same, with no extra effort required. 
Just install Knative on your Kubernetes cluster, build your internal tool applications with a suitable stack, and run them on Knative to save resources.
