import React from 'react'
import KetaminaEncuesta from '../escalas/ketamina/ketaminaEncuesta'

import {
    useParams
} from "react-router-dom";

export default function KetaminaPublic() {
    let { idmedico, idpaciente, key } = useParams();
    console.log(key)
    return (
        <div>
            <KetaminaEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key} />
        </div>
    )
}
