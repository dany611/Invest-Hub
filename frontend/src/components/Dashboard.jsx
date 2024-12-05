import React, { useEffect, useState } from 'react';
import { findMatchProfiles } from "../api/service.js";
import ProfileCard from './ProfileCard';
import NotAvailable from './NotAvailable';


const Dashboard = () => {
    const [matches, setMatches] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setFetching(true)
                const { data } = await findMatchProfiles();
                setMatches(data.matchingProfiles);
                setCurrentUser(data.currentUser);
                setFetching(false)
            } catch (error) {
                setFetching(false)
                console.error(error);
            }
        };
        fetchMatches();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Matches</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {fetching && <div className="flex justify-center items-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                </div>}
                {!fetching && matches.map((profile) => (
                    <ProfileCard key={profile._id} profile={profile} currentUser={currentUser} />
                ))}
                {!fetching && !matches.length && <NotAvailable />

                }
            </div>
        </div>
    );
};

export default Dashboard;
