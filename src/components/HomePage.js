import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import LoadingCircle from "./LoadingCircle";

export default function HomePage() {

    const { loading, currentUser } = useAuth();

    if (loading) {
        return (
            <LoadingCircle />
        )
    }
    
    return (
        <div>
        <Navbar></Navbar>
            <div className="flex-nowrap ml-4 mr-4">
                <div className="border-solid border-2 p-2 rounded-lg border-gray-600 mt-4 mb-4 flex flex-col justify-center items-center">
                    <p className="text-center p-1 font-medium text-xl">Welcome to WarTolds, <span className="font-bold"> {currentUser.email}</span>!</p>
                    <p className="text-center p-1 font-medium text-xl">Here is a short guide to our platform.</p>
                </div>
            </div>
            <div className="flex-nowrap  ml-4 mr-4">
                <div className="border-solid border-2 p-2 rounded-lg border-gray-600 mt-4 mb-4 flex flex-col justify-center items-center">
                    <p className="text-center p-1 font-medium text-xl">You can go to the <span className="font-bold">Map</span> page to: </p>
                    <ul className="text-center list-inside list-disc p-1 font-medium text-xl">
                        <li> See the map of the world</li>
                        <li> See all your waypoints, or the public ones</li>
                        <li> Add or Remove the waypoints you placed</li>
                        <li> See the details of a certain waypoint</li>
                    </ul>
                </div>
            </div>
            <div className="flex-nowrap ml-4 mr-4">
                <div className="border-solid border-2 p-2 rounded-lg border-gray-600 mt-4 mb-4 flex flex-col justify-center items-center">
                <p className="text-center p-1 font-medium text-xl">You can go to the <span className="font-bold">Forum</span> page to: </p>
                    <ul className="text-center list-inside list-disc p-1 font-medium text-xl">
                        <li> See the posts that have been made</li>
                        <li> Create and delete posts</li>
                        <li> Check out a certain post and look at its comments</li>
                        <li> Comment on a given post</li>
                        <li> Delete your comments</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}