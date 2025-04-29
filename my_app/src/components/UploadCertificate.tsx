import { useState, ChangeEvent, DragEvent, FormEvent } from "react";

const UploadCertificate: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Invalid file type. Only PDF, JPG, and PNG are allowed.");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 10MB.");
      return false;
    }
    return true;
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const validFiles = Array.from(selectedFiles).filter(validateFile);
      setFiles((prev) => [...prev, ...validFiles]);
      console.log("Files uploaded:", validFiles);
    }
    const filterDuplicates = (newFiles: File[]) => {
      return newFiles.filter(
        (file) => !files.some((f) => f.name === file.name && f.size === file.size)
      );
    };
    
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setError(null);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles) {
      const validFiles = Array.from(droppedFiles).filter(validateFile);
      setFiles((prev) => [...prev, ...validFiles]);
      console.log("Files dropped:", validFiles);
    }
    const filterDuplicates = (newFiles: File[]) => {
      return newFiles.filter(
        (file) => !files.some((f) => f.name === file.name && f.size === file.size)
      );
    }; 
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title) {
      setError("Certificate title is required.");
      return;
    }
    if (files.length === 0) {
      setError("At least one file must be uploaded.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate upload without API call
    console.log("Form submitted:", { title, description, files });

    // Reset form after "upload"
    setTimeout(() => {
      setTitle("");
      setDescription("");
      setFiles([]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Upload Certificate</h2>
      {error && (
        <div className="mb-4 text-red-500 text-sm">{error}</div>
      )}
      <div
        className="border-dashed border-2 border-gray-500 rounded-lg p-6 text-center mb-4"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        role="region"
        aria-label="Drag and drop certificate files"
      >
        <div className="flex justify-center mb-2">
          <svg
            className="w-8 h-8 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6H16a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
        </div>
        <p className="text-gray-400">Drag & drop your certificate here</p>
        <p className="text-gray-500 text-sm mt-1">
          SUPPORTED FORMATS: PDF, JPG, PNG (MAX: 10MB)
        </p>
        <label className="mt-4 inline-block bg-gray-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-600">
          Browse Files
          <input
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.png"
            multiple
            onChange={handleFileUpload}
            aria-label="Upload certificate files"
          />
        </label>
      </div>
      {files.length > 0 && (
        <div className="mb-4">
          <p className="text-gray-400">Selected Files:</p>
          <ul className="text-gray-500 text-sm">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Certificate Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-700 rounded-lg p-2 text-white"
            placeholder="Enter certificate title"
            required
            aria-required="true"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-700 rounded-lg p-2 text-white"
            rows={3}
            placeholder="Enter description"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 disabled:bg-gray-600"
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload Certificate"}
        </button>
      </form>
    </div>
  );
};

export default UploadCertificate;