import Task from "../models/Task.js";
import { ApiError } from "../middleware/errorMiddleware.js";

const taskOwnerFilter = (req) => (req.user.role === "student" ? { studentId: req.user._id } : {});

export const getTasks = async (req, res, next) => {
  try {
    const { status, priority, search, page = 1, limit = 20, sort = "deadline" } = req.query;
    const filter = { ...taskOwnerFilter(req) };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) filter.title = new RegExp(search, "i");

    const [items, total] = await Promise.all([
      Task.find(filter).sort(sort).skip((Number(page) - 1) * Number(limit)).limit(Number(limit)),
      Task.countDocuments(filter)
    ]);
    res.json({ success: true, data: items, total, page: Number(page) });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      studentId: req.body.studentId || req.user._id,
      createdBy: req.user._id
    });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const filter = { _id: req.params.id, ...taskOwnerFilter(req) };
    const patch = { ...req.body };
    if (patch.status === "completed") patch.completedAt = new Date();
    const task = await Task.findOneAndUpdate(filter, patch, { new: true, runValidators: true });
    if (!task) throw new ApiError(404, "Task not found");
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, ...taskOwnerFilter(req) });
    if (!task) throw new ApiError(404, "Task not found");
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};
