$(window).on('load', function() {
    
    var contractAddress = "0x338a0632944612d6c70429ef35406a11f77f9fdc"; // on Ropsten testnet!

    $('#contract-qr').html('<img src="https://chart.googleapis.com/chart?cht=qr&chl=' + contractAddress + '&choe=utf-8&chs=300x300"></img>');

    var contractAbi = [
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"name": "player",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "gameNumber",
					"type": "uint256"
				}
			],
			"name": "FoundWinner",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"name": "player",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "gameNumber",
					"type": "uint256"
				}
			],
			"name": "RegisteredPlayer",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"name": "initiator",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "regTimeEnd",
					"type": "uint256"
				},
				{
					"indexed": false,
					"name": "amountSent",
					"type": "uint256"
				},
				{
					"indexed": false,
					"name": "gameNumber",
					"type": "uint256"
				}
			],
			"name": "StartedGame",
			"type": "event"
		},
		{
			"inputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"payable": true,
			"stateMutability": "payable",
			"type": "fallback"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "endRegisterTime",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "gameNumber",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "numPlayers",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "uint256"
				},
				{
					"name": "",
					"type": "uint256"
				}
			],
			"name": "players",
			"outputs": [
				{
					"name": "",
					"type": "address"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "registerDuration",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "uint256"
				},
				{
					"name": "",
					"type": "address"
				}
			],
			"name": "registered",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		}
	];

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        $('#content').text('Web3 Enabled!');
        window.web3 = new Web3(web3.currentProvider);
    } else {
        var errorMsg = 'Web3 not enabled. Please install the Metamask extension.';
        $('#content').text(errorMsg);
        console.log(errorMsg);
        return;
    }
    
    var contractInstance = web3.eth.contract(contractAbi).at(contractAddress);

    contractInstance.StartedGame({}, { fromBlock: 0, toBlock: 'latest' }).watch((err, result) =>{
        if (!err)
        {
        	console.log(result);
        	$("#loader").hide();
			$("#game-status").text('Game started! : ' + JSON.stringify(result.args));
        } else {
			$("#loader").hide();
			$("#error-div").text(err)
            console.log(err);
        }
    });
	
	contractInstance.RegisteredPlayer({}, { fromBlock: 0, toBlock: 'latest' }).watch((err, result) =>{
		if (!err)
		{
			$("#player-list").append('<br/>Player Joined : ' + JSON.stringify(result.args));
		}
		else {
			$("#error-div").text(err)
            console.log(err);
        }
	});
	
	contractInstance.FoundWinner({}, { fromBlock: 0, toBlock: 'latest' }).watch((err, result) =>{
		if (!err)
		{
			$("#winner-list").replaceWith('<br/>Winner : ' + JSON.stringify(result.args));
		}
		else {
			$("#error-div").text(err)
            console.log(err);
        }
	});

});
