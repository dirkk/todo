ToDo App
=============================

Simple ToDo management app with a user-functionalitiy (registration, login, logout) and a mangement of toDos per user (add, edit, delete of toDos)

# Requirements

You will need the following tools to build and run this app:

 * Node
 * Node Package manager
 * Bower
 * Grunt

# How to run it

    git clone git@github.com:dirkk/todo.git
    cd todo
    npm install
    bower install
    grunt server

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
