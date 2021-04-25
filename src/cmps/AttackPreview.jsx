import React from 'react'
import { AccordionPreview } from './AccordionPreview';

export function AttackPreview({attack}) {
    return (
    <li className="attack-preview">
        <AccordionPreview attack={attack}/>
    </li>
    )
}
