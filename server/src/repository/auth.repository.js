import userModel from "../models/user.model.js";

export default class UserRepo {
  async create(payload) {
    return userModel.create(payload);
  }

  async findById(id) {
    return userModel.findById(id);
  }

  async findByEmail(email) {
    return userModel.findOne({ email });
  }
}
