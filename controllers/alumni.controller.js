import { sql } from "../config/db.js";

export const upsertAlumniProfile = async (
  req,
  res
) => {

  const {

    company,
    job_title,
    location,

    course_name,
    graduation_year,

  } = req.body;

  const user_id = req.user.id;

  try {

    // =====================
    // UPDATE ALUMNI
    // =====================

    await sql`

      INSERT INTO alumni (

        user_id,
        company,
        job_title,
        location

      )

      VALUES (

        ${user_id},
        ${company},
        ${job_title},
        ${location}

      )

      ON CONFLICT (user_id)

      DO UPDATE SET

        company = EXCLUDED.company,
        job_title = EXCLUDED.job_title,
        location = EXCLUDED.location;

    `;

    // =====================
    // GET COURSE
    // =====================

    let coursesData = await sql`

      SELECT *
      FROM courses

      WHERE course_name =
      ${course_name};

    `;

    let course;

    // =====================
    // CREATE COURSE
    // =====================

    if (coursesData.length === 0) {

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

      course = coursesData[0];
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

        ${user_id},
        ${course.course_id},
        ${graduation_year}

      )

      ON CONFLICT (
        alumni_id,
        course_id
      )

      DO UPDATE SET

        graduation_year =
        EXCLUDED.graduation_year;

    `;

    res.json({
      message:
        "Profile updated successfully",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
};

export const getAllAlumni = async (
  req,
  res
) => {

  try {

    const result = await sql`

      SELECT

        users.id,
        users.name,
        users.email,
        users.is_approved,

        alumni.company,
        alumni.job_title,
        alumni.location,

        courses.course_name,

        alumni_courses.graduation_year

      FROM users

      JOIN alumni
      ON users.id = alumni.user_id

      JOIN alumni_courses
      ON users.id = alumni_courses.alumni_id

      JOIN courses
      ON alumni_courses.course_id =
         courses.course_id

      WHERE users.role = 'alumni';

    `;

    res.json(result);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
};


export const searchAlumni = async (
  req,
  res
) => {

  const {
    name,
    company,
    course_name,
    graduation_year,
  } = req.query;

  try {

    const result = await sql`

      SELECT

        users.id,
        users.name,
        users.email,
        users.role,
        users.is_approved,

        alumni.company,
        alumni.job_title,
        alumni.location,

        courses.course_name,

        alumni_courses.graduation_year

      FROM users

      JOIN alumni
      ON users.id = alumni.user_id

      JOIN alumni_courses
      ON users.id = alumni_courses.alumni_id

      JOIN courses
      ON alumni_courses.course_id =
         courses.course_id

      WHERE users.role = 'alumni'

      AND (
        ${!name}
        OR users.name ILIKE ${"%" + name + "%"}
      )

      AND (
        ${!company}
        OR alumni.company ILIKE ${"%" + company + "%"}
      )

      AND (
        ${!course_name}
        OR courses.course_name ILIKE ${"%" + course_name + "%"}
      )

      AND (
        ${!graduation_year}
        OR alumni_courses.graduation_year =
           ${graduation_year}
      );

    `;

    res.json(result);

  } catch (error) {

    console.error(
      "SEARCH ERROR =>",
      error.message
    );

    res.status(500).json({
      error: error.message,
    });
  }
};
export const getMyProfile = async (
  req,
  res
) => {

  try {

    const profile = await sql`

      SELECT

        users.id,
        users.name,
        users.email,
        users.is_approved,

        alumni.company,
        alumni.job_title,
        alumni.location,

        courses.course_name,

        alumni_courses.graduation_year

      FROM users

      JOIN alumni
      ON users.id = alumni.user_id

      JOIN alumni_courses
      ON users.id = alumni_courses.alumni_id

      JOIN courses
      ON alumni_courses.course_id =
         courses.course_id

      WHERE users.id = ${req.user.id};

    `;

    res.json(profile);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
};