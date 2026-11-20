# TimeTracker
This is a project to manage the working time per month. It shows howto split the frontend and the backend in separate applications and deploy both as serverless applications. The data is persisted in Postgresql. The frontend is implemented with React and the backend is implemented with NestJs. 

Author: Sven Loesekann

[![CodeQL](https://github.com/Angular2Guy/TimeTracker/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Angular2Guy/TimeTracker/actions/workflows/codeql-analysis.yml)

## Articles
[When and how to use serverless architecture](https://angular2guy.wordpress.com/2026/11/20/when-and-how-to-use-serverless-architecture/)

## Features 
1. Frontend implemented with React and deployed in a Docker image
2. Backend implemented with NestJs and deployed in a Docker image
3. Local setup for development to test the frontend and the backend working together with the Postgresql database as Docker image.
4. Minikube configuration with Knative installation
5. Helm Charts to deploy the frontend and backend as Knative services. A Helm Chart to deploy Postgresql as Kubernetes pod.
