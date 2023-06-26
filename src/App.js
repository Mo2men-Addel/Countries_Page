import './App.css';
import {useState,useEffect } from 'react';
import CountryCard from './CountryCard';
import{FaSortAlphaDown} from "react-icons/fa";
import{FaSortAlphaDownAlt} from "react-icons/fa";
import{BiSearch} from  'react-icons/bi'
import{AiFillCaretDown} from  'react-icons/ai'

const Api_url = 'https://restcountries.com/v2/all?fields=name,region,area,flag';

function App() {

    const [Countries,setCountries] = useState([]);
    const [Asc , setAsc] = useState(true);
    const [Icon, setIcon] = useState(FaSortAlphaDown);
    const [SearchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState(false);

    const fetchCountries = async ()  => {
      const response = await fetch(Api_url);
            const data = await response.json();
            setCountries(data);
            setFiltered(false);
          }

    const SearchCountries = async(name) => {
      const response = await fetch(Api_url);
            const data = await response.json();
      var newCountries =[];
      newCountries = data.filter(o => o.name.includes(name));      
            setCountries(newCountries);
          }

    const SearchByRegion = async(region) => {
      const response = await fetch(Api_url);
            const data = await response.json();
      var newCountries =[];
      newCountries = data.filter(o => o.region === region);         
            setCountries(newCountries);
          }    

    const filterLithuania = async() => {
      const response = await fetch(Api_url);
            const data = await response.json();
      var newCountries =[];
      newCountries = data.filter(o => o.area < 65300);         
            setCountries(newCountries);
              setFiltered(true);
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
    <div>
    <input className = "search"
    value ={SearchTerm}
    type="text"
    placeholder="Search for Country"
    onChange={(e) => setSearchTerm(e.target.value)}   
    /> <button className='dropbtn' SearchTerm onClick={() => SearchTerm !==''?SearchCountries(SearchTerm):fetchCountries()}>Search</button>
       </div>
    <div>
       
            <button className ="dropbtn" onClick={sortDesc} >Sort {Icon} </button>
        <button className = "dropbtn" onClick={() => !filtered?filterLithuania():fetchCountries()}>Smaller than Lithuania </button>
    
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
    </>
  );
}

export default App;
