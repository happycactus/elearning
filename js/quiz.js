$(function() {
    
    var newwidth = $('body').width();    
    var quizwidth = $('.questioncontainer').width() - 40;
    var percent = 0;
    var inaction = false;
    var numQuestions = 41;

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
    
    $('.custom_ordered span').on('click', function(event) {

        if ($(this).hasClass('checked')) {
            $(this).removeClass('checked');

            //Move to bottom
            var editID = $(this)[0].id;
            editID = editID.slice(-1);
            
               //Find the item that needs replacing
                //var positionID = editID;
                
                for (var i = editID; i < $('.custom_ordered span').length; i++) {
                    var currenttext = $('#pos_'+i).text();
                    var nextID = parseInt(i) + 1;
                    
                    if ($('#pos_'+nextID).hasClass('checked')){
                        //remove class and shuffle text to currentslot
                        $('#pos_'+i).addClass('checked');
                        $('#pos_'+nextID).removeClass('checked');
                        
                        $('#pos_'+i).text($('#pos_'+nextID).text());
                        $('#pos_'+nextID).text( currenttext )
                    }
                    
                }

        } else {
            
            //Move to 'next' position
            var emptyslotID = 1;
            for (var i = $('.custom_ordered span').length; i >= 1; i--) {
                if ( !$('#pos_'+i).hasClass('checked') ) {
                    emptyslotID = i;
                }
            }
            
            var movingslot = $('#pos_' + emptyslotID).text();
            var currentslot = $(this).text();
            
            $('#pos_'+emptyslotID).text( currentslot );
            $('#pos_'+emptyslotID).addClass('checked');
            $(this).text(movingslot);

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

  

    


    
    $('button.accordion').click(function(){
        var panel = this.nextElementSibling;
        var extraheight = 300;

        if ($(this).hasClass('active')){
        
            $(panel).css({'max-height': 0 });
            $('button.active i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
            this.classList.toggle("active");

        
                //$('.moveable.active').height( $('.moveable.active').height() - $('.panel').height() );
        } else {
        
            //Close all other windows
            $('.panel').css({'max-height': 0}); 
            $('button.active i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
            $('button.active').removeClass('active');

            this.classList.toggle("active");
            $(panel).css({'max-height':(panel.scrollHeight + 40) + "px"});
            $('button.active i').removeClass('fa-chevron-down').addClass('fa-chevron-up');

            //$('.moveable.active').height( $('.moveable.active').height() + $('.panel').height() );
        }
        setTimeout(function(){
            $('.moveable.active').height('auto');
            adjustHeight();
        },100);

    })

    var iflyInTextCount = 0;

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
            if ($('.moveable.active').attr('id') == 'q2')                  $('form').submit();

            if ($('.moveable.active').attr('id') == 'q3')                  $('form').submit();        

            if ($('.moveable.active').attr('id') == 'q4')                  $('form').submit();
            
            if ($('.moveable.active').attr('id') == 'q5'){
                if ($('#movingtarget2').length > 0)
                    flyinarrows($('img#maintarget2'), $('#arrow4'), $('#arrow5'), $('#arrow6'));
            }

            if ($('.moveable.active').attr('id') == 'q6')                  initArrows();
            
                
            if ($('.moveable.active').attr('id') == 'q7')                  window.location.href = $('#btn_submit').val();


            if ($('.moveable.active').attr('id') == 'q8')                  $('form').submit();



            if ($('.moveable.active').attr('id') == 'q10'){
                $('.manright').fadeOut();
                iconanimation();

            }

            if ($('.moveable.active').attr('id') == 'q14')                window.location.href = "stap7.html";

            if ($('.moveable.active').attr('id') == 'q15'){

                for (var i = 1; i <= $('.custom_ordered span').length; i++) {
                    $('#q15_'+i).val( $('#pos_'+i).text() );
                }                
                $('form').submit();
            }   
            
            if ($('.moveable.active').attr('id') == 'q16')                $('form').submit();

            if ($('.moveable.active').attr('id') == 'q19')                $('.manright').fadeIn();

            if ($('.moveable.active').attr('id') == 'q20')                $('.manright').fadeOut();

            if ($('.moveable.active').attr('id') == 'q26'){
                $('.manright').fadeIn();
                iflyInTextCount = 0;
            }

            if ($('.moveable.active').attr('id') == 'q27'){
                if (iflyInTextCount == 0) {
                    iflyInTextCount++;
                    $('.delay1').fadeIn('2000');
                    return;
                }
                if (iflyInTextCount == 1) {
                    $('.delay2').fadeIn('2000');
                    iflyInTextCount++;
                    return;
                }
                if (iflyInTextCount == 2 ){
                    $('.manright').fadeOut();
                }
            }

            if ($('.moveable.active').attr('id') == 'q31'){
                initBar('#bars');
                animateBar('#bars');
            }

            if ($('.moveable.active').attr('id') == 'q32'){
                initPie();
                animatePie();
            }
            
            if ($('.moveable.active').attr('id') == 'q33'){
                initBar('#bars2');
                animateBar('#bars2');
            }
            
            if ($('.moveable.active').attr('id') == 'q35'){
                $('.manright').fadeIn();
            }

            if ($('.moveable.active').attr('id') == 'q36')
                if ($('#btn_submit').val() != null){
                    window.location.href = $('#btn_submit').val();
                }   

            if ($('.moveable.active').attr('id') == 'q37')                $('form').submit();
            if ($('.moveable.active').attr('id') == 'q38')                $('form').submit();
            if ($('.moveable.active').attr('id') == 'q39')                $('form').submit();
            if ($('.moveable.active').attr('id') == 'q40')                $('form').submit();
            if ($('.moveable.active').attr('id') == 'q41')                $('form').submit();
            if ($('.moveable.active').attr('id') == 'q42')                $('form').submit();   
            


            //} else {
                nextQuestion($('.moveable.active').attr('id'));
            //}
    	}

    });    




	$('a#btn_previous').on('click', function(event){
    	event.preventDefault();
        
        

        if ($('.moveable.active').attr('id') == 'q5')
            window.location.href = $('#btn_back').val();

        if ($('.moveable.active').attr('id') == 'q6') {
            if ($("#movingtarget").length > 0)
                flyinarrows($('img#maintarget'), $('#arrow1'), $('#arrow2'), $('#arrow3'));
        }


        if ($('.moveable.active').attr('id') == 'q7'){
            if ($('#movingtarget2').length > 0)
                flyinarrows($('img#maintarget2'), $('#arrow4'), $('#arrow5'), $('#arrow6'));
        }

        if ($('.moveable.active').attr('id') == 'q9')           window.location.href = $('#btn_back').val();

        if ($('.moveable.active').attr('id') == 'q11')          $('.manright').fadeIn();

        if ($('.moveable.active').attr('id') == 'q12')          iconanimation();
                    
        if ($('.moveable.active').attr('id') == 'q17')          window.location.href = $('#btn_back').val();

        if ($('.moveable.active').attr('id') == 'q20'){
            $('.manright').fadeOut();
        }

        if ($('.moveable.active').attr('id') == 'q21'){
            $('.manright').fadeIn();
        }

        if ($('.moveable.active').attr('id') == 'q28'){
            $('.manright').fadeIn();
        }

        if ($('.moveable.active').attr('id') == 'q27'){
            $('.manright').fadeOut();
            iflyInTextCount = 0;
            $('.delay1').hide();
            $('.delay2').hide();
        }

        if ($('.moveable.active').attr('id') == 'q33'){
            initBar('#bars');
            animateBar('#bars');
        }
        
        if ($('.moveable.active').attr('id') == 'q34'){
                initPie();
                animatePie();
        }

        if ($('.moveable.active').attr('id') == 'q35'){
            initBar('#bars2');
            animateBar('#bars2');
        }

        if ($('.moveable.active').attr('id') == 'q36'){
            $('.manright').fadeOut();

        }

        if ($('.moveable.active').attr('id') == 'q37'){
            $('.manright').fadeIn();

        }

        if ($('.moveable.active').attr('id') == 'q38')           window.location.href = $('#btn_back').val();
        if ($('.moveable.active').attr('id') == 'q39')           window.location.href = $('#btn_back').val();
        if ($('.moveable.active').attr('id') == 'q40')           window.location.href = $('#btn_back').val();
        if ($('.moveable.active').attr('id') == 'q41')           window.location.href = $('#btn_back').val();

        if ($('.moveable.active').attr('id') == 'q42')           window.location.href = $('#btn_back').val();

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

    function animateBar(bars){
        setTimeout(function(){
            $(bars + " li .bar").each( function( key, bar ) {
                var percentage = $(this).data('percentage');
                
                $(this).animate({
                  'height' : percentage + '%'
                }, 1000);
              });
        }, 2500);
    }

    function initBar(bars){
        $(bars + " li .bar").each( function( key, bar ) {
            $(this).css({ 'height' : 'auto' });
        });
    }
    
    if ( $('.pie').length > 0){
       var pie = new Pie(document.querySelector(".pie"), {
         mask: true,
         color: "#ab0d20",
         backgroundColor: "#ce102c"
       }, "#pie1");

       var pie2 = new Pie(document.querySelector(".mainpie"), {
         mask: true,
         color: "#ab0d20",
         backgroundColor: "#ce102c"
       }, "#pie2");
    }
    
    function initPie(){

        percent = 0;
        pie.set(0);
        pie2.set(0);
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
        	//  	activateNextButton();
        	// } else {
        	//  	deactivateNextButton();
        	// }

        	activatePreviousButton();
            slideFeature('#' + QuestionID, '#q' + nextID, 500);
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

            if (nextID <= 1) {
            	deactivatePreviousButton();
            }             
           
            slideFeature('#' + QuestionID, '#q' + nextID, 500);           
        }
	}  
    
    function iconanimation( ){
        setTimeout(function(){
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
    }, 2000);
    }

    function slideFeature(slideOutTab, slideInTab, delaytimer) {
        delaytimer = (delaytimer == null || delaytimer == 0) ? 0 : delaytimer;
        var slideTimerOut = 1000;
        var slideTimerIn = 1000;
        $("html, body").animate({ scrollTop: "0px" }, 100);
        
        setTimeout(function() {
            if (!inaction) {
                inaction = true;

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
                    adjustWidth();
                    $(slideInTab).animate({
                            left: 0
                        }, slideTimerIn, "easeOutQuint", function() {
                            adjustHeight();
                            inaction = false;
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
            for (var i = editID; i < aInputs.length; i++) {
                var nextItem = (aInputs[i+1]) ? (aInputs[i+1]) : '';
                aInputs[i].value = (nextItem) ? nextItem.value : '';
                var parentIcon = $(aInputs[i]).parent('.mini-icon')[0];
                var nextParentIconClass = (nextItem) ? $(aInputs[i+1]).parent('.mini-icon')[0].className : 'mini-icon';
                parentIcon.className = '';
                $(parentIcon).addClass( nextParentIconClass );
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

   
    

    $(window).resize(function(){
        //Update quiz dimensions 
        //quizwidth = $('.container').width() - 40;
        
        adjustWidth();
        adjustHeight();
        // quizwidth = $('.boxed').width() - 40;
        // quizheight = $('.boxed').height() - 40;
        // $('.moveable').css({width: quizwidth, height: quizheight});
    })

    function initArrows(){
        $('#arrow1, #arrow4').css({ top: '-200%', left: '-100%', width: 274});
        $('#arrow2, #arrow5').css({ top: '-200%', left: '200%', width: 315});
        $('#arrow3, #arrow6').css({ top: '-200%', left: '200%', width: 253});
    }
    //Changes the widths of the arrows to allow for responsiveness
    function flyinarrows(maintarget, arrow1, arrow2, arrow3){
        //Initialise the arrows width and positions before animation
        initArrows();
        
        //add delay to get the newest width of the target and give user a chance to view the page : min 1000s
        setTimeout(function(){
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
        },1000)

    }

    function adjustWidth(){
        $('.moveable.active').width( quizwidth ); 
    }

    function adjustHeight(  ){
        
        var quizheight = $('.moveable.active').height() + 40;
        $('.moveable.active').width( quizwidth ); 

        $('.boxed').height(quizheight);
        
        if ( quizheight > $('.questioncontainer').height() ) {
                //Game is within the playing field
                $('.boxed').height($('.questioncontainer').height());
        } else {
                //Game is outside the playing field
                if ( quizheight > $('body').height()){
                    if ($('#startline').length > 0){
                    } else {
                        $('.container').css({'height' : 'auto' });
                    }
                } else {
                    $('.container').css({'height' : '100%' });
                    $('.boxed').height( $('.container').height() - 40 );
                }
        }
        $('.moveable.active').height( $('.questioncontainer').height() - 40 ); 
    }
    

    init();

    function init(){
        if ($(".man").length > 0)               $('.man').fadeIn();
        if ($('.manright').length > 0)          $('.manright').hide();
        if ($('.insuline_tekst').length > 0)    $('.insuline_tekst').fadeIn();
        
        $('.icon1').hide();
        $('.icon2').hide();
        $('.icon3').hide();
        $('.icon4').hide();
        $('.icon5').hide();
        $('.icon6').hide();

        
        if ($('.moveable.active').attr('id') == 'q9')
            $('.manright').fadeIn();

        //ADD CUSTOM ANIMATION PAGES HERE
        if ($("#movingtarget").length > 0)
           flyinarrows($('img#maintarget'), $('#arrow1'), $('#arrow2'), $('#arrow3'));

        

        //SPECIAL BACKGROUND FOR FIRST PAGE
        if ($("#startline").length > 0){
            beginIntro();

            $('#btn_previous').fadeOut();

            setTimeout(function(){
                $('.container').css({ background: "#aa1025", width: "100%" });
                setTimeout(function(){
                    $('body').css({ background: "#aa1025" });
                    $('.container').css({width: "96%"});//, 'overflow' : 'visible' });
                    $('.boxed').width( $('.questioncontainer').width());
                    if ( $('.boxed').height() >= $('.questioncontainer').height() ) {
                        $('.container').css({'height' : 'auto' });
                    }
                }, 1000);
            }, 6200);
        
         } else if ($("#endline").length > 0){
            //do nothing
         } else {
            $('.container').css({ background: "#aa1025", width: "96%" });
            $('body').css({ background: "#aa1025" });
            $('.introcontainer').css({left: -newwidth});
            $('.questioncontainer').css({left: 0});
        }
        adjustWidth();
        adjustHeight();

    }

    
    function beginIntro(){
        
        setTimeout(function(){
            slideFeature('.intro', '.intro2', 1000);
        }, 1000);

        iconanimation();
        
        setTimeout(function(){
           $('.man').fadeIn();
           $('.insuline_tekst').fadeIn();
           slideFeature('.introcontainer', '.questioncontainer', 1000);
        }, 6000);   

    }

    

    

    function incrementPie(currentpie) {
      if (percent >= 100) percent = 0;
        currentpie.set(percent++ * 0.01);
    }

    function animatePie(){
        setTimeout(function(){
            var iCount =0;
            $('#pie1 span').hide();
            $('#pie2 span').hide();
            
            var animateFirstPie = setInterval(function(){
                iCount++;
                incrementPie(pie);
                if (iCount > 77){
                    $('#pie1 span').fadeIn();
                    iCount = 0;
                    percent= 0;
                    clearTimeout(animateFirstPie);
                    var animateSecondPie = setInterval(function(){
                        iCount++;
                        incrementPie(pie2);
                        if (iCount > 28){
                            iCount = 0;
                            $('#pie2 span').fadeIn();
                            clearTimeout(animateSecondPie);
                        }
                    }, 20);

                }
            }, 20);
        },1500);
    }
});


// LIBRARY
function cssTransform(degs) {
  return "rotate(" + degs + "deg) translate(0, -25%)";
}

var Pie = function(el, options, mypie) {
  options = options || {};
  options.color = options.color || "#ab0d20";
  options.backgroundColor = options.backgroundColor || "#ce102c";

  this.el = el;
  this.inner = this.el.querySelector(mypie + " .pie_inner");
  this.blocker1 = this.el.querySelector(mypie + " .pie_blocker-1");
  this.blocker2 = this.el.querySelector(mypie + " .pie_blocker-2");
  this.pieLeft = this.el.querySelector(mypie + " .pie_circle-left");
  this.pieRight = this.el.querySelector(mypie + " .pie_circle-right");

  this.pieLeft.style.backgroundColor = options.color;
  this.pieRight.style.backgroundColor = options.color;

  this.blocker1.style.backgroundColor = options.backgroundColor;
  this.blocker2.style.backgroundColor = options.backgroundColor;

  if (options.mask) {
    this.addMask();
  }
};

Pie.prototype.set = function(percentage) {
  this.percentage = percentage;
  this.degs = 360 * this.percentage;

  var degs1 = this.degs > 180 ? 180 : this.degs;
  var degs2 = this.degs > 180 ? this.degs - 180 : 0;

  this.blocker1.style.webkitTransform = cssTransform(degs1);
  this.blocker2.style.webkitTransform = cssTransform(degs2);
};

Pie.prototype.addMask = function() {
  this.inner.style.webkitMask =
    "-webkit-radial-gradient(center, #ab0d20 0%, #ab0d20 70%, transparent 71%, transparent 100%) no-repeat no-repeat 50% 50%";
};

// DEMO


