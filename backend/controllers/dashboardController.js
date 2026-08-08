import Employee from "../models/Employee.js";
import Task from "../models/Task.js";

export const dashboardStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();

    const totalTasks = await Task.countDocuments();

    const pendingTasks = await Task.countDocuments({
      status: "Pending",
    });

    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });

    const progressTasks = await Task.countDocuments({
      status: "In Progress",
    });

    res.status(200).json({
      success: true,
      stats: {
        totalEmployees,
        totalTasks,
        pendingTasks,
        completedTasks,
        progressTasks,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
