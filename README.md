ToDo App
=============================

Simple user-based ToDo management app. A user can be registered, can login and logout. Each user can then manege his/her toDos (add, edit, delete).

# Requirements

You will need the following tools to build and run this app:

 * [Node](http://nodejs.org/)
 * [Node Package manager](https://npmjs.org/)
 * [Bower](http://bower.io/)
 * [Grunt](http://gruntjs.com/)

# How to run it

    git clone git@github.com:dirkk/todo.git
    cd todo
    npm install
    bower install
    grunt server

# Architecture

The client interface is writte in [Angular.Js](http://angularjs.org/) and designed using [Bootstrap 3](http://getbootstrap.com/). The server-side uses [node.js](http://nodejs.org/) and [express](http://expressjs.com/) as web application framework. [MongoDB](http://www.mongodb.org/) is used as database.

# API

This App has a RESTful interface. Using [curl](http://curl.haxx.se) you can also access the whole functionality. Strings written in upper case letters have to be replace with actual values.

### Register User

    curl -X POST "http://localhost:9000/signup" -H "Content-Type: application/json;charset=UTF-8" --data-binary "{\"email\":\"YOUREMAIL\",\"pw\":\"YOURPASSWORD\"}"

### Login User

During login a cookie will be saved to the file `cookie` as it will server as authentification for the user-specific tasks.

    curl -X POST "http://localhost:9000/login" -H "Content-Type: application/json;charset=UTF-8" -c cookie --data-binary "{\"email\":\"YOUREMAIL\",\"pw\":\"YOURPASSWORD\"}"

### Logout User

    curl -X GET "http://localhost:9000/logout"

### Get all ToDos

    curl -X GET "http://localhost:9000/todos" -b cookie

### Add a new ToDo

    curl -X POST "http://localhost:9000/todo/add" -H "Content-Type: application/json;charset=UTF-8" -b cookie --data-binary "{\"prio\":1,\"task\":\"YOURTASK\"}"

### Edit an existing ToDo

    curl -X PUT "http://localhost:9000/todo/edit/TODO-ID" -H "Content-Type: application/json;charset=UTF-8" -b  cookie --data-binary "{\"prio\":NEWPRIO,\"task\":\"NEWTASKDESCRIPTION\"}"

### Delete an existing ToDo

    curl -X DELETE "http://localhost:9000/todo/delete/TODO-ID" -b  cookie
