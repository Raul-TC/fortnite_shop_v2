const Await = async({promise,children}) => {
    
    let data = await promise


    return children(data)
}

export default Await