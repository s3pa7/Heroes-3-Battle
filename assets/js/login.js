/**
 * 
 */

$(function (){
	validateUserName();
	validatePasword();
	$("form").on("click", function(e){
		e.preventDefault();
	});
	$('#par-login-pass').hide();
	$('#paragraf-login').hide();
	$('#form-registration').hide();
	$('#thirth-form').hide();
	$("#btn-login").on("click", function(){
		debugger;
		var login = $("#login").val();
		var password = $("#password").val();
		debugger;
		if(validateUserName() == false || validatePasword() == false){
			return;
		}else {
		$.ajax({
			  method:"POST",
			  url: "assets/php/login.php",
			  dataType: 'json',
			  data: {login :login , pass : password},
			})
			.done(function(response) {
				debugger;
			  console.log(response);
			  debugger;
			  window.location.replace("http://localhost/Heroes-3/menu.html");
			})
		}
	})
	$('#anchorOne').on("click", function (){
		$('#paragraf-pass').hide();
		$('#paragraf-fname').hide();
		$('#paragraf-confirm-pass').hide();
		$('#paragraf-email').hide();
		$('#form-login').hide();
		$('#form-registration').show();

	})
	$('#anchorTwo').on("click", function (){
		$('#form-email').show();
		$('#form-login').hide();
		$('#paragraf-emails').hide();
		$('#thirth-form').show();
	});
	$('#back').on("click", function (){
		$('#form-registration').hide();
		$('#form-login').show();
	});
	
	$('#btn-back').on("click", function (){
		$('#label-paragraf').hide();
		$('#form-email').hide();
		$('#form-login').show();
	})
	
})
