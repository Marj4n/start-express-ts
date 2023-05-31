# Express.ts API Starter

This is a starter project for an Express API using Typescript and MongoDB.

## Quick Start

### Project Setup

1. Open a terminal and clone the repo:

```bash
git clone https://github.com/Marj4n/start-express-ts.git [your-project-name]
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

The API url is `https://start-express-ts-marj4n.vercel.app/api` and the following endpoints are available:

### Authentication

- **POST** `/auth/register` - Register a new user.

_Required fields_: `username`, `email`, `password`
<br>
_Example request body_:

```json
{
  "email": "jokowi@gmail.com",
  "password": "jokowi12345",
  "username": "jokowi"
}
```

- **POST** `/auth/login` - Login a user.

_Required fields_: `email`, `password`
<br>
_Example request body_:

```json
{
  "email": "jokowi@gmail.com",
  "password": "jokowi12345"
}
```

- **GET** `/auth/logout` - Logout a user.

_Description_: Only authenticated users can logout.

### Users

- **GET** `/users` - Get all users.

_Description_: Only authenticated users can get all users.

- **GET** `/users/:id` - Get a user by id.

_Description_: Only Authenticated users can get a user by id.
<br>
_Url example_: `http://localhost:8080/api/users/2`

- **PATCH** `/users/:id` - Update a user by id.

_Description_: Only the user's owner can update the user.
<br>
_Url example_: `http://localhost:8080/api/users/2`
<br>
_Required fields_: `username`
<br>
_Example request body_:

```json
{
  "username": "Jamashin"
}
```

- **DELETE** `/users/:id` - Delete a user by id.

_Description_: Only the user's owner can delete the user.
<br>
_Url example_: `http://localhost:8080/api/users/2`

### Books

- **GET** `/books` - Get all books.

_Description_: Everyone can get all books.

- **GET** `/books/:id` - Get a book by id.

_Description_: Everyone can get a book by id.
<br>
_Url example_: `http://localhost:8080/api/books/2`

- **POST** `/books` - Create a new book.

_Description_: Only authenticated users can create a book.
<br>
_Required fields_: `title`, `author`, `description`, `publicationYear`
<br>
_Example request body_:

```json
{
  "title": "Dangerous Zombie",
  "author": "Genmu",
  "description": "Gachan! Level Up! D-Dangerous! Zombie! D-Dangerous! Zombie!",
  "publicationYear": 2016
}
```

- **PATCH** `/books/:id` - Update a book by id.

_Description_: Only the book's owner can update the book.
<br>
_Url example_: `http://localhost:8080/api/books/2`
<br>
_Required fields_: `title`, `author`, `description`, `publicationYear`
<br>
_Example request body_:

```json
{
  "title": "Taddle Legacy",
  "author": "Genmu",
  "description": "Gachan! Level Up! Tadoru rekishi! Mezameru kishi! Taddle Legacy~!",
  "publicationYear": 2017
}
```

- **DELETE** `/books/:id` - Delete a book by id.

_Description_: Only the book's owner can delete the book.
<br>
_Url example_: `http://localhost:8080/api/books/2`
