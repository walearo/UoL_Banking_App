import { useEffect, useState } from "react"
import beneficiaries from "../../../img/Svg/Beneficiaries.svg"
import Container from "../Container/Container"
import { Get } from "../../../api/httpMethods/httpMethods"
import { ProfileEndpoint, TransactionHistoryEndpoint } from "../../../api/url/url"
import EmptyTransactionCard from "./EmptyTransactionCard"
import TransactionCard from "./TransactionCard"
import { Toast } from "../../shared-components/Toast/Toast"

function Dashboard() {
  
  const [userData, setUserData] = useState({
    status: true,
    message: "",
    data: {
      id: 1,
      customer_id: "",
      title: "",
      lastname: "",
      firstname: "",
      email: "",
      is_email_verified: true,
      phone_number: "",
      is_phone_number_verified: true,
      gender: "",
      house_number: "",
      street: "",
      landmark: "",
      dob: "",
      country: null,
      means_of_id: null,
      means_of_id_number: null,
      photo: null,
      marital_status: null,
      is_disable: false,
      is_disable_reason: null,
      createdAt: "",
      updatedAt: "",
      accts: {
        account_number: "",
        balance: 0.0
      }
    },
  })
  const [transactionHistory, setTransactionHistory] = useState([])

  useEffect(() => {
    return async () => {
      try {
        const token = localStorage.getItem("token")
        
        const getUserProfileFromApi = await Get(ProfileEndpoint, token)
        const getTransactionHistoryFromApi = await Get(
          TransactionHistoryEndpoint,
          token
        )
        const newObj = {
          ...userData,
          status: getUserProfileFromApi.data.status,
          message: getUserProfileFromApi.data.message,
          data: {
            ...userData.data,
            email: getUserProfileFromApi.data.email,
            accts: {
              ...userData.data.accts,
              account_number:
                getUserProfileFromApi.data.data.accts.account_number,
            }
          },
        } //this is a new memory that allow react to re-render the component
        setUserData(newObj)
        setTransactionHistory(
          ...transactionHistory,
          getTransactionHistoryFromApi.data.data
        )
        localStorage.setItem("user", JSON.stringify(userData))
      } catch (error) {
        Toast("error", error.response.data.message)
      }
    }
  }, [userData, transactionHistory])

  return (
    <Container>
      <div className='font-Mulish'>
        <div className='flex justify-center'>
          <div>
            <div className='flex justify-between items-center mt-[2rem] px-[2rem] p-[1rem] rounded-[0.5rem] bg-white drop-shadow-md'>
              <img src={beneficiaries} alt='beneficiaries' className='w-[3rem]' />
              <div className='mx-[1rem]'>
                <h6 className='font-semibold text-black'>
                  Hello {userData.data.firstname}
                </h6>
                <h1 className=''>
                  Welcome to our Bank co limited.
                </h1>
              </div>
            </div>

            <div className=' mt-[2rem] '>
              <div className='flex flex-col items-center   mx-[1rem] w-fill '>
                {transactionHistory.length === 0 ? (
                  <EmptyTransactionCard />
                ) : (
                  transactionHistory.map(
                    (item, i) =>
                      i <= 4 && <TransactionCard data={item} key={i} />
                  )
                )}

                <button
                  type='submit'
                  className='text-white font-semibold bg-[#028090] w-[15rem] py-[0.8rem] px-[0.7rem] rounded-[1rem] text-center mt-[2rem] mb-[3rem] hover:-translate-y-1 duration-700 '
                >
                  Generate Report
                </button>
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

export default Dashboard