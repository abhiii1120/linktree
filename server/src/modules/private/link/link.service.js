import { createLink } from "../../../repository/link.repository.js";
import BadRequest from "../../../shared/errors/badRequest.js";
import InternalServerError from "../../../shared/errors/internalServerError.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";

export async function createLinkService(payload) {
    const {title,url,userId} = payload;
    const newLink = await createLink({
        user:userId,
        title,
        url,
    })
    if(!newLink) throw new InternalServerError('Failed to create link');

    return newLink;
}
