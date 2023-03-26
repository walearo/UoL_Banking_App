import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs"
import { useState } from "react"
import { Toast } from "../../shared-components/Toast/Toast"
import { Post } from "../../../api/httpMethods/httpMethods"
import { loginEndpoint } from "../../../api/url/url"
import { useNavigate } from "react-router-dom"
import Menubar from "../../shared-components/Menubar/Menubar"

function Login() {
  const redirect = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const showPasswordDetails = () => setShowPassword(!showPassword)

  async function HandleLogin(e) {
    try {
      e.preventDefault()
      if (email === "" || password === "") {
        Toast("error", "All fields are compulsory")
      }
      const body = {
        email: email,
        password: password,
      }

      const apiCallToLogin = await Post(loginEndpoint, body)
      if (apiCallToLogin.data.status === true) {
        Toast("success", apiCallToLogin.data.message)
        localStorage.setItem("token", apiCallToLogin.data.token)
        setTimeout(() => {
          redirect("/dashboard")
        }, 3000)
      } else {
        Toast("error", apiCallToLogin.data.response.data.message)
      }
    } catch (err) {
      console.log("ere: ", err)
      Toast("error", err.response.data.message)
    }
  }
  return (
    <main className='font-Mulish'>
      <Menubar />
      <p className='mt-[2rem]'></p>
      <div className='mx-[2rem] flex-col w-[rem] '>
        <div className='border p-5 w-[28rem] items-center mx-auto drop-shadow-lg rounded-lg'>
          <h2 className='w-[25rem] text-2xl my-4 font-bold'>Customer Login</h2>
          <form onSubmit={HandleLogin} className=' my-5'>
            <label htmlFor='' className='text-sm'>
              Email
            </label>
            <div className='w-[25rem]'>
              <input
                type='email'
                id='Email'
                name='Email'
                className='flex items-center my-3 w-[25rem] h-[3rem] justify-between bg-[#d3ecf0] rounded-lg'
                placeholder='abc@example.com'
                style={{ border: "none", outline: "none" }}
                required
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>

            <label htmlFor='' className='text-sm'>
              Password
            </label>
            <div className='flex items-center my-3 w-[25rem] h-[3rem] justify-between bg-[#d3ecf0] rounded-lg'>
              <input
                type={showPassword ? "text" : "password"}
                id='Password'
                name='Password'
                className='rounded-lg  w-[20rem] h-[3rem] p-2  bg-[#d3ecf0] focus:ring-0'
                placeholder='********'
                style={{ border: "none", outline: "none" }}
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              {showPassword ? (
                <BsFillEyeSlashFill
                  className='mr-5'
                  onClick={showPasswordDetails}
                />
              ) : (
                <BsFillEyeFill
                  className='mr-5'
                  onClick={showPasswordDetails}
                />
              )}
            </div>
            <button
              type='submit'
              className='border border-[#40196d] bg-[#028090] w-[10rem] mt-[2rem] hover:-translate-y-1 duration-700 p-2 rounded-lg text-white text-sm'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Login
