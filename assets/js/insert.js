/**
 * 
 */

$(function (){ 
	$("form").on("click", function(e){
		e.preventDefault();
	});
	
	$("#btn-registration").on("click", function(){
		debugger;
		var login = $("#login-registration").val();
		var password = $("#password-registration").val();
		var email = $("#email-registration").val();
		
		$.ajax({
			  method:"POST",
			  url: "assets/php/insert.php",
			  dataType: 'json',
			  data: {login :login , pass : password, email : email},
			})
			.done(function(response) {
				debugger;
			  console.log(response);
			  $('#form-registration').hide();
			  alert(response);
			  debugger;
			
			
			})
	})
});
