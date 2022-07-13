const url = 'http://localhost:4000/api/expedientes/uploadEstudio'
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const files = document.querySelector('[type=file]').files
    const formData = new FormData()

    for (let i = 0; i < files.length; i++) {
        let file = files[i]

        formData.append('file', file)
    }

    fetch(url, {
        method: 'POST',
        body: formData,
    }).then((response) => {
        console.log(response)
        return response.json()
    }).then((rs) => { console.log(rs) })
})

// This File is used only for test purposes ,
//  while testing upload pdfs to expediente's study