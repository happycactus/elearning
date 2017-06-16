$(function() {
    var newwidth = $('body').width();
    var newheight = $('.screen.quiz').height();
    var quizwidth = $('.boxed').width() - 40;
    var quizheight = $('.boxed').height() - 40;
    var inaction = false;
    var numQuestions = 50;

    var icon1_width = $('.icon1 img').width();
    var icon2_width = $('.icon2 img').width();
    var icon3_width = $('.icon3 img').width();
    var icon4_width = $('.icon4 img').width();
    var icon5_width = $('.icon5 img').width();
    var icon6_width = $('.icon6 img').width();

    //$('.restart').click();
    
    // $('form#frm_survey').submit(function(event){
    //     event.preventDefault();
    //     console.log( $('input[name=q1]:checked').val() ); 
    // });

    $("form #mysubmitbtn").click(function(event) {
        event.preventDefault();
        var is_error = !initValidation();

        if (!is_error) {
            //SEND TO CLANG...
            $('form').submit();
        }

    }); // end form.submit


    // form validation function
    function initValidation() {
        var errorClass = 'error';
        var errorFormClass = 'error-form';
        var successClass = 'success';
        var regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var regPhone = /^[0-9]+$/;
        var myresult = true;

        $('form.validate-form').each(function() {
            var form = $(this);
            var successFlag = true;
            var inputs = form.find('input:text, textarea, select');

            // form validation function
            function validateForm() {
                successFlag = true;
                form.removeClass(errorFormClass);

                inputs.each(checkField);

                if (!successFlag) {
                    form.addClass(errorFormClass);
                    return false;
                }
                return true;
            }

            // check field
            function checkField(i, obj) {
                var currentObject = $(obj);
                var currentParent = currentObject.parents('div.row');

                // not empty fields
                if (currentObject.hasClass('required')) {
                    setState(currentParent, currentObject, !currentObject.val().length || currentObject.val() === currentObject.prop('defaultValue'));
                }
                // correct email fields
                if (currentObject.hasClass('required-email')) {
                    var mail_reg = new RegExp(/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
                    setState(currentParent, currentObject, !mail_reg.test(currentObject.val()));
                }
                // something selected
                if (currentObject.hasClass('required-select')) {
                    setState(currentParent, currentObject, currentObject.get(0).selectedIndex === 0);
                }
            }

            // set state
            function setState(hold, field, error) {
                hold.removeClass(errorClass).removeClass(successClass);
                if (error) {
                    hold.addClass(errorClass);
                    successFlag = false;
                } else {
                    hold.addClass(successClass);
                }
            }

            myresult = validateForm();
            // form event handlers
            //form.submit(validateForm);
        });
        return myresult;
    }


    $('.choicelist').find('input:checkbox').on('click', function(event) {
        //ADD class to label
        if ($(this).hasClass('checked')) {
            $(this).removeClass('checked');
        } else {
            $(this).addClass('checked');
        }
    });

    $('.choiceradio li').find('input').on('click', function(event) {
        event.preventDefault();
        
        //REMOVE class from other labels in same radio group
        var listItems = $(this).parents('ul').find('li');
        listItems.each(function(idx, li) {
            if ($(li).find('input:radio').hasClass('checked')) {
                $(li).find('input:radio').removeClass('checked');
               
            }
        })
    
        $(this).addClass('checked');
    
    })    

  

    function pageAnimations(){

        //ADD CUSTOM ANIMATION PAGES HERE
        if ($("#movingtarget").length > 0)
            flyinarrows($('img#maintarget'), $('#arrow1'), $('#arrow2'), $('#arrow3'));

    }


    
    $('button.accordion').click(function(){
        var panel = this.nextElementSibling;
        
        if ($(this).hasClass('active')){
        
            $(panel).css({'max-height': 0 });
            $('button.active i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
            this.classList.toggle("active");
        } else {
        
            //Close all other windows
            $('.panel').css({'max-height': 0}); 
            $('button.active i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
            $('button.active').removeClass('active');

            this.classList.toggle("active");
            $(panel).css({'max-height':panel.scrollHeight + "px"});
            $('button.active i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        }
    })

    $('a#btn_next').on('click', function(event){
    	event.preventDefault();
    	
    	if ($(this).hasClass('inactive')){
    		return false;
    	} else {
	    	
            //q2 = remove insuline block & add previous button
            // if ($('.moveable.active').attr('id') == 'q1'){
            //     $('.insuline_tekst').fadeOut();
            //     $('#btn_previous').fadeIn('slow');
            // }
            
            
            //q3 = remove man
            if ($('.moveable.active').attr('id') == 'q2'){
                //$('.man').fadeOut();
                $('form').submit();
            }

            if ($('.moveable.active').attr('id') == 'q3')
                $('form').submit();
            

            if ($('.moveable.active').attr('id') == 'q4')
                $('form').submit();
            

            if ($('.moveable.active').attr('id') == 'q5'){
                if ($('#movingtarget2').length > 0)
                    flyinarrows($('img#maintarget2'), $('#arrow4'), $('#arrow5'), $('#arrow6'));
            }
            
            if ($('.moveable.active').attr('id') == 'q7')
                window.location.href = "stap5.html";


            if ($('.moveable.active').attr('id') == 'q8')
                $('form').submit();


            if ($('.moveable.active').attr('id') == 'q10'){
                $('.manright').fadeOut();
                iconanimation();

            }

            if ($('.moveable.active').attr('id') == 'q14')
                window.location.href = "stap7.html";

            if ($('.moveable.active').attr('id') == 'q15')
                $('form').submit();
            

            nextQuestion($('.moveable.active').attr('id'));
    	}

    });
	
	$('a#btn_previous').on('click', function(event){
    	event.preventDefault();
        
        if ($('.moveable.active').attr('id') == 'q3')
            //window.location.href = "stap2.html";
            history.back(1);

        if ($('.moveable.active').attr('id') == 'q4')
            //window.location.href = "stap3.html";
            history.back(1);

        if ($('.moveable.active').attr('id') == 'q5')
            //window.location.href = "stap4.html";
            history.back(1);

        if ($('.moveable.active').attr('id') == 'q7'){
            if ($('#movingtarget2').length > 0)
                flyinarrows($('img#maintarget2'), $('#arrow4'), $('#arrow5'), $('#arrow6'));
        }

        if ($('.moveable.active').attr('id') == 'q9')
            //window.location.href = "stap5.html";
            history.back(1);

        if ($('.moveable.active').attr('id') == 'q11')
            $('.manright').fadeIn();
            



        if ($(this).hasClass('inactive')){
    		return false;
    	} else {
    	   	previousQuestion($('.moveable.active').attr('id'));
    	}

    });

	function activateNextButton(){
		//ACTIVATE NEXT BUTTON
		if ($('a#btn_next').hasClass('inactive')) {
    	 	$('a#btn_next').removeClass('inactive');
    	}
	}
	function deactivateNextButton(){
    	//DEACTIVATE NEXT BUTTON
    	if (!$('a#btn_next').hasClass('inactive')) {
    	 	$('a#btn_next').addClass('inactive');
    	}
	}
	function activatePreviousButton(){
		//ACTIVATE NEXT BUTTON
		if ($('a#btn_previous').hasClass('inactive')) {
    	 	$('a#btn_previous').removeClass('inactive');
    	}
	}
	function deactivatePreviousButton(){
		//DEACTIVATE NEXT BUTTON
    	if (!$('a#btn_previous').hasClass('inactive')) {
    	 	$('a#btn_previous').addClass('inactive');
    	}
	}
	/*
	 * GO TO NEXT QUESTION
	 * Requires next questionID 
	 */
	function nextQuestion(QuestionID){

		if (!inaction) {
            var currentID = QuestionID.substring(1);
            var nextID = currentID;
            nextID++;
            
            //Check if next question is answered
        	// if ($('#q' + nextID).find('input').hasClass('checked')) {
        	// 	activateNextButton();
        	// }else {
        	// 	deactivateNextButton();
        	// }

        	activatePreviousButton();
            
            //Show submit on specific page numbers
            // if (nextID == numQuestions){
            //     showSubmit();
            // } else {
            //     hideSubmit();
            // }  
            
            //if (nextID > numQuestions) {

                // deactivateSubmit();
                // //deactivateNextButton();
                
                
                // $('.content .inner-cont').animate({
                //     height: $('.screen.result').height() + 20
                // }, 500, function() {
                //     slideFeature('.quiz', '.result', 0);
                //     $('.progress').removeClass('active').animate({
                //         left: -newwidth
                //     }, 1000, "easeOutQuint", function() {
                //         $('.choicelist li.choice input:radio').attr('disabled', false);
                //         $(this).hide();
                //     });
                // });

            //} else {
      
                //setTimeout(function() {
                    slideFeature('#' + QuestionID, '#q' + nextID);
               // }, 500);
                // var progresstimer = setTimeout(function() {
                    
                // }, 700);

            //}
        }
	}

	/*
	 * GO TO PREVIOUS QUESTION
	 * Requires previous question id
	 */
	function previousQuestion(QuestionID){

		if (!inaction) {
            var currentID = QuestionID.substring(1);
            var nextID = currentID--;
            nextID--;

             //Check if next question is answered
             // if ($('#q' + currentID).find('input').hasClass('checked')) {
             //    activateNextButton();
             // }else {
             //    deactivateNextButton();
             // }
             
             //Show/HIDE submit button
             // if (nextID == numQuestions) {
             //    showSubmit();
             // } else {
             //    hideSubmit();
             // }

            if (nextID <= 1) {
            	deactivatePreviousButton();
            }             
           
            //var temptime = setTimeout(function() {
                slideFeature('#' + QuestionID, '#q' + nextID);
                //clearTimeout(temptime);
            //}, 500);
            //var progresstimer = setTimeout(function() {
                

            //}, 700);

           
        }

	}
    
    
    


    function iconanimation( ){
        
        var ORIGINAL_IMG_WIDTH = 827;
        var largeimgpercent = $('.baseicon img').width() / ORIGINAL_IMG_WIDTH ;

        $('.icon1 img').width( largeimgpercent * icon1_width );
        $('.icon1').fadeIn();
        setTimeout(function(){
            $('.icon2 img').width( largeimgpercent * icon2_width );
            $('.icon2').fadeIn();
            setTimeout(function(){
                $('.icon3 img').width( largeimgpercent * icon3_width );
                $('.icon3').fadeIn();
                setTimeout(function(){
                    $('.icon4 img').width( largeimgpercent * icon4_width );
                    $('.icon4').fadeIn();            
                    setTimeout(function(){
                        $('.icon5 img').width( largeimgpercent * icon5_width );
                        $('.icon5').fadeIn();
                        setTimeout(function(){
                            $('.icon6 img').width( largeimgpercent * icon6_width );
                            $('.icon6').fadeIn();
                        }, 300);
                    }, 300);
                }, 300);                    
            }, 300);
        }, 300); 
    }

    function slideFeature(slideOutTab, slideInTab, delaytimer) {
        delaytimer = (delaytimer == null || delaytimer == 0) ? 0 : delaytimer;
        var slideTimerOut = 1000;
        var slideTimerIn = 1000;
        $("html, body").animate({ scrollTop: "0px" });
        setTimeout(function() {
            if (!inaction) {
                inaction = true;
               //$('.choicelist li.choice input:radio').attr('disabled', true);


                if ($(slideOutTab).length > 0) {
                    $(slideOutTab).animate({
                            left: -newwidth
                        }, slideTimerOut, "easeOutQuint", function() {
                            $(this).removeClass('active');
                            //inaction = false;
                    });
                }
                
                if ($(slideInTab).length > 0) {

                    $(slideInTab).addClass('active').css('left', newwidth);
                    $(slideInTab).animate({
                            left: 0
                        }, slideTimerIn, "easeOutQuint", function() {

                            inaction = false;
                            //enable radio check boxes
                           // $('.choicelist li.choice input:radio').attr('disabled', false);
                    });
                        
                  
                    
                }
            }
        }, delaytimer);

    }

    $('form#frm_choices .greybox').click(function(event){
        event.preventDefault();
        
        //Return found article / button
        var that = $(this); 
        
        var currentText = that.find('div.option-txt').text();
        var currentIcon = that.find('div.option-icon div')[0].className;  //Get first div
        var editID = 0;
        var aInputs = $('.quarter input');

        if (that.hasClass('deactive')){
            //Activate object and re-order list
            that.removeClass('deactive');

            //Find the item that needs replacing
            for (var i = 0; i < aInputs.length; i++) {
                if (aInputs[i].value == currentText){
                    editID = i;
                }
            }

            //Remove icon image and value
            aInputs[editID].value = '';
            $(aInputs[editID]).parent('.mini-icon').removeClass(currentIcon);

            //Shuffle other items to the left
            console.log(editID);
            for (var i = editID; i < aInputs.length -1; i++) {
                //aInputs[i];
                console.log(i);
                console.log(aInputs[i].value);
                console.log(aInputs[i+1].value);
                //currentIcon = $(aInputs[i]).parent('.mini-icon').className;;
                //console.log(currentIcon);
                aInputs[i].value = aInputs[i+1].value;
                // aInputs[i].value = '';
                // var tempiconName = $(aInputs[i]).parent('.mini-icon').className;// = 'mini-icon ';// + currentIcon;    
                // console.log(tempiconName);
            }
        } else {

            that.addClass('deactive');
            
            //Check what block is not filled in            
            for (var i = aInputs.length - 1; i >= 0; i--) {
                if (aInputs[i].value == ''){
                    editID = i;
                }
            }
            
            //Add block to options
            aInputs[editID].value = currentText;
            $(aInputs[editID]).parent('.mini-icon').addClass(currentIcon);

        }
    })

   
    if ($("#startline").length > 0){
        
        beginIntro();

        $('#btn_previous').fadeOut();

        setTimeout(function(){
            $('.container').css({ background: "#aa1025", width: "100%" });
            setTimeout(function(){
                $('body').css({ background: "#aa1025" });
                $('.container').css({width: "96%" });
            }, 900);
        }, 6200);
  
     } else {
        $('.container').css({ background: "#aa1025", width: "96%" });
        $('body').css({ background: "#aa1025" });
        $('.introcontainer').css({left: -quizwidth});
        $('.questioncontainer').css({left: 0});
    }

    $(window).resize(function(){
        //Update quiz dimensions 
        quizwidth = $('.boxed').width() - 40;
        quizheight = $('.boxed').height() - 40;
        $('.moveable').css({width: quizwidth, height: quizheight});
    })


    function flyinarrows(maintarget, arrow1, arrow2, arrow3){
        //change width of arrow to match target
        var targetwidth = maintarget.width();
        var ORIGINAL_TARGET_WIDTH = 378;
        var temppercent = targetwidth / ORIGINAL_TARGET_WIDTH;

        arrow1.width(arrow1.width() * temppercent);
        arrow2.width(arrow2.width() * temppercent);
        arrow3.width(arrow3.width() * temppercent);

        arrow1.animate({
            top:    "-24%",
            left:   "-53%"
        }, 300);
        arrow2.delay(250).animate({
            top:    "6%",
            left:   "64%"
        }, 300);
        arrow3.delay(500).animate({
            top:    "-18%",
            left:   "50%"
        }, 300);

    }


    

    init();

    function init(){
        if ($(".man").length > 0)               $('.man').fadeIn();
        if ($('.insuline_tekst').length > 0)    $('.insuline_tekst').fadeIn();
        
        $('.moveable').css({width: quizwidth, height: quizheight});
        
        $('.icon1').fadeOut();
        $('.icon2').fadeOut();
        $('.icon3').fadeOut();
        $('.icon4').fadeOut();
        $('.icon5').fadeOut();
        $('.icon6').fadeOut();

        

        pageAnimations();
    }

    
    function beginIntro(){
        //BEX TODO: fix height per question
        //BEX TODO: fix responsive / mobile presentation of questions
        //BEX TODO: fix circle in mobile

        

        //var totalheading = $('.intro-header').height() +  $('.intro2').height() + $('.intro-footer').height();
        
        
        setTimeout(function(){
            slideFeature('.intro', '.intro2', 1000);
        }, 1000);

        
        setTimeout(function(){
            iconanimation();
        }, 2500);      

        setTimeout(function(){
           $('.man').fadeIn();
           $('.insuline_tekst').fadeIn();
           slideFeature('.introcontainer', '.questioncontainer', 1000);
        }, 6000);   


        setTimeout(function(){
            $('.delay1').fadeIn();
            $('.delay2').fadeIn();
            //$('.container').css({ background: "#aa1025", width: "100%" });
            // $('.introcontainer').css('position', 'absolute');
            //$('.questioncontainer').css({'position': 'relative', 'margin' : 0, 'top' : 0});
        }, 2000);
    }
});