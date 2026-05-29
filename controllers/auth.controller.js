import { sql } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { transporter } from "../config/mail.js";

export const register = async (
  req,
  res
) => {

  const {

    name,
    email,
    password,
    role,

    course_name,
    graduation_year,

    company,
    job_title,
    location,

  } = req.body;

  try {

    // =========================
    // CHECK USER EXISTS
    // =========================

    const existingUser = await sql`

      SELECT *
      FROM users
      WHERE email = ${email};

    `;

    if (existingUser.length > 0) {

      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    // =========================
    // HASH PASSWORD
    // =========================

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // =========================
    // INSERT USER
    // =========================

    const users = await sql`

      INSERT INTO users (

        name,
        email,
        password,
        role

      )

      VALUES (

        ${name},
        ${email},
        ${hashedPassword},
        ${role}

      )

      RETURNING *;

    `;

    const user = users[0];

    // =========================
    // IF ALUMNI
    // =========================

    if (role === "alumni") {

      // =====================
      // INSERT ALUMNI
      // =====================

      await sql`

        INSERT INTO alumni (

          user_id,
          company,
          job_title,
          location

        )

        VALUES (

          ${user.id},
          ${company},
          ${job_title},
          ${location}

        );

      `;

      // CHECK COURSE EXISTS
      

      let courses = await sql`

        SELECT *
        FROM courses
        WHERE course_name = ${course_name};

      `;

      let course;

      // =====================
      // CREATE COURSE
      // =====================

      if (courses.length === 0) {

        const newCourse = await sql`

          INSERT INTO courses (
            course_name
          )

          VALUES (
  ${course_name}
)

          RETURNING *;

        `;

        course = newCourse[0];

      } else {

        course = courses[0];
      }

      // =====================
      // INSERT RELATION
      // =====================

      await sql`

        INSERT INTO alumni_courses (

          alumni_id,
          course_id,
          graduation_year

        )

        VALUES (

          ${user.id},
          ${course.course_id},
          ${graduation_year}

        );

      `;
    }

    res.status(201).json({
      message:
        "Registration successful",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {

  const { email } = req.body;

  try {

    // Check user
    const user = await sql`
            SELECT * FROM users
            WHERE email = ${email};
        `;

    if (user.length === 0) {

      return res.status(404).json({
        message: "Email not found"
      });
    }

    // Generate reset token
    const token = jwt.sign(

      { email },

      process.env.JWT_SECRET,

      { expiresIn: "15m" }

    );

    // Reset URL
    const resetURL =
      `http://localhost:5173/reset-password/${token}`;

    // Send Mail
    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: email,

      subject: "Reset Password",

      html: `
                <h2>Password Reset</h2>

                <p>
                    Click below to reset your password:
                </p>

                <a href="${resetURL}">
                    Reset Password
                </a>
            `
    });

    res.json({
      message: "Reset link sent to email"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });
  }
};

export const resetPassword = async (req, res) => {

  const { token } = req.params;

  const { password } = req.body;

  try {

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Hash new password
    const hashed =
      await bcrypt.hash(password, 10);

    // Update password
    await sql`
            UPDATE users
            SET password = ${hashed}
            WHERE email = ${decoded.email};
        `;

    res.json({
      message: "Password reset successful"
    });

  } catch (error) {

    res.status(400).json({
      error: "Invalid or expired token"
    });
  }
};

export const login = async (req, res) => {
  const {
    email,
    password,
    role
  } = req.body;

  try {
    const user = await sql`
    SELECT *
    FROM users
    WHERE email = ${email}
    AND role = ${role};
`;

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user[0].role !== role) {
      return res.status(403).json({
        message: `You are not registered as ${role}`
      });
    }

    const valid = await bcrypt.compare(password, user[0].password);

    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user[0].id, role: user[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user: user[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};