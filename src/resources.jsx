export const API = "https://api.recreamed.com/api/"
export const S_API = "https://api.recreamed.com/session/"

export const logout = () => { localStorage.removeItem('sessionToken'); localStorage.removeItem('userType'); localStorage.removeItem('userData'); window.location.href = '/'; }

export const usuario = JSON.parse(localStorage.getItem('userData'));

export async function getData(endpoint) {
    return await fetch(API + endpoint)
        .then(response => response.json())
        .then(data => {
            return data;
        });
}



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
