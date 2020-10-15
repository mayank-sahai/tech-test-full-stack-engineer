import React from 'react'
import './CapsuleCard.css';

function CapsuleCard(props) {
    return (
        <div className="capsuleCard">
            <div className="capsuleCard__section">
                <div className="capsuleCard__info">
                    <p className="capsuleCard__label">Id:</p>
                    {props.capsule.capsule_id}
                </div>
                <div className="capsuleCard__info">

                    <p className="capsuleCard__label">Serial:</p>
                    {props.capsule.capsule_serial}
                </div>
                <div className="capsuleCard__info">
                    <p className="capsuleCard__label">Details:</p>
                    {props.capsule.details}
                </div>
                <div className="capsuleCard__info">
                    <p className="capsuleCard__label">Landings:</p>
                    {props.capsule.landings}
                </div>
            </div>
            <div className="capsuleCard__section">
                <div className="capsuleCard__info">
                    <p className="capsuleCard__label">Original Launch:</p>
                    {props.capsule.original_launch}
                </div>
                <div className="capsuleCard__info">
                    <p className="capsuleCard__label">Reuse Count:</p>
                    {props.capsule.reuse_count}
                </div>
                <div className="capsuleCard__info">
                    <p className="capsuleCard__label">Status:</p>
                    {props.capsule.status}
                </div>
                <div className="capsuleCard__info">
                    <p className="capsuleCard__label">Type:</p>
                    {props.capsule.type}
                </div>
            </div>
            <br></br>
        </div>
    )
}

export default CapsuleCard
