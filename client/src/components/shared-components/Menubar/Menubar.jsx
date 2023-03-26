const Menubar = () => {
    return (
        <nav className='flex justify-between px-[3rem] border drop-shadow-lg items-center'>
            <div className='flex'>
                <a href='/'>
                    <button className='mx-3 text-[1rem] text-[#028090]'>
                        Home
                    </button>
                </a>
            </div>
            <div className='flex p-[1rem] items-center'>
                <a href='/userlogin'>
                    <button className='mx-3 text-[1rem] text-[#028090]'>
                        User Sign In
                    </button>
                </a>
                <a href='/createuser'>
                    <button className='mx-3 text-[1rem] text-[#028090]'>
                        Create User
                    </button>
                </a>
                <p className='mx-3 text-[1rem] text-[#028090]'>|</p>
                <a href='/login'>
                    <button className='mx-3 text-[1rem] text-[#028090]'>
                        Customer Sign In
                    </button>
                </a>
                <a href='/register'>
                    <button className='mx-3 bg-[#028090] rounded-[0.7rem] text-white py-2 px-6 translate-y-1 duration-120ms'>
                        Customer Signup
                    </button>
                </a>
            </div>
        </nav>
    )
}

export default Menubar
