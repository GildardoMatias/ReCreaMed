export const satisfaccion_catalog = [
    {
        'n': "experencia_1",
        'tipo': 'radioButton',
        'pregunta': '1. ¿Cómo ha sido tu experiencia con nuestro servicio desde el momento de agendar la cita? ',
        'respuestas': ['Muy Insatisfecho', 'Satisfecho', 'Neutral', 'Satisfecho', 'Muy Satisfecho']
    },

    {
        'n': "expectativas_2",
        'tipo': 'seleccion',
        'pregunta': '2. ¿El servicio ha cumplido con tus expectativas?',
        'respuestas': ['No', 'Si']
    },
    {
        'n': 'expectativas_2b',
        'tipo': 'texto',
        'pregunta': '¿PORQUE?',
    },
    {
        'n': 'problema_3',
        'tipo': 'texto',
        'pregunta': '3. ¿Hay algún problema o dificultad que hayas experimentado desde que iniciaste el tratamiento?',
    },
    {
        'n': 'duda_4',
        'tipo': 'texto',
        'pregunta': '4. ¿Has tenido alguna duda o necesidad de soporte médico desde que iniciaste el tratamiento?',
    },
    {
        'n': 'informacion_5',
        'tipo': 'seleccion',
        'pregunta': '5. ¿Has recibido toda la información esperada sobre el tratamiento?',
        'respuestas': ['No', 'Si']
    },
    {
        'n': 'informacion_5b',
        'tipo': 'texto',
        'pregunta': '¿PORQUE?',
    },
    {
        'n': 'satisfecho_6',
        'tipo': 'seleccion',
        'pregunta': '6. ¿Estás satisfecho/a con la calidad y funcionamiento del tratamiento? ',
        'respuestas': ['No', 'Si']
    },
    {
        'n': 'satisfecho_6b',
        'tipo': 'texto',
        'pregunta': '¿PORQUE?',
    },

    {
        'n': 'mejora_7',
        'tipo': 'texto',
        'pregunta': '7. ¿Hay alguna mejora o característica adicional que te gustaría tener? ',
    },
    {
        'n': 'recomendado_8',
        'tipo': 'texto',
        'pregunta': '8. ¿Has recomendado nuestro tratamiento a otras personas? Si es así, ¿cuál ha sido su reacción o experiencia?',
    },
    {
        'n': 'impresionado_9',
        'tipo': 'texto',
        'pregunta': '9. ¿Hay algo en particular que te haya impresionado positivamente sobre nuestro servicio?'
    },
    {
        'n': "valoracion_10",
        'tipo': 'radioButton',
        'pregunta': '10. ¿Cómo valorarías la atención en general de CIDERALT?',
        'respuestas': ['Muy Insatisfecho', 'Satisfecho', 'Neutral', 'Satisfecho', 'Muy Satisfecho']

    },
]

// export const initialDolorValues = dolor_catalog.map(p => ({ p.n: p.user, liked: p.liked }));


// export const initialDolorValues = dolor_catalog.filter(({ tipo }) => tipo === 'metrica').reduce(
//     (obj, item) => Object.assign(obj, { [item.n]: 0 }), {}
// );