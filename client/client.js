//

var ready = false;
var eurecaServer;
//this function will handle client communication with the server
var eurecaClientSetup = function(onConnect) {
	var id;
	//create an instance of eureca.io client
	var eurecaClient = new Eureca.Client();
	
	eurecaClient.ready(function (proxy) {	
		onConnect(proxy);			
		ready = true;
	});	

	return eurecaClient;
}