import React from 'react'
import Sintomatologia from '../escalas/sintomatologia'

import {
    useParams
} from "react-router-dom";

export default function DepresionPublic() {
    let { idmedico, idpaciente, key } = useParams();
    console.log(key)
    return (
        <div>
            <Sintomatologia idmedico={idmedico} idpaciente={idpaciente} token={key} />
        </div>
    )
}
