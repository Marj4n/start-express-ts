# Express Ts API Starter

This is a starter project for an Express API using Typescript and MongoDB.

## Quick Start

### Project Setup

1. Open a terminal and clone the repo:

```bash
git clone https://github.com/Marj4n/start-express-ts.git
```

2. Go to the project directory and install dependencies:

```bash
cd start-express-ts

# using yarn
yarn install

# using npm
npm install
```

3. Setup environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file and add your MongoDB connection string, port and secret. for example:

```bash
PORT=8080
MONGODB_URI=mongodb://localhost:27017/express-ts-api
SECRET=secret
```

4. Start the server:

```bash
# using yarn
yarn start

# using npm
npm start
```

## API Documentation

The API url is `http://localhost:8080/api` and the following endpoints are available:

### Authentication

#### - **POST** `/auth/register` - Register a new user.

Required fields: `username`, `email`, `password`
<br>
Example request body:

```json
{
  "email": "jokowi@gmail.com",
  "password": "jokowi12345",
  "username": "jokowi"
}
```

#### - **POST** `/auth/login` - Login a user.

Required fields: `email`, `password`
<br>
Example request body:

```json
{
  "email": "jokowi@gmail.com",
  "password": "jokowi12345"
}
```

#### - **GET** `/auth/logout` - Logout a user.

Description: Only authenticated users can logout.

### Users

#### - **GET** `/users` - Get all users.

Description: Only authenticated users can get all users.

#### - **GET** `/users/:id` - Get a user by id.

Description: Only Authenticated users can get a user by id.
<br>
Url example: `http://localhost:8080/api/users/2`

#### - **PATCH** `/users/:id` - Update a user by id.

Description: Only the user's owner can update the user.
<br>
Url example: `http://localhost:8080/api/users/2`
<br>
Required fields: `username`
<br>
Example request body:

```json
{
  "username": "Jamashin"
}
```

#### - **DELETE** `/users/:id` - Delete a user by id.

Description: Only the user's owner can delete the user.
<br>
Url example: `http://localhost:8080/api/users/2`

### Books

#### - **GET** `/books` - Get all books.

Description: Everyone can get all books.

#### - **GET** `/books/:id` - Get a book by id.

Description: Everyone can get a book by id.
<br>
Url example: `http://localhost:8080/api/books/2`

#### - **POST** `/books` - Create a new book.

Description: Only authenticated users can create a book.
<br>
Required fields: `title`, `author`, `description`, `publicationYear`
<br>
Example request body:

```json
{
  "title": "Dangerous Zombie",
  "author": "Genmu",
  "description": "Gachan! Level Up! D-Dangerous! Zombie! D-Dangerous! Zombie!",
  "publicationYear": 2016
}
```

#### - **PATCH** `/books/:id` - Update a book by id.

Description: Only the book's owner can update the book.
<br>
Url example: `http://localhost:8080/api/books/2`
<br>
Required fields: `title`, `author`, `description`, `publicationYear`
<br>
Example request body:

```json
{
  "title": "Taddle Legacy",
  "author": "Genmu",
  "description": "Gachan! Level Up! Tadoru rekishi! Mezameru kishi! Taddle Legacy~!",
  "publicationYear": 2017
}
```

#### - **DELETE** `/books/:id` - Delete a book by id.

Description: Only the book's owner can delete the book.
<br>
Url example: `http://localhost:8080/api/books/2`
