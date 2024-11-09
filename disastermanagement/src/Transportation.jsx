import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faCheck ,faXmark} from '@fortawesome/free-solid-svg-icons';

const Transportation = () => {
    const [data, setData] = useState([]);  // Stores the fetched transportation data
    const [loading, setLoading] = useState(true);  // Track loading state
    const [error, setError] = useState(null);  // Track any errors
    const [isAddingNew, setIsAddingNew] = useState(false);  // Toggle form visibility for new transport
    const [newTransport, setNewTransport] = useState({
        license_plate: '',
        vehicle_type: '',
        contact_info: '',
        current_status: '',
    });
    const [editingItem, setEditingItem] = useState(null);  // Track the item being edited

    // Fetch data from the API when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/transportation/');
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Handle input changes for the form (both for adding and editing)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransport((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle saving the new transport (POST) or edited transport (PATCH)
    const handleSaveTransport = async () => {
        if (editingItem) {
            // PATCH request for updating existing transport
            console.log(editingItem.vehicle_id)
            try {
                const response = await axios.patch(`http://127.0.0.1:8000/transportation/${editingItem.vehicle_id}/`, newTransport);
                console.log('Updated Successfully', response.data);

                // Update the data array locally after the PATCH
                const updatedData = data.map(item =>
                    item.vehicle_id === editingItem.vehicle_id ? response.data : item
                );
                setData(updatedData);
            } catch (error) {
                console.error('Error updating data:', error);
            }
        } else {
            // POST request for adding a new transport
            try {
                const response = await axios.post('http://127.0.0.1:8000/transportation/', newTransport);
                console.log('Added Successfully', response.data);

                // Add the new transport to the top of the list
                setData([response.data, ...data]);
            } catch (error) {
                console.error('Error posting data:', error);
            }
        }

        // Reset the form and hide the form
        setNewTransport({
            license_plate: '',
            vehicle_type: '',
            contact_info: '',
            current_status: '',
        });
        setEditingItem(null);
        setIsAddingNew(false);
    };

    // Handle cancel action when adding new or editing
    const handleCancel = () => {
        setIsAddingNew(false);  // Hide the form without saving
        setEditingItem(null);    // Reset the editing state
        setNewTransport({
            license_plate: '',
            vehicle_type: '',
            contact_info: '',
            current_status: '',
        });  // Reset the form fields
    };

    // Handle clicking edit on a row
    const handleEditClick = (item) => {
        setEditingItem(item);
        setNewTransport({
            license_plate: item.license_plate,
            vehicle_type: item.vehicle_type,
            contact_info: item.contact_info,
            current_status: item.current_status,
        });
        setIsAddingNew(true);  // Show the form
    };
    const handleDelete = async (item) => {
        // Step 1: Ask for confirmation before deleting
        const isConfirmed = window.confirm("Are you sure you want to delete this transport?");
        
        if (isConfirmed) {
            try {
                // Step 2: Send DELETE request to the backend
                const response = await axios.delete(`http://127.0.0.1:8000/transportation/${item.vehicle_id}/`);
                console.log('Deleted Successfully', response.data);
    
                // Step 3: Refresh the data locally by filtering out the deleted item
                setData((prevData) => prevData.filter((transport) => transport.vehicle_id !== item.vehicle_id));
    
                // Optionally, you can also re-fetch the data from the API after deletion
                // await fetchData(); // Uncomment if you want to re-fetch all data after deletion
            } catch (error) {
                console.error('Error in deleting:', error);
            }
        } else {
            console.log("Deletion cancelled.");
        }
    };
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
      <h1 className="text-2xl font-bold mb-4">Transportation</h1>
      <button class="mb-4 px-4 py-1 text-sm bg-gray-100 text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" onClick={() => setIsAddingNew(true)}>Add</button>
      <div className="table-container">
      {/* Form for adding or editing */}
      {isAddingNew && (
          
        <div className="mb-4 p-4 border rounded-lg bg-gray-100">
          <div>
            <input
              type="text"
              name="license_plate"
              placeholder="License Plate"
              value={newTransport.license_plate}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <select
              name="vehicle_type"
              value={newTransport.vehicle_type}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border border-gray-300 rounded-lg"
            >
              <option value="" hidden>
                Select Vehicle Type
              </option>
              <option value="bus">Bus</option>
              <option value="truck">Truck</option>
              <option value="van">Van</option>
              <option value="car">Car</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              name="contact_info"
              placeholder="Contact Info"
              value={newTransport.contact_info}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <select
              name="current_status"
              value={newTransport.current_status}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border border-gray-300 rounded-lg"
            >
              <option value="" hidden>
                Select Status
              </option>
              <option value="in use">In Use</option>
              <option value="available">Available</option>
              <option value="maintenance">Under Maintenance</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 cursor-pointer" onClick={handleSaveTransport} />
            <FontAwesomeIcon icon={faXmark} className="text-red-500 cursor-pointer" onClick={handleCancel} />
          </div>
        </div>
      )}

      {/* Transportation Table */}
      <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">License Plate</th>
            <th className="p-2 text-left">Vehicle Type</th>
            <th className="p-2 text-left">Contact</th>
            <th className="p-2 text-left">Current Status</th>
            <th className="p-2 text-left">Operations</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="odd:bg-white even:bg-gray-50">
              <td className="p-2">{item.license_plate}</td>
              <td className="p-2">{item.vehicle_type}</td>
              <td className="p-2">{item.contact_info}</td>
              <td className="p-2">{item.current_status}</td>
              <td className="p-2">
                <div className="flex space-x-4">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleEditClick(item)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(item)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  );
};



export default Transportation;
