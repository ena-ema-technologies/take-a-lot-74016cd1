import React from 'react';
import facebook from "../../assets/icons/facebook.png";
import google from "../../assets/icons/google.png";
const SocialLogIn = ({ title1, title2 }) => {
    return (
        <section className='w-full'>
            {
                title1 === "Login with Google" ? <div className="divider text-gray-400">or</div> : ""
            }
            <div className='flex flex-col lg:flex-row items-center justify-evenly w-full gap-3'>
                <div className='inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-400 font-normal w-full lg:w-fit'>
                    <img src={google} alt="google" className='w-6' />
                    <p className='text-center w-full lg:text-left'>{title1}</p>
                </div>

                <div className='inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-400 font-normal w-full lg:w-fit'>
                    <img src={facebook} alt="facebook" className='w-6' />
                    <p className='text-center w-full lg:text-left'>{title2}</p>
                </div>
            </div>
            {
                title1 === "Register with Google" ? <div className="divider text-gray-400">or</div> : ""
            }
        </section>
    );
};

export default SocialLogIn;