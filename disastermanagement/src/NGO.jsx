import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faCheck ,faXmark} from '@fortawesome/free-solid-svg-icons';

const NGO = () => {
    const [data, setData] = useState([]);  
    const [loading, setLoading] = useState(true);  // Track loading state
    const [error, setError] = useState(null);  // Track any errors
    const [isAddingNew, setIsAddingNew] = useState(false);  
    const [newOrganization, setNewOrganization] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
    });
    const [editingItem, setEditingItem] = useState(null);  // Track the item being edited

    // Fetch data from the API when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/ngo/');
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
        setNewOrganization((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    
    const handleSave = async () => {
        if (editingItem) {
            
            console.log(editingItem.id)
            try {
                const response = await axios.patch(`http://127.0.0.1:8000/ngo/${editingItem.id}/`, newOrganization);
                console.log('Updated Successfully', response.data);

                // Update the data array locally after the PATCH
                const updatedData = data.map(item =>
                    item.id === editingItem.id ? response.data : item
                );
                setData(updatedData);
            } catch (error) {
                console.error('Error updating data:', error);
            }
        } else {
            
            try {
                const response = await axios.post('http://127.0.0.1:8000/ngo/', newOrganization);
                console.log('Added Successfully', response.data);

                
                setData([response.data, ...data]);
            } catch (error) {
                console.error('Error posting data:', error);
            }
        }

        // Reset the form and hide the form
        setNewOrganization({
            name: '',
            address: '',
            email: '',
            phone: '',
        });
        setEditingItem(null);
        setIsAddingNew(false);
    };

    // Handle cancel action when adding new or editing
    const handleCancel = () => {
        setIsAddingNew(false);  // Hide the form without saving
        setEditingItem(null);    // Reset the editing state
        setNewOrganization({
            name: '',
            address: '',
            email: '',
            phone: '',
        });  // Reset the form fields
    };

    // Handle clicking edit on a row
    const handleEditClick = (item) => {
        setEditingItem(item);
        setNewOrganization({
            name: item.name,
            address: item.address,
            email: item.email,
            phone: item.phone,
        });
        setIsAddingNew(true);  // Show the form
    };
    const handleDelete = async (item) => {
        // Step 1: Ask for confirmation before deleting
        const isConfirmed = window.confirm("Are you sure you want to delete this NGO?");
        
        if (isConfirmed) {
            try {
                // Step 2: Send DELETE request to the backend
                const response = await axios.delete(`http://127.0.0.1:8000/ngo/${item.id}/`);
                console.log('Deleted Successfully', response.data);
    
                // Step 3: Refresh the data locally by filtering out the deleted item
                setData((prevData) => prevData.filter((organization) => organization.id !== item.id));
    
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
      <h1 className="text-2xl font-bold mb-4">Non-governmental organization</h1>
      <button class="mb-4 px-4 py-1 text-sm bg-gray-100 text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" onClick={() => setIsAddingNew(true)}>Add</button>
      <div className="table-container">
      {/* Form for adding or editing */}
      {isAddingNew && (
          
        <div className="mb-4 p-4 border rounded-lg bg-gray-100">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newOrganization.name}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>
          <div>
          <div>
            <textarea
              type="text"
              name="address"
              placeholder="Address"
              value={newOrganization.address}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>
          </div>
          <div>
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={newOrganization.email}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>
          </div>
          <div>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={newOrganization.phone}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>
          </div>
          <div className="flex space-x-4">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 cursor-pointer" onClick={handleSave} />
            <FontAwesomeIcon icon={faXmark} className="text-red-500 cursor-pointer" onClick={handleCancel} />
          </div>
        </div>
      )}

      
      <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Address</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Phone</th>
            <th className="p-2 text-left">Operations</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="odd:bg-white even:bg-gray-50">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.address}</td>
              <td className="p-2">{item.email}</td>
              <td className="p-2">{item.phone}</td>
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



export default NGO;
