import React from 'react';

const Like = (props) => {
    return ( 
        <i  
            style = {{cursor:'pointer'}}
            className={props.movie.like ?  "fa fa-heart": "fa fa-heart-o"} 
            onClick = {()=>props.onClickLike()}
            aria-hidden="true">
        </i>
     );
}
 
 
export default Like;