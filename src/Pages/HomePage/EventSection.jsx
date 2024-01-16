import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../App.css";
import arrow from "../../assests/images/arrow.png";

const EventSection = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/displayEvent`);
            setEvents(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <section className='bg-slate-950'>
            <div className="container mx-auto p-4 rounded-[15px]">
                <h2 className="text-3xl font-semibold mb-4 text-white text-center">Our Events</h2>
                
                {loading && <p className="text-white text-center">Loading events...</p>}

                {!loading && events.length === 0 && (
                    <p className="text-white text-center">Wait for some time, new events will be listed here.</p>
                )}

                {!loading && events.length > 0 && (
                    <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-between md:mx-80">
                        {events.map((event) => (
                            <div key={event._id} className="bg-[#342835] text-white rounded shadow flex flex-col md:flex-row event-box mb-4">
                                <div className="md:w-1/2 flex-shrink-0">
                                    <img
                                        src={`data:image/jpeg;base64,${event.eventImage}`}
                                        alt={event.title}
                                        className="w-full rounded-t md:rounded-l md:rounded-t-none md:rounded-l-none image-event-section"
                                    />
                                </div>

                                <div className="w-full md:w-1/2 p-4 rounded-b md:rounded-b-none md:rounded-r">
                                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                                    <p className="mb-2">Speaker: {event.speakerName}</p>
                                    <p className="mb-8">{event.description}</p>
                                    <a
                                        href={event.eventLink}
                                        className='text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 text-2xl font-medium px-5 py-2 border rounded-[12px] border-[#fffff]'>
                                        Register
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default EventSection;
