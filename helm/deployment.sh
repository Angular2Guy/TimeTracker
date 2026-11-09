# 1. give Kourier an external IP (keep this running in another terminal)
minikube tunnel

# 2. deploy backend + frontend
helm install my-backend ./helm/backend --set env.DB_HOST=my-postgres
helm install my-frontend ./helm/frontend --set env.API_URL=http://my-backend.default.127.0.0.1.sslip.io

# 3. read the actual URL Knative assigned
kubectl get ksvc my-frontend -o jsonpath='{.status.url}'
