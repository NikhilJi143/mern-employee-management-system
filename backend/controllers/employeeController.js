import Employee from "../models/Employee.js";

// ------------------ ADD EMPLOYEE ------------------ //
export const addEmployee = async (req, res) => {
  try {
    const { name, email, department, salary } = req.body;
    if (!name || !email || !department || !salary) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingEmployee = await Employee.findOne({
      email,
    });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,

        message: "Employee already exists",
      });
    }

    const employee = await Employee.create({
      name,
      email,
      department,
      salary,
      createdBy: req.user.id,
    });
    res.status(201).json({
      success: true,
      message: "Employee Added Successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ------------------ GET EMPLOYEE ------------------ //
export const getEmployees = async (req, res) => {
  try {
    const employee = await Employee.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: employee.length,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ------------------ UPDATE EMPLOYEE ------------------ //
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const { name, email, department, salary } = req.body;

    // Check duplicate email (ignore current employee)
    const existingEmployee = await Employee.findOne({
      email,
      _id: { $ne: id },
    });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, department, salary },
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({
      success: true,
      message: "Employee Updated Successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ------------------ DELETE EMPLOYEE ------------------ //
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    await employee.deleteOne();

    res.status(200).json({
      success: true,
      message: "Employee Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ------------------ SEARCH EMPLOYEE ------------------ //
export const searchEmployee = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const employees = await Employee.find({
      name: {
        $regex: keyword,
        $options: "i",
      },
    });

    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ------------------ PAGINATION EMPLOYEE ------------------ //
export const getEmployeesPagination = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const totalEmployees = await Employee.countDocuments();
    const employees = await Employee.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalEmployees / limit),
      totalEmployees,
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
