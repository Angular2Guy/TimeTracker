#!/bin/sh
set -e

# Generate config.json from environment variables
cat > /usr/share/nginx/html/config.json <<EOF
{
  "apiUrl": "${API_URL:-http://localhost:8088}"
}
EOF

echo "Config generated:"
cat /usr/share/nginx/html/config.json

# Start nginx
exec nginx -g 'daemon off;'
