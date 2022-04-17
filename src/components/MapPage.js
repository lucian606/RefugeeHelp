import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api'
import { Box } from '@chakra-ui/react';
import { useState } from 'react';

export default function MapPage() {


    const center = { lat: 50.45, lng: 30.52 };
    const { loading, currentUser } = useAuth();
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places']
    });
    const [map, setMap] = useState(null);

    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

    if (!isLoaded) {
        return (
            <div>
            <Navbar></Navbar>
                <div>
                    LOADING...
                </div>
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
                    >
                        
                        <Marker position={center} icon='' label='Ajutor sa ma fut' onClick={() => console.log('Ana')} />
                    </GoogleMap>
                </Box>               
            </div>

        </div>
    );
}