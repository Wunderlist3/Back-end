# Back-end

Back-end devs will work out of here. Make sure you create a separate branch.

## Base API

```
https://wunderlist-backend.herokuapp.com/api/
```

## Authentication Route

### REGISTER

Permission: Authenticate

Method

```
POST
```

Endpoint

```
https://wunderlist-backend.herokuapp.com/api/auth/register
```

Request

```
{
    username: // string, (unique)
    password: // string,
    firstName: // string, (OPTIONAL)
    lastName: // string, (OPTIONAL)
}
```

Responses

```
201

{
    "id": 7,
    "username": "peanut",
    "password": "$2a$12$WHH/bbviTGV2/p/vKzk/NuYNxTpWP9M6BlzTAm8LjSczCnCUd7gcS",
    "firstName": "John",
    "lastName": "Doe"
}
```

```
400

{
    "message": "Username and password required"
}
```

```
500

{
    "error": "User registration failed"
}
```

### LOGIN

Permission: Authenticate

Method

```
POST
```

Endpoint

```
https://wunderlist-backend.herokuapp.com/api/auth/login
```

Request

```
{
    username: // string
    password: // string
}
```

Responses

```
200

{
    "message": "Welcome peanut",
    "id": 7,
    "username": "peanut",
    "firstName": "John",
    "lastName": "Doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcm5hbWUiOiJwZWFudXQiLCJpYXQiOjE1ODI4MzUwMDgsImV4cCI6MTU4MjkyMTQwOH0.25epalalWO18QwfQGiZRHGxE-8fCofaO2KXaAZKKaz0"
}
```

```
400

{
    "message": "Username and password required"
}
```

```
401

{
    "message": "Invalid Credentials"
}
```

```
500

{
    "error": "Login Failed"
}
```

## Todos Route

### ADD TODO

Permission: Token

Method

```
POST
```

Endpoint

```
https://wunderlist-backend.herokuapp.com/api/todos/add
```

Request

```
{
    title: // string
    task: // string
    setDate: // string
    user_id: // integer
    notes: // string (OPTIONAL)
    completed: // boolean (DEFAULT FALSE)
}
```

Responses

```
201

[
    {
        "id": 3,
        "title": "Build Backend",
        "task": "Use Node, Express, Postgres",
        "setDate": "Friday",
        "user_id": 2,
        "notes": null,
        "completed": false
    }
]
```

```
400

{
    "message": "Missing field requirement"
}
```

```
401

{
    "message": "Invalid credentials",
    "err": {
        "name": "JsonWebTokenError",
        "message": "invalid token"
    }
}
```

```
500

{
    "error": "Failed to add todo"
}

```

### GET USER'S TODO LIST

Permission: Token

Method

```
GET
```

Endpoint

```
https://wunderlist-backend.herokuapp.com/api/todos/list
```

Request

```
{
    user_id: integer
}
```

Responses

```
200

[
    {
        "id": 3,
        "title": "Build Backend",
        "task": "Use Node, Express, Postgres",
        "setDate": "Friday",
        "user_id": 2,
        "notes": null,
        "completed": false
    },
    {
        "id": 4,
        "title": "Build Frontend",
        "task": "Use React",
        "setDate": "Friday",
        "user_id": 2,
        "notes": null,
        "completed": false
    },
    {
        "id": 5,
        "title": "Build UI",
        "task": "Use HTML and CSS",
        "setDate": "Friday",
        "user_id": 2,
        "notes": null,
        "completed": false
    }
]
```

```
401

{
    "message": "Invalid credentials",
    "err": {
        "name": "JsonWebTokenError",
        "message": "invalid token"
    }
}
```

```
404

{
    "message": "Invalid user_id"
}
```

```
500

{
    "error": "Failed to retrieve todo list"
}
```

### GET TODO

Permission: Token

Method

```
GET
```

Endpoint

```
https://wunderlist-backend.herokuapp.com/api/todos/:id
```

Request

```
req.params.id = integer
```

Responses

```
200

{
    "id": 1,
    "title": "Build Backend",
    "task": "Use Node, Express, Postgres",
    "setDate": "Monday",
    "user_id": 6,
    "notes": null,
    "completed": false
}
```

```
401

{
    "message": "Invalid credentials",
    "err": {
        "name": "JsonWebTokenError",
        "message": "invalid token"
    }
}
```

```
404

{
    "message": "Todo not found"
}
```

```
500

{
    "message": "Todo not found"
}
```

### UPDATE TODO

Permission: Token

Method

```
PUT
```

Endpoint

```
https://wunderlist-backend.herokuapp.com/api/todos/update/:id
```

Request

```
req.params.id = integer

{
    title: // string (OPTIONAL)
    task: // string (OPTIONAL)
    setDate: // string (OPTIONAL)
    user_id: // integer (OPTIONAL)
    notes: // string (OPTIONAL)
    completed: // boolean (OPTIONAL)
}
```

Responses

```
200

{
    "message": "1 record updated"
}
```

```
401

{
    "message": "Invalid credentials",
    "err": {
        "name": "JsonWebTokenError",
        "message": "invalid token"
    }
}
```

```
404

{
    "message": "Todo could not be found"
}
```

```
500

{
    "error": "Failed to update todo"
}
```

### DELETE TODO

Permission: Token

Method

```
DELETE
```

Endpoint

```
https://wunderlist-backend.herokuapp.com/api/todos/delete/:id
```

Request

```
req.params.id = integer
```

Responses

```
200

{
    "message": "Todo deleted"
}

```

```
401

{
    "message": "Invalid credentials",
    "err": {
        "name": "JsonWebTokenError",
        "message": "invalid token"
    }
}
```

```
404

{
    "message": "Could not find todo with given id ${req.params.id}"
}
```

```
500

{
    "error": "Failed to delete todo"
}
```
