import React from 'react'

const Loader = ({loadingmsg, styling}) => {
  return (
    <>
    <div className="loader"></div>
    <p style={styling}>{loadingmsg}</p>
    </>
  )
}

export default Loader