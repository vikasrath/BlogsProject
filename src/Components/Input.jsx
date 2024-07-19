import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
     label,
     placeholder,
     type="text",  // by default classes
     classname="",
     lableColor = "",
    ...props
},ref){
     
    const id = useId()

    return (
        <div>
            {label && (
                <label htmlFor={id} className={` text-xl inline-block mb-1 pl-1 ${lableColor}`}>{label}</label>
            )}
            <input 
            type={type} 
            placeholder={placeholder} 
            className={` px-3 py-2 rounded-lg  bg-white  text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200  w-full
             ${classname}`}

             ref ={ref}
             id={id}
             {...props}
             />
        </div>
    )

})

export default Input