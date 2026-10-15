import { sql } from "../config/db.js";

export const getAllUsers = async(req,res)=>{
    try {
        const users =await sql`SELECT id, name, email, role, is_approved FROM users`;
        res.json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }

};

export const approveUser = async(req,res)=>{
    const {id}=req.params;
    try {
        await sql`
            UPDATE users
            SET is_approved = TRUE
            WHERE id = ${id};
        `;
        res.json({message:"User approved"});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

export const changeRole = async(req,res)=>{
    const {id}= req.params;
    const {role}= req.body;

    try {
        await sql`
            UPDATE users
            SET role = ${role}
            WHERE id = ${id};
        `;
        res.json({message:"Role updated"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export const deleteUser = async(req,res)=>{
    const { id }= req.params;
    try {
        await sql`
            DELETE FROM users WHERE id = ${id}
        `;
        res.json({message:"User deleted"});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

export const updateUserRole = async (
  req,
  res
) => {

  const { id } = req.params;

  const { role } = req.body;

  try {

    await sql`
      UPDATE users
      SET role = ${role}
      WHERE id = ${id};
    `;

    res.json({
      message: "Role updated"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });
  }
};