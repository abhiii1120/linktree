import linkModel from '../../../models/link.model.js';
import { buildSuccessResponse } from '../../../shared/utils/buildSuccessResponse.js';
import { createLinkService } from './link.service.js';


//using function method
export const createLinkController = async (req,res) => {
    const newLink = await createLinkService({
        ...req.validated.body,
        userId: req.user._id,
    })
    return buildSuccessResponse(res,'link created successfully',newLink);
}