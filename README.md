# RESTAPI-with-Express

A NodeJS based RestAPI with authentication and authorization that support content-negotiation

## Quick start

1.  **Get to the workplace.**

    After clong this repository navigate into your api directory and load it in IDE/Editor

    ```shell
    cd directory_name
    code .
    ```

2.  **Open the source code and start editing**

    - Update the environement variables in .env file

    - Install the dependencies and run the server.

      ```shell
      npm install
      npm run dev #run with nodemon for auto reload
      npm start #default starter
      ```

    By default this server will be running at `http://localhost:8084`!

## Project Structure

    ├── config/
    ├── controller/
    ├── middleware/
    ├── model/
    ├── routes/
    ├── utils/
    ├── app.js
    └── .env

1.  **`config/`**: This directory contains database configurations.

2.  **`controller/`**: Contains `Authenication controller` and the `Article controller`.

3.  **`middleware/`**: Contains the middleware to execute before handling a request. User token verfication and autherization are handled here.

4.  **`model/`**: This directory contains data models and DB operations related to that model.

5.  **`routes/`**: This directory contains all of the routing related modules.

6.  **`utils/`**: Utility functions used in this project are stored here, data type converter, for example.

7.  **`app.js`**: This is the main configuration file for for this API.

8.  **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

9.  **`app.js`**: This is the starter and main configuration file for for this API.

10. **`.env`**: A text file containing environment variables to run this project project.
