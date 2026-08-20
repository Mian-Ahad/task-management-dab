# Task Management API

A production-oriented task management backend built with Microsoft Data API Builder (DAB),
Azure SQL Database, REST, GraphQL, Docker, and Azure Container Apps.

## 1. Project Overview

The Task Management API is a cloud-hosted backend application designed to manage
users, tasks, and comments through a unified API layer.

The project demonstrates:

- RESTful API development using Microsoft Data API Builder
- GraphQL API integration
- Azure SQL Database integration
- Role-based API permissions
- Microsoft Entra ID authentication
- Containerized deployment using Docker
- Cloud deployment using Azure Container Apps
- API testing and validation
- Environment-based secret management

## 2. Architecture

Client / API Consumer
        |
        v
Azure Container Apps
        |
        v
Microsoft Data API Builder
   |        |        |
 REST    GraphQL    MCP
        |
        v
Azure SQL Database
        |
        +-- Users
        +-- Tasks
        +-- Comments

## 3. Technology Stack

| Technology | Purpose |
|------------|---------|
| Microsoft Data API Builder | API layer |
| Azure SQL Database | Relational database |
| REST | HTTP API |
| GraphQL | Query API |
| MCP | Model Context Protocol endpoint |
| Microsoft Entra ID | Authentication |
| Docker | Containerization |
| Azure Container Apps | Cloud deployment |
| Azure CLI | Azure management |
| PowerShell | Automation and testing |
| Git/GitHub | Version control |

## 4. Database Design

The application uses three primary entities:

### Users

Stores application users.

### Tasks

Stores task information and task ownership.

### Comments

Stores comments associated with tasks and users.

Database objects:

- dbo.Users
- dbo.Tasks
- dbo.Comments

## 5. Data API Builder Configuration

Microsoft Data API Builder exposes the SQL database through configured REST
and GraphQL endpoints.

REST base path:

/api

GraphQL endpoint:

/graphql

MCP endpoint:

/mcp

The database connection string is provided through an environment variable:

SQL_CONNECTION_STRING

Database credentials are not stored directly in the source code.

## 6. REST API

### Users

GET /api/Users

POST /api/Users

### Tasks

GET /api/Tasks

POST /api/Tasks

PUT /api/Tasks/{id}

DELETE /api/Tasks/{id}

### Comments

GET /api/Comments

POST /api/Comments

The API supports CRUD operations according to the configured entity permissions.

## 7. GraphQL API

GraphQL is exposed through:

/graphql

The API provides GraphQL operations for:

- Users
- Tasks
- Comments

GraphQL introspection is enabled for development and API exploration.

## 8. Authentication & Authorization

Microsoft Entra ID is configured as the authentication provider.

JWT configuration includes:

- Audience
- Issuer
- Token validation

Entity-level permissions are configured through Data API Builder.

## 9. Containerization

The application is containerized using Docker.

The Docker image packages the Data API Builder runtime and project configuration
for consistent deployment across environments.

Build:

docker build -t task-management-dab .

Run:

docker run ...

The production database connection is supplied through environment configuration
rather than being hard-coded into the image.

## 10. Azure Deployment

The backend is deployed using Azure Container Apps.

Cloud architecture:

GitHub
   |
   v
Docker Image
   |
   v
Azure Container Apps
   |
   v
Data API Builder
   |
   v
Azure SQL Database

Azure resources include:

- Azure SQL Database
- Azure Container Apps
- Container App Environment
- Container Registry / Container Image
- Microsoft Entra ID configuration

## 11. API Testing

The API was tested locally and after Azure deployment.

Tested operations include:

- Retrieve users
- Retrieve tasks
- Retrieve comments
- Create tasks
- Update tasks
- Delete tasks
- Create comments
- API connectivity
- Database connectivity

Example:

GET https://<dab-container-app>/api/Tasks

## 12. Environment Variables

The project uses environment-based configuration.

Required variable:

SQL_CONNECTION_STRING

Sensitive credentials should never be committed to GitHub.

## 13. Security

Security practices implemented in the project include:

- Environment-based database credentials
- Microsoft Entra ID authentication
- JWT validation
- Entity-level permissions
- No hard-coded SQL passwords
- `.gitignore` protection for local secrets

## 14. Project Status

Backend:

COMPLETED

Azure deployment:

COMPLETED

REST API:

COMPLETED

GraphQL API:

COMPLETED

Docker:

COMPLETED

Azure SQL:

COMPLETED

Frontend:

DEPLOYED — frontend integration/CORS refinement is intentionally outside the
current backend milestone.

## 15. Future Improvements

Potential production enhancements include:

- CI/CD with GitHub Actions
- Automated API testing
- Azure Monitor and Application Insights
- Centralized logging
- Production authentication policies
- Infrastructure as Code using Bicep or Terraform
- Automated Docker image deployment
- Kubernetes deployment

## 16. Author

Muhammad Ahad

Software Engineering Student
DevOps / Cloud Engineering Portfolio