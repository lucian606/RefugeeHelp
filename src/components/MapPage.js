import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";

export default function MapPage() {

    const { loading, currentUser } = useAuth();
    return (
        <div>
        <Navbar></Navbar>
            <div>
                MAP 
            </div>
        </div>
    );
}