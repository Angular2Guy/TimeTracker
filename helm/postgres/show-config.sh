# list
kubectl get configmaps
kubectl get secrets

# view a specific ConfigMap
kubectl get configmap my-postgres-config -o yaml
kubectl describe configmap my-postgres-config

# view a Secret (values are base64-encoded)
kubectl get secret my-postgres-secret -o yaml

# decode a single Secret value
kubectl get secret my-postgres-secret -o jsonpath='{.data.postgres-password}' | base64 -d

# or, with kubectl >= 1.27
kubectl get secret my-postgres-secret -o go-template='{{.data.postgres-password | base64decode}}'
