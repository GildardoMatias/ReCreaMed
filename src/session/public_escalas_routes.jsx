import React from 'react'

import { useParams } from "react-router-dom";
import KetaminaEncuesta from '../escalas/ketamina/ketaminaEncuesta'
import DepresionEncuesta from '../escalas/depresion/depresion_1/depresionEncuesta';
import Depresion2Encuesta from '../escalas/depresion/depresion_2/depresion2_encuesta';
import DolorEncuesta from '../escalas/dolor/dolorEncuesta';
import PostTraumaticoEncuesta from '../escalas/estres_post_traumatico/post_traumatico/p_t_encuesta';
import PTClinicoEncuesta from '../escalas/estres_post_traumatico/p_t_clinico/p_t_clinico_encuesta';
import PTMexicanaEncuesta from '../escalas/estres_post_traumatico/p_t_mexicana/p_t_mexicana_encuesta';

// Ketamina
export function KetaminaPublic() {
    let { idmedico, idpaciente, key } = useParams();
    console.log(key)
    return (
        <div>
            <KetaminaEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key} />
        </div>
    )
}

// Depresion 1 
export function DepresionQidsPublic() {
    let { idmedico, idpaciente, key } = useParams();
    console.log(key)
    return (
        <div>
            <DepresionEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key} />
        </div>
    )
}

// Depresion 2 gpc 
export function DepresionEspanolPublic() {
    let { idmedico, idpaciente, key } = useParams();
    console.log(key)
    return (
        <div>
            <Depresion2Encuesta idmedico={idmedico} idpaciente={idpaciente} token={key} />
        </div>
    )
}

// Dolor
export function HeadachePublic() {
    let { idmedico, idpaciente, key } = useParams();
    console.log(key)
    return (
        <div>
            <DolorEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key} />
        </div>
    )
}


// Post Trauma 1 
export function PostTraumaticoPublic() {
    let { idmedico, idpaciente, key } = useParams();
    console.log(key)
    return (
        <div>
            <PostTraumaticoEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key} />
        </div>
    )
}

// Post Trauma 2 Clinico Hoja Verde
export function PostTraumaticoClinicoPublic() {
    let { idmedico, idpaciente, key } = useParams();
    console.log(key)
    return (
        <div>
            <PTClinicoEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key} />
        </div>
    )
}

// Post Trauma Mexicana
export function PostTraumaticoMX() {
    let { idmedico, idpaciente, key } = useParams();
    console.log(key)
    return (
        <div>
            <PTMexicanaEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key} />
        </div>
    )
}
