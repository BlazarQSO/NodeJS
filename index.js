const http = require('http');
const { db } = require('./database/database');
const querystring = require('querystring');
const { userNotFound, getHtmlBlock } = require('./utils/utils');

const server = http.createServer((request, response) => {
  const [url, query] = request.url.split('?');
  const params = querystring.parse(query);
  const { id, name, email, hobbies } = params;

  switch (url) {
    case '/user': {
      const user = db.getUser(id);
      if (!user) {
        userNotFound(response);
        return;
      }
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      response.end(getHtmlBlock({
        message: 'User',
        name: user.name,
        email: user.email,
      }));
      break;
    }
    case '/users':
    case '/users/': {
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      const userList = db.getAllUsers();

      const html = userList.reduce((rows, user) => rows + `
        <div style="border: 1px solid gold">
          <div>name: ${user.name}</div>
          <div>email: ${user.email}</div>
        </div>
      `, '');

      response.end(`
        <div style="gap: 10px; display: flex; flex-direction: column;">
          <div>All Users:</div>
          ${html}
        </div>
      `)
      break;
    }
    case '/create': {
      const newUser = db.addUser(name, email);
      response.statusCode = 201;
      response.setHeader('Content-Type', 'text/html');
      response.end(getHtmlBlock({
        message: 'New User',
        name: newUser.name,
        email: newUser.email,
      }));
      break;
    }
    case '/delete': {
      const deletedUser = db.deleteUserById(id);
      if (!deletedUser) {
        userNotFound(response);
        return;
      }
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      response.end(getHtmlBlock({
        message: 'Deleted User',
        name: deletedUser.name,
        email: deletedUser.email,
      }));
      break;
    }
    case '/update': {
      const updateUser = db.updateUser(id, name, email, hobbies && hobbies.split(','));
      if (!updateUser) {
        userNotFound(response);
        return;
      }
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      response.end(getHtmlBlock({
        message: 'Update User',
        name: updateUser.name,
        email: updateUser.email,
        hobbies: updateUser.hobbies,
      }));
      break;
    }
    case `/users/hobbies/list`: {
      const { userName, hobbies } = db.getUserHobbies(id);
      if (!hobbies) {
        userNotFound(response);
        return;
      }
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      response.end(getHtmlBlock({
        message: 'Hobbies User',
        name: userName,
        hobbies,
      }));
      break;
    }
    case `/users/hobbies/add`: {
      const user = db.addUserHobby(id, hobbies && hobbies.split(',')[0]);
      if (!user) {
        userNotFound(response);
        return;
      }
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      response.end(response.end(getHtmlBlock({
        message: 'Hobbies User',
        name: user.name,
        hobbies: user.hobbies,
      })));
      break;
    }
    case `/users/hobbies/delete`: {
      const user = db.deleteUserHobby(id, hobbies && hobbies.split(',')[0]);
      if (!user) {
        userNotFound(response);
        return;
      }
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      response.end(response.end(getHtmlBlock({
        message: 'Hobbies User',
        name: user.name,
        hobbies: user.hobbies,
      })));
      break;
    }
    default: {
      response.statusCode = 404;
      response.setHeader('Content-Type', 'text/plain');
      response.end('Not Response');
    }
  }
});

server.on('error', function (e) {
  console.log(e.message);
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
