import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faCheck, faXmark, faAnglesRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Users() {
    // { id: 1, name: 'John', phone: '9877723550', role:'victim' },
    // { id: 2, name: 'Jane', phone: '9028576677', role:'responder'},
    // { id: 3, name: 'Sam', phone: '8213568923', role:'victim' },
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  // Track loading state
    const [error, setError] = useState(null);  // Track any errors
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response =await axios.get('http://127.0.0.1:8000/user/');
        setData(response.data);
        setLoading(false);
        console.log('UserData',data)
      }catch(err){
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  },[]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingitem, setEditingItem] = useState({ 
    id: null,
    username:'',
    phone_no:'',  
    email:''
  });

  const handleDelete = async (item) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    if (isConfirmed) {
      try {
        // const response = await axios.delete('');
        setData((prevData) => prevData.filter((user) => user.id !== item.id));
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
  const handleCancel = () => {
    setIsEditing(false);
    setEditingItem({
      id: null,
      username:'',
      phone_no:'',  
      email:''
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
      username:item.username,
      phone_no:item.phone_no, 
      email:item.email,
    });
    setIsEditing(true);
  };

  return (
    <div >
      <h1 className="text-3xl font-bold mb-4">
     User
    </h1>
    {isEditing && (
        <div className="mb-4 p-4 border rounded-lg bg-gray-100">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={editingitem.username}
            onChange={handleInputChange}
            className="mb-2 p-2 w-full border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={editingitem.phone_no}
            onChange={handleInputChange}
            className="mb-2 p-2 w-full border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={editingitem.email}
            onChange={handleInputChange}
            className="mb-2 p-2 w-full border border-gray-300 rounded-lg"
          />
          
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
            <th className="p-2 text-left">Id</th>
            <th className="p-2 text-left">Username</th>
            <th className="p-2 text-left">Phone</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Operations</th>
          </tr>
        </thead>
        <tbody>
        {data.map(person => {
          if(person.role==='victim'){

        
  return(
  <tr key={person.id} className="odd:bg-white even:bg-slate-50 ">
    <td className="p-2">{person.id}</td>  {/* Adjust the width as needed */}
    <td className="p-2">{person.username}</td>
    <td className="p-2">{person.phone_no}</td>
    <td className="p-2">{person.email}</td>
    <td className="p-2">
    <div className="flex space-x-4">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleEditClick(person)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(person)}
                    />
                   
                  </div>
                  </td>
  </tr>
  );
}
  
}
)}

        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Users;
