import React from 'react'
import EfectosEncuesta from '../escalas/efectosEmcuesta'
import {
    useParams
} from "react-router-dom";

export default function KetaminaPublic() {
    let { id, key } = useParams();
    console.log(key)
    return (
        <div>
            <EfectosEncuesta idpaciente={id} token={key} />
        </div>
    )
}
