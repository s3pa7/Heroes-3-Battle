/**
 * 
 */

$(function (){ 
	validateUsername();
	validatePaswordd();
	validateComfirmPassword();
	validateEmail();
	$("form").on("click", function(e){
		e.preventDefault();
	});
	
	$("#btn-registration").on("click", function(){
		var login = $("#login-registration").val();
		var password = $("#password-registration").val();
		var email = $("#email-registration").val();
		debugger;
		if(validateUsername() == false || validatePaswordd() == false 
				|| validateComfirmPassword() == false ||  validateEmail() == false){
			return;
		}else {
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

			})
		}
	})
});
