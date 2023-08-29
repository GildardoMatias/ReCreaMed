import { ids_hospitales, sendDataBody } from "../resources";

// new Method for session is reception
export default async function getAllEscalas(tipo, setData, setLoading) {
    const medicos = await sendDataBody('users/getMany/hospitals', { ids_hospitales: ids_hospitales })
    
    sendDataBody('encuestas', { ids_medicos: medicos, tipo: tipo }).then((rs) => {
        setData(rs)
        setLoading(false)
    })

}