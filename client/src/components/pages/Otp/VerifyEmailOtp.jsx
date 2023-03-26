import { useState } from "react"
import OtpInput from "react18-otp-input"
import BigProcessingButton from "../../shared-components/Button/BigButton"
import { useNavigate } from "react-router-dom"
import { Toast } from "../../shared-components/Toast/Toast"
import { Get } from "../../../api/httpMethods/httpMethods"
import { VerifyEmailOtpEndpoint } from "../../../api/url/url"
import Menubar from "../../shared-components/Menubar/Menubar"

function VerifyEmailOtp() {
  const navigate = useNavigate()

  // const style =
  const [emailOtp, setEmailOtp] = useState("")
  const [disabledOption, setDisabledOption] = useState(false)
  const [isSubmitting, setIsSubmmitting] = useState(0)

  const handleEmailChange = (enteredOtp) => {
    if (enteredOtp.length === 4) {
      setDisabledOption(false)
    }
    setEmailOtp(enteredOtp)
  }

  async function onEmailOtpVerifyBtnClick() {
    setIsSubmmitting(1)
    try {
      const { email } = JSON.parse(localStorage.getItem("userData"))

      if (emailOtp.length < 6) {
        throw new Error("Invalid otp")
      }

      const getEmailOtpResponseApiCall = await Get(
        `${VerifyEmailOtpEndpoint}/${emailOtp}/${email}`
      )

      setIsSubmmitting(0)

      if (getEmailOtpResponseApiCall.data.status === true) {
        //navigte to phone verify otp screen
        Toast("success", getEmailOtpResponseApiCall.data.message)
        setTimeout(() => {
          navigate("/register/verify-phone-otp")
        }, 1000)
      } else {
        Toast("error", getEmailOtpResponseApiCall.data.response.data.message)
      }
    } catch (error) {
      // console.log("error: ", error)
      setIsSubmmitting(0)
      Toast("error", error.message)
    }
  }

  return (
    <main className='font-Mulish'>
      <Menubar />
      <p className='mt-[2rem]'></p>
      <div className='mx-[2rem] flex-col w-[rem] '>
        <div className='border p-[2rem] w-[24rem] items-center mx-auto drop-shadow-lg rounded-lg'>
          <h2 className='w-[24rem] text-2xl my-4 font-bold'>
            Account Verification
          </h2>
          <p className='w-[25rem] text-sm my-5'>
            Please, enter the OTP sent to your email.
          </p>
          <OtpInput
            placeholder={"----"}
            numInputs={4}
            value={emailOtp}
            separator={<span>&nbsp; &nbsp;</span>}
            onChange={handleEmailChange}
            inputStyle={{
              fontFamily: "monospace",
              margin: "4px",
              MozAppearance: "textfield",
              width: "40px",
              borderRadius: "3px",
              fontSize: "14px",
              height: "40px",
              paddingLeft: "7px",
              backgroundColor: "white",
              color: "black",
              border: "1px solid lightskyblue",
            }}
          />
          <p className='text-[#49d38a] text-xs font-bold my-5'>
            <a href="/">Resend Code</a>
          </p>

          <BigProcessingButton
            text='Verify Otp'
            onClick={onEmailOtpVerifyBtnClick}
            disabled={disabledOption}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </main>
  )
}
export default VerifyEmailOtp
