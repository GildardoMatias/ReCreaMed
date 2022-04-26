export const API = "https://api.recreamed.com/api/"
export const S_API = "https://api.recreamed.com/session/"

const getHospitalesData = () => {
    fetch(API + 'sucursales')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // setHospitalesData(data);
            // setILoading(false);
        });
}

const onFinish = (values) => {
    values.avatar = 'https://';
    values.estatus = '1';
    delete values.confirm;
    delete values.prefix;
    delete values.agreement;

    console.log(values)
    fetch(S_API + 'register', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            console.log('Success:', response);
            // message.success(response.message);
        })
        .catch(error => console.error('Error:', error))
};
