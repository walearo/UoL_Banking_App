import { useState, useEffect } from "react"
import "react-toastify/dist/ReactToastify.css"
import BigProcessingButton from "../../shared-components/Button/BigProcessingButton"
import { Toast } from "../../shared-components/Toast/Toast"
import { RegisterEndpoint, GetCustomerDetailsEndpoint } from "../../../api/url/url"
import { Post, Get } from "../../../api/httpMethods/httpMethods"
import Container from "../Container/Container"

function Customers() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const [isSubmitting, setIsSubmmitting] = useState(0) //0=not submitted, 1=submitting, 2 for submmitted
    const [disabledOption, setDisabledOption] = useState(false)
    const [customerList, setCustomerList] = useState([])

    async function submitRegisterForm(e) {
        try {
            e.preventDefault()
            const passwd = Math.floor((Math.random() * 100000) + 1)
            setPassword(passwd.toString())
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

            setIsSubmmitting(1)
            setDisabledOption(true)

            const registerApiCallResponse = await Post(RegisterEndpoint, body)

            setIsSubmmitting(2)
            if (registerApiCallResponse.data.status === true) {
                const objToSave = {
                    email: email
                }
                localStorage.setItem("userData", JSON.stringify(objToSave))
            } else {
                Toast("error", registerApiCallResponse.data.error.message)
            }
        } catch (error) {
            setIsSubmmitting(0)
            setDisabledOption(false)
            Toast("error", error.response.data.message)
        }
    }

    useEffect(() => {
        async function fetchCustomerDetails() {
            try {
                const getCustomerDetailResponse = await Get(GetCustomerDetailsEndpoint)
                setCustomerList([...customerList, getCustomerDetailResponse.data.data]);
            } catch (error) {
                setCustomerList("")
            }
        }
        fetchCustomerDetails()
    }, [isSubmitting])

    //const arrayDataItems = customerList.map(item => { return <td>{item.Customer_id}</td> });

    return (
        <Container>
            <div className='font-Mulish  '>
                <div className='flex justify-center '>
                    <div className="grid grid-cols-2 divide-x">
                        <div className='flex justify-between items-center mt-[2rem] px-[2rem] p-[1rem] rounded-[0.5rem] bg-white drop-shadow-md'>
                            <div className='mx-[1rem]'>
                                <h6 className='font-semibold text-black'>
                                    Add New Customer
                                </h6>
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

                                    <BigProcessingButton
                                        isSubmitting={isSubmitting}
                                        text='Create'
                                        disabled={disabledOption}
                                    />
                                </form>
                            </div>

                        </div>
                        <div className='flex justify-between items-center mt-[2rem] px-[2rem] p-[1rem] rounded-[0.5rem] bg-white drop-shadow-md'>
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            #
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Customer
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Account
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Balance
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customerList.length === 0 ? (
                                        <label></label>
                                    ) : (
                                        customerList.map(
                                            (item, i) => i <= 6 && <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td class="px-6 py-4">
                                                    {i+1}
                                                </td>
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {item[i][0].firstname + ' ' + item[i][0].lastname}
                                                </th>
                                                <td class="px-6 py-4">
                                                    {item[i][1].account_number}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {item[i][1].balance}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className=' mt-[2rem] '>
                            <div className='flex flex-col items-center mx-[1rem] w-fill'>
                                <div className='mt-[10rem]'>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Customers