import React from 'react';
import { Link } from 'react-router-dom';
import "./card.css"

const Card = (props) => {

    return (
        <div className="banner">
        <div className="cards">
            {props.details.map((item) => (
                <Link to={item.href} key={item.head}>
                    <div className="card">
                        <div className={`container ${item.diffClass}`}>
                            <img className='image' src={item.bg} alt="Teacher" />
                        </div>
                       <div className="details">
                           <h2>{item.head}</h2>
                           <h3>{item.content}</h3>
                       </div>
                    </div>
                </Link>
            ))}
        </div>
        </div>
    );
}

export default Card;
