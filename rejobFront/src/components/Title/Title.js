import React from 'react';
import './Title.css'

const Title = (props) => {
    return ( 
        <div className="title">
            <h1>{ props.titulo }</h1>
            <p>{ props.subtitulo }</p>
        </div>
     );
}
 
export default Title;