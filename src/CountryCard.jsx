import React from "react";
import './App.css';

const CountryCard = ({ Country }) => {
    return (
        <div className = "country">
            <div className="content">
                <img className="flag" src={Country.flag} alt="" />
            </div>
        <div className="content">
          <p className='name'>{Country.name}</p>
          <p className='region'>Region: {Country.region}</p>
          <p className='size'>Area: {Country.area}</p>
        </div>
      </div>
    );
}

export default CountryCard;