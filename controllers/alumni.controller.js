import { sql } from "../config/db.js";

export const upsertAlumniProfile= async(req,res)=>{
    const {graduation_year, department, company, job_title, location}= req.body;
    const user_id= req.user.id;

    try {
        const result = await sql`
            INSERT INTO alumni (user_id, graduation_year, department, company, job_title, location)
            VALUES (${user_id}, ${graduation_year},${department},${company},${job_title},${location})
            ON CONFLICT (user_id)
            DO UPDATE SET
                graduation_year = EXCLUDED.graduation_year,
                department = EXCLUDED.department,
                company = EXCLUDED.company,
                job_title = EXCLUDED.job_title,
                location = EXCLUDED.location
            RETURNING *;
        `;
        res.json(result[0]);


    } catch (error) {
        res.status(500).json({error: error.message});
    }

};

export const getAllAlumni = async(req,res)=>{
    try {
        const result= await sql`
            SELECT users.id, users.name, users.email,
                alumni.graduation_year, alumni.department,
                alumni.company, alumni.job_title, alumni.location
            FROM users
            JOIN alumni ON users.id = alumni.user_id;
        `;
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


export const searchAlumni = async (req, res) => {
  const { name, company, year, department } = req.query;

  try {
    let conditions = [];
    let values = [];

    if (name) {
      values.push(`%${name}%`);
      conditions.push(`users.name ILIKE $${values.length}`);
    }

    if (company) {
      values.push(`%${company}%`);
      conditions.push(`alumni.company ILIKE $${values.length}`);
    }

    if (year) {
      values.push(Number(year));
      conditions.push(`alumni.graduation_year = $${values.length}`);
    }

    if (department) {
      values.push(department);
      conditions.push(`alumni.department = $${values.length}`);
    }

    let query = `
      SELECT users.id, users.name, users.email,
             alumni.graduation_year, alumni.department,
             alumni.company, alumni.job_title, alumni.location
      FROM users
      JOIN alumni ON users.id = alumni.user_id
    `;

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    const result = await sql.query(query, values); 

    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyProfile = async(req,res)=>{

  try{
    const profile = await sql`
      SELECT
        users.id,
        users.name,
        users.email,
        alumni.graduation_year,
        alumni.department,
        alumni.company,
        alumni.job_title,
        alumni.location

        FROM users

      JOIN alumni
      ON users.id = alumni.user_id

      WHERE users.id = ${req.user.id};
    `;
    res.json(profile[0]);
  } catch(error){
    res.status(500).json({
      error: error.message
    });
  }
};