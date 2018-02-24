//Defining Global Variables.
var functionSwitch = false;
var spinSwitch = 'sessionSpin';
var identifier = 'Session';
var time;
var sessionVal;
var breakVal;

//Waiting till the document load.
$(document).ready(function() { 
    
  //Arrows Event Handler
  $('#upArr1').on('click',function(){
    var valS = parseInt($('#spanS').text()); 
    if (valS < 60){
      valS += 1;
      $('#spanS').html(('0' + valS).slice(-2));
    }
  });
  $('#downArr1').on('click',function(){
    var valS = parseInt($('#spanS').text()); 
    if (valS > 1){
      valS -= 1;
      $('#spanS').html(('0' + valS).slice(-2));
    }
  });
  $('#upArr2').on('click',function(){
    var valB = parseInt($('#spanB').text()); 
    if (valB < 60){
      valB += 1;
      $('#spanB').html(('0' + valB).slice(-2));
    }
  });
  $('#downArr2').on('click',function(){
    var valB = parseInt($('#spanB').text()); 
    if (valB > 1){
      valB -= 1;
      $('#spanB').html(('0' + valB).slice(-2));
    }
  }); 
  

  // Reset Button Event Handler
  $('#reset').on('click',function(){
    
    $('.clockFont').css('font-size','75px');
    
    //Setting spinSwitch in order to always spin session on button click.
    if (spinSwitch != 'sessionSpin'){
     spinSwitch = 'sessionSpin'; 
    }    
    
    if ($(this).val() == 'Set'){
      $(this).val('Reset');      
    }
    sessionVal = Math.floor(parseInt($('#spanS').text()) * 60);
    breakVal = Math.floor(parseInt($('#spanB').text()) * 60);
     
    //Switching global var functionSwitch value to stop previous timeout call.
    if (functionSwitch == false){
      functionSwitch = true;
      identifier = 'Session';
    }else if (functionSwitch == true){
      functionSwitch = false;
      identifier = 'Session';
    }
    
    //callback of countdown function.
    countDown(sessionVal,identifier);
  });   
  
});


//Count down Function.
function countDown(val,ident){
    console.log(spinSwitch);
  //Setting animation play state to toggle spinning animation between break and session.
    if (ident == 'Break' && spinSwitch == 'breakSpin' ){
      $('.spinBreak').css('animation-play-state', 'running'); 
      $('.spinSession').css('animation-play-state', 'paused');
      $('#spanType').css('text-shadow','0 0 0');
    }else if (ident == 'Session' && spinSwitch == 'sessionSpin' ){
      $('.spinSession').css('animation-play-state', 'running');
      $('.spinBreak').css('animation-play-state', 'paused');
      $('#spanType').css('text-shadow','0 0 0');
    }   
  
  //Initial time stamp setup before the countdown.
  $('#spanT').text(timecalc(val));
  $('#spanType').text(ident); 
  //Calling timeloop functions based on the global var functionSwitch value.
  if (functionSwitch == false){
      timeLoopFalse(val,ident);
    }else if (functionSwitch == true){
      timeLoopTrue(val,ident);
    }  
}

//Function to obtain the session value.
function timecalc(val){
  var sec = Math.floor(val%60);
  var min = Math.floor(val/60);
  time = ('0' + min).slice(-2) + ':' + ('0' + sec).slice(-2);
  return time;
}

//False timeLoop callback based on the global var functionSwitch value.
function timeLoopFalse(val,ident){
    console.log(functionSwitch);
    console.log(ident);
    setTimeout((function(){    
      if (val > 0 && functionSwitch == false){
          val -= 1;
          $('#spanT').text(timecalc(val)); 
          timeLoopFalse(val,ident);
      }
    }),1000)
    if (val == 0 && ident == 'Session'){
      ident = 'Break';
      spinSwitch = 'breakSpin'
      document.getElementById('myAudio').play();      
      countDown(breakVal,ident);
    }else if (val == 0 && ident == 'Break'){
      ident = 'Session';
      spinSwitch = 'sessionSpin'
      document.getElementById('myAudio').play();
      countDown(sessionVal,ident);
    }
}

//True timeLoop callback based on the global var functionSwitch value.
function timeLoopTrue(val,ident){
      console.log(functionSwitch);
      setTimeout((function(){            
        if (val > 0 && functionSwitch == true){
           val -= 1;
           $('#spanT').text(timecalc(val));
           timeLoopTrue(val,ident);
        }
      }),1000)
      if (val == 0 && ident == 'Session'){
          ident = 'Break';
          spinSwitch = 'breakSpin'
          document.getElementById('myAudio').play();
          setTimeout((countDown(breakVal,ident)),1000);
      }else if (val == 0 && ident == 'Break'){
          ident = 'Session';
          spinSwitch = 'sessionSpin'
          document.getElementById('myAudio').play();
          setTimeout((countDown(sessionVal,ident)),1000);
    }
}