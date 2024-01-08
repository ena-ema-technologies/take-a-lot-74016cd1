import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosHeart, IoMdArrowBack, IoMdArrowForward, IoMdClose } from "react-icons/io";
import { HiShoppingCart, HiChevronRight, HiOutlineClock, HiUser } from "react-icons/hi2";
import { IoMdSearch } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import Banner from "../../Home/Banner/Banner";
import Register from "../../Register/Register";
import Login from "../../Login/Login";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";
import useSeller from "../../../hooks/useSeller";

const NavigationBar = () => {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [allCategoryList, setAllCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [deptName, setDeptName] = useState("");
    console.log(deptName);
    const [sellerInfo] = useSeller();
    console.log(sellerInfo)
    const [carts, refetch] = useCart();
    const navigate = useNavigate();
    const { logOut, user } = useAuth()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const location = useLocation()
    console.log(carts)

    useEffect(() => {
        fetch("https://take-a-lot-server-two.vercel.app/all/categories/of/products")
            .then(res => res.json())
            .then(data => setAllCategoryList(data))
    }, [])
    console.log(allCategoryList)

    useEffect(() => {
        const categoryData = allCategoryList?.find(category => category?.mainCategory === deptName)
        setSelectedCategory(categoryData)

    }, [deptName])
    console.log(selectedCategory);

    const onSubmit = (data) => console.log(data);
    const [shopPhoneMenu, setShopPhoneMenu] = useState(false);
    const [PhoneAccountMenu, setPhoneAccountMenu] = useState(false);


    const [isOpen, setIsOpen] = useState(false);

    const [dropdownOpen, setDropdownOpen] = useState(location.pathname === "/" ? true : false);

    const [mSearchPage, setMSearchPage] = useState(false)
    const inputRef = useRef(null);
    // console.log(inputRef);



    const handleInputClick = () => {
        setMSearchPage(true);
    };

    const handleModalContentClick = (e) => {
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setMSearchPage(false);
        }

    };

    const handleOut = () => {
        logOut()
            .then(() => {

                Swal.fire({
                    title: 'Success!',
                    text: 'Logout successful!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                navigate("/")
            })
    }

    return (
        <header className={`z-50 nav-top  bg-white relative ${location.pathname === "/" && "lg:h-[720px]"}`}>

            {/* Mobile menu */}
            <div className={`absolute  lg:hidden bg-white min-h-screen transition-all duration-700 ${mSearchPage ? "top-0 right-0 left-0 z-50" : "-top-[1000px]  -right-[1000px] -left-[1000px]"}`} onClick={handleModalContentClick}>
                <div className="shadow-md py-3">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] mx-auto" ref={inputRef}>

                        <input type="text" placeholder="Search for products, brands..." {...register("searchText")} className="w-full px-3 py-1 placeholder:text-xs placeholder:text-[#28282B] outline-none rounded-md border" />
                        <button onClick={() => setMSearchPage(false)} className="absolute right-5 top-[13px] bg-[#4d4d4f] py-1 px-4 text-white rounded-r-md">
                            <IoMdClose className="h-6 w-6" />
                        </button>

                    </form>
                </div>
            </div>

            <div className="lg:hidden bg-white  w-full shadow-md sticky top-0 left-0 right-0">
                <nav>
                    <div className="navbar">
                        <div className="navbar-start">
                            <div className="drawer">
                                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                                <div className="flex-none lg:hidden">
                                    <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                    </label>
                                </div>
                                <div className="drawer-side">
                                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                                    <ul className="menu py-0 pl-0 pr-0 w-72 h-full bg-white text-base-content relative">
                                        <li className="shadow mb-2 py-2">
                                            <Link to="/"><img src="https://i.ibb.co/wB0jzwR/Electro-DEMO-4.png" alt="Takealot" className="w-28" /></Link>
                                        </li>

                                        <ul className="px-0 shadow my-3">
                                            <li className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200">
                                                <Link to="/">Home</Link>
                                            </li>
                                            <li className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200" onClick={() => setShopPhoneMenu(true)}>

                                                <p className="flex items-center justify-between">Shop by Category <IoMdArrowForward className="h-5 w-5" /></p>
                                            </li>
                                            <li className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200">
                                                <Link to="/deals">Deal</Link>
                                            </li>
                                            <li className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200">
                                                <Link to="/account/orders">Orders</Link>
                                            </li>
                                            <li className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200" onClick={() => setPhoneAccountMenu(true)}>
                                                <Link to="/my-account" className="flex items-center justify-between whitespace-nowrap">My Account <IoMdArrowForward className="h-5 w-5" /></Link>
                                            </li>
                                            <li className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200">
                                                <Link to="/help-centre">Help Center</Link>
                                            </li>

                                        </ul>


                                        <ul className="px-0 shadow my-3">
                                            <li className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200">
                                                <Link to="/cart" className="inline-flex items-center gap-2"> <HiShoppingCart className="w-5 h-5 text-success" /> Cart</Link>
                                            </li>
                                            <li className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200">
                                                <Link to="/" className="inline-flex items-center gap-2"><IoIosHeart className="w-5 h-5 text-error" /> Lists</Link>
                                            </li>

                                        </ul>

                                        {
                                            user ?
                                                <ul className="w-full px-0 my-4 absolute bottom-0 flex items-center justify-around">
                                                    <label className="px-3 py-1 inline-flex items-center gap-2 cursor-pointer border border-primary bg-primary rounded-3xl text-white font-semibold"><HiUser className="h-5 w-5" /> <span>{user?.displayName}</span></label>
                                                    <label className="px-3 py-1 inline-flex items-center gap-2 cursor-pointer text-primary font-semibold" onClick={handleOut} >Logout</label>
                                                </ul> :
                                                <ul className="w-full px-0 my-4 absolute bottom-0 flex items-center justify-around">
                                                    <label onClick={() => setLoginModalOpen(true)} htmlFor="logIn_modal" className="px-3 py-1 inline-flex items-center gap-2 cursor-pointer border border-primary bg-primary rounded-3xl text-white font-semibold"><HiUser className="h-5 w-5" /> Login</label>
                                                    <label htmlFor="register_modal" className="px-3 py-1 inline-flex items-center gap-2 cursor-pointer text-primary font-semibold">Register</label>
                                                </ul>
                                        }

                                    </ul>

                                    {
                                        shopPhoneMenu && <ul className="menu py-0 pl-0 pr-0 w-72 min-h-screen bg-white text-base-content">
                                            <li className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200">
                                                <p className="flex items-center text-primary" onClick={() => setShopPhoneMenu(false)}><IoMdArrowBack className="h-5 w-5" /> Main Menu</p>
                                                <span className="text-lg">Shop by category</span>
                                            </li>

                                            <ul className="px-0 shadow my-3">

                                                {
                                                    allCategoryList?.map(list => <li key={list?._id} className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200" onClick={() => setDeptName(list?.mainCategory)}>
                                                        <span className="flex items-center justify-between">{list?.mainCategory} <IoMdArrowForward className="h-4 w-4" /></span>
                                                    </li>)
                                                }
                                            </ul>



                                        </ul>
                                    }

                                    {
                                        PhoneAccountMenu && <ul className="menu py-0 pl-0 pr-0 w-72 min-h-screen bg-white text-base-content">
                                            <li className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200">
                                                <p className="flex items-center text-primary" onClick={() => setPhoneAccountMenu(false)}><IoMdArrowBack className="h-5 w-5" /> Main Menu</p>
                                                <span className="text-lg">My Account</span>
                                            </li>

                                            <ul className="px-0 shadow my-4">
                                                <li className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200">
                                                    <Link to="/account/orders">Orders</Link>
                                                </li>
                                                <li className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200">
                                                    <Link to="/account/returns">Returns</Link>
                                                </li>

                                            </ul>

                                            <ul className="px-0 shadow my-4">
                                                <li className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200">
                                                    <Link to="/account/personal-details">Personal Details</Link>
                                                </li>
                                                <li className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200">
                                                    <Link to="/account/address-book">Address Book</Link>
                                                </li>

                                                <li className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200">
                                                    <Link to="/account/invoices">Invoices</Link>
                                                </li>

                                                <li className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200">
                                                    <Link to="/account/reviews">Product Reviews</Link>
                                                </li>

                                                <li className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200">
                                                    <Link to="/account/newsletter">Newsletter Subscriptions</Link>
                                                </li>

                                            </ul>

                                            <ul className="px-0 shadow my-4">
                                                <li className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200">
                                                    <Link to="/account/credits">Credit & Refunds</Link>
                                                </li>
                                                <li className="py-2 bg-white focus:bg-transparent hover:bg-transparent bg-transparent border-b border-b-gray-200">
                                                    <Link to="/account/voucher">Redeem Gift Voucher</Link>
                                                </li>

                                            </ul>



                                        </ul>
                                    }


                                    {
                                        selectedCategory && <div className="department-container bg-gray-100  z-50 grid grid-cols-1 w-72">
                                            <div className="py-4 px-3">
                                                <p className="flex items-center text-primary" onClick={() => setDeptName("")}>
                                                    <IoMdArrowBack className="h-5 w-5" /> Category Menu
                                                </p>
                                                <p className="text-primary font-bold text-sm mt-5">{selectedCategory?.mainCategory}</p>

                                                <div className="my-3">
                                                    <ul className="">
                                                        {
                                                            selectedCategory?.subCategories?.map((subCate, indx) => <li key={indx} className="py-2 border-b border-b-gray-200">
                                                                <Link className="categorySubNav w-full" to={`/all/${selectedCategory?.mainCategory}/${subCate}`}>{subCate}</Link>
                                                            </li>)
                                                        }

                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                    }



                                </div>
                            </div>
                        </div>
                        <div className="navbar-center">
                            <Link to="/"><img src="https://i.ibb.co/wB0jzwR/Electro-DEMO-4.png" alt="Takealot" className="w-32" /></Link>
                        </div>
                        <div className="navbar-end">
                            <button className="btn btn-ghost btn-circle" onClick={handleInputClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                            <button className="btn btn-ghost btn-circle">
                                <Link to="/cart" className="indicator">
                                    <HiShoppingCart className="w-5 h-5" />
                                </Link>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>





            {/* large menubar */}
            <div className="bg-white z-50">
                <nav className="hidden lg:flex justify-between w-full px-4 py-4 max-w-7xl mx-auto">
                    <div className="w-full inline-flex items-center space-x-2">
                        <div className="space-x-12 inline-flex items-center">
                            <Link to="/"><img src="https://i.ibb.co/wB0jzwR/Electro-DEMO-4.png" alt="Takealot" className="w-44" /></Link>

                            <Link to="/help-centre" className="smallLink">Help Center</Link>
                        </div>
                        <div className="divider divider-horizontal"></div>
                        <div>
                            <Link to="/sell-on-mustake" className="smallLink">Sell on Mustake</Link>
                        </div>
                    </div>
                    <div className="w-full text-right">
                        <div className="inline-flex items-center justify-center">
                            {/* <Link to="/login" className="smallLink">Login</Link> */}
                            {
                                user ? <label className="smallLink"><span>Hi</span> <span>{user?.displayName}</span> <span className="cursor-pointer" onClick={handleOut}><small>(that's not me)</small></span></label> : <label htmlFor="logIn_modal" className="smallLink cursor-pointer">Login</label>
                            }

                            <div className="divider divider-horizontal"></div>
                            {/* <Link to="/register" className="smallLink">Register</Link> */}
                            {/* <button className="smallLink">Register</button> */}
                            {
                                user ? <label className="smallLink cursor-pointer" onClick={handleOut} >Logout</label> : <label htmlFor="register_modal" className="smallLink cursor-pointer">Register</label>
                            }





                            <div className="divider divider-horizontal"></div>
                            <Link to="/account/orders" className="smallLink">Orders</Link>
                            <div className="divider divider-horizontal"></div>


                            <div
                                className="relative inline-block text-left group mr-2"
                                onMouseEnter={() => setIsOpen(true)}

                            >
                                <button
                                    className="text-[13px] hover:text-primary inline-flex items-center z-50 whitespace-nowrap"
                                    onMouseLeave={() => setIsOpen(false)}
                                >
                                    My Account
                                    {isOpen ? (
                                        <FaAngleUp className="ml-2" />
                                    ) : (
                                        <FaAngleDown className="ml-2" />
                                    )}
                                </button>
                                <div
                                    className={`${isOpen ? 'flex flex-col gap-1 px-4 py-2  transition-all duration-500' : '-top-96'
                                        } absolute right-0  mt-0  w-36 rounded-md shadow-lg bg-white z-50`}
                                    onMouseEnter={() => setIsOpen(true)}
                                    onMouseLeave={() => setIsOpen(false)}
                                >

                                    <Link to="/my-account" className="smallLink">My Account</Link>
                                    {
                                        sellerInfo?.status === "approved" && <Link to="/seller-account-overview" className="smallLink">Account Overview</Link>
                                    }
                                    {
                                        sellerInfo?.status === "approved" && <Link to="/seller-dashboard/dashboard-home" className="smallLink">Seller Dashboard</Link>
                                    }
                                    <Link to="/account/orders" className="smallLink">Track Order</Link>
                                    <Link to="/account/returns" className="smallLink">Returns</Link>
                                    <Link to="/account/credits" className="smallLink">Credits & Refunds</Link>
                                    <Link to="/account/reviews" className="smallLink">Product Reviews</Link>
                                    <Link to="/account/invoices" className="smallLink">Invoices</Link>
                                    <Link to="/account/personal-details" className="smallLink">Personal Details</Link>
                                    <Link to="/help-centre" className="smallLink">Help Center</Link>
                                </div>
                            </div>



                            <div className="wishlist-and-cart inline-flex items-center gap-3">
                                <Link to="wishlist">
                                    <p className="bg-error hover:bg-[#f5464f] px-2 py-2 rounded-full">
                                        <IoIosHeart className="w-5 h-5 text-white" />
                                    </p>

                                </Link>
                                <Link to="/cart" className="inline-flex items-center gap-4 px-3 py-1 bg-success rounded-2xl font-semibold text-white cursor-pointer hover">
                                    <HiShoppingCart className="w-5 h-5" /> <span>{carts?.length ? carts?.length : 0}</span>
                                </Link>
                            </div>

                        </div>
                    </div>
                </nav>
            </div>
            <div className="hidden lg:block bg-primary px-4 py-2">
                <nav className="hidden lg:flex items-center justify-between gap-8 h-[80px] relative max-w-7xl mx-auto">
                    <div className="w-1/4">
                        <div className="dropdown dropdown-open" onMouseEnter={() => setDropdownOpen(true)} onClick={() => setDropdownOpen(false)}>
                            <label tabIndex={0} className="inline-flex items-center justify-between text-white bg-[#4d4d4f] px-4 py-2 rounded-md text-[13px] w-56">Shop by Department <FaAngleDown className="w-4 h-4" /></label>
                            {
                                dropdownOpen && <ul tabIndex={0} className="dropdown-content z-[1] shadow bg-white w-56 pt-2 border-r h-[550px] relative">

                                    {
                                        allCategoryList?.map(list => <li key={list?._id} className="categoryNav w-full" onMouseEnter={() => setDeptName(list?.mainCategory)} onMouseLeave={() => setDeptName("")}>{list?.mainCategory} <HiChevronRight className="h-4 w-4" /></li>)
                                    }

                                    <Link className="inline-flex  items-center justify-center w-full py-2 gap-2 bg-green-500 mt-1 text-base-100 absolute bottom-0 left-0"><HiOutlineClock className="h-7 w-7" /> <span className="text-xl font-bold">Daily Deals</span></Link>

                                </ul>
                            }
                        </div>
                    </div>
                    <div className="w-full relative">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <input type="text" onClick={handleInputClick} ref={inputRef} placeholder="Search for products, brands..." {...register("searchText")} className="w-full px-3 py-1 placeholder:text-xs placeholder:text-[#28282B] outline-none rounded-md" />
                            <button className="absolute right-0 bg-[#4d4d4f] py-1 px-4 text-white rounded-r-md">
                                <IoMdSearch className="h-6 w-6" />
                            </button>

                        </form>

                        <div className="w-full grid grid-cols-8 mt-2 text-center text-[#333333] text-xs bg-[#ededed] rounded-l-sm rounded-r-sm">
                            <Link to="/all" className="  py-[6px] text-white bg-[#55378b] hover:bg-[#61419c] rounded-l-sm"> Alot For Less</Link>


                            <Link to="/all" className="border-r border-[#ccc] py-[6px]">World Cup 2023</Link>

                            <Link to="/all" className="border-r border-[#ccc] py-[6px]"> New to Mustake</Link>

                            <Link to="/all" className="border-r border-[#ccc] py-[6px]"> Christmas</Link>

                            <Link to="/all" className="border-r border-[#ccc] py-[6px]"> Small Local Sellers</Link>

                            <Link to="/all" className="border-r border-[#ccc] py-[6px]"> Deals & Promotions</Link>


                            <Link to="/all" className="border-l border-r border-[#ccc] py-[6px]"> Clearance</Link>

                            <Link to="/all" className=" py-[6px] rounded-r-sm"> Brands Store</Link>


                        </div>
                    </div>

                    {
                        selectedCategory && <div onMouseLeave={() => setDropdownOpen(false)}><div className="department-container absolute left-[220px] bg-white w-[400px] h-[550px] top-0.5 mt-14 z-50 grid lg:grid-cols-1" onMouseEnter={() => setDeptName(selectedCategory?.mainCategory)} onMouseLeave={() => setDeptName("")}>
                            <div className="bg-gray-100 px-3 py-4 overflow-y-auto">
                                <p className="text-primary font-bold text-[13px] ">{selectedCategory?.mainCategory}</p>

                                <div className="my-3 overflow-y-auto">
                                    <ul className="overflow-y-auto">
                                        <span className="text-[13px] text-gray-600 font-bold pl-2">Featured</span>

                                        {
                                            selectedCategory?.subCategories?.map((subCate, indx) => <li key={indx}>
                                                <Link className="categorySubNav w-full" to={`/all/${selectedCategory?.mainCategory}/${subCate}`}>{subCate}</Link>
                                            </li>)
                                        }

                                    </ul>
                                </div>

                            </div>
                        </div></div>
                    }

                </nav>

            </div>
            {
                location.pathname === "/" ?
                    <div className="max-w-5xl mx-auto  lg:absolute lg:left-[20%] 2xl:left-[28%] w-full">
                        <Banner />
                    </div> : ""
            }

            <div>
                <Register />
                <Login />
            </div>


        </header>
    );
};

export default NavigationBar;