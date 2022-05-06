import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api'
import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import LoadingCircle from "./LoadingCircle";
import { useEffect } from "react/cjs/react.production.min";
import CreatePoint from "./CreatePoint";
import PointPage from "./PointPage";
const axios = require("axios");
const pointsBackendUrl = require("../utils").pointsBackendUrl;
const usersBackendUrl = require("../utils").usersBackendUrl;

export default function MapPage() {

    const center = { lat: 50.45, lng: 30.52 };
    const { loading, currentUser } = useAuth();
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places']
    });

    const [errorMsg, setErrorMsg] = useState('');
    const [map, setMap] = useState(null);
    const [points, setPoints] = useState([]);
    const [gotPoints, setGotPoints] = useState(false);
    const [createPointModal, setCreatePointModal] = useState(false);
    const [newLat, setNewLat] = useState(0);
    const [newLng, setNewLng] = useState(0);
    const [currentPoint, setCurrentPoint] = useState(null);

    async function getUserPoints() {
        const loadedUserPoints = [];
        try {
            let userPoints = await axios({
                method: "get",
                url: usersBackendUrl + '/points/' + currentUser.email,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("POINTS FROM HTTP");
            console.log(userPoints.data.length);
            for (let i = 0; i < userPoints.data.length; i++) {
                console.log("HTTP POINT");
                const point = userPoints.data[i];
                console.log(point);
                loadedUserPoints.push(point);
            }
            console.log(loadedUserPoints);
            setPoints(loadedUserPoints);
        } catch (error) {
            console.log(error);
        }
    }

    if (!gotPoints) {
        getUserPoints().then(() => {
            console.log("Points got");
            console.log(points);
            setGotPoints(true);
        }); 
    }

    if (currentPoint) {
        return (
            <PointPage currentPoint={currentPoint} handlePointSubmit={handlePointSubmit}/>
        );
    }

    if (!isLoaded) {
        return (
            <div>
            <Navbar></Navbar>
                <LoadingCircle />
            </div>
        );
    }

    function handleMapClick () {
        setCreatePointModal(true);
    }

    function handlePointSubmit () {
        setGotPoints(false);
        setCreatePointModal(false);
        setCurrentPoint(null);
    }

    console.log(createPointModal)

    if (createPointModal) {
        console.log("CREATE POINT MODAL");
        return (
            <div>
                <Navbar/>
                <CreatePoint errorMsg={errorMsg} setErrorMsg={setErrorMsg} handlePointSubmit={handlePointSubmit} lng={newLng} lat={newLat} email={currentUser.email}/>
            </div>
        );
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="">
                <Box position={'relative'} top={0} left={0} h="93.5vh" w="100%" className="h-full w-full">
                    <GoogleMap 
                        center={center}
                        zoom={15} 
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        options={{
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                        }}
                        onLoad={(map) => setMap(map)}
                        onClick={e => {
                            let lat = e.latLng.lat();
                            let lng = e.latLng.lng();
                            setNewLat(lat);
                            setNewLng(lng);
                            handleMapClick();
                        }}>
                            {
                                points.map((point, index) => {
                                    console.log(point);
                                    console.log("Displaying point at index: " + index);
                                    return <Marker position={point} onClick={() => setCurrentPoint(point)}/> 
                                })
                            }
                    </GoogleMap>
                </Box>               
            </div>

        </div>
    );
}