import React from 'react'

import { useParams } from "react-router-dom";
import KetaminaEncuesta from '../escalas/ketamina/ketaminaEncuesta'
import DepresionEncuesta from '../escalas/depresion/depresion_1/depresionEncuesta';
import Depresion2Encuesta from '../escalas/depresion/depresion_2/depresion2_encuesta';
import DolorEncuesta from '../escalas/dolor/dolorEncuesta';
import PostTraumaticoEncuesta from '../escalas/estres_post_traumatico/post_traumatico/p_t_encuesta';
import PTClinicoEncuesta from '../escalas/estres_post_traumatico/p_t_clinico/p_t_clinico_encuesta';
import PTMexicanaEncuesta from '../escalas/estres_post_traumatico/p_t_mexicana/p_t_mexicana_encuesta';
import SatisfaccionEncuesta from '../escalas/satisfaccion/satisfaccionEncuesta';
import Gad7Encuesta from '../escalas/gad7/gad7.encuesta';
import Phq9pEncuesta from '../escalas/phq9p/phq9p.encuesta';
import CssrsEncuesta from '../escalas/cssrs/cssrs.encuesta';
import ThiEncuesta from '../escalas/thi/thi.encuesta';
import EmcaEncuesta from '../escalas/emca/emca.encuesta';
import OwsEncuesta from '../escalas/ows/ows.encuesta';
import SowsEncuesta from '../escalas/sows/sows.encuesta';
import DocsEncuesta from '../escalas/docs/docs.encuesta';
import Pcl5Encuesta from '../escalas/pcl5/pcl5.encuesta';
import Dolor2Encuesta from '../escalas/dolor_2/dolor2_encuesta';

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

// Escala de satosfaccion
export function SatisfaccionPublic() {
    let { idmedico, idpaciente, key, protocolo, momento } = useParams();
    console.log(key)
    return (
        <div>
            {/* <PTMexicanaEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key} /> */}
            <SatisfaccionEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key} protocolo={protocolo} momento={momento} />
        </div>
    )
}

// GAD-7
export function Gad7Public() {
    let { idmedico, idpaciente, key, protocolo, momento } = useParams();
    return <div>
        <Gad7Encuesta idmedico={idmedico} idpaciente={idpaciente} token={key} protocolo={protocolo} momento={momento} />
    </div>
}

// PHQ9P
export function PHQ9PPublic() {
    let { idmedico, idpaciente, key, protocolo, momento } = useParams();
    return <div>
        <Phq9pEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key} protocolo={protocolo} momento={momento} />
    </div>
}

// CSSRS
export function CssrsPublic() {
    let { idmedico, idpaciente, key, protocolo, momento } = useParams();
    return <div>
        <CssrsEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key} protocolo={protocolo} momento={momento} />
    </div>
}

// THI
export function ThiPublic() {
    let { idmedico, idpaciente, key, protocolo, momento } = useParams();
    return <div>
        <ThiEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key}  protocolo={protocolo} momento={momento}/>
    </div>
}

// DOCS
export function DocsPublic() {
    let { idmedico, idpaciente, key, protocolo, momento } = useParams();
    return <div>
        <DocsEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key}  protocolo={protocolo} momento={momento}/>
    </div>
}

// EMCA
export function EmcaPublic() {
    let { idmedico, idpaciente, key, protocolo, momento } = useParams();
    return <div>
        <EmcaEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key} protocolo={protocolo} momento={momento} />
    </div>
}

// OWS
export function OwsPublic() {
    let { idmedico, idpaciente, key, protocolo, momento } = useParams();
    return <div>
        <OwsEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key}  protocolo={protocolo} momento={momento}/>
    </div>
}

// SOWS
export function SowsPublic() {
    let { idmedico, idpaciente, key, protocolo, momento } = useParams();
    return <div>
        <SowsEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key}  protocolo={protocolo} momento={momento}/>
    </div>
}

// DOLOR 2
export function Dolor2Public() {
    let { idmedico, idpaciente, key, protocolo, momento } = useParams();
    return <div>
        <Dolor2Encuesta  idmedico={idmedico} idpaciente={idpaciente} token={key}  protocolo={protocolo} momento={momento} />
    </div>
}

// PCL-5
export function Pcl5Public() {
    let { idmedico, idpaciente, key, protocolo, momento } = useParams();
    return <div>
        <Pcl5Encuesta idmedico={idmedico} idpaciente={idpaciente} token={key}  protocolo={protocolo} momento={momento}/>
    </div>
}