/**
 * 
 */

$(function (){ 
	validateEmailThirtForm();
	$("form").on("click", function(e){
		e.preventDefault();
	});
	$("#btn-email").on("click", function(){
		debugger;
		var email = $("#emaill").val();
		if( validateEmailThirtForm () == false){
			return;
		}else{
		$.ajax({
			  method:"POST",
			  url: "assets/php/getPassword.php",
			  dataType: 'json',
			  data: {email : email},
			})
			.done(function(response) {
			  debugger;
			  console.log(response);
			  $('#thirth-form').hide();
			  alert("Success");
			})
		}
	})
});

