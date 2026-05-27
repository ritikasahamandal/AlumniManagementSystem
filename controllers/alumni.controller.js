import { sql } from "../config/db.js";

export const upsertAlumniProfile = async (
  req,
  res
) => {

  const {
    degree,
    department,
    graduation_year,

    company,
    job_title,
    location,
  } = req.body;

  const user_id = req.user.id;

  try {

    // UPSERT ALUMNI TABLE

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

    // INSERT EDUCATION TABLE
    
    const education = await sql`

      INSERT INTO education (
        user_id,
        degree,
        department,
        graduation_year
      )

      VALUES (
        ${user_id},
        ${degree},
        ${department},
        ${graduation_year}
      )

      RETURNING *;

    `;

    res.json({
      message:
        "Profile updated successfully",

      education: education[0],
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

        education.degree,
        education.department,
        education.graduation_year

      FROM users

      JOIN alumni
      ON users.id = alumni.user_id

      JOIN education
      ON users.id = education.user_id

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
    department,
    degree,
    graduation_year,
  } = req.query;

  try {

    let conditions = [];

    if (name) {

      conditions.push(
        sql`users.name ILIKE ${"%" + name + "%"}`
      );
    }


    if (company) {

      conditions.push(
        sql`alumni.company ILIKE ${"%" + company + "%"}`
      );
    }


    if (department) {

      conditions.push(
        sql`education.department ILIKE ${"%" + department + "%"}`
      );
    }


    if (degree) {

      conditions.push(
        sql`education.degree ILIKE ${"%" + degree + "%"}`
      );
    }


    if (graduation_year) {

      conditions.push(
        sql`education.graduation_year = ${graduation_year}`
      );
    }

    const result = await sql`

      SELECT

        users.id,
        users.name,
        users.email,
        users.is_approved,

        alumni.company,
        alumni.job_title,
        alumni.location,

        education.degree,
        education.department,
        education.graduation_year

      FROM users

      JOIN alumni
      ON users.id = alumni.user_id

      JOIN education
      ON users.id = education.user_id

      WHERE users.role = 'alumni'

      ${conditions.length > 0
        ? sql`
            AND ${sql.join(
              conditions,
              sql` AND `
            )}
          `
        : sql``}

    `;

    res.json(result);

  } catch (error) {

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

        education.degree,
        education.department,
        education.graduation_year

      FROM users

      JOIN alumni
      ON users.id = alumni.user_id

      JOIN education
      ON users.id = education.user_id

      WHERE users.id = ${req.user.id};

    `;

    res.json(profile[0]);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};