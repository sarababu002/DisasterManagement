import { useEffect, useState } from 'react';

import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import Admin from './Admin';
import Locations from './Location';
import NGO from './NGO';

function App() {
 
  return (
    <div>
     <Admin/>
     {/* <NGO/> */}
     {/* {<Locations/>} */}
    </div>
  )
}

export default App
