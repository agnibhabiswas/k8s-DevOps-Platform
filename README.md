# kubernetes-devops-demo

A production-style DevOps project demonstrating a containerized Node.js application deployed on Kubernetes with a CI/CD pipeline using GitHub Actions.

---

## Project Overview

This project demonstrates a complete DevOps workflow:

- A minimal Node.js Express API
- Containerized with Docker
- Deployed to Kubernetes with autoscaling
- Automated build and push via GitHub Actions CI/CD

---

## Architecture

```
GitHub Push
    |
    v
GitHub Actions (CI/CD)
    |-- Build Docker image
    |-- Push to Docker Hub
    |
    v
Docker Hub (Image Registry)
    |
    v
Kubernetes Cluster
    |-- Deployment (2 replicas)
    |-- Service (NodePort, port 80)
    |-- HPA (autoscale 2-5 pods on CPU)
```

---

## Tech Stack

| Layer       | Technology          |
|-------------|---------------------|
| Application | Node.js, Express    |
| Container   | Docker              |
| Orchestration | Kubernetes        |
| CI/CD       | GitHub Actions      |
| Registry    | Docker Hub          |

---

## Run Locally

**Prerequisites:** Node.js 20+

```bash
cd app
npm install
npm start
```

The server will start on `http://localhost:3000`.

**Endpoints:**

- `GET /` — returns `Kubernetes DevOps Demo`
- `GET /health` — returns `{ "status": "ok" }`

---

## Run with Docker

```bash
# Build the image
docker build -t k8s-demo:latest .

# Run the container
docker run -p 3000:3000 k8s-demo:latest
```

---

## Deploy on Kubernetes

**Prerequisites:** A running Kubernetes cluster and `kubectl` configured.

**1. Update the image name in `k8s/deployment.yaml`:**

Replace `<your-docker-username>` with your Docker Hub username.

**2. Apply the manifests:**

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml
```

**3. Verify the deployment:**

```bash
kubectl get deployments
kubectl get pods
kubectl get services
kubectl get hpa
```

---

## CI/CD Setup

The pipeline triggers on every push to `main` and builds and pushes the Docker image to Docker Hub.

**Required GitHub Secrets:**

| Secret            | Description                  |
|-------------------|------------------------------|
| `DOCKER_USERNAME` | Your Docker Hub username     |
| `DOCKER_PASSWORD` | Your Docker Hub access token |

Add these under: **GitHub repo → Settings → Secrets and variables → Actions**

---

## Project Structure

```
.
├── app/
│   ├── index.js          # Express application
│   └── package.json      # Node.js dependencies
├── k8s/
│   ├── deployment.yaml   # Kubernetes Deployment
│   ├── service.yaml      # Kubernetes Service
│   └── hpa.yaml          # Horizontal Pod Autoscaler
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions CI/CD pipeline
├── Dockerfile            # Container build instructions
└── README.md
```
