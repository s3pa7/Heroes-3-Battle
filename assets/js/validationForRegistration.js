/**
 * 
 */

function validateUsername(){
		$('#paragraf-fname').show();
		var name = $('#login-registration').val();
		var nameRegex = /^[a-zA-Z ]{3,30}$/;

		if(nameRegex.test(name) == true){
			$('#paragraf-fname').css({
				color: "white"
			})
			$('#paragraf-fname').html('Valid');
			return true;
		}else {
			$('#paragraf-fname').css({
				color: "red"
			})
			$('#paragraf-fname').html('Please Enter a valid Username');
			return false;
		}

}
function validatePaswordd (){
		$('#paragraf-pass').show();
		var pass = $('#password-registration').val();

		//var passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
		var passRegex =/.{6,12}/;

		if(passRegex.test(pass) == true){
			$('#paragraf-pass').css({
				color: "white"
			})
			$('#paragraf-pass').html('Valid');
			return true;
		}else {
			$('#paragraf-pass').css({
				color: "red"
			})
			$('#paragraf-pass').html('Please Enter a valid password');
			return false;
		}

}
function validateComfirmPassword (){
		$('#paragraf-confirm-pass').show();
		var pass = $('#password-registration').val();
		var confirmPass = $('#confirm-password-registration').val();

		if(pass == confirmPass){
			$('#paragraf-confirm-pass').css({
				color: "white"
			})
			$('#paragraf-confirm-pass').html('Valid');
			return true;
		}else{
			$('#paragraf-confirm-pass').css({
				color: "red"
			})
			$('#paragraf-confirm-pass').html('Passwords miss match');
			return false;
		}
}
function validateEmail() {
	//$('#email-registration').on('blur',function (){
		$('#paragraf-email').show();
		var email = $('#email-registration').val();

		//var passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
		var passRegex =/[a-zA-Z0-9_.+-]+@.+\..+/;

		if(passRegex.test(email) == true){
			$('#paragraf-email').css({
				color: "white"
			})
			$('#paragraf-email').html('Valid');
			return true;
		}else {
			$('#paragraf-email').css({
				color: "red"
			})
			$('#paragraf-email').html('Please Enter a valid email');
			return false;
		}
	//})
}



