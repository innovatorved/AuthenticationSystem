# **Authentication System**

A Simple Authentication System Implemented in nodejs

## Deployment

Deploy Application on Cloud

### Clone the Repo

```bash
    ghttps://github.com/innovatorved/AuthenticationSystem.git
```

### Install Dependencies

```bash
    cd AuthenticationSystem
    yarn
    yarn start
```

### 📁 _Directory view_

    .
    ├── databse                     # Database Connection to MongoDB
    │
    ├── models                      # User - Database Schema
    │
    ├── src                         # Source files
    │   │
    │   ├── middleware              # All Middleware Files
    │   │
    │   └── routes                  # Context - Global State Manager
    │       │
    │       ├── auth                # Authentication routes - createaccount , login routes
    │       │
    │       ├── admin               # Only Admin user can access these routes
    │       │
    │       ├── secure              # Only Authentication user can access these routes
    │       │
    │       └── app.js              # All router are connected
    │
    ├── .env.example                # Needs to create the .env file as per .env.example
    │
    │
    └── index.js                    # Startpoint of the Entire Application

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Reference

- [https://mongoosejs.com/docs/](https://mongoosejs.com/docs/)
- [https://www.npmjs.com/package/bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [https://jwt.io/](https://jwt.io/)
- [https://expressjs.com/en/guide/routing.html](https://expressjs.com/en/guide/routing.html)

## Authors

- [Ved Gupta](https://www.github.com/innovatorved)

## 🚀 About Me

I'm a Developer i will feel the code then write .

## Support

For support, email vedgupta@protonmail.com
