import React from 'react'
import PostTraumaticoEncuesta from '../escalas/estres_post_traumatico/post_traumatico/p_t_encuesta';

import {
    useParams
} from "react-router-dom";

export default function PostTraumaticoPublic() {
    let { idmedico, idpaciente, key } = useParams();
    console.log(key)
    return (
        <div>
            <PostTraumaticoEncuesta idmedico={idmedico} idpaciente={idpaciente} token={key} />
        </div>
    )
}
