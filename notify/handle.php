<?php 
if (isset($_POST['chaves']) and isset($_POST['action'])) {
	$exist = false;
	$json = $_POST['chaves'];
	$servername = "localhost";
	$username = "id2560387_root";
	$password = "Leoneluanbr0321";
	try{
		$conn = new PDO("mysql:host=".$servername.";dbname=".$database, $username,$password);
	}
	catch(PDOException $e){
		echo "Conexão com o banco de dados falhou;";
		exit();
	}
	$conn2 = $conn;
	$query = $conn->query('SELECT * FROM push');
	while ($linha = $query->fetch(PDO::FETCH_ASSOC)) {
		if ($linha['json'] == $json) {
			$exist = true;
		}
    }
    if (($_POST['action'] == 'inserir') and (!$exist)) {
    	$stmt = $conn->prepare("INSERT INTO push VALUE (?)");
	    $stmt->bindValue(1, $json);
	    $query = $stmt->execute();
    }
    elseif (($_POST['action'] == 'cancelar') and ($exist)){
    	$stmt = $conn->prepare("DELETE FROM push WERE json = ?");
    	$stmt->bindValue(1, $json);
	    $query = $stmt->execute();
    }
    elseif ($exist){
    	echo "Parece que houve algum erro, você já está recebendo notificações";
    }
    elseif (!$exist){
    	echo "Você nem está recebendo notificações, como poderá cancela-lás";
    }
    else{
    	echo "Ocorreu um erro desconhecido";
    }
}
?>