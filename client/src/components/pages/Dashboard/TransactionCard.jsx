import { BsFillArrowUpCircleFill, BsArrowDownCircleFill } from "react-icons/bs"

function TransactionCard({ data }) {
  return (
    <div className='flex justify-between w-[80%] p-[0.3rem] items-center'>
      <div className='flex items-center'>
        {data.transaction_type === "1" ? (
          <BsFillArrowUpCircleFill className='text-green-400' />
        ) : (
          <BsArrowDownCircleFill className='text-red-600' />
        )}
        <div className='flex flex-col mx-[1rem]'>
          <h6 className='font-semibold text-black'>
            {data.transaction_amount}
          </h6>
          <h1 className='text-[#b6b3ab] text-[0.6rem]'>
            {data.transaction_description}
          </h1>
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <h6 className='font-semibold text-black'>{data.amount}</h6>
        <h1 className='text-[#b6b3ab] text-[0.6rem]'>{data.updatedAt}</h1>
      </div>
    </div>
  )
}

export default TransactionCard
