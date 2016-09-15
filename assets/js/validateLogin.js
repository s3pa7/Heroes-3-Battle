/**
 * 
 */
function validateUserName (){
	
	$('#login').on('blur',function (){
		$('#paragraf-login').show();
		var name = $('#login').val();
		var nameRegex = /^[a-zA-Z ]{3,30}$/;

		if(nameRegex.test(name) == true){
			$('#paragraf-login').css({
				color: "white"
			})
			$('#paragraf-login').html('Valid');
			return true;
		}else {
			$('#paragraf-login').css({
				color: "red"
			})
			$('#paragraf-login').html('Please Enter a valid Username');
			return false;
		}

	})
	
}

function validatePasword (){
	$('#password').on('blur',function (){
		$('#par-login-pass').show();
		var pass = $('#password').val();

		//var passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
		var passRegex =/.{6,12}/;

		if(passRegex.test(pass) == true){
			$('#par-login-pass').css({
				color: "white"
			})
			$('#par-login-pass').html('Valid');
			return true;
		}else {
			$('#par-login-pass').css({
				color: "red"
			})
			$('#par-login-pass').html('Please Enter a valid password');
			return false;
		}
	})
}

