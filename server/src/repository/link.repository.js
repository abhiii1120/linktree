import { StatusCodes } from "http-status-codes";
import linkModel from "../models/link.model.js";
import AppError from "../shared/errors/app.error.js";

export let createLink = async (payload) => {
  try {
    return await linkModel.create(payload);
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      throw new AppError(`${field} already exists`, StatusCodes.CONFLICT);
    }
    throw error;
  }
};

export let getLinksByUserId = async (userId) => {
    return await linkModel.find({user:userId});
}