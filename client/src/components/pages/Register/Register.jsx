import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs"
import { useState } from "react"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom"
import BigProcessingButton from "../../shared-components/Button/BigProcessingButton"
import { Toast } from "../../shared-components/Toast/Toast"
import { RegisterEndpoint } from "../../../api/url/url"
import { Post } from "../../../api/httpMethods/httpMethods"
import Menubar from "../../shared-components/Menubar/Menubar"

function Register() {
  const redirect = useNavigate()

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmmitting] = useState(0) //0=not submitted, 1=submitting, 2 for submmitted
  const [disabledOption, setDisabledOption] = useState(false)

  const showPasswordDetails = () => setShowPassword(!showPassword)

  async function submitRegisterForm(e) {
    try {
      e.preventDefault() //prevent the page from reload

      //validation
      if (!firstname || !lastname || !email || !phone || !password) {
        throw new Error("All the fields are compulsory")
      }
      const body = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        password: password
      }

      //pick the vlues and hit the backend
      setIsSubmmitting(1)
      setDisabledOption(true)

      const registerApiCallResponse = await Post(RegisterEndpoint, body)

      setIsSubmmitting(2)
      if (registerApiCallResponse.data.status === true) {
        const objToSave = {
          email: email
        }
        localStorage.setItem("userData", JSON.stringify(objToSave))
        redirect("/register/verify-otp")
      } else {
        Toast("error", registerApiCallResponse.data.error.message)
      }
    } catch (error) {
      setIsSubmmitting(0)
      setDisabledOption(false)
      Toast("error", error.response.data.message)
    }
  }

  return (
    <main className='font-Mulish'>
      <Menubar />
      <p className='mt-[2rem]'></p>
      <div className='mx-[2rem] flex-col w-[32rem]'>
        <div className='border p-5 w-[28rem] mx-auto drop-shadow-lg rounded-lg'>
          <h2 className='w-[25rem] text-2xl my-4 font-bold'>Customer Registration Form</h2>

          <form onSubmit={submitRegisterForm} className='my-5'>
            <div className='flex justify-between'>
              <div className=''>
                <div className='w-[20rem]'>
                  <input
                    type='text'
                    id='firstname'
                    name='firstname'
                    className='rounded-lg w-[25rem] h-[3rem] my-3 p-2 bg-[#d3ecf0] focus:ring-0'
                    placeholder='First Name'
                    style={{ border: "none", outline: "none" }}
                    required
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className=''>
                <div className='w-[20rem]'>
                  <input
                    type='text'
                    id='lastname'
                    name='lastname'
                    className='rounded-lg w-[25rem] h-[3rem] my-3 p-2 bg-[#d3ecf0] focus:ring-0'
                    placeholder='Last Name'
                    style={{ border: "none", outline: "none" }}
                    required
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-between '>
              <div className=''>
                <div className='w-[25rem]'>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    className='rounded-lg w-[25rem] h-[3rem] my-3 p-2 bg-[#d3ecf0] focus:ring-0'
                    placeholder='Email Address'
                    style={{ border: "none", outline: "none" }}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className=''>
                <div className='w-[25rem]'>
                  <input
                    type='tel'
                    id='tel'
                    name='telephone'
                    className='rounded-lg w-[25rem] h-[3rem] my-3 p-2 bg-[#d3ecf0] focus:ring-0'
                    placeholder='Phone Number'
                    style={{ border: "none", outline: "none" }}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className=''>
                <div className='flex items-center my-3 w-[25rem] h-[3rem] justify-between bg-[#d3ecf0] rounded-lg'>
                  <input
                    type={showPassword ? "text" : "password"}
                    id='Password'
                    name='Password'
                    className='rounded-lg  w-[20rem] h-[3rem] p-2  bg-[#d3ecf0] focus:ring-0'
                    placeholder='Password'
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
              </div>
            </div>
            <BigProcessingButton
              isSubmitting={isSubmitting}
              text='Register'
              disabled={disabledOption}
            />
          </form>
        </div>
      </div>
    </main>
  )
}

export default Register