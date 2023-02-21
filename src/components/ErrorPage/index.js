import React from 'react';
import batman from '../../images/batman.png';

const centerh2 = {
  textAlign:'center',
  marginTop: '50px'
}

const centerimg = {
  display:'block',
  margin : '40px auto'
}

const Error = () => {
  return (
    <div className='quiz-bg'>
        <div className='container'>
            <h2 style={centerh2}>404 Not Found</h2>
            <img style={centerimg} src={batman}  alt="error page"/>
        </div>
    </div>
  )
}

export default Error