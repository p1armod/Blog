export default function Button(
    {
        children,
        className='',
        type='button',
        bgColor='bg-blue-600',
        textColor='text-white',
        ...props
    }
) {
    return (
        <button className={`py-2 px-4 rounded ${bgColor} ${textColor} ${className}`} type={type} {...props}>
            {children}
        </button>
    )
}