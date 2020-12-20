export function getUser(callback, args = ''){
    const xhttp = new XMLHttpRequest();

    xhttp.addEventListener('readystatechange', function() {
        if (this.readyState == 4 && this.status == 200) {
            const user = JSON.parse(this.responseText);
            callback(user.results[0]);
        }
    });


    xhttp.open('GET', `https://randomuser.me/api/${ args }`, true);
    xhttp.send();
}