// controllers/registerController.js
import Register from "../models/Register.js";
import sendRegisterSMS from "../utils/sendRegisterSMS.js";

/* ==========================
   CREATE REGISTER
========================== */
export const createRegister = async (req, res) => {
  try {
    const {
      name,
      age,
      address,
      city,
      mobile,
      gender,
      profession,
      visitingDay,
    } = req.body;

    // ==========================
    // VALIDATION
    // ==========================
    if (
      !name ||
      !age ||
      !address ||
      !city ||
      !mobile ||
      !gender ||
      !profession ||
      !visitingDay
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Mobile validation
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Mobile must be 10 digits",
      });
    }

    const mobileExists = await Register.findOne({ mobile });
    if (mobileExists) {
      return res.status(409).json({
        success: false,
        message: "Mobile already registered",
      });
    }

    // ==========================
    // GENERATE REG NUMBER
    // ==========================
    const lastReg = await Register.findOne({})
      .sort({ createdAt: -1 })
      .select("regNum");

    let nextNumber = 1001;
    if (lastReg?.regNum) {
      nextNumber = parseInt(lastReg.regNum.split("-")[1]) + 1;
    }

    const regNum = `REG-${nextNumber}`;

    // ==========================
    // CREATE REGISTER
    // ==========================
    const register = await Register.create({
      name,
      age,
      address,
      city,
      mobile,
      gender,
      profession,
      visitingDay,
      regNum,
      generateQR: true,
    });

    // SEND SMS
    try {
      const qrLink = `${process.env.BACKEND_URL}/r/${register.regNum}`;

      await sendRegisterSMS({
        mobile: register.mobile,
        name: register.name,
        regNum: register.regNum,
        qrLink,
      });
    } catch (smsError) {
      console.error("Registration SMS failed:", smsError.message);
    }

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: register,
    });
  } catch (error) {
    console.error("Create Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ==========================
   GET ALL REGISTERS
========================== */
export const getAllRegisters = async (req, res) => {
  try {
    const registers = await Register.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: registers.length,
      data: registers,
    });
  } catch (error) {
    console.error("Get All Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ==========================
   GET SINGLE REGISTER
========================== */
export const getRegisterById = async (req, res) => {
  try {
    const { id } = req.params;

    const register = await Register.findById(id);

    if (!register) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: register,
    });
  } catch (error) {
    console.error("Get By ID Error:", error);
    return res.status(400).json({
      success: false,
      message: "Invalid ID",
    });
  }
};

/* ==========================
   URL redirect
========================== */
export const redirectToQR = async (req, res) => {
  try {
    const { regNum } = req.params;

    const register = await Register.findOne({ regNum });

    if (!register) {
      return res.status(404).send("Invalid QR Link");
    }

    return res.redirect(
      `${process.env.FRONTEND_URL}/qr/${register._id}`
    );
  } catch (error) {
    console.error("Redirect Error:", error);
    return res.status(500).send("Server Error");
  }
};