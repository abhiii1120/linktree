import linkModel from "../../../models/link.model.js";
import userModel from "../../../models/user.model.js";
import { getLinksByUserId } from "../../../repository/link.repository.js";
import notFound from "../../../shared/errors/notFound.js";

export const getLinksByUserIdService = async (username) => {
  const user = await userModel.findOne({ username });

  if (!user) {
    throw new notFound("User not found");
  }

  const links = await getLinksByUserId(user._id);
  return links;
};

export const incrementLinkClickService = async (linkId) => {
  const link = await linkModel.findById(linkId);

  if(!link){
    throw new notFound("link not found");
  }

  link.clicks += 1;
  await link.save();

  return link;
}