\# Task Management API — Data API Builder



A complete Task Management API built with \*\*Microsoft Data API Builder (DAB)\*\* and \*\*Azure SQL Database\*\*. The project exposes the same relational data through both \*\*REST\*\* and \*\*GraphQL\*\* APIs and demonstrates CRUD operations, filtering, ordering, pagination, and aggregation.



\## 🚀 Project Overview



This project implements a backend Task Management system using Microsoft Data API Builder.



The API manages three core entities:



\* \*\*Users\*\*

\* \*\*Tasks\*\*

\* \*\*Comments\*\*



Each task belongs to a user, and comments are associated with both users and tasks.



The project demonstrates how Data API Builder can expose an existing SQL database through modern APIs without requiring a traditional custom backend controller layer.



\## 🏗️ Architecture



```text

&#x20;                   ┌─────────────────────┐

&#x20;                   │      Client         │

&#x20;                   │ PowerShell/Postman  │

&#x20;                   └──────────┬──────────┘

&#x20;                              │

&#x20;                ┌─────────────┴─────────────┐

&#x20;                │                           │

&#x20;                ▼                           ▼

&#x20;       ┌─────────────────┐         ┌─────────────────┐

&#x20;       │    REST API     │         │   GraphQL API   │

&#x20;       │  /api/Users     │         │    /graphql     │

&#x20;       │  /api/Tasks     │         │                 │

&#x20;       │  /api/Comments  │         │                 │

&#x20;       └────────┬────────┘         └────────┬────────┘

&#x20;                │                           │

&#x20;                └─────────────┬─────────────┘

&#x20;                              ▼

&#x20;                   ┌─────────────────────┐

&#x20;                   │ Microsoft Data API  │

&#x20;                   │      Builder        │

&#x20;                   └──────────┬──────────┘

&#x20;                              │

&#x20;                              ▼

&#x20;                   ┌─────────────────────┐

&#x20;                   │      Azure SQL      │

&#x20;                   │      Database       │

&#x20;                   └─────────────────────┘

```



\## 🛠️ Technologies



\* Microsoft Data API Builder

\* Azure SQL Database

\* SQL

\* REST API

\* GraphQL

\* PowerShell

\* Git

\* GitHub



\## 📁 Project Structure



```text

task-management-dab/

│

├── .env.example

├── .gitignore

├── dab-config.json

├── dab-config.backup.json

│

└── database/

&#x20;   ├── schema.sql

&#x20;   └── seed.sql

```



\## 🗄️ Database Design



The database contains three primary tables.



\### Users



| Column    | Description               |

| --------- | ------------------------- |

| UserId    | Primary key               |

| FullName  | User's full name          |

| Email     | User email address        |

| CreatedAt | Record creation timestamp |



\### Tasks



| Column      | Description               |

| ----------- | ------------------------- |

| TaskId      | Primary key               |

| UserId      | Foreign key to Users      |

| Title       | Task title                |

| Description | Task description          |

| Status      | Task status               |

| Priority    | Task priority             |

| DueDate     | Task due date             |

| CreatedAt   | Record creation timestamp |



\### Comments



| Column      | Description               |

| ----------- | ------------------------- |

| CommentId   | Primary key               |

| TaskId      | Foreign key to Tasks      |

| UserId      | Foreign key to Users      |

| CommentText | Comment content           |

| CreatedAt   | Record creation timestamp |



\## 🔗 Relationships



```text

Users

&#x20; │

&#x20; ├──────────< Tasks

&#x20; │              │

&#x20; │              └──────────< Comments

&#x20; │

&#x20; └────────────────────────< Comments

```



\* One user can have multiple tasks.

\* One task can have multiple comments.

\* One user can create multiple comments.



\## ⚙️ Configuration



The Data API Builder configuration is stored in:



```text

dab-config.json

```



A backup configuration is also maintained:



```text

dab-config.backup.json

```



Environment-variable configuration examples are provided in:



```text

.env.example

```



Sensitive credentials should never be committed to GitHub.



\## ▶️ Running the Project



Start Data API Builder from the project directory.



The API is configured to run locally on:



```text

http://localhost:5000

```



REST API base URL:



```text

http://localhost:5000/api

```



GraphQL endpoint:



```text

http://localhost:5000/graphql

```



\## 🌐 REST API



\### Get Users



```http

GET /api/Users

```



\### Get Tasks



```http

GET /api/Tasks

```



\### Get Comments



```http

GET /api/Comments

```



\### Filter Tasks by User



```http

GET /api/Tasks?$filter=UserId eq 1

```



\### Order Users



```http

GET /api/Users?$orderby=FullName

```



\## 🔎 GraphQL API



GraphQL endpoint:



```text

POST http://localhost:5000/graphql

```



\### Get Users



```graphql

{

&#x20; users {

&#x20;   items {

&#x20;     UserId

&#x20;     FullName

&#x20;     Email

&#x20;     CreatedAt

&#x20;   }

&#x20; }

}

```



\### Get a Specific User



```graphql

{

&#x20; user\_by\_pk(UserId: 1) {

&#x20;   UserId

&#x20;   FullName

&#x20;   Email

&#x20;   CreatedAt

&#x20; }

}

```



\### Get a Specific Task



```graphql

{

&#x20; task\_by\_pk(TaskId: 1) {

&#x20;   TaskId

&#x20;   UserId

&#x20;   Title

&#x20;   Description

&#x20;   Status

&#x20;   Priority

&#x20;   DueDate

&#x20;   CreatedAt

&#x20; }

}

```



\## 📄 Pagination



GraphQL pagination was tested using the `first` argument.



Example:



```graphql

{

&#x20; users(first: 2) {

&#x20;   items {

&#x20;     UserId

&#x20;     FullName

&#x20;     Email

&#x20;   }

&#x20;   endCursor

&#x20;   hasNextPage

&#x20; }

}

```



The response provides:



\* Requested records

\* `endCursor`

\* `hasNextPage`



The cursor can then be used to retrieve the next page.



\## 🔍 Filtering



GraphQL filtering was tested with:



```graphql

{

&#x20; users(

&#x20;   filter: {

&#x20;     FullName: {

&#x20;       contains: "Muhammad"

&#x20;     }

&#x20;   }

&#x20; ) {

&#x20;   items {

&#x20;     UserId

&#x20;     FullName

&#x20;     Email

&#x20;   }

&#x20; }

}

```



Filtering tasks by user:



```graphql

{

&#x20; tasks(

&#x20;   filter: {

&#x20;     UserId: {

&#x20;       eq: 1

&#x20;     }

&#x20;   }

&#x20; ) {

&#x20;   items {

&#x20;     TaskId

&#x20;     UserId

&#x20;     Title

&#x20;     Status

&#x20;     Priority

&#x20;   }

&#x20; }

}

```



\## ↕️ Ordering



Users can be ordered by name:



```graphql

{

&#x20; users(

&#x20;   orderBy: {

&#x20;     FullName: ASC

&#x20;   }

&#x20; ) {

&#x20;   items {

&#x20;     UserId

&#x20;     FullName

&#x20;     Email

&#x20;   }

&#x20; }

}

```



Tasks can be ordered by priority:



```graphql

{

&#x20; tasks(

&#x20;   orderBy: {

&#x20;     Priority: DESC

&#x20;   }

&#x20; ) {

&#x20;   items {

&#x20;     TaskId

&#x20;     Title

&#x20;     Status

&#x20;     Priority

&#x20;   }

&#x20; }

}

```



\## 📊 Grouping and Aggregation



Task status aggregation was successfully tested using GraphQL:



```graphql

{

&#x20; tasks {

&#x20;   groupBy(fields: \[Status]) {

&#x20;     fields {

&#x20;       Status

&#x20;     }

&#x20;     aggregations {

&#x20;       count(field: TaskId)

&#x20;     }

&#x20;   }

&#x20; }

}

```



Example result:



```text

Completed    → 1

In Progress  → 1

Pending      → 3

```



\## ✏️ CRUD Operations



The project supports CRUD operations through the generated APIs.



\### User CRUD



\* Create user

\* Read user

\* Update user

\* Delete user



\### Task CRUD



\* Create task

\* Read task

\* Update task

\* Delete task



\### Comment CRUD



\* Create comment

\* Read comment

\* Update comment

\* Delete comment



Example GraphQL mutation:



```graphql

mutation {

&#x20; createUser(item: {

&#x20;   FullName: "GraphQL User"

&#x20;   Email: "graphql@example.com"

&#x20; }) {

&#x20;   UserId

&#x20;   FullName

&#x20;   Email

&#x20;   CreatedAt

&#x20; }

}

```



\## 🧪 Testing



The API was tested locally using PowerShell `Invoke-WebRequest` and `Invoke-RestMethod`.



Tested functionality includes:



\* REST endpoint availability

\* GraphQL endpoint availability

\* User CRUD

\* Task CRUD

\* Comment CRUD

\* Single-record queries

\* Filtering

\* Ordering

\* Pagination

\* GroupBy

\* Aggregations



Example REST test:



```powershell

Invoke-RestMethod `

&#x20;   -Uri "http://localhost:5000/api/Users" |

&#x20;   ConvertTo-Json -Depth 10

```



Example GraphQL test:



```powershell

$body = @{ query = $query } | ConvertTo-Json -Compress



Invoke-RestMethod `

&#x20;   -Uri "http://localhost:5000/graphql" `

&#x20;   -Method POST `

&#x20;   -ContentType "application/json" `

&#x20;   -Body $body

```



\## 🔐 Security



The repository includes `.env.example` for environment configuration.



Do not commit:



```text

.env

```



or any file containing:



\* Database passwords

\* Connection strings containing credentials

\* API keys

\* Access tokens

\* Other secrets



\## 📌 Current Status



\*\*Project Status: Completed\*\*



Implemented and tested:



\* Azure SQL database schema

\* Seed data

\* Data API Builder configuration

\* REST API

\* GraphQL API

\* CRUD operations

\* Filtering

\* Ordering

\* Pagination

\* GroupBy

\* Aggregations

\* Git version control

\* GitHub repository



\## 📚 Learning Outcomes



This project demonstrates practical experience with:



\* Azure SQL

\* Microsoft Data API Builder

\* REST API design

\* GraphQL queries and mutations

\* Database relationships

\* CRUD operations

\* API filtering

\* API ordering

\* Cursor-based pagination

\* Aggregation queries

\* SQL database design

\* API testing

\* Git and GitHub workflow



\## 👨‍💻 Author



\*\*Muhammad Ahad\*\*



Software Engineering Student

DevOps \& Cloud Computing Learner



GitHub:



```text

https://github.com/Mian-Ahad

```



\## ⭐ Future Improvements



Possible future enhancements include:



\* Azure deployment

\* Authentication and authorization

\* JWT-based security

\* Automated API testing

\* CI/CD with GitHub Actions

\* Docker containerization

\* Azure monitoring

\* Application logging

\* Production database configuration



\---



If this project helped you understand Microsoft Data API Builder, REST, GraphQL, or Azure SQL, consider giving the repository a ⭐.



