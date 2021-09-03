import logo from './logo.svg';
import './App.css';
import { useEffect } from "react";

function App() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCkj-aLrrFHGEI8yYPCUoekPMg99d1iF6E&callback=initMap"
        script.async = true;
        window.initMap = () => {
            const map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            })
        }
        script.onload =() => {

        }
        document.body.appendChild(script);
    }, [])
  return (
    <div className="App">
      <header className="App-header">
          <div id="map"/>
      </header>
    </div>
  );
}

export default App;
