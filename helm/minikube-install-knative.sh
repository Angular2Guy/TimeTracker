#!/bin/bash
minikube start --cpus=8 --memory=24576 --disk-size=32g
# Install Knative Serving
kubectl apply -f https://github.com/knative/serving/releases/download/knative-v1.22.0/serving-crds.yaml
kubectl apply -f https://github.com/knative/serving/releases/download/knative-v1.22.0/serving-core.yaml
# Install Kourier as the networking layer
kubectl apply -f https://github.com/knative-extensions/net-kourier/releases/download/knative-v1.22.0/kourier.yaml
kubectl patch configmap/config-network \
--namespace knative-serving \
--type merge \
--patch '{"data":{"ingress-class":"kourier.ingress.networking.knative.dev"}}'
kubectl --namespace kourier-system get service kourier
# Add a default domain for Knative services
kubectl apply -f https://github.com/knative/serving/releases/download/knative-v1.22.0/serving-default-domain.yaml
# Check that Knative is running
kubectl get pods -n knative-serving
