import { StatusCodes } from "http-status-codes";

export const buildSuccessResponse = (res,message,data,statusCode) => [
    res.status(statusCode || StatusCodes.OK).json({
        success:true,
        message,
        data,
    })
]