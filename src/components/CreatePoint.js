import Navbar from "./Navbar";
import { useRef } from "react";
const axios = require("axios");
const usersBackendUrl = require("../utils").usersBackendUrl;

export default function CreatePoint(props) {

    const titleRef = useRef();
    const descriptionRef = useRef();
    const latRef = useRef();
    const lngRef = useRef();
    const authorEmailRef = useRef();

    async function handleSubmit() {
        try {
            axios({
                method: "post",
                url: usersBackendUrl + '/points',
                data: {
                    title: titleRef.current.value,
                    description: descriptionRef.current.value,
                    lat: Number(latRef.current.value),
                    lng: Number(lngRef.current.value),
                    authorEmail: authorEmailRef.current.value
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

    async function handleCancel() {
        props.handlePointSubmit();
    }
    // lat lng icon title description authorEmail

    return (
        <div>
            <div className="max-w-sm md:max-w-md xl:max-w-xl 2xl:max-w-2xl w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
                <div className="mb-3">
                    <label htmlFor="post-title" className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300">Point Name</label>
                    <input type="text" ref={titleRef} id="post-title" className="block p-2 w-full text-2xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="post-title" className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300">Author Email</label>
                    <input disabled type="text" ref={authorEmailRef} value={props.email} id="post-title" className="block p-2 w-full text-2xl text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="post-title" className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300">Latitude</label>
                    <input type="text" value={props.lat} ref={latRef} id="post-title" className="block p-2 w-full text-2xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="post-title" className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300">Longitude</label>
                    <input type="text" value={props.lng} ref={lngRef} id="post-title" className="block p-2 w-full text-2xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="post-details" className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300">Description</label>
                    <textarea type="text" ref={descriptionRef} rows={10} id="post-details" className="block p-4 w-full text-2xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>      
                <div className="flex justify justify-between">
                    <button onClick={handleCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" >Cancel</button>
                    <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" >Create Point</button>
                </div>
            </div>
        </div>
    );
}