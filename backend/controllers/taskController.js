import Task from "../models/Task.js";
import Employee from "../models/Employee.js";

// ---------------- ADD TASK ------------------ //
export const addTask = async (req, res) => {
  try {
    const { title, description, assignedTo ,status} = req.body;
    if (!title?.trim() || !description?.trim() || !assignedTo) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const employee = await Employee.findById(assignedTo);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo,
      status,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Task Added Successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ---------------- GET TASK ------------------ //
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name department")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ---------------- UPDATE TASK ------------------ //
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ---------------- DELETE TASK ------------------ //
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
