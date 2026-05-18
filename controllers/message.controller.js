import { sql } from "../config/db.js";
import { transporter } from "../config/mail.js"

export const sendMessage=async(req,res)=>{
    const { subject, content, receiver_ids }= req.body;
    const sender_id = req.user.id;

    try {
        const msg = await sql`
            INSERT INTO messages (sender_id, subject, content)
            VALUES (${sender_id}, ${subject}, ${content})
            RETURNING *;
        `;
        const messageId= msg[0].id;

        const users=await sql`
            SELECT email FROM users WHERE id=ANY(${receiver_ids});
        `;

        const emails = users.map(u=>u.email);

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: emails,
            subject,
            text: content,
        });

        for(let id of receiver_ids){
            await sql`
                INSERT INTO message_recipients (message_id, receiver_id)
                VALUES (${messageId}, ${id});
            `;
        }
        res.json({message:"Email sent successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};