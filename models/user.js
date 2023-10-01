class User {
  constructor(id, name, email, hobbies = []) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.hobbies = hobbies;
  }
}

module.exports = {
  User,
};
