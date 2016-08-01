$(document).ready(function(){
	$('.yahoo-form').submit(function(){
		event.preventDefault();
		var symbol = $('#symbol').val();

		var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("' + symbol + '")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
			// console.log(url);

//AJAX CALL TO THE URL

			$.getJSON(url, function(theDataJSFoundIfAny){
				// console.log(theDataJSFoundIfAny);
				var stockInfo = theDataJSFoundIfAny.query.results.quote;
				var stockCount = theDataJSFoundIfAny.query.count;
				var newHTML = '';
				var addIt = $('.add');
				if(stockCount > 1){
				
					for (var i = 0; i < stockInfo.length; i++) {
						newHTML += buildNewTable(stockInfo[i]);
					}
				}else{
					newHTML += buildNewTable(stockInfo);
				}
				// buildNewTable(theDataJSFoundIfAny.query.results.quote);
					$('.yahoo-body').html(newHTML);
					$('.table').DataTable({
  						"searching": false
						});

				
			});
	});


});

$('button').on("click", function() {
	updateCrap();
});

function buildNewTable(stockInfo){

	if(stockInfo.Change[0] == '+'){
		var upDown = "success";
	}else if (stockInfo.Change[0] == '-'){
		var upDown = "danger";
	}

	var htmlString = '';
				htmlString = '<tr><td>' + stockInfo.Symbol + '</td>';
				htmlString += '<td>' + stockInfo.Name + '</td>';
				htmlString += '<td>' + stockInfo.Ask + '</td>';
				htmlString += '<td>' + stockInfo.Bid + '</td>';
				htmlString += '<td class="'+upDown+'">' + stockInfo.Change + '</td>';
				htmlString += '<td> <button class="add btn btn-success">add</button> </td></tr>';

function updateCrap(){
		localStorage.setItem('symbol', stockInfo.Symbol);
		localStorage.setItem('name', stockInfo.Name);
		localStorage.setItem('ask', stockInfo.Ask);
		localStorage.setItem('bid', stockInfo.Bid);
		localStorage.setItem('change', stockInfo.Change);

			$('.1').html(localStorage.getItem('symbol'));
			$('.2').html(localStorage.getItem('name'));
			$('.3').html(localStorage.getItem('ask'));
			$('.4').html(localStorage.getItem('bid'));
			$('.5').html(localStorage.getItem('change'));
	}
			return htmlString;
}

// var addIt = $('#add');
// 	addIt.click(function(){
// 		localStorage.setItem();
// 		display.html(faveHTML);
	// })

	