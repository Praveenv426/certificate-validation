import UploadCertificate from "../components/UploadCertificate";
import CertificateList from "../components/CertificateList";

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Certificate Dashboard</h1>
        <div className="text-sm">{new Date().toDateString()}</div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <UploadCertificate />
        </div>
        <div className="lg:w-2/3">
          <CertificateList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
