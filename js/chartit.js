var _LONG_WAIT    = 4000;
var _SHORT_WAIT   = 1000;
var _PDF_COCA     = 'pdf/cocacola.pdf';
var _PDF_CHARTIT1 = 'pdf/chartit1.pdf';
var _PDF_CHARTIT2 = 'pdf/chartit2.pdf';

$(document).ready(function () {

  loadAnimations();

  $('select').material_select();

});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var $image = $('<img />').attr('src', e.target.result);
      $('#preview').html($image);
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
  $('body').on('click', '#get-started', function(event) {
    $('#upload').fadeIn();
    $('html,body').animate({scrollTop: $('#upload').offset().top}, 1000);
  })
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
    $('input[name="q1"]').attr('disabled', 'disabled');
    $(this).removeAttr('disabled')
    gotoNextSection($(this), _SHORT_WAIT);
  });
  $('body').on('change', 'input[name="q2"]', function(event) {
    $('input[name="q2"]').attr('disabled', 'disabled');
    $(this).removeAttr('disabled')
    gotoNextSection($(this), _SHORT_WAIT);
  });
  $('body').on('change', 'input[name="q3"]', function(event) {
    $('input[name="q3"]').attr('disabled', 'disabled');
    $(this).removeAttr('disabled')
    gotoNextSection($(this), _LONG_WAIT);
    prepareDownload();
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
    $('html,body').animate({scrollTop: $nextSection.offset().top}, 1000);
  }, timeToWait);
}

/**
 * h4ck :o
 */
function prepareDownload() {
  // Nom de l'image
  var filename = $('#file').val();
  var answer1  = $('input[name="q1"]:checked').val();
  var $link    = $('#results a');
  var href     = _PDF_CHARTIT2;
  if (filename.indexOf('oca') !== -1) {
    href = _PDF_COCA;
  } else if (answer1 == 'a14') {
    href = _PDF_CHARTIT1;
  }
  $link.attr('href', href);
}


function loader(show) {
  if (show) {
    $('#progress').show();
  } else {
    $('#progress').hide();
  }
}