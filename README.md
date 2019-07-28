# ToDo MERN 
ToDo app built with MongoDB, Express, React and Node (MERN stack), and deployed on DigitalOcean with Nginx reverse proxy server. 

### Installing

A step by step series of examples that tell you have to get a development env running:

1. Clone the repo
```
git clone git@github.com:jjtfsalgado/todo-mern-app.git
```

2. Install mongodb and run mongo server
* [MongoDB](https://docs.mongodb.com/manual/installation/)

3. Move into the client folder, install dependencies and run webpack:
```
cd client
npm i
webpack -w
```
4. Move into the server folder, install dependencies and run nodemon:
```
cd server
npm i
nodemon server.js
```
And thats it!! Hopefully it will run on port 3000.

## Built With

* [Axios](https://github.com/mzabriskie/axios) - Promise based HTTP client for the browser and node.js
* [Sass](http://sass-lang.com/) - Css pre-processor
* [React-Bootstrap](https://react-bootstrap.github.io/) - The most popular front-end framework, rebuilt for React
* [Susy](http://susy.oddbird.net/) - Sass grid system
* [Foundation](http://foundation.zurb.com/) - Responsive front-end framework
* [Nodemon](https://nodemon.io/) - Auto-refresh the server on code change
* [JWT](https://jwt.io/) - JSON Web Tokens are a method for representing claims securely between two parties
* [Nodemailer](https://nodemailer.com/about/) - Module for Node.js to send emails
* [Bcrypt](https://github.com/dcodeIO/bcrypt.js/blob/master/README.md) - Password hashing function
* [Mongoose](http://mongoosejs.com/) - Mongodb object modeling for Node.js
* [Lodash](https://lodash.com/) - JavaScript utility library delivering consistency, modularity and performance

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details. This application was developed on a training context with no commercial purposes.
