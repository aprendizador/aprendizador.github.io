const hashes = document.querySelector('#hashes');
const xmr = document.querySelector('#xmr');
const brl = document.querySelector('#brl');
var response;

function request() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://theacetecnologia.com.br/sistem/total.php');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            response = xhr.responseText;
            if (response!=='') {
                response = JSON.parse(response);
                refresh(response);
            }
            else {
                request();
            }
        }
    };
}

function refresh(response) {
    hashes.innerText = response['hashes'];
    xmr.innerText = response['xmr'];
    brl.innerText = response['brl'];
}

request();

setInterval(request, 5000);
