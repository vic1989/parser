import logo from './logo.svg';
import './App.css';
import { useEffect } from "react";
import axios from "axios";

function App() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCkj-aLrrFHGEI8yYPCUoekPMg99d1iF6E&callback=initMap"
        script.async = true;
        window.initMap = () => {
            let infowindow;
            const map = new window.google.maps.Map(document.getElementById("map"), {
                center: {lat: 53.90, lng: 27.544},
                zoom: 11,
            })
            const contentString = `<div>HUI</div>`;

            const load = async () => {
                const response = await axios.get('http://localhost:6001/api/v1/aparts')
                const aparts = response.data.aparts
                aparts.map((apart) => {
                    const marker = new window.google.maps.Marker({
                        position: {
                            lat: parseFloat(apart.location.latitude),
                            lng: parseFloat(apart.location.longitude)
                        },
                        map,
                        url: apart.link,
                        title: `${apart.price.amount} ${apart.price.currency}`,
                    });
                    const a = () => {
                        marker.addListener('click', (m) => {
                            const title = marker.getTitle()
                            if (infowindow) {
                                infowindow.close()
                            }
                            infowindow = new window.google.maps.InfoWindow({
                                content: `<div class="map-popup-marker">${apart.location.address}
                                            <br>
                                            <a target="_blank" href="${apart.link}">Просмотреть оригинал</a>
                                          </div>`,
                            });
                            infowindow.open({
                                anchor: marker,
                                map,
                                shouldFocus: false,
                            });
                        })
                    }
                    a()
                })
            }
            load()

        }
        script.onload = () => {

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
