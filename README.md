

# HelpHub — nodejs app 
> HelpHub — Customer Support Ticket & Knowledge Base Platform

## Tech Stack

* Node.js
* Express.js
* Database (MongoDB)
* JWT Authentication

---

## Prerequisites

* Node.js >= 20
* npm >= 10

---

## Getting Started

### Clone the repository

```bash
https://github.com/AnkitChauhan891/help-hub.git
cd help-hub
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the project root.

```env
PORT=
DB_CONNECTION_STRING=
COST_FACTOR_CODE=
AGENT_INVITATION_CODE=
SUPERVISOR_INVITATION_CODE=
ADMIN_SECERT_KEY=
JWT_SECRET_KEY=
JWT_SECRET_EXPIRE_IN=
```

### Start the application

Development

```bash
npm start
```

Production

```bash
npm start
```
---

## Project Structure

```text
src/
├── config/
├── controller/
├── middleware/
├── models/
├── router/
├── utils/
├── server.js
```

---

## API Documentation

Document all implemented endpoints.

| Method | Endpoint           | Description        |
| ------ | ------------       | ------------------ |
| POST   | /api/auth/register| Create resource    |
| POST   | /api/auth/login   | Get auth token using credential |
| GET    | /api/auth/me/:id  | Get resource by ID |
| GET    | /api/clients/      | Get client data    |
| GET    | /api/clients/:id      | Get specific client data    |
| PATCH    | /api/clients/:id/verify    | Verified client account    |
| PATCH    | /api/clients/:id/deactivate    | Deactivate user client    |

---

## Scripts

| Command         | Description            |
| --------------- | ---------------------- |   |
| `npm start`      | Run tests              |
