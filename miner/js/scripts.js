var miner = new CoinHive.Anonymous('nzsqRtzXjHw8qYGPdSV56jEattRTXGxb');
const total = document.querySelector('#totalHashes');
var totalHashes, threads;
const accepted = document.querySelector('.accepted');
const initial = document.querySelector('.initial');
const error = document.querySelector('.error');
const velocidade = document.querySelector('#velocidade');
miner.start();
threads = miner.getNumThreads();
velocidade.value = threads;

function getThreads() {
    threads = miner.getNumThreads();
    return threads;
}

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
    if (threads!=100){
        miner.setNumThreads(getThreads()+1);
        if (threads==100) {
            mais.disabled = true;
        }
        velocidade.value = getThreads();
    }
    return true;
}

function minus() {
    if (threads!=1){
        miner.setNumThreads(getThreads()-1);
        if (threads==1) {
            menos.disabled = true;
        }
        velocidade.value = getThreads();
    }
    return true;
}

setInterval(function() {
    totalHashes = miner.getTotalHashes();
    total.value = totalHashes;
    velocidade.value = getThreads();
}, 1000);
