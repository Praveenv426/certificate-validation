interface Certificate {
    title: string;
    date: string;
    description: string;
    format: string;
    size: string;
  }
  
  const certificates: Certificate[] = [
    {
      title: "Bachelor of Computer Science",
      date: "Mar 15, 2025",
      description: "University degree in Computer Science with honors",
      format: "PDF",
      size: "1.2 MB",
    },
    {
      title: "Advanced Web Development",
      date: "Mar 10, 2025",
      description: "Certification in modern web technologies",
      format: "PDF",
      size: "0.8 MB",
    },
    {
      title: "National Coding Competition",
      date: "Feb 12, 2025",
      description: "1st place in algorithm design category",
      format: "JPG",
      size: "2.4 MB",
    },
    {
      title: "Artificial Intelligence Course",
      date: "Jan 30, 2025",
      description: "Completion certificate for advanced AI concepts",
      format: "PDF",
      size: "1.5 MB",
    },
    {
      title: "Leadership Workshop",
      date: "Jan 15, 2025",
      description: "Certificate of participation in leadership skills",
      format: "PDF",
      size: "0.9 MB",
    },
    {
      title: "Database Management Systems",
      date: "Dec 30, 2024",
      description: "Professional certification in DBMS",
      format: "PDF",
      size: "1.7 MB",
    },
  ];
  
  const CertificateList: React.FC = () => {
    return (
      <div>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search certificates..."
            className="w-full bg-gray-700 rounded-lg p-2 text-white"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{certificate.title}</h3>
                <button className="text-gray-400 hover:text-white">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    ></path>
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-400">{certificate.date}</p>
              <p className="text-gray-300 mt-1">{certificate.description}</p>
              <p className="text-sm text-gray-400 mt-2">
                {certificate.format} • {certificate.size}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default CertificateList;