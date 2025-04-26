import UploadCertificate from "./UploadCertificate";
import CertificateList from "./CertificateList";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Certificate Dashboard</h1>
        <div className="text-sm">Sunday, April 20, 2025</div>
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