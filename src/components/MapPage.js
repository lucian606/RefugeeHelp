import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api'
import { Box } from '@chakra-ui/react';

export default function MapPage() {


    const center = { lat: 48.85837, lng: 2.294481 };
    const { loading, currentUser } = useAuth();
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places']
    });

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
                    >
                    </GoogleMap>
                </Box>               
            </div>

        </div>
    );
}