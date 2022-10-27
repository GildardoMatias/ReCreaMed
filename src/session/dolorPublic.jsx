import React from 'react'
import DolorEncuesta from '../escalas/dolor/dolorEncuesta';
import { useParams } from "react-router-dom";

export default function HeadachePublic() {
    let { idmedico, idpaciente, key } = useParams();
    console.log(key)
    return (
        <div>
            <DolorEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key} />
        </div>
    )
}
