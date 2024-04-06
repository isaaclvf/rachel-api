# Rachel REST API

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/isaaclvf/rachel-api.git
```

2. Navegue para o diretório do projeto:

```bash
cd rachel-api
```

3. Instale dependências:

```bash
npm install
```

4. Crie um arquivo .env na raíz do projeto e adicione sua MongoDB connection string. Por exemplo:

```bash
CONNECTION_STRING=mongodb://localhost:27017/myapp
```

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

6. Execute os testes:

```bash
npm test
```

## TODO

### ❌ POST /login

Request:
```json
{
    "registration": "123456",
    "password": "password"
}
```

Success - Response 200 OK:
```json
{
  "message": "login successful",
  "user": {
    "username": "john_doe123",
    "email": "john.doe@example.com",
    "token": "jwt_token_here"
  }
} 
```

Missing required fields - Reponse 400 Bad Request

User not found or incorrect password - Reponse 401 Unauthorized

### ❌ GET /user/:registration

Request: GET /user/:registration

Success - Response 200 OK
```json
{
  "username": "JohnDoe",
  "profilePic": "https://example.com/profile.jpg",
  "debt": 10.50,
  "loaned_books": [
    {
      "title": "Book 1",
      "dueDate": "2024-05-01"
    },
    {
      "title": "Book 2",
      "dueDate": "2024-06-15"
    }
  ]
}
```

Not found - Response 404

### ❌ GET /user/:registration/books

Request: GET /user/:registration/books

Sucess - Response 200 OK
```json
{
  "books": [
    {
      "bookId": "1",
      "title": "Book 1",
      "dueDate": "2024-05-01",
      "debt": 5.25
    },
    {
      "bookId": "2",
      "title": "Book 2",
      "dueDate": "2024-06-15",
      "debt": 7.25
    }
  ]
}
```

### ❌ POST /user/:registration/loan

Request:
```json
{
  "bookId": "12345",
  "userId": "12345"
}
```

Success - Response 200 OK:
```json
{
  "message": "loan successful",
  "dueDate": "2024-07-01",
  "bookId": "12345",
  "userId": "12345"
}
```

Missing required fields or invalid book id - Reponse 400 Bad Request

User with given registration not found - Reponse 404 Not Found

### ❌ POST /user/:registration/loan/renew

Request:
```json
{
  "loanId": "loan_id_here"
}

```

Success - Reponse 200 OK:
```json
{
  "message": "renewal successful",
  "newDueDate": "2024-07-15"
}
```

Missing required fields - Reponse 400 Bad Request

Renewal fails - Reponse 400 Bad Request:
```json
{
  "message": "there's a reservation for this book",
}
```

User or loan not found - Reponse 404 Not Found

### ❌ PUT /user/:registration

Request:
```json
{
  "address": "New Address",
  "contact": "New Contact Info"
}
```

Success - Reponse 200 OK
```json
{
  "message": "user information updated successfully",
  "user": {
    "username": "john_doe123",
    "email": "john.doe@example.com",
    "address": "New Address",
    "contact": "New Contact Info"
  }
}
```

Missing required fields - Reponse 400 Bad Request

User not found - Reponse 404 Not Found

### ❌ GET /user/:registration/wishlist

Request: GET /user/:registration/wishlist

Success - Reponse 200 OK:
```json
{
  "wishlist": [
    {
      "bookId": "1",  
      "title": "Book 1",
      "author": "Author 1"
    },
    {
      "bookId": "2",  
      "title": "Book 2",
      "author": "Author 2"
    }
  ]
}
```

User not found - Response 404 Not Found

### ❌ GET /user/:registration/reserved

200 OK:
```json
{
  "reservedBooks": [
    {
      "bookId": "1",  
      "title": "Book 1",
      "author": "Author 1",
      "dueDate": "2024-07-15"
    },
    {
      "bookId": "2",  
      "title": "Book 2",
      "author": "Author 2",
      "dueDate": "2024-08-01"
    }
  ]
}

```

404 Not Found - User with given registration not found

### ❌ DELETE /user/:registration/wishlist/:bookId 

200 OK:
```json
{
  "message": "book removed from wishlist"
}
```

404 Not Found - User or book not found

### ❌ DELETE /user/:registration/reserved/:bookId

200 OK:
```json
{
  "message": "reservation canceled"
}
```

404 Not Found - User or book not found

### ❌ POST /user/:registration/wishlist

Request:
```json
{
  "bookId": "book_id_here"
}
```

200 OK:
```json
{
  "message": "book added to wishlist"
}
```

400 Bad Request - Missing required fields or invalid bookId

404 Not Found - User not found

### ❌ GET /loans

200 OK:
```json
{
  "loans": [
    {
      "user": "user_id_here",
      "book": "book_id_here",
      "dueDate": "2024-07-15"
    },
    {
      "user": "user_id_here",
      "book": "book_id_here",
      "dueDate": "2024-08-01"
    }
  ]
}
```

400 Bad Request - Invalid page or limit parameters

### ❌ GET /user/:registration/loans

200 OK:

```json
{
  "loans": [
    {
      "book": "book_id_here",
      "dueDate": "2024-07-15"
    },
    {
      "book": "book_id_here",
      "dueDate": "2024-08-01"
    }
  ]
}
```

404 Not Found - User not found

### ❌ POST /user/:registration/reserve

Request:
```json
{
  "bookId": "book_id_here"
}
```

200 OK:
```json
{
  "message": "reservation successful"
}
```

400 Bad Request - Missing required fields or invalid id

409 Conflict - Book already reserved by someone else

404 Not Found - User not found

### ❌ PUT /user/:registration/loan/return/:loanId

200 OK:
```json
{
  "message": "loan returned successfully"
}
```

404 Not Found - User or loan not found