function BigButton({ text }) {
  return (
    <>
      <button
        type='submit'
        className='border border-[#028090] bg-[#028090] w-[20rem] mt-[2rem] hover:-translate-y-1 duration-700 p-4 rounded-lg text-white text-sm'
      >
        {text}
      </button>
    </>
  )
}

export default BigButton
