import React from 'react';
import './Title.css'

const Title = (props) => {
    return ( 
        <div className="pt-[42px] pb-[24px] text-[18px] text-[#00A3FF]">
            <h1>{ props.titulo }</h1>
            <p className='text-[#0F0F0F] text-[18px]'>{ props.subtitulo }</p>
        </div>
     );
}
 
export default Title;