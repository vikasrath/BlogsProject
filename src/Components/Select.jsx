import React, { useId } from 'react'

function Select({label,options,classname, lableColor ,...props},ref) {
    
    const id = useId();
  return (
    <div className=' w-full'>
        {label && (
            <label htmlFor={id} className={`text-xl inline-block mb-1 pl-1 me-4 ${lableColor}`}>{label}</label>
        )}
        <select 
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full 
                ${classname}`} 
            id={id} 
            {...props}>
                {options?.map((option)=>(
                    <option key={option} value={option}>{option}</option>
                ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)