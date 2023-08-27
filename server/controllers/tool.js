import Tool from "../models/Tool.js";

export const createTool = async (req, res, next) => {
  const newTool = new Tool(req.body);

  try {
    const savedTool = await newTool.save();
    res.status(200).json(savedTool);
  } catch (err) {
    next(err);
  }
};

export const updateTool = async (req, res, next) => {
  try {
    const updatedTool = await Tool.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTool);
  } catch (err) {
    next(err);
  }
};

export const deleteTool = async (req, res, next) => {
  try {
    await Tool.findByIdAndDelete(req.params.id);
    res.status(200).json("Tool has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getTool = async (req, res, next) => {
  try {
    const tool = await Tool.findById(req.params.id);
    res.status(200).json(tool);
  } catch (err) {
    next(err);
  }
};

export const getallTool = async (req, res, next) => {
  try {
    const tool = await Tool.find();
    res.status(200).json(tool);
  } catch (err) {
    next(err);
  }
};
