import React, { useContext, useState, useEffect } from "react";
import "./home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const home = () => {

  const{allCoins,currency} = useContext(CoinContext);
  const[displayCoins,setDisplayCoins] = useState([]);
  const[input,setInput] = useState('');

  const inputHandler = (event)=>{
    setInput(event.target.value);
    if(event.target.value === ""){
      setDisplayCoins(allCoins)
    }
  };

  const searchHandler = async (event)=>{
    event.preventDefault();
    const coins = await allCoins.filter((item)=>{
      return item.name.toLowerCase().includes(input.toLowerCase())
    });
    setDisplayCoins(coins);

  }

  useEffect(() => {
    setDisplayCoins(allCoins);
  },[allCoins]);
  

  return (
    <div className="home">
      <div className="hero">
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p>Track real-time prices of your favorite cryptocurrencies and stay informed.</p>
        <form onSubmit={searchHandler}>
          <input type="text" onChange={inputHandler} list="coinlist" value={input} placeholder="Search Crypto... here" required />
          <datalist id="coinlist">
            {allCoins.map((item,index)=>(
            <option key={index} value={item.name}/>
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="coin-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className="hour-change">24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {
          displayCoins.slice(0,10).map((item, index)=>(
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h>0?"green":"red"}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
              <p className="market-cap">{currency.symbol} {item.market_cap.toLocaleString()}</p>
            </Link>
            
          ))
        }
      </div>
    </div>
  );
};

export default home;
