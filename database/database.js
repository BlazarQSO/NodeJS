const { defaultDatabase } = require('../constants/constants.js');
const { User } = require('../models/user.js');

class Database {
  constructor(users = defaultDatabase) {
    this.users = users;
  }

  findUser(userId) {
    return this.users.find(({ id }) => id === userId);
  }

  getUser(userId) {
    const user = this.findUser(userId);

    if (user) {
      return { name: user.name, email: user.email };
    }
  }

  getAllUsers() {
    return this.users.map(({ name, email }) => ({ name, email }));
  }

  addUser(name, email) {
    const newUser = new User(this.users.length, name, email);
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, name, email, hobbies) {
    const updatedUser = this.findUser(id);
    if (updatedUser) {
      if (name) {
        updatedUser.name = name;
      }
      if (email) {
        updatedUser.email = email;
      }
      if (hobbies) {
        updatedUser.hobbies = hobbies;
      }

      return updatedUser;
    }
  }

  deleteUserById(userId) {
    const user = this.findUser(userId);
    if (user) {
      this.users = this.users.filter(({ id }) => id !== userId);

      return user;
    }
  }

  getUserHobbies(userId) {
    const user = this.findUser(userId);

    if (user) {
      return { userName: user.name, hobbies: user.hobbies };
    }
  }

  addUserHobby(userId, hobby) {
    const user = this.findUser(userId);

    if (user) {
      if (!user.hobbies.includes(hobby)) {
        user.hobbies.push(hobby);
      }

      return user;
    }
  }

  deleteUserHobby(userId, deletedHobby) {
    const user = this.findUser(userId);

    if (user) {
      if (user.hobbies.includes(deletedHobby)) {
        user.hobbies = user.hobbies.filter((userHobby) => userHobby !== deletedHobby);
      }

      return user;
    }
  }
}

module.exports = {
  db: new Database(),
}
