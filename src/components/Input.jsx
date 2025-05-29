import React,{useId} from 'react'

const Input = React.forwardRef(function Input(
    {
        label,
        type = 'text',
        className = '',
        ...props
    },
    ref
) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && 
            <label
                className='inline-block mb-1 pl-1'
                htmlFor={id}>
                    {label}
                </label>
            }
            <input
                ref={ref}
                type={type}
                className={`w-full ${className}`}
                id={id}
                {...props}
            />
        </div>
    )
})

export default Input
