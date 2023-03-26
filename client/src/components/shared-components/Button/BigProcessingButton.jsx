function BigProcessingButton({
  isSubmitting = 0,
  text = "Submit",
  onClick,
  disabled,
}) {
  return (
    <>
      {isSubmitting === 0 ? (
        <button
          type='submit'
          className={
            disabled
              ? "disabled border px-8 py-3 bg-[#028090] focus:outline-none disabled:opacity-50 w-[20rem] mt-[1rem] hover:-translate-y-1 duration-700 p-4 rounded-lg text-white text-sm"
              : "border border-[#028090] bg-[#028090] w-[25rem] mt-[2rem] hover:-translate-y-1 duration-700 p-4 rounded-lg text-white text-sm"
          }
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      ) : (
        <button
          type='button'
          className='flex items-center border border-[#028090] bg-[#028090] w-[25rem] mt-[1rem] hover:-translate-y-1 duration-700 p-2 rounded-lg text-white text-sm'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 4335 4335'
            width='50'
            height='40'
            className='mr-3 animate-spin'
          >
            <path
              fill='#fff'
              d='M3346 1077c41,0 75,34 75,75 0,41 -34,75 -75,75 -41,0 -75,-34 -75,-75 0,-41 34,-75 75,-75zm-1198 -824c193,0 349,156 349,349 0,193 -156,349 -349,349 -193,0 -349,-156 -349,-349 0,-193 156,-349 349,-349zm-1116 546c151,0 274,123 274,274 0,151 -123,274 -274,274 -151,0 -274,-123 -274,-274 0,-151 123,-274 274,-274zm-500 1189c134,0 243,109 243,243 0,134 -109,243 -243,243 -134,0 -243,-109 -243,-243 0,-134 109,-243 243,-243zm500 1223c121,0 218,98 218,218 0,121 -98,218 -218,218 -121,0 -218,-98 -218,-218 0,-121 98,-218 218,-218zm1116 434c110,0 200,89 200,200 0,110 -89,200 -200,200 -110,0 -200,-89 -200,-200 0,-110 89,-200 200,-200zm1145 -434c81,0 147,66 147,147 0,81 -66,147 -147,147 -81,0 -147,-66 -147,-147 0,-81 66,-147 147,-147zm459 -1098c65,0 119,53 119,119 0,65 -53,119 -119,119 -65,0 -119,-53 -119,-119 0,-65 53,-119 119,-119z'
            />
          </svg>
          <p className='text-[1.1rem]'> Processing...</p>
        </button>
      )}
    </>
  )
}

export default BigProcessingButton
