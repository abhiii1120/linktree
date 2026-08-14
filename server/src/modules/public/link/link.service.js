import userModel from "../../../models/user.model.js";
import { getLinksByUserId } from "../../../repository/link.repository.js";
import notFound from "../../../shared/errors/notFound.js";

export const getLinksByUserIdService = async (username) => {
    console.log(username)
  const user = await userModel.findOne({ username });

  if (!user) {
    throw new notFound("User not found");
  }

  const links = await getLinksByUserId(user._id);
  return links;
};
