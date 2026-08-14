import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";
import { getLinksByUserIdService } from "./link.service.js";

export const getLinksByUsername = async (req, res) => {
  const { username } = req.params;
  let links = await getLinksByUserIdService(username);

  return buildSuccessResponse(res,'Links retrieved successfully',links);
};
