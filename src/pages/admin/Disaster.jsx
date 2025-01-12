import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/ui/Button";
import Modal from "../../components/Modal";

const Disaster = () => {
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://disaster-api.vercel.app/index.php/api/v1/disasters', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setModalData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (dstr) => {
    setModalData(dstr);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data ini akan dihapus.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://disaster-api.vercel.app/index.php/api/v1/disasters/${id}`, {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          setData(data.filter((dstr) => dstr.id !== id));
          Swal.fire({
            title: 'Berhasil!',
            text: 'Data bencana telah dihapus.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error('Error deleting data:', error);
          Swal.fire({
            title: 'Error',
            text: 'Gagal menghapus data bencana.',
            icon: 'error',
            showConfirmButton: true,
          });
        }
      }
    });
  };

  const handleSave = async (newData) => {
    try {
      if (modalData) {
        await axios.put(
          `https://disaster-api.vercel.app/index.php/api/v1/disasters/${modalData.id}`,
          newData,
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(data.map((dstr) => (dstr.id === modalData.id ? newData : dstr)));
        fetchData();
        Swal.fire({
          title: 'Berhasil!',
          text: 'Data bencana telah diperbarui.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await axios.post('https://disaster-api.vercel.app/index.php/api/v1/disasters', newData, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        
        setData([...data, newData]);
        fetchData();
        Swal.fire({
          title: 'Berhasil!',
          text: 'Data bencana telah ditambahkan.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving data:', error);
      Swal.fire({
        title: 'Error',
        text: 'Gagal menyimpan data bencana.',
        icon: 'error',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="flex-grow bg-neutral-100 p-6">
      <div className="flex flex-row items-center sm:gap-8 pb-4">
        <h1 className="text-xl font-semibold">Data Bencana</h1>
        <Button className="bg-blue-500 hover:bg-blue-700" onClick={handleAdd}>
          Tambah
        </Button>
      </div>
      <div className="relative bg-white overflow-x-auto p-4 shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-sm uppercase text-gray-500 ">
            <tr>
              <th className="hidden md:table-cell">No</th>
              <th>Location</th>
              <th>Description</th>
              <th>Severity</th>
              <th>Time</th>
              <th>Date</th>
              <th className="hidden md:table-cell">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dstr, index) => (
              <tr
                key={dstr.id}
                className="border-b bg-white dark:border-gray-200 dark:hover:bg-gray-200"
              >
                <td className="py-3 text-base">{index + 1}</td>
                <td className="py-3 text-base">{dstr.location}</td>
                <td className="py-3 text-base">{dstr.description}</td>
                <td className="py-3 text-base">{dstr.severity}</td>
                <td className="py-3 text-base">{dstr.time}</td>
                <td className="py-3 text-base">{dstr.date}</td>
                <td>
                  <Button
                    className="edit-btn bg-orange-500 hover:bg-orange-700"
                    onClick={() => handleEdit(dstr)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="delete-btn bg-red-500 hover:bg-red-700"
                    onClick={() => handleDelete(dstr.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <Modal
          data={modalData}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Disaster;
