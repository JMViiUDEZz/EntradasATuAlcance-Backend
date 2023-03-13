# Comandos Docker
docker compose -f /var/lib/jenkins/workspace/Job-EntradasATuAlcance-Backend/docker-compose.yml build 
# --no-cache
docker compose -f /var/lib/jenkins/workspace/Job-EntradasATuAlcance-Backend/docker-compose.yml down 
# --remove-orphans
docker compose -f /var/lib/jenkins/workspace/Job-EntradasATuAlcance-Backend/docker-compose.yml up -d