import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../App.css";
import "./TestimonialSection.css";

const TestimonialSection = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [displayedTestimonials, setDisplayedTestimonials] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/displayTestimonials`);
                setTestimonials(response.data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        };

        fetchTestimonials();
    }, []);

    useEffect(() => {
        // Update displayed testimonials when the testimonials or currentIndex change
        const endIndex = currentIndex + 3;
        setDisplayedTestimonials(testimonials.slice(currentIndex, endIndex));
    }, [testimonials, currentIndex]);

    const handlePrevClick = () => {
        // Handle previous button click
        const newIndex = Math.max(currentIndex - 3, 0);
        setCurrentIndex(newIndex);
    };

    const handleNextClick = () => {
        // Handle next button click
        const newIndex = Math.min(currentIndex + 3, testimonials.length - 1);
        setCurrentIndex(newIndex);
    };

    return (
        <section className="bg-slate-950 text-white">
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <h2 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    What our Community says
                </h2>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
                    {displayedTestimonials.map((testimonial, index) => (
                        <blockquote
                            key={testimonial._id}
                            className={`rounded-lg bg-[#0f172a] p-6 shadow-sm sm:p-8 ${index === 1 ? 'active' : ''}`}
                        >

                            <div className="flex items-center gap-4">
                                <img
                                    src={`data:image/jpeg;base64,${testimonial.testimonialImage}`} // Adjust the MIME type as needed
                                    alt={testimonial.title}
                                    className="h-14 w-14 rounded-full object-cover"
                                />
                                <div className='flex gap-12'>

                                    <div>

                                        <p className="mt-0.5 text-lg font-medium text">{testimonial.authorName}<span className='text-sm'>/{testimonial.role}</span></p>
                                    </div>
                                    <div>      <i class="fa fa-quote-right  text-3xl text-dark:bg-gray-900 italic"></i>
                                    </div>


                                </div>
                            </div>

                            

                            <p className="mt-4">
                                {testimonial.description}
                            </p>
                        </blockquote>
                    ))}
                </div>



                {/* <div className="flex justify-center mt-6">
                    <button
                        className="text-white mr-4"
                        onClick={handlePrevClick}
                        disabled={currentIndex === 0}
                    >
                        Prev
                    </button>
                    <button
                        className="text-white"
                        onClick={handleNextClick}
                        disabled={currentIndex + 3 >= testimonials.length}
                    >
                        Next
                    </button>
                </div> */}
            </div>
        </section>


    )
}

export default TestimonialSection;

