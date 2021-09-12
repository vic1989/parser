import React, { useContext, useEffect } from 'react';
import axios from "axios";
import { config } from "../config/config.dev";
import { AppContext } from "../store/main.store";

let page = 1
let total = 10
let load
let markers = []
let map
const Map = () => {
    const getContent = (apart) => {
        return `<div class="map-popup-marker">${apart.location.address}
                 <br>
                 <a target="_blank" href="/aparts/${apart.id}">Просмотреть</a>
                 <br>
                 <a target="_blank" href="${apart.link}">Просмотреть оригинал</a>
               </div>`
    }
    const {apartsStore} = useContext(AppContext)
    const setMapOnAll = (map1) => {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(map1);
        }
    }
    const hideMarkers = () =>{
        setMapOnAll(null);
    }
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCkj-aLrrFHGEI8yYPCUoekPMg99d1iF6E&callback=initMap"
        script.async = true;
        window.initMap = () => {
            let infowindow;
            map = new window.google.maps.Map(document.getElementById("map"), {
                center: {lat: 53.90, lng: 27.544},
                zoom: 11,
            })

            load = async () => {
                markers = []
                const response = await apartsStore.loadAparts(page, 50)
                const aparts = response.aparts
                total = response.total
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
                    markers.push(marker)
                    const a = () => {
                        marker.addListener('click', (m) => {
                            if (infowindow) {
                                infowindow.close()
                            }
                            infowindow = new window.google.maps.InfoWindow({
                                content: getContent(apart),
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

    const next = () => {
        hideMarkers()
        if (page < Math.floor(total / 50)) {
            page++
            load()
        }

    }
    const prev = () => {
        hideMarkers()
        if (page > 1) {
            page--
            load()
        }
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>
                <i onClick={prev} className="arrow left"></i>
                <i onClick={next} className="arrow right"></i>
            </div>
            <div id="map"/>
        </div>
    )
}

export default Map