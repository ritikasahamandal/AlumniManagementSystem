import { useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

function SendEmail() {

  const [form, setForm] = useState({
    receiver_ids: "",
    subject: "",
    content: "",
  });

  const handleSend = async () => {
    try {

      const payload = {
        ...form,

        receiver_ids: form.receiver_ids
          .split(",")
          .map((id) => Number(id.trim())),
      };

      await API.post("/message/send", payload);

      toast.success("Email sent successfully");

      setForm({
        receiver_ids: "",
        subject: "",
        content: "",
      });

    } catch (error) {
      console.error(error);
      toast.error("Failed to send email");
    }
  };

  return (
    <Layout>

      <div className="bg-white p-6 rounded-xl shadow max-w-3xl">

        <h2 className="text-2xl font-semibold mb-6">
          Send Email
        </h2>

        {/* Receiver IDs */}
        <div className="mb-4">

          <label className="block mb-2 font-medium">
            Receiver User IDs
          </label>

          <input
            type="text"
            placeholder="Example: 1,2,3"
            value={form.receiver_ids}
            onChange={(e) =>
              setForm({
                ...form,
                receiver_ids: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
          />

        </div>

        {/* Subject */}
        <div className="mb-4">

          <label className="block mb-2 font-medium">
            Subject
          </label>

          <input
            type="text"
            placeholder="Enter subject"
            value={form.subject}
            onChange={(e) =>
              setForm({
                ...form,
                subject: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
          />

        </div>

        {/* Content */}
        <div className="mb-4">

          <label className="block mb-2 font-medium">
            Message
          </label>

          <textarea
            rows="6"
            placeholder="Write your email content..."
            value={form.content}
            onChange={(e) =>
              setForm({
                ...form,
                content: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
          />

        </div>

        {/* Button */}
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Send Email
        </button>

      </div>

    </Layout>
  );
}

export default SendEmail;