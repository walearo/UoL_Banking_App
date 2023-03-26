import { useState, useEffect } from "react"
import Container from "../Container/Container"
import BigProcessingButton from "../../shared-components/Button/BigProcessingButton"
import { GetAccountDetailsEndpoint, DepositCashEndpoint } from "../../../api/url/url"
import { Post, Get } from "../../../api/httpMethods/httpMethods"
import { Toast } from "../../shared-components/Toast/Toast"

function Deposit() {
    const [account, setAccount] = useState("")
    const [amount, setAmount] = useState("")
    const [accountName, setAccountName] = useState("")

    const [isSubmitting, setIsSubmmitting] = useState(0) //0=not submitted, 1=submitting, 2 for submmitted
    const [disabledOption, setDisabledOption] = useState(false)

    async function submitDepositForm(e) {
        try {
            e.preventDefault() 
            if (!account || !amount ) {
                throw new Error("All the fields are compulsory")
            }
            const body = {
                accountno: account,
                amount: parseFloat(amount)
            }
            setIsSubmmitting(1)
            setDisabledOption(true)
            
            const DepositCashApiCallResponse = await Post(DepositCashEndpoint, body)
            setIsSubmmitting(2)
            if (DepositCashApiCallResponse.data.status === true) {
                Toast("success", DepositCashApiCallResponse.data.message)
            } else {
                Toast("error", DepositCashApiCallResponse.data.error.message)
            }
        } catch (error) {
            setIsSubmmitting(0)
            setDisabledOption(false)
            Toast("error", error.response.data.message)
        }
    }

    useEffect(() => {
        async function fetAccountDetails() {
            try {
                const getAccountDetailResponse = await Get(`${GetAccountDetailsEndpoint}/${account}`)
                const response = getAccountDetailResponse.data.data
                setAccountName(response.firstname + ' ' + response.lastname)
            } catch (error) {
                setAccountName("")
            }
        }
        fetAccountDetails()
    }, [account])

    return (
        <Container>
            <div className='font-Mulish  '>
                <div className='flex justify-center '>
                    <div>
                        <div className='flex justify-between items-center mt-[2rem] px-[2rem] p-[1rem] rounded-[0.5rem] bg-white drop-shadow-md'>

                            <div className=' mx-[1rem] '>
                                <h6 className=' font-semibold text-black'>
                                    Cash Deposit
                                </h6>
                                <form onSubmit={submitDepositForm} className='my-5'>
                                    <div className='flex justify-between'>
                                        <div className=''>
                                            <div className='w-[25rem]'>
                                                <input
                                                    type='text'
                                                    id='account'
                                                    name='account'
                                                    className='rounded-lg w-[10rem] h-[3rem] my-3 p-2 bg-[#d3ecf0] focus:ring-0'
                                                    placeholder="Account Number"
                                                    style={{ border: "none", outline: "none" }}
                                                    required
                                                    onChange={(e) => setAccount(e.target.value)}
                                                />&nbsp;&nbsp;&nbsp;
                                                <input
                                                    type='text'
                                                    id='accountname'
                                                    name='accountname'
                                                    value={accountName}
                                                    className='rounded-lg w-[14rem] h-[3rem] my-3 p-2 bg-[#d3ecf0] focus:ring-0'
                                                    placeholder="Account Name"
                                                    style={{ border: "none", outline: "none" }}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className=''>
                                            <div className='w-[20rem]'>
                                                <input
                                                    type='text'
                                                    id='amount'
                                                    name='amount'
                                                    className='rounded-lg w-[25rem] h-[3rem] my-3 p-2 bg-[#d3ecf0] focus:ring-0'
                                                    placeholder="Amount"
                                                    style={{ border: "none", outline: "none" }}
                                                    required
                                                    onChange={(e) => setAmount(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <BigProcessingButton
                                        isSubmitting={isSubmitting}
                                        text='Deposit'
                                        disabled={disabledOption}
                                    />
                                </form>
                            </div>
                        </div>
                        <div className=' mt-[2rem] '>
                            <div className='flex flex-col items-center   mx-[1rem] w-fill '>
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

export default Deposit