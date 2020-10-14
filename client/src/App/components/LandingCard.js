import React from 'react';
import './LandingCard.css';

function LandingCard(data) {
    return (
        <div className="landingCard">
             <div className="landingCard__info">
                <p className="landingCard__label">Id</p>
                {data.id}
            </div>
            <div className="landingCard__info">
                <p className="landingCard__label">Full Name</p>
                {data.full_name}
            </div>
            <div className="landingCard__info">
                <p className="landingCard__label">Status</p>
                {data.status}
            </div>
            {data.location &&
                <div className="landingCard__info">
                    <p className="landingCard__headlabel">Location - </p>
                    <p className="landingCard__label">Name</p>
                    {data.location.name}
                    <p className="landingCard__label">Region</p>
                    {data.location.region}
                    <p className="landingCard__label">Latitude</p>
                    {data.location.latitude}
                    <p className="landingCard__label">Longitude</p>
                    {data.location.longitude}
                </div>
            }
        </div>
    )
}

export default LandingCard
