const dummyCertificates = [
  {
    title: "AI Course",
    description: "Advanced AI topics",
    format: "PDF",
    size: "1.2 MB",
    date: "2025-04-30",
  },
  {
    title: "DBMS Certification",
    description: "Learned MySQL, PostgreSQL",
    format: "JPG",
    size: "1.8 MB",
    date: "2025-03-15",
  },
];

const CertificateList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {dummyCertificates.map((cert, i) => (
        <div key={i} className="p-4 bg-gray-100 rounded shadow">
          <h3 className="font-semibold">{cert.title}</h3>
          <p className="text-sm text-gray-600">{cert.description}</p>
          <p className="text-xs text-gray-500">
            {cert.format} • {cert.size} • {cert.date}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CertificateList;
