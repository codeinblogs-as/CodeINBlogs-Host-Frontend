import React from 'react'
import logo from "../../assests/logo/logo.png"
const Footer = () => {
    return (

        <section className='bg-gray-950'>
            <footer className="flex flex-col space-y-10 justify-center pt-6 pb-4">

                <nav className="flex justify-center flex-wrap gap-6 text-white font-medium">
                    <a className="hover:text-gray-400" href="#">Home</a>
                    <a className="hover:text-gray-400" href="#">Services</a>
                    <a className="hover:text-gray-400" href="#">About</a>
                    <a className="hover:text-gray-400" href="#">Media</a>
                    <a className="hover:text-gray-400" href="#">Gallery</a>
                    <a className="hover:text-gray-400" href="#">Contact</a>
                </nav>

                <div className="flex justify-center space-x-5">
                  
                    <a href="https://www.linkedin.com/company/codeinblogs" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
                    </a>
                    <a href="https://instagram.com/codeinblogs" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
                    </a>
                   
                    <a href="https://twitter.com/codeinblogs" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
                    </a>
                </div>
                <p className="text-center text-white font-medium">&copy; 2023 CodeINBlogs | All rights reservered. <br />
                <strong>This Website is Proudly Made By CodeINBlogs Team</strong></p>
            </footer>

        </section>

    )
}

export default Footer