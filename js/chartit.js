var _LONG_WAIT  = 4000;
var _SHORT_WAIT = 1000;
$(document).ready(function () {

  loadAnimations();

  $('select').material_select();

});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var $image = $('<img />').attr('src', event.target.result);
      $('#preview').append($image);
      // Must wait for image to load in DOM, not just load from FileReader
      $image.on('load', function() {
        $('#preview').show();
        gotoNextSection($('#file'), _SHORT_WAIT);
      });
    }
    reader.readAsDataURL(input.files[0]);
    return true;
  } else {
    return false;
  }
}


function loadAnimations() {
  // Goto questions
  $('body').on('change', '#file', function(event) {
    if (!readURL(this)) {
      return false;
    }
  });
  $('body').on('change', '#domain select', function(event) {
    gotoNextSection($(this), _SHORT_WAIT);
  });
  $('body').on('change', 'input[name="q1"]', function(event) {
    gotoNextSection($(this), _SHORT_WAIT);
  });
  $('body').on('change', 'input[name="q2"]', function(event) {
    gotoNextSection($(this), _SHORT_WAIT);
    // loader(true);
    // setTimeout(function() {
    //   loader(false);
    //   $('#q3').fadeIn();
    //   $('body').animate({scrollTop: $('#q3').offset().top}, 1000);
    //   }, _SHORT_WAIT
    // );
  });
  $('body').on('change', 'input[name="q3"]', function(event) {
    gotoNextSection($(this), _LONG_WAIT);
  });
}

function gotoNextSection($formElement, timeToWait, callback) {
  loader(true);
  var $nextSection = $formElement.closest('section').next('section');
  setTimeout(function() {
    loader(false);
    if (typeof callback != 'undefined') {
      callback();
    }
    $nextSection.fadeIn();
    $('body').animate({scrollTop: $nextSection.offset().top}, 1000);
  }, timeToWait);
}



function loader(show) {
  if (show) {
    $('#progress').show();
  } else {
    $('#progress').hide();
  }
}