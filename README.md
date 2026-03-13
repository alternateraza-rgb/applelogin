# Apple Login Clone Project

## Table of Contents

1. [Introduction]()
2. [Setup]()
3. [Usage]()
4. [Components]()
5. [Styling]()
6. [Contributing]()
7. [License]()

## Introduction

Welcome to the Apple Login Clone Project! This project is a clone of the Apple login page, built using React. The goal of this project is to provide a starting point for developers who want to create their own login pages or learn more about React and front-end development.

## Setup

To get started with the Apple Login Clone Project, follow these steps:

1. Clone the repository to your local machine:

```
git clone https://github.com/your-username/apple-login-clone.git
```

2. Navigate to the project directory:

```
cd apple-login-clone
```

3. Install the dependencies:

```
npm install
```

4. Start the development server:

```
npm start
```

## Screenshot

![Snap](https://user-images.githubusercontent.com/81587039/230732855-8388e841-eac5-4208-beaa-f2fe875ae6d2.png)


## Usage

To use the Apple Login Clone Project, simply navigate to `http://localhost:3000` in your web browser. You will see the Apple login page, complete with a form for entering your Apple ID and password.

## Response Logger (Netlify Functions)

This project includes a response logger with two function endpoints:

1. `POST /.netlify/functions/response-logger` (also available at `/api/response-logger`) to write a log entry.
2. `GET /.netlify/functions/response-logs?limit=25` (also available at `/api/response-logs`) to read recent log entries.

Example log write:

```bash
curl -X POST http://localhost:8888/api/response-logger \
  -H "content-type: application/json" \
  -d '{"status":200,"responseBody":{"message":"ok"}}'
```

Example log read:

```bash
curl http://localhost:8888/api/response-logs?limit=10
```

Run locally with Netlify emulation:

```bash
/opt/buildhome/node-deps/node_modules/.bin/netlify dev
```

## Components

The Apple Login Clone Project is built using several React components:

* `Navbar`: This component contains the Apple logo and the "Sign in" button.
* `Main`: This component contains the login form, including the email and password inputs and the "Sign in" button.
* `Footer`: This component contains the copyright information and the links to the Apple privacy policy and terms of use.

## Styling

The Apple Login Clone Project uses CSS for styling. The CSS files are located in the `src/components` directory.

## Contributing

We welcome contributions to the Apple Login Clone Project! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Create a pull request.

## License

The Apple Login Clone Project is licensed under the MIT License. See the `LICENSE` file for more information.
