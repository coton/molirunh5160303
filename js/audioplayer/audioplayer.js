$(document).ready(function() {
    
  function parseTime(timeInSecs) {
    var minutes = Math.floor(timeInSecs / 60);
    
    var seconds = Math.floor(timeInSecs % 60);
    if (seconds < 10) {
      seconds = "0"+seconds;
    }
   	return minutes + ':' + seconds;
    
  }
  
  var song = new Audio('../../media/audio/happynewyear.mp3');

  $("#seek").bind("change", function() {
          song.currentTime = $(this).val();
          $("#seek").attr("max", song.duration);
    
          $("#left-time").html(parseTime(song.currentTime));
    			$("#right-time").html(parseTime('-'+song.duration-song.currentTime));
    
      });

  song.addEventListener('timeupdate',function (){
      curtime = parseInt(song.currentTime, 10);
      $("#seek").val(curtime + 1);
    
      $("#left-time").html(parseTime(song.currentTime));
			$("#right-time").html('-'+parseTime(song.duration-song.currentTime));
      });

  

  $('#pp').click(function() {
    // check state
    if ($(this).hasClass('playing')) {
      <!-- pause it -->
        song.pause();
        $(this).removeClass('playing');
    }
    else {
      song.play();

      $(this).addClass('playing');
    }
  });

});