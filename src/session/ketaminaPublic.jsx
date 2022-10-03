import React from 'react'
import EfectosEncuesta from '../escalas/efectosEncuesta'

import {
    useParams
} from "react-router-dom";

export default function KetaminaPublic() {
    let { idmedico, idpaciente, key } = useParams();
    console.log(key)
    return (
        <div>
            <EfectosEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key} />
        </div>
    )
}
