import { useState } from "react";
import API from "../api/axios.js";
import { toast } from "react-toastify";

export default function AddAlumni() {
    const[form, setForm]=useState({
        name: "",
        email: "",
        password: "",
        graduation_year: "",
        department: "",
        company: "",
        job_title: "",
        location: "",
    });

    const handleSubmit = async ()=>{
        try {
            await API.post("/admin/add-alumni", form);
            toast.success("Alumni added successfully");
        } catch (error) {
            //alert("Error adding alumni");
            toast.error("Error adding alumni!");
        }
    };

    return(
        <div>
            <h2>Add Alumni</h2>

            {Object.keys(form).map((key)=>(
                <input
                    key={key}
                    placeholder={key}
                    onChange={(e)=>
                        setForm({...form, [key]: e.target.value})
                    }
                />
            ))}

            <button onClick={handleSubmit}>Submit</button>
        </div>
    );

}