const User = require("./../models/userModel");

class UserService {
  getUsers(offset, limit) {
    const query = User.find({}).skip(offset).limit(limit).exec();
    return query;
  }

  addUser(user) {
    const newUser = new User(user);
    return newUser.save();
  }

  modifyUser(id, data) {
    const user = User.findOneAndUpdate({ _id: id }, data).exec();
    return user;
  }

  async deleteUser(id) {
    const response = await User.deleteOne({ _id: id });
    
    if (response.deletedCount > 0) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = UserService;
