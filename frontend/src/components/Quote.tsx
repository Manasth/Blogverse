const Quote = () => {
  return (
    <div className='hidden lg:flex flex-col items-center justify-center bg-slate-200 flex-1'>
      <div className='w-3/4'>
        <p className='text-3xl font-bold mb-3'>
          "The customer service I recieved was exceptional. The support team went above and beyond to address my concern."
        </p>
        <p className='text-lg font-semibold'>Jules Winnfield</p>
        <p className='text-slate-400'>CEO, Acme Inc</p>
      </div>
    </div>
  )
}

export default Quote