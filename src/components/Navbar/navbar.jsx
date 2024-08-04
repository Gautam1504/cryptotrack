import React, { useContext } from 'react'
import './navbar.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom';

const navbar = () => {

  const{setCurrency} = useContext(CoinContext);
  
  const currencyHandler = (event)=>{
    switch (event.target.value){
      case "usd":{
        setCurrency({
          name:"usd",
          symbol: "$"
        });
        break;
      }
      case "inr":{
        setCurrency({
          name:"inr",
          symbol: "₹"
        });
        break;
      }
      default:{
        setCurrency({
          name:"usd",
          symbol: "$"
        });
        break;
      }
    }

  }
  return (
    <div className='navbar'>
       <Link to={'/'}>
        <h1 className='logo'>CryptoTrack</h1>
       </Link>
       <div className="nav-right">
        <select onChange={currencyHandler}>
            <option value="usd">USD</option>
            <option value="inr">INR</option>
        </select>
        <button>Sign up</button>
       </div>
      
    </div>
  )
}

export default navbar
