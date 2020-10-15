import React from 'react';
import './LandingCard.css';

function LandingCard(props) {
    console.log("inside land ", props.data);
    return (
        <div className="landingCard">
            <p className="landingCard__headlabel">Basic Info - </p>
            <div className="landingCard__info">
                <p className="landingCard__label">Id:</p>
                {props.data.id}
            </div>
            <div className="landingCard__info">
                <p className="landingCard__label">Full Name:</p>
                {props.data.full_name}
            </div>
            <div className="landingCard__info">
                <p className="landingCard__label">Status:</p>
                {props.data.status}
            </div>
            {props.data.location &&
                <div className="landingCard__locationInfo">
                    <p className="landingCard__headlabel">Location - </p>
                    <div className="landingCard__info">
                        <p className="landingCard__label">Name:</p>
                        {props.data.location.name}
                    </div>
                    <div className="landingCard__info">
                        <p className="landingCard__label">Region:</p>
                        {props.data.location.region}
                    </div>
                    <div className="landingCard__info">
                        <p className="landingCard__label">Latitude:</p>
                        {props.data.location.latitude}
                    </div>
                    <div className="landingCard__info">
                        <p className="landingCard__label">Longitude:</p>
                        {props.data.location.longitude}
                    </div>
                </div>
            }
        </div>
    )
}

export default LandingCard
