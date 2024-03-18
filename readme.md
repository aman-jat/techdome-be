
# Techdome backend





## Authors

- [@aman-jat](https://github.com/aman-jat)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_USER`

`DB_PASS`

`DB_HOST`

`DB_NAME`

`AUTH_SECRET`

`DB_PORT`

`PORT`

## Installation & Run Locally (with cloud DB)

Clone the project

```bash
  git clone https://github.com/aman-jat/techdome-be
```

Go to the project directory

```bash
  cd techdome-be
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

The Postgres Database has been deployed on the **Neon Console**.

## Deployment

There's no need for manual deployment of this project. After committing to the main branch, it automatically deploys to Heroku.
Deployed URL: https://techdome-9a32a94f36a3.herokuapp.com




## API Reference


### Auth
#### Sign Up

```http
  POST /api/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`    | `string` | **Required**. User's name.                 |
| `email`   | `string` | **Required**. User's email address.        |
| `password`| `string` | **Required**. User's password.             |
| `role`    | `string` | **Required**. User's role (`LENDER` or `BORROWER`). |

Upon successful registration, returns an authentication token along with user details.
````
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzEwNjQ0NTEwfQ.P0ffXtlWQk26B6BF2Y9AkCZArCCXI4J9gBIJg1cA8uM",
    "member": {
        "id": 4,
        "email": "saif3@gmail.com",
        "user_id": 4,
        "name": "Saif",
        "role": "LENDER",
        "updatedAt": "2024-03-17T03:01:50.503Z",
        "createdAt": "2024-03-17T03:01:50.503Z"
    }
}
````

#### Login

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. User's email address.        |
| `password`| `string` | **Required**. User's password.             |

Upon successful login, returns an authentication token along with user details.
````
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzEwNjQ0NTEwfQ.P0ffXtlWQk26B6BF2Y9AkCZArCCXI4J9gBIJg1cA8uM",
    "member": {
        "id": 4,
        "email": "john@gmail.com",
        "user_id": 4,
        "name": "John",
        "role": "LENDER",
        "updatedAt": "2024-03-17T03:01:50.503Z",
        "createdAt": "2024-03-17T03:01:50.503Z"
    }
}
````
#### Logout

```http
  GET /api/auth/logout
```
Upon successful logout, returns a status.
````
{
    "status": "Logout Successful"
}
````
### Loan
#### Apply for a loan

```http
  POST /api/loan
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `amount`   | `number` | **Required**. Loan amount.        |
| `tenure`   | `number` | **Required**. Loan tenure.        |

#### Get all loans

```http
  GET /api/loan
```
#### Get one loan
```http
  GET /api/loan/1
```

#### Approve a loan
```http
  PUT /api/loan/1/approve
```

#### Repay a loan
```http
  PUT /api/loan/1/repay
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `amount`   | `number` | **Required**. Amount to repay.        |

### Member
#### Get me
```http
  PUT /api/member/me
```
## Documentation

[Documentation](https://linktodocumentation)


## Features

- Authentication and Authorization
- Lender and Borrower Account Creation
- Loan Creation
- Loan Approval
- Payment Processing


## Feedback

If you have any feedback, please reach out to me at amanjat261@gmail.com

