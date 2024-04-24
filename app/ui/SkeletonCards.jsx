
const Skeleton = () => {
    return (<>
        <div className={'m-auto animate-pulse my-4 bg-gray-400 rounded-lg block'}></div>
        <div className='text-center grid grid-row-2 md:grid-cols-4 md:grid-rows-2 gap-2 grid-flow-dense flex-wrap'>

            {[...Array(9)].map((card, index) => (

                <div key={index} className={`${index === 0 ? 'min-w-[474px] h-[474px] col-span-2 row-span-2' : 'max-w-[233px] max-h-[233px] row-span-1 col-span-1'} animate-pulse pb-4 flex flex-col justify-end items-start  bg-gray-400 rounded-lg flex-wrap w-full`}>
                    <div className="w-[90%] rounded-md mb-4 h-4 bg-gray-200 ml-2 block"></div>
                    <div className="w-[30%] rounded-md h-4 bg-gray-200 ml-2 block"></div>
                </div>

            ))}
        </div>
    </>
    )
}
const SkeletonCards = () => {


    return (
        <>

            {[...Array(3)].map((card, index) => (

                <Skeleton key={index * 2} />
            ))}

        </>
    )
}

export default SkeletonCards