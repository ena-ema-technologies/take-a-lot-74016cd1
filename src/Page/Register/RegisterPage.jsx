import React, { useEffect, useState } from "react";
import { HiArrowLeft, HiXMark } from "react-icons/hi2";
import SocialLogIn from "../../components/SocialLogin/SocialLogIn";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import useProfile from "../../hooks/useProfile";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';


const auth = getAuth();

const RegisterPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(isModalOpen);
    const [userData, setUserData] = useState(null);
    const [verificationCode, setVerificationCode] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [locationData, setLocationData] = useState(null);
    const [userFrom, setUserFrom] = useState(null);
    const [userInfo, refetch] = useProfile();
    const {updateUser, signUp, userVerify , user, PhoneVerificationCode,verifyNumber} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/"
    const [type, setType] = useState("password");
    const [IsShow, setIsShow] = useState(false);
    const [error, setError] = useState("");
    const {
      register,
      formState: { errors },
      handleSubmit, reset, formState
    } = useForm();
    const [allCodes, setAllCodes] = useState([]);
  
    useEffect(() => {
      fetch("https://take-a-lot-server-two.vercel.app/all-country-code")
        .then((res) => res.json())
        .then((data) => setAllCodes(data));
    }, []);
  
  
    const handleShow = () => {
      setType("text");
    };
  
    const handleHide = () => {
      setType("password");
    };
  
  
  
  
    const onSubmit = async (data) => {
      const password = data.password;
      if (password.length < 8) {
        return setError("Password must be eight characters in length")
      }
      if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
        return setError("At least one special character include in your password")
      } else {
        const phoneNumber = data?.countryCode + data?.number;
    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        //   onSignInSubmit();
        }
      });
  
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      setConfirmationResult(confirmationResult);
      setIsModalOpen(true);
      setUserData(data);
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  
      }
  
    };
  
  
  
  
  
    const handleModalSubmit =async() =>{
  
  
      try {
        const result = await confirmationResult.confirm(verificationCode);
  
        if(result){
          const newUser = {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.number,
            countryCode: userData.countryCode,
            password: userData.password,
            isPhoneVerified: "true",
            agreeWithNewslettersReceive : userData.agreeWithNewslettersReceive ? "agree" : "disagree"
           }
          signUp(userData?.email, userData?.password)
          .then((res) => {
              const loggedUser = res.user;
              const display_url = "https://i.ibb.co/jwkFMLB/User-Avatar-Profile-PNG.png"
              updateUser(loggedUser, userData?.firstName, display_url)
                  .then(async () => {
                      const res = await axios.post("https://take-a-lot-server-two.vercel.app/users", newUser)
                      if (res.data.insertedId) {
                        navigate(from, { replace: true })
                        Swal.fire({
                            title: 'Success!',
                            text: 'Sign up successful!',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                        console.log(user);
                        refetch();
                        reset();
                        setError("");
                        setIsModalOpen(false);
                        setUserData(null);
                      }
                  })
    
    
          })
          .catch(error => {
              Swal.fire({
                  title: 'Error!',
                  text: error.message,
                  icon: 'error',
                  confirmButtonText: 'Cool'
              })
    
          })       
        }
  
      } catch (error) {
        console.error('Error verifying code:', error);
      }
  
    }
  
  
  
  
  
  
  
  
  
  
    useEffect(() => {
      if (formState.isSubmitSuccessful) {
        reset({ something: "" })
      }
    }, [formState, reset])
  
    useEffect(() => {
      const accessKey = import.meta.env.VITE_Locationtoken;
  
      fetch(`https://api.ipstack.com/check?access_key=${accessKey}`)
        .then((response) => response.json())
        .then((data) => {
          setLocationData(data);
        })
        .catch((error) => {
          console.error('Error fetching IP information:', error.message);
        });
    }, []);
  
  
    useEffect(()=>{
      const userCode = allCodes.find((cCode) => cCode?.code === locationData?.country_code);
      setUserFrom(userCode)
    },[locationData])
  
    // console.log(userFrom);
  
  
    return (
        <div className=" flex items-center justify-center my-9">
          <div className=" bg-white p-10 rounded shadow">
           
            {
              !isModalOpen && <div>
                 <h3 className="text-xl font-extrabold">Register</h3>
                <div className="social-register my-3">
              <SocialLogIn
                title1="Register with Google"
                title2="Register with Facebook"
              />
            </div>
                      <div className="register-form mt-5">
              
                      <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col space-y-10 w-full"
                    >
                      <div className="inputGroup">
                        <input
                          defaultValue={userData?.firstName}
                          type="text"
                          required
                          className="inputField"
                          {...register("firstName", { required: true })}
                          aria-invalid={errors.firstName ? "true" : "false"}
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label className="inputLabel">First Name</label>
        
                        {errors.firstName?.type === "required" && (
                          <p role="alert" className="text-error font-medium text-xs">
                            First Name is required
                          </p>
                        )}
                      </div>
        
                      <div className="inputGroup">
                        <input
                        defaultValue={userData?.lastName}
                          type="text"
                          required
                          className="inputField"
                          {...register("lastName", { required: true })}
                          aria-invalid={errors.lastName ? "true" : "false"}
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label className="inputLabel">Last Name</label>
        
                        {errors.lastName?.type === "required" && (
                          <p role="alert" className="text-error font-medium text-xs">
                            Last Name is required
                          </p>
                        )}
                      </div>
        
                      <div className="inputGroup">
                        <input
                         defaultValue={userData?.email}
                          type="email"
                          required
                          className="inputField"
                          {...register("email", { required: true })}
                          aria-invalid={errors.email ? "true" : "false"}
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label className="inputLabel">Email Address</label>
        
                        {errors.email?.type === "required" && (
                          <p role="alert" className="text-error font-medium text-xs">
                            Email is required
                          </p>
                        )}
                      </div>
        
                      <div className="inputGroup">
                        <input
                         defaultValue={userData?.password}
                          type={type}
                          required
                          className="inputField"
                          {...register("password", { required: true })}
                          aria-invalid={errors.password ? "true" : "false"}
                        />
                        <div
                          className="absolute right-3 top-3 cursor-pointer"
                          onClick={() => setIsShow(!IsShow)}
                        >
                          {IsShow ? (
                            <FaEyeSlash
                              className="h-5 w-5 text-primary"
                              onClick={handleHide}
                            />
                          ) : (
                            <FaEye
                              className="h-5 w-5 text-primary"
                              onClick={handleShow}
                            />
                          )}
                        </div>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label className="inputLabel">Password</label>
        
                        {errors.password?.type === "required" && (
                          <p role="alert" className="text-error font-medium text-xs">
                            Password is required
                          </p>
                        )}
                        <p className="text-xs font-medium text-red-600 py-1">
                          {error}{" "}
                          {
                            !error && <span className="text-xs font-medium text-gray-500">
                              At least 8 characters and 1 special character or number
                            </span>
                          }
                        </p>
                      </div>
        
                      <div className="w-full">
                        <div className="flex items-end w-full gap-4">
                          <div className="w-1/3">
                            <label className="text-xs text-[#999]">Code</label>
                            {/* <select
                              {...register("countryCode", { required: true })}
                              className="py-2 px-2 border-b-2 border-[#c9c7c7] text-sm font-medium text-gray-500 bg-transparent"
                              aria-invalid={errors.countryCode ? "true" : "false"}
                              defaultValue={userFrom?.dial_code}
                            >
                             
                             <option key={userFrom?._id} value={userFrom?.dial_code}>
                                  {userFrom?.code} ({userFrom?.dial_code})
                                </option>
        
                              
                            </select> */}
                            <select
                      {...register("countryCode", { required: true })}
                      className="py-2 px-2 border-b-2 border-[#c9c7c7] text-sm font-medium text-gray-500 bg-transparent"
                      aria-invalid={errors.countryCode ? "true" : "false"}
                    >
                      {allCodes.map((cCode) => (
                        <option key={cCode?._id} value={cCode?.dial_code}>
                          {cCode?.code} ({cCode?.dial_code})
                        </option>
                      ))}
                    </select>
                          </div>
                          <div className="inputGroup w-full">
                            <input
                              type="tel"
                              defaultValue={userData?.number}
                              required
                              className="inputField"
                              {...register("number", { required: true })}
                              aria-invalid={errors.number ? "true" : "false"}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label className="inputLabel">Mobile Number</label>
        
                            {errors.number?.type === "required" && (
                              <p role="alert" className="text-error font-medium">
                                Mobile number must be at least 10 digits
                              </p>
                            )}
                          </div>
                        </div>
                        {errors.countryCode?.type === "required" && (
                          <p role="alert" className="text-error font-medium text-xs">
                            Country Code is required
                          </p>
                        )}
                        <p className="text-[11px] font-medium text-gray-500 mt-1">
                          We will send an OTP via SMS to verify this number
                        </p>
                      </div>
        
                      <div className="flex flex-col space-y-1">
                        <label className="cursor-pointer label relative">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                            {...register("agreeWithNewslettersReceive ", {
                              required: false,
                            })}
                            aria-invalid={
                              errors.agreeWithNewslettersReceive ? "true" : "false"
                            }
                          />
                          <p className="label-text absolute left-10 text-xs font-medium text-gray-500 mt-1">
                            {" "}
                            I want to receive offers and wish list newsletters
                          </p>
                        </label>
                      </div>
  
                      <div id="recaptcha-container"></div>
        
                      <div className="text-center">
                        <input
                          type="submit"
                          value="Continue"
                          id="sign-in-button"
                          className="bg-primary w-full py-2 rounded bg-opacity-90 text-center font-semibold text-white cursor-pointer"
                        />
                      </div>
                    </form> 
                    
        
        
                    <div className="text-center my-5 text-xs font-medium text-gray-500">
                      By clicking on 'Continue', you agree to our{" "}
                      <Link to="/" className="text-primary">
                        Terms and Conditions
                      </Link>{" "}
                      and confirm that you are over 18 years of age
                    </div>
                  </div>
              </div>
            }
  
            
                       {/* Modal for entering verification code */}
           {
          isModalOpen &&  <div className="flex flex-col  space-y-3">
          <h2 className="inline-flex items-center gap-2 text-lg font-bold mb-4 text-[#000] cursor-pointer" onClick={()=>setIsModalOpen(false)}><HiArrowLeft className="h-5 w-5"/> Verify Your Mobile Number</h2>
  
          <p className="text-sm font-medium">An SMS with your OTP has been sent to <span className="font-semibold">{userData?.countryCode} {userData?.number}</span></p>
  
          <div className="inputGroup">
          <input
            type="text"
            required
            className="inputField"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className="inputLabel">Enter OTP</label>           
  
                      </div>
          <div>
          <button className="bg-primary w-full py-2 rounded bg-opacity-90 text-center font-normal text-sm text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed" disabled={verificationCode ? false : true} onClick={handleModalSubmit}>Create Account</button>
          </div>
  
          <div>
          </div>
        </div>   
        }
  
  
          </div>
        </div>
    );
};

export default RegisterPage;