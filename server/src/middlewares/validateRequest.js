import { z } from "zod";
import BadRequest from "../shared/errors/badRequest.js";

export function validateRequest(schema) {
  return function validateRequestMiddleware(req, res, next) {
    console.log("BODY:", req.body);
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      next(new BadRequest("Validation failed", z.treeifyError(result.error)));
      return;
    }

    req.validated = result.data;
    next();
  };
}