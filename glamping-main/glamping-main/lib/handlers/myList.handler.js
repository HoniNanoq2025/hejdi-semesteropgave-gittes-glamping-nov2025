import dbConnect from "../db/dbConnect.js";
import myListModel from "../db/models/myList.model.mjs";

export const saveList = async (body) => {
  let result = { status: "error", message: "An Error Occurred", data: [] };

  try {
    await dbConnect();

    let data = null;
    // Fix: Search by email instead of name
    let exists = await myListModel.findOne({ email: body.email });

    if (body.activityIds !== undefined) {
      // Only split if it's a string
      if (typeof body.activityIds === "string") {
        body.activityIds = body.activityIds.split(",").map((id) => id.trim());
      }
    }

    if (exists) {
      // Fix: Use exists._id instead of undefined 'id'
      data = await myListModel.findOneAndUpdate({ _id: exists._id }, body, {
        new: true,
      });
      result = {
        status: "ok",
        message: "List updated successfully",
        data: data,
      };
    } else {
      data = await myListModel.create(body);
      result = {
        status: "ok",
        message: "List created successfully",
        data: data,
      };
    }
  } catch (error) {
    console.log(error);
    result = {
      status: "error",
      message: error.message || "An Error Occurred",
      data: [],
    };
  }

  return result;
};
