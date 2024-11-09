import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faCheck, faXmark, faLocationDot, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Incident = () => {
  const [data, setData] = useState([
    { id: 1, title: 'Aaaaaaaaa', user: 'John', currentStatus: 'Assigned', responder: 'Healthcare', description: 'hdhd hbhwbcw hbhbcwujcbjw bhcwbcjw', latitude: 8.536153006003783, longitude: 76.88290969249395 },
    { id: 2, title: 'Bbbbbbb', user: 'Jane', currentStatus: 'Solved', responder: 'Fire Force', description: 'hdhd hbhwbcw hbhbcwujcbjw bhcwbcjw', latitude: 9.85242517098323, longitude: 76.53104247153651 },
    { id: 3, title: 'Ccccccc', user: 'Sam', currentStatus: 'In Progress', responder: 'Police', description: 'hdhd hbhwbcw hbhbcwujcbjw bhcwbcjw', latitude: 8.536153006003783, longitude: 76.88290969249395 },
  ]);
  
 
  const [status,setStatus]=useState('Assigned')
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Control visibility of the popup
  const [popupData, setPopupData] = useState(null); // Store data for the current popup
  const [editingitem, setEditingItem] = useState({ 
    id: null,
    title: '',
    user: '', 
    currentStatus: '', 
    responder: '', 
    description: '', 
  });


  const openGoogleMaps = (lat, long) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${long}`;
    window.open(googleMapsUrl, '_blank');
  };

  const openPopup = (item) => {
    setPopupData(item); // Set data for the current popup
    setShowPopup(true); // Show the popup
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
    setPopupData(null); // Clear the data
  };

  const handleDelete = async (item) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this incident?');
    if (isConfirmed) {
      try {
        // const response = await axios.delete('');
        setData((prevData) => prevData.filter((incident) => incident.id !== item.id));
      } catch (error) {
        console.error('Error in deleting:', error);
      }
    } else {
      return;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleCurrentStatus = (event) => {
    setStatus(event.target.value); // Update the state with the selected value
  };
  const handleCancel = () => {
    setIsEditing(false);
    setEditingItem({
      id: null,
      title: '',
      user: '',
      currentStatus: '',
      responder: '',
      description: '',
    });
  };

  const handleSave = () => {
    if (isEditing) {
      try {
        const updatedData = data.map(item =>
          item.id === editingitem.id ? editingitem : item
        );
        setData(updatedData);
        handleCancel();
      } catch (e) {
        console.log('Error in editing:', e);
      }
    }
  };

  const handleEditClick = async (item) => {
    setEditingItem({
      id: item.id,
      title: item.title,
      user: item.user,
      currentStatus: item.currentStatus,
      responder: item.responder,
      description: item.description,
    });
    setIsEditing(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Incidents</h1>
      <label class="relative block flex justify-between items-center">
 
  <select 
    name="currentStatus" 
    onChange={handleCurrentStatus} 
    value={status} 
    className="mb-4 p-2 w-30 border border-gray-300 rounded-lg"
  >
    <option value="Solved">Solved</option>
    <option value="In Progress">In-progress</option>
    <option value="Assigned">Assigned</option>
  </select>

  
  {/* <input 
    class="placeholder:italic placeholder:text-slate-400 block bg-white h-10 w-70 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-[#11003A] focus:ring-[#11003A] focus:ring-1 sm:text-sm"
    placeholder="Search by incident id..." 
    type="text" 
    name="search"
  /> */}
</label>

      {isEditing && (
        <div className="mb-4 p-4 border rounded-lg bg-gray-100">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={editingitem.title}
            onChange={handleInputChange}
            className="mb-2 p-2 w-full border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="user"
            placeholder="User"
            value={editingitem.user}
            onChange={handleInputChange}
            className="mb-2 p-2 w-full border border-gray-300 rounded-lg"
          />
          <select
            name="currentStatus"
            value={editingitem.currentStatus}
            onChange={handleInputChange}
            className="mb-2 p-2 w-full border border-gray-300 rounded-lg"
          >
            <option value="" hidden>Current Status</option>
            <option value="assigned">Assigned</option>
            <option value="solved">Solved</option>
            <option value="inprogress">In Progress</option>
          </select>
          <textarea
            name="description"
            placeholder="Description"
            value={editingitem.description}
            onChange={handleInputChange}
            className="mb-2 p-2 w-full border border-gray-300 rounded-lg"
          />
          <select
            name="responder"
            value={editingitem.responder}
            onChange={handleInputChange}
            className="mb-4 p-2 w-full border border-gray-300 rounded-lg"
          >
            <option value="" hidden>Select Responder</option>
            <option value="healthcare">Healthcare</option>
            <option value="police">Police</option>
            <option value="firefighters">Fire Fighters</option>
          </select>
          <div className="flex space-x-4">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 cursor-pointer" onClick={handleSave} />
            <FontAwesomeIcon icon={faXmark} className="text-red-500 cursor-pointer" onClick={handleCancel} />
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Current Status</th>
              <th className="p-2 text-left">Responder</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Operations</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              if(item.currentStatus===status){
              return(
              <tr key={item.id} className="odd:bg-white even:bg-gray-50">
                <td className="p-2">{item.title}</td>
                <td className="p-2">{item.user}</td>
                <td className="p-2">{item.currentStatus}</td>
                <td className="p-2">{item.responder}</td>
                <td className="p-2">
                  <div className="flex space-x-4">
                  <FontAwesomeIcon
                      icon={faCircleInfo}
                      className="text-blue-500 cursor-pointer"
                      onClick={() => openPopup(item)}
                    />
                  </div>
                </td>
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
                
               ) }
               return null;
            })}
          </tbody>
        </table>
      </div>

      {/* Popup Component */}
      {showPopup && popupData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-xl text-white bg-red-500 px-2  rounded-full"
            >
              X
            </button>
            <h2 className="text-xl font-bold">{popupData.title}</h2>
            <p className="mt-2">Description: {popupData.description}</p>
            <p className="mt-2">Responder: {popupData.responder}</p>
            <div className="mt-4 flex justify-center items-center">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-blue-500 text-xl cursor-pointer"
                onClick={() => openGoogleMaps(popupData.latitude, popupData.longitude)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Incident;
