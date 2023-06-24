import logo from './logo.svg';
import './App.css';
import {useState,useEffect } from 'react';
import CountryCard from './CountryCard';

const Api_url = 'https://restcountries.com/v2/all?fields=name,region,area,flag';

// const Country1 = {
//   "name": "Lithuania",
//   "region": "Europe",
//   "area": 65300,
//   "independent": false
// }

function App() {

    const [Countries,setCountries] = useState([]);

    const fetchCountries = async ()  => {
      const response = await fetch(Api_url);
            const data = await response.json();
            setCountries(data);
          }

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <>
    <div><input className = "search"
    value ="Lithuania"
    type="text"
    placeholder="Search for Country"
    onChange={() => {}}   
       />
       </div>
    <div>
        <div className ="dropdown">
            <button className ="dropbtn">Sort</button>
            <div className ="dropdown-content">
              <a href="#">Alphabeticaly (Descending)</a>
              <a href="#">Alphabeticaly (Ascending)</a>
            </div>
          </div>
        <button className = "dropbtn">Filter</button>
        <button  className  = "tbd">TBD</button>
    </div> 

    {Countries?.length > 0 ? (
      <div>
      {Countries.map((Country) => (
            <div className="wrapper">
            <CountryCard Country={Country} />
            </div>
          ))}
          </div>
      ) : (
        <div className="empty">
          <h2>No countries found</h2>
        </div>
      )}

    {/* // <div className = "wrapper">
    //   <CountryCard Country1={Countries[0]}/>
    // </div> */}
    </>
  );
}

export default App;
