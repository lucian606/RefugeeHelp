import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";
import { firestoreDb } from "../firebase";
import { arrayUnion, updateDoc } from "firebase/firestore";
import { collection, addDoc, query, getDocs, doc, getDoc } from "firebase/firestore";
import LoadingCircle from "./LoadingCircle";
const emailsBackendUrl = require("../utils").emailsBackendUrl;
const axios = require("axios");

export default function SubmitPost() {

    const navigate = useNavigate();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const { currentUser } = useAuth();
    const [error, setError] = useState('');
    const [succes, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    function handleCancel() {
        navigate("/forum");
    }

    async function handleSubmit(event) {
        try {
            setLoading(true);
            console.log(currentUser.email);
            if (titleRef.current.value === '' || descriptionRef.current.value === '') {
                setError('Please fill in all fields');
                throw new Error('Please fill in all fields');
            }
            const title = titleRef.current.value;
            const postsRef = collection(firestoreDb, "posts");
            const newForumPost = {
                title: title,
                description: descriptionRef.current.value,
                authorEmail: currentUser.email,
                comments: [],
                time: new Date().toLocaleString()
            }
            await addDoc(postsRef, newForumPost);
            setSuccess('Post created successfully');
            setError('');
            setLoading(false);
            setTimeout(() => {
                setSuccess('');
            }, 1000);
            axios({
                method: "post",
                url: emailsBackendUrl,
                data: { 
                    email: currentUser.email,
                    subject: "Your post : " + title + " has been created", 
                    message: "Your post has been created and is now on the forum."
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            setLoading(false);
            console.log("ERROR");
            console.log(error);
            setError(error.message);
            setSuccess('');
            setTimeout(() => {
                setError('');
            }, 1000);
        }
    }

    if (loading) {
        return (
            <Navbar>
                <LoadingCircle/>
            </Navbar>
        );
    }

    return (
        <div>
            <Navbar/>
            <div className="max-w-sm md:max-w-md xl:max-w-xl 2xl:max-w-2xl w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
            {error !== '' &&
                    <div className="bg-red-100 border border-red-400 text-red-700 rounded relative flex justify-center" role="alert">
                        <div>
                            <strong className="text-md xl:text-xl 2xl:text-2xl font-bold">Error: </strong>
                            <div className="text-md xl:text-xl 2xl:text-2xl sm:inline">{error}</div>
                        </div>
                    </div>
                }
                {
                    succes !== '' &&
                    <div className="bg-green-100 border border-green-400 text-green-700 rounded relative flex justify-center" role="alert">
                        <div>
                            <strong className="text-md xl:text-xl 2xl:text-2xl font-bold">Succes: </strong>
                            <div className="text-md xl:text-xl 2xl:text-2xl sm:inline">{succes}</div>
                        </div>
                    </div>
                }
                <div className="mb-3">
                    <label htmlFor="post-title" className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300">Title</label>
                    <input type="text" ref={titleRef} id="post-title" className="block p-2 w-full text-2xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>                  
                <div className="mb-3">
                    <label htmlFor="post-details" className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300">Description</label>
                    <textarea type="text" ref={descriptionRef} rows={10} id="post-details" className="block p-4 w-full text-2xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>      
                <div className="flex justify justify-between">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleCancel}>Cancel</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleSubmit}>Submit Post</button>
                </div>
            </div>
        </div>
    );
}