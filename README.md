# - RESTful API & SQLite In NodeJS
## Getting started
- Fork the repo.
- Clone the forked repo into your machine.
- Create `.env`, you may copy it from `variables file` and do your changes.
- `npm install`
- `npm start`

## Environment Variables file.
```
URL="/api/v1"
APP_PORT=3000                                   
DATABASE=dev                              # name of database sqlite
JWT_SECRET_KEY="your_secret_key_here"
TOKEN_EXPIRATION=10800                    # token with 3 hour of expiration (60*60*3)
ENVIRONMENT=development                    
```

## Prerequisites
- Postman to test Rest API, you can find API collection.json from here (https://drive.google.com/drive/folders/1eSwID1C7sorQ6cWsaPDqxVUW7Rwv2UbO?usp=share_link).

## Endpoints
- `http://localhost:3000/` URL: use for test in browser

- Use Postman For Test

`Auth`
- `http://localhost:3000/api/v1/auth/signup` POST: to add new user record `username , password`
- `http://localhost:3000/api/v1/auth/signin` POST: to get user list and check info `username , password`

`Posts`
- `http://localhost:3000/api/v1/posts` POST: to add new post record
- `http://localhost:3000/api/v1/posts` GET: to get all posts record
- `http://localhost:3000/api/v1/posts/id` GET: to get post record by id
- `http://localhost:3000/api/v1/posts/id` UPDATE: to update post record by id 
- `http://localhost:3000/api/v1/posts/id` DELETE: to delete post record by id 

## Details Of The Error Handling
- Any error path redirect to `Not Fount API` such id or string
- `username & password ` not allow empty input in `signup or signin`
- `username & password ` min char is `5` , max char is `8`
- Any operation in `posts` need to `authentication`
- check User already exists before `signup` `check User Duplicate`
- if deleted file database it will by generated if not exist at start app `npm start`
- check post input is valid to make new record post `title & text`



