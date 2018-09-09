//http-server -c-1 -p 8010

$(window).on('load', function() {
    var contractAddress = "0xdad9371c7ebdd23d9dccb4bbb48c6899143cbcf7"; // on Ropsten testnet!
    var contractAbi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "",
				"type": "string"
			}
		],
		"name": "GotGreeting",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newGreeting",
				"type": "string"
			}
		],
		"name": "setGreeting",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getGreeting",
		"outputs": [
			{
				"name": "g",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "greeting",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

    if (typeof web3 !== 'undefined') {
        $('#content').text('Web3 detected!');
        window.web3 = new Web3(web3.currentProvider);
    } else {
        var errorMsg = 'Web3 not detected. Please open in Google Chrome Browser and install the Metamask extension.';
        $('#content').text(errorMsg);
        console.log(errorMsg);
        return;
    }
    
    var contractInstance = web3.eth.contract(contractAbi).at(contractAddress);
	
    contractInstance.getGreeting(function(error, greeting) {
        if (error) {
            var errorMsg = 'Error reading greeting from smart contract: ' + error;
            $('#content').text(errorMsg);
            console.log(errorMsg);
            return;
        }
        $('#content').text('Greeting from contract: ' + greeting);
    });
    
    $('#my-form').on('submit', function(e) {
        e.preventDefault(); 
        var newGreeting = $('#greeting').val(); 

    contractInstance.setGreeting(newGreeting, function(error, txHash) {
            if (error) {
                var errorMsg = 'Error writing new greeting to smart contract: ' + error;
                $('#content').text(errorMsg);
                console.log(errorMsg);
                return;
            }
            $('#content').text('Submitted new greeting to blockchain, transaction hash: ' + txHash);
        });
    });

    contractInstance.GotGreeting({}, { fromBlock: 0, toBlock: 'latest' }).watch(function(error, data) {
	console.log('Got event!');
	if (error)
	    console.log('Error in event handler: ' + error);
	else {
	    console.log('Got event data: ' + data);
	    $('#pastGreetings').append(JSON.stringify(data.args));
	}
    });

});

function cb(error, response) {
    console.log('error: ' + error + ', response: ' + response);
}
