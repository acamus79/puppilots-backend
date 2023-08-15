#!/bin/bash

# Ensuring that the necessary environment variables are present
if [ -z "$DOCKERHUB_FRONT_USERNAME" ] || [ -z "$DOCKERHUB_FRONT_PASSWORD" ] || \
   [ -z "$DOCKERHUB_BACKEND_USERNAME" ] || [ -z "$DOCKERHUB_BACKEND_PASSWORD" ]; then
  echo "Please set the necessary environment variables."
  exit 1
fi

IMAGE_FRONT_NAME="diegovecch/puppilots-frontend:latest"
IMAGE_BACKEND_NAME="raomaster/puppilots-backend:latest"

# Moving to the project directory
cd ~/puppilots/ || exit

# Print a success message
echo "Puppilots: ----pull images FrontEnd---"

# Login to Docker Hub
echo "$DOCKERHUB_FRONT_PASSWORD" | docker login -u "$DOCKERHUB_FRONT_USERNAME" --password-stdin

# Pull the Docker image
docker pull $IMAGE_FRONT_NAME

# Print a success message
echo "Puppilots FrontEnd it's ok"

# Print a success message
echo "Puppilots ---pull images BackEnd---"

# Login to Docker Hub
echo "$DOCKERHUB_BACKEND_PASSWORD" | docker login -u "$DOCKERHUB_BACKEND_USERNAME" --password-stdin

# Pull the Docker image
docker pull $IMAGE_BACKEND_NAME

# Print a success message
echo "Puppilots BackEnd it's ok"

# Run Docker Compose
docker-compose up -d

# Print a success message
echo "Puppilots In Production!!!"