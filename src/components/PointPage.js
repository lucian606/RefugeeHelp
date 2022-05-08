import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";
const axios = require('axios');
const usersBackendUrl = require('../utils').usersBackendUrl;
const pointsBackendUrl = require('../utils').pointsBackendUrl;

export default function PointPage(props) {

    const { currentUser } = useAuth();

    console.log(props.currentPoint);

    async function deletePoint() {
        if (props.currentPoint.visibility === 'Public') {
            console.log("Public point");
            console.log(props.currentPoint._id);
            await axios({
                method: "delete",
                url: pointsBackendUrl + '/' + props.currentPoint._id,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                console.log(res);
                console.log("Point deleted");
                props.handlePointSubmit();
            }, error => {
                console.log(error.response);
                console.log("Error deleting point");
            });
        } else {
            try {
                axios({
                    method: "delete",
                    url: usersBackendUrl + '/points',
                    data: {
                        email: currentUser.email,
                        id: props.currentPoint.id
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    console.log(res);
                }, error => {
                    console.log(error);
                    throw error;
                });
                props.handlePointSubmit();
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="flex flex-col">
            <Navbar/>
            <div className="flex-nowrap ml-4 mr-4">
                <div className="border-solid border-2 p-4 rounded-lg border-gray-600 mt-4 mb-4">
                    <p className="text-2xl break-all">
                        <span className="font-bold">Name:</span> {props.currentPoint.title}
                    </p>
                    <p className="text-2xl pt-2 pb-2 break-all">
                        <span className="font-bold">Description:</span>
                        <br/>
                        {props.currentPoint.description}
                    </p>
                    <p className="text-2xl pt-2 pb-2 break-all">
                        <span className="font-bold">Latitude: </span>
                        {props.currentPoint.lat}
                    </p>
                    <p className="text-2xl pt-2 pb-2 break-all">
                        <span className="font-bold">Longitude: </span>
                        {props.currentPoint.lng}
                    </p>
                    <p className="text-2xl pt-2 pb-2 break-all">
                        <span className="font-bold">Placed by: </span>
                        {props.currentPoint.authorEmail}
                    </p>
                    <p className="text-2xl pt-2 pb-2 break-all">
                        <span className="font-bold">Point visibility: </span>
                        {props.currentPoint.visibility}
                    </p>
                    <div className="flex justify-between pt-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={props.handlePointSubmit}>
                            Back to map
                        </button>
                        {
                            currentUser.email === props.currentPoint.authorEmail &&
                            <button onClick={deletePoint}>
                                <svg className="fill-current w-10 h-10 m-2" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path d="M28,40H11.8c-3.3,0-5.9-2.7-5.9-5.9V16c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1c0,2.2,1.8,3.9,3.9,3.9H28c2.2,0,3.9-1.8,3.9-3.9V16   c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1C33.9,37.3,31.2,40,28,40z"/>
                                    </g>
                                    <g>
                                        <path d="M33.3,4.9h-7.6C25.2,2.1,22.8,0,19.9,0s-5.3,2.1-5.8,4.9H6.5c-2.3,0-4.1,1.8-4.1,4.1S4.2,13,6.5,13h26.9   c2.3,0,4.1-1.8,4.1-4.1S35.6,4.9,33.3,4.9z M19.9,2c1.8,0,3.3,1.2,3.7,2.9h-7.5C16.6,3.2,18.1,2,19.9,2z M33.3,11H6.5   c-1.1,0-2.1-0.9-2.1-2.1c0-1.1,0.9-2.1,2.1-2.1h26.9c1.1,0,2.1,0.9,2.1,2.1C35.4,10.1,34.5,11,33.3,11z"/>
                                    </g>
                                    <g>
                                        <path d="M12.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C13.9,34.6,13.4,35.1,12.9,35.1z"/>
                                    </g>
                                    <g>
                                        <path d="M26.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C27.9,34.6,27.4,35.1,26.9,35.1z"/>
                                    </g>
                                    <g>
                                        <path d="M19.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C20.9,34.6,20.4,35.1,19.9,35.1z"/>
                                    </g>
                                </svg>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}