# Microservices Resilience Lab

A small hands-on project created to explore microservices architecture, service communication, resilience, and cloud-native concepts.

## Project Goal

The goal of this lab is to understand in practice how distributed systems behave, especially topics such as:

- Microservices architecture
- Service independence
- Communication between services
- Partial failures
- Failure isolation
- Health checks
- Containerization with Docker
- Cloud-native concepts

The project is intentionally simple so the focus stays on architecture rather than business complexity.

## Architecture

The project contains two independent services:

### Product Service
Responsible for product data.

Main endpoints:
- GET /products
- GET /products/:id
- GET /health

Runs on port 3001.

### Order Service
Responsible for orders.

Main endpoints:
- GET /orders
- POST /orders
- GET /health

Runs on port 3002.

When a new order is created, the Order Service calls the Product Service through HTTP to retrieve product information.

Flow:

Client
  |
  v
Order Service
  |
  | HTTP
  v
Product Service

## Resilience Experiment

Scenario 1:
- Product Service online
- Order Service online
- POST /orders -> 201 Created

Scenario 2:
- Product Service offline
- Order Service online
- GET /orders -> 200 OK
- POST /orders -> 503 Service Unavailable

This demonstrates partial failure: the Order Service continues running, but an operation that depends on another service becomes unavailable.

## Cloud and Docker

The project also includes Dockerfiles and a docker-compose.yml file.

The idea is to run each service in its own container and explore concepts such as:

- Service isolation
- Internal networking
- Independent deployment
- Health checks
- Containerization
- Local orchestration

Docker Compose is used as a local environment to simulate concepts commonly found in cloud architectures.

## Technologies

- Node.js
- Fastify
- JavaScript
- REST API
- Docker
- Docker Compose

## Project Structure

microservices-resilience-lab/
|
|-- product-service/
|   |-- server.js
|   |-- products.js
|   |-- package.json
|   |-- Dockerfile
|
|-- order-service/
|   |-- server.js
|   |-- orders.js
|   |-- package.json
|   |-- Dockerfile
|
|-- docker-compose.yml
|-- requests.http
|-- .gitignore
|-- README.md

## Main Reflection

One of the main lessons from this experiment is that microservices do not eliminate dependencies. They change how those dependencies behave.

In distributed systems, communication happens over the network, introducing concerns such as:

- Service availability
- Latency
- Timeouts
- Partial failures
- Retries
- Observability

Microservices can provide benefits such as independent deployment and failure isolation, but they also introduce additional operational complexity.

Architecture is not only about choosing technologies, but understanding the trade-offs behind each decision.

## Next Steps

Possible next steps for this lab:

- Request timeout
- Retry strategy
- Circuit breaker
- Logging and observability
- Separate databases
- Asynchronous communication
- Kubernetes
- AWS EKS

Main question:

What changes when an application stops being a single process and becomes a distributed system?