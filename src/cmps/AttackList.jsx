import React from 'react'
import { AttackPreview } from './AttackPreview';


export function AttackList({ attacks }) {
    return (
        <ul className="list-container">
            {attacks.map((attack) => {
                return <AttackPreview key={attack._id} attack={attack} />
            })}
        </ul>
    )
}
