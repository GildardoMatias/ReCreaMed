import React from 'react'
import DepresionEncuesta from '../escalas/depresionEncuesta'

import {
    useParams
} from "react-router-dom";

export default function DepresionPublic() {
    let { idmedico, idpaciente, key } = useParams();
    console.log(key)
    return (
        <div>
            <DepresionEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key} />
        </div>
    )
}
