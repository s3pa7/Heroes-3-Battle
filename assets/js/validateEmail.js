/**
 * 
 */
function validateEmailThirtForm() {
		$('#paragraf-emails').show();
		var email = $('#emaill').val();

		//var passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
		var passRegex =/[a-zA-Z0-9_.+-]+@.+\..+/;

		if(passRegex.test(email) == true){
			$('#paragraf-emails').css({
				color: "white"
			})
			$('#paragraf-emails').html('Valid')
			return true;
		}else {
			$('#paragraf-emails').css({
				color: "red"
			})
			$('#paragraf-emails').html('Please Enter a valid email');
			return false;
		}
}
