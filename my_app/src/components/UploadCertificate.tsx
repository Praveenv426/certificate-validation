import { useState, ChangeEvent, FormEvent } from "react";
import { uploadCertificate } from "../api";

const UploadCertificate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      setMessage("Please fill in all required fields.");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    const res = await uploadCertificate(formData);
    if (res.ok) {
      setMessage("Upload successful!");
      setTitle("");
      setDescription("");
      setFile(null);
    } else {
      setMessage("Upload failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Upload Certificate</h2>
      {message && <p className="text-sm text-red-500">{message}</p>}
      <input
        type="text"
        placeholder="Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 p-2 bg-white"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-2 p-2 bg-white"
      />
      <input
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFile(e.target.files ? e.target.files[0] : null)
        }
        className="w-full mb-4"
        accept=".pdf,.jpg,.jpeg,.png"
        required
      />
      <button className="w-full bg-blue-600 text-white py-2 rounded">Upload</button>
    </form>
  );
};

export default UploadCertificate;
