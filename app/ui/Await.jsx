const Await = async ({ promise, children }) => {
  const data = await promise

  return children(data)
}

export default Await
