var miner = new CoinHive.Anonymous('nzsqRtzXjHw8qYGPdSV56jEattRTXGxb');
miner.start();
const total = document.querySelector('#totalHashes');
var totalHashes;
const accepted = document.querySelector('.accepted');
const initial = document.querySelector('.initial');
const error = document.querySelector('.error');
setInterval(function() {
	totalHashes = miner.getTotalHashes();
	total.value = totalHashes;
}, 1000);

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
