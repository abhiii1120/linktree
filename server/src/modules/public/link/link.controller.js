import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";
import { getLinksByUserIdService, incrementLinkClickService } from "./link.service.js";

export const getLinksByUsername = async (req, res) => {
  const { username } = req.params;
  let links = await getLinksByUserIdService(username);

  return buildSuccessResponse(res,'Links retrieved successfully',links);
};

export const incrementLinkClick = async (req,res) =>{
  const {linkId} = req.params;
  let link = await incrementLinkClickService(linkId);

  return buildSuccessResponse(res,"link click incremented successfully",link);
}