import React ,{ useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faCheck, faXmark, faAnglesRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
function Volunteers() {
    const openGoogleMaps = (lat, long) => {
        const googleMapsUrl = `https://www.google.com/maps?q=${lat},${long}`;
        window.open(googleMapsUrl, '_blank');
      };

    const [data, setData] = useState([
        { id: 1, type:'flood', title: 'Title-A', user: 'John', currentStatus: 'Assigned', responder: 'Healthcare', description: 'hdhd hbhwbcw hbhbcwujcbjw bhcwbcjw', latitude: 8.536153006003783, longitude: 76.88290969249395 },
        { id: 2, type:'landslide',title: 'Title-B', user: 'Jane', currentStatus: 'Solved', responder: 'Fire Force', description: 'hdhd hbhwbcw hbhbcwujcbjw bhcwbcjw', latitude: 9.85242517098323, longitude: 76.53104247153651 },
        { id: 3, type:'flood',title: 'Title-C', user: 'Sam', currentStatus: 'In Progress', responder: 'Police', description: 'hdhd hbhwbcw hbhbcwujcbjw bhcwbcjw', latitude: 8.536153006003783, longitude: 76.88290969249395 },
      ]);
  return (
<div>
<div class="py-8 px-8 max-w-mD mx-auto space-y-2 bg-white rounded-xl shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6">
  
<img class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src="https://www.seedsindia.org/assets/img/logo/seedslogo.png" alt="Seed-logo" />
</div>
<div class="mb-10">
  <h3>Notifications</h3>
  {data.map((item) => {
  if (item.type === 'flood') {
    return (  // You need to use 'return' here to render the JSX
      <div className="mb-4 py-8 px-8 max-w-md mx-auto space-y-2 bg-white rounded-xl shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6" key={item.id}>
        <p>Incident Id: {item.id}</p>
        <p>Type: {item.type}</p>
        <p>Title: {item.title}</p>
        <p>Description: {item.description}</p>
        <p>
          See location: 
          <FontAwesomeIcon
            icon={faLocationDot}
            className="text-blue-500 text-xl cursor-pointer"
            onClick={() => openGoogleMaps(item.latitude, item.longitude)}
          />
        </p>
      </div>
    );
  }
  return null; // Optionally return null if 'item.type' is not 'flood'
})}

  
  
 

  </div>
</div>

 
  )
}

export default Volunteers