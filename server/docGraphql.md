# GraphQL Queries

## Create a new user

```
mutation register($input: UserInput){
  register(input: $input) {
    id
    name
    username
    email
    password
    createdAt
    updatedAt
  }
}
```
```
{
  "input":{
    "name":"juan p",
    "username":"juan",
    "email":"juan@gmail.com",
    "password":"123456"
  }
}

```

## Login

```
mutation login($input: LoginInput){
  login(input: $input) {
    token
  }
}
```
```
{
  "input":{
    "email":"juan@gmail.com",
    "password":"123456"
  }
}
```

## Add a new series

```
query getUser($id: ID, $username: String){
  getUser(id: $id, username: $username) {
    id
    name
    username
    email
    siteWeb
    description
    avatar
    createdAt
    updatedAt
  }
}
```
```
{
  "id":"",
  "username": "alzheimeer"
}
```