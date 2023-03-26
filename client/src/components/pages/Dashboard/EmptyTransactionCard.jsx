import request from "../../../img/Svg/Request.svg"
function EmptyTransactionCard() {
  return (
    <>
      <img src={request} alt='request' className='w-[3rem] mx-auto' />
      <h6 className='w-[21rem] text-center font-semibold text-black'>
        Nothing to see yet.{" "}
      </h6>
      <h1 className='w-[21rem]  text-center'>
        Your transaction history appear here.
      </h1>
    </>
  )
}

export default EmptyTransactionCard
