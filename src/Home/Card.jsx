import React from 'react';
import "./card.css"

const Card = (props) => {
    return (
        <div className="cards-wrapper">
            {props.details.map((item) => (
                <div key={item.head}>
                    <div className="card" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,var(--bg-filter-opacity)),rgba(0,0,0,var(--bg-filter-opacity))), url(${item.bg})` }}>
                        <div> 
                            <h1>{item.head}</h1>
                            <p>{item.content}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Card;
