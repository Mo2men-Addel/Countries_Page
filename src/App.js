import './App.css';
import {useState,useEffect } from 'react';
import CountryCard from './CountryCard';
import{FaSortAlphaDown} from "react-icons/fa";
import{FaSortAlphaDownAlt} from "react-icons/fa";
import{BiSearch} from  'react-icons/bi'
import{AiFillCaretDown} from  'react-icons/ai'

const Api_url = 'https://restcountries.com/v2/all?fields=name,region,area,flag';

// const Country1 = {
//   "name": "Lithuania",
//   "region": "Europe",
//   "area": 65300,
//   "independent": false
// }

function App() {

    const [Countries,setCountries] = useState([]);
    const [Asc , setAsc] = useState(true);
    const [Icon, setIcon] = useState(FaSortAlphaDown);
    const [SearchTerm, setSearchTerm] = useState('');

    const fetchCountries = async ()  => {
      const response = await fetch(Api_url);
            const data = await response.json();
            setCountries(data);
          }

    const SearchCountries = async(name) => {
      const response = await fetch(Api_url);
            const data = await response.json();
      var newCountries =[];
      newCountries = data.filter(o => o.name.includes(name));      
      // const newCountries = [];
      // newCountries[0] = Countries.find(o => o.name === title); `${Api_url}&s=${title}`
            setCountries(newCountries);
          }

    const SearchByRegion = async(region) => {
      const response = await fetch(Api_url);
            const data = await response.json();
      var newCountries =[];
      newCountries = data.filter(o => o.region === region);      
      // const newCountries = [];
      // newCountries[0] = Countries.find(o => o.name === title); `${Api_url}&s=${title}`
            setCountries(newCountries);
          }

  useEffect(() => {
    fetchCountries();
  }, []);


  function sortDesc () { 
    const temp = Countries.slice();
    temp.reverse();
    setCountries(temp);
    if (Asc){
      setIcon(FaSortAlphaDownAlt);
    }
    else{
      setIcon(FaSortAlphaDown);
    }
    setAsc(!Asc);
  }


  return (
    <>
    <form><input className = "search"
    value ={SearchTerm}
    type="text"
    placeholder="Search for Country"
    onChange={(e) => setSearchTerm(e.target.value)}   
    /> <BiSearch  SearchTerm onClick={() => SearchTerm !==''?SearchCountries(SearchTerm):fetchCountries()} />
       </form>
    <div>
       
            <button className ="dropbtn" onClick={sortDesc} >Sort {Icon} </button>
        <button className = "dropbtn">Filter </button>
    
            <div class="dropdown">
  <button class="dropbtn">Region <AiFillCaretDown className='icon'/></button>
  <div class="dropdown-content">
    <a onClick={() => fetchCountries()}>All</a>
    <a onClick={() => SearchByRegion('Asia')}>Asia</a>
    <a onClick={() => SearchByRegion('Africa')}>Africa</a>
    <a onClick={() => SearchByRegion('Antarctic Ocean')}>Antarctic Ocean</a>
    <a onClick={() => SearchByRegion('Americas')}>Americas</a>
    <a onClick={() => SearchByRegion('Europe')}>Europe</a>
    <a onClick={() => SearchByRegion('Oceania')}>Oceania</a>
    <a onClick={() => SearchByRegion('Polar')}>Polar</a>
  </div>
</div>



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
