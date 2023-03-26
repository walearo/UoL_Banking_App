import { useState, useEffect } from "react"
import Container from "../Container/Container"
import BigProcessingButton from "../../shared-components/Button/BigProcessingButton"
import { GetAccountDetailsEndpoint, TransferFundEndpoint } from "../../../api/url/url"
import { Post, Get } from "../../../api/httpMethods/httpMethods"
import { Toast } from "../../shared-components/Toast/Toast"

function Transfer() {
    const [senderAccount, setSenderAccount] = useState("")
    const [receiverAccount, setReceiverAccount] = useState("")
    const [amount, setAmount] = useState("")
    const [senderAccountName, setSenderAccountName] = useState("")
    const [receiverAccountName, setReceiverAccountName] = useState("")
    const [accountBalance, setAccountBalance] = useState("")

    const [isSubmitting, setIsSubmmitting] = useState(0) //0=not submitted, 1=submitting, 2 for submmitted
    const [disabledOption, setDisabledOption] = useState(false)

    async function submitRegisterForm(e) {
        try {
            e.preventDefault() 
            if (!senderAccount || !receiverAccount || !amount ) {
                throw new Error("All the fields are compulsory")
            }
            const body = {
                senderaccount: senderAccount,
                receiveraccount: receiverAccount,
                amount: parseFloat(amount)
            }
            setIsSubmmitting(1)
            setDisabledOption(true)

            const TransferFundApiCallResponse = await Post(TransferFundEndpoint, body)

            setIsSubmmitting(2)
            if (TransferFundApiCallResponse.data.status === true) {
                Toast("success", TransferFundApiCallResponse.data.message)
                const getAccountDetailResponse = await Get(`${GetAccountDetailsEndpoint}/${senderAccount}`)
                setAccountBalance(getAccountDetailResponse.data.data.balance)
            } else {
                Toast("error", TransferFundApiCallResponse.data.error.message)
            }
        } catch (error) {
            setIsSubmmitting(0)
            setDisabledOption(false)
            Toast("error", error.response.data.message)
        }
    }

    useEffect(() => {
        async function fetchSenderAccountDetails() {
            try {
                const getAccountDetailResponse = await Get(`${GetAccountDetailsEndpoint}/${senderAccount}`)
                const response1 = getAccountDetailResponse.data.data
                setSenderAccountName(response1.firstname + ' ' + response1.lastname)
                setAccountBalance('£' + response1.balance)
            } catch (error) {
                setSenderAccountName("")
                setAccountBalance("")
            }
        }
        async function fetchReceiverAccountDetails() {
            try {
                const getAccountDetailResponse = await Get(`${GetAccountDetailsEndpoint}/${receiverAccount}`)
                const response2 = getAccountDetailResponse.data.data
                setReceiverAccountName(response2.firstname + ' ' + response2.lastname)
            } catch (error) {
                setReceiverAccountName("")
            }
        }
        fetchSenderAccountDetails()
        fetchReceiverAccountDetails()
    }, [senderAccount, receiverAccount])

    return (
        <Container>
            <div className='font-Mulish  '>
                <div className='flex justify-center '>
                    <div>
                        <div className='flex justify-between items-center mt-[2rem] px-[2rem] p-[1rem] rounded-[0.5rem] bg-white drop-shadow-md'>

                            <div className=' mx-[1rem] '>
                                <h6 className=' font-semibold text-black'>
                                    Funds Transfer
                                </h6>
                                <form onSubmit={submitRegisterForm} className='my-5'>
                                <div className='flex justify-between'>
                                        <div className=''>
                                            <div className='w-[25rem]'>
                                                <input
                                                    type='text'
                                                    id='senderaccount'
                                                    name='senderaccount'
                                                    className='rounded-lg w-[10rem] h-[3rem] my-3 p-2 bg-[#d3ecf0] focus:ring-0'
                                                    placeholder="Sender Account"
                                                    style={{ border: "none", outline: "none" }}
                                                    required
                                                    onChange={(e) => setSenderAccount(e.target.value)}
                                                />&nbsp;&nbsp;&nbsp;
                                                <input
                                                    type='text'
                                                    id='sendername'
                                                    name='sendername'
                                                    value={senderAccountName}
                                                    className='rounded-lg w-[14rem] h-[3rem] my-3 p-2 bg-[#d3ecf0] focus:ring-0'
                                                    placeholder="Sender Name"
                                                    style={{ border: "none", outline: "none" }}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <label>Account Balance: {accountBalance}</label>
                                    <div className='mt-[0.5rem]'></div><hr/>
                                    <div className='mt-[0.5rem]'></div>
                                    <div className='flex justify-between'>
                                        <div className=''>
                                            <div className='w-[25rem]'>
                                                <input
                                                    type='text'
                                                    id='receiveraccount'
                                                    name='receiveraccount'
                                                    className='rounded-lg w-[10rem] h-[3rem] my-3 p-2 bg-[#d3ecf0] focus:ring-0'
                                                    placeholder="Receiver Account"
                                                    style={{ border: "none", outline: "none" }}
                                                    required
                                                    onChange={(e) => setReceiverAccount(e.target.value)}
                                                />&nbsp;&nbsp;&nbsp;
                                                <input
                                                    type='text'
                                                    id='receivername'
                                                    name='receivername'
                                                    value={receiverAccountName}
                                                    className='rounded-lg w-[14rem] h-[3rem] my-3 p-2 bg-[#d3ecf0] focus:ring-0'
                                                    placeholder="Receiver Name"
                                                    style={{ border: "none", outline: "none" }}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-[0.5rem]'></div><hr/>
                                    <div className='mt-[0.5rem]'></div>
                                    <div className='flex justify-between'>
                                        <div className=''>
                                            <div className='w-[20rem]'>
                                                <input
                                                    type='text'
                                                    id='lastname'
                                                    name='lastname'
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
                                        text='Transfer'
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

export default Transfer