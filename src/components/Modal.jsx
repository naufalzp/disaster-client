import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import Button from "./ui/Button";

const Modal = ({ data, onSave, onClose }) => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [severityId, setSeverityId] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [severityOptions] = useState([
    { id: 1, name: "low" },
    { id: 2, name: "medium" },
    { id: 3, name: "high" },
  ]);

  useEffect(() => {
    if (data) {
      setLocation(data.location);
      setDescription(data.description);
      setSeverityId(data.severity_id || "");
      setTime(data.time || "");
      setDate(data.date || "");
    }
  }, [data]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleSubmit = () => {
    if (!location || !description || !severityId || !time || !date) {
      return Swal.fire("Error!", "Semua field wajib diisi!", "error");
    }
    
    onSave({
      id: data?.id || null,
      location,
      description,
      severity: severityOptions.find((severity) => severity.id === parseInt(severityId)).name,
      time,
      date,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">
          {data ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium pb-2 text-gray-700">LOCATION</label>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium pb-2 text-gray-700">Description</label>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium pb-2 text-gray-700">Severity</label>
          <select
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            value={severityId}
            onChange={(e) => setSeverityId(e.target.value)}
          >
            <option value="">Choose Severity</option>
            {severityOptions.map((severity) => (
              <option key={severity.id} value={severity.id}>
                {severity.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium pb-2 text-gray-700">Time</label>
          <input
            type="time"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium pb-2 text-gray-700">Date</label>
          <input
            type="date"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            className="bg-gray-500 text-white hover:bg-gray-600"
            onClick={onClose}
          >
            Batal
          </Button>
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  data: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
