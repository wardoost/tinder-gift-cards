// ---------------------------------------------
// GLOBAL VARIABLES
// ---------------------------------------------
var template;
var logo;
var profileDefault;

// <27 characters. 
var lines = [
  "I like you.",
  "Do I know you?",
  "Want to dance?",
  "You're pretty.",
  "I super like you.",
  "I will swipe you right",
  "I would swipe you right",
  "You are the one",
  "You have some nice moves", 
  "let's have a drink",
  "I don't know you",
  "You're so beautiful",
  "I don't think we've met",
  "I'm intoxicated by you",
  "Can I borrow a kiss?",
  "Be unique, swipe right",
  "Is it hot in here?",
  "Roll, baby.You are on fire",
  "You're my favorite weakness",
  "You are cool",
  "I'm happy to meet you",
  "Nice to see you",
  "I superlike you",
  "I swipe you up",
  "Let's have a Tinder chat",
  "I think I like you",
  "Finally I found a Girl like you",
  "Believe in love at first swipe", 
  "Nice to meet ya",
  "I swipe you right"
  ];

// ---------------------------------------------
// FUNCTIONS
// ---------------------------------------------
var init = function(){

  // Anchor links animate scroll
  $('a[href^="#"]').click(function(e) {
     e.preventDefault();
     var hash = this.hash;

     // animate scroll
     $('html, body').animate({
         scrollTop: $(hash).offset().top
       }, 300, function(){
         // when done, add hash to url (default click behaviour)
         window.location.hash = hash;
       });
  });

  // Preload PDF images
  imgDataURL('img/template.jpg', templateLoaded);
  imgDataURL('img/logo.jpg', logoLoaded);
  imgDataURL('img/profileDefault.jpg', profileDefaultLoaded);

  // Generate PDF button
  $('#generateBtn').click(function(e) {
    e.preventDefault();
    getUserData($('#inputTinderUsername').val());
    ga('send', 'event', 'form', 'generate', 'TinderMe Cards');
  });

  // Resize header section
  resizeHandler();
  $(window).resize(resizeHandler);
  // Scroll fade ins
  scrollHandler();
  $(window).scroll(scrollHandler);
}

var getUserData = function(tinderUsername){

  var webProfileURL = 'http://www.gotinder.com/@' + tinderUsername;

  // Get info from tinder web profile page
  $.ajax({
    url: 'http://www.driesdepoorter.be/tindermecards/php/scraping_tinder.php?url=' + webProfileURL,
    type: 'get',
    dataType: 'html',
    async: false,
    success: function(data) {
      var result = jQuery.parseJSON(data);

      if(result.name){
        var name = removeSpecialChars(result.name);
      }
      if(result.age){
        var age = result.age.replace(/&nbsp;/g, '');
      }
      if(result.imgdata){
        var imgData = 'data:image/jpeg;base64,' + result.imgdata;  
      }

      if(result.work){
        var work = removeSpecialChars(result.work);
      }

      // Generate PDF with user info
      generatePDF(webProfileURL, tinderUsername, name, imgData, work);
    },
    error: function(){
      // Generate PDF with only the web profile link
      generatePDF(webProfileURL, tinderUsername);
    }
  });
}

var generatePDF = function(url, username, name, imgData, work){
  // Create PDF
  var doc = new jsPDF('p', 'mm', [297, 210]);


  // Add QR from web profile URL
  var qrcode = qr.toDataURL({ mime: 'image/jpeg', value: url, background: '#FFFFFF', foreground: '#34333F', level: 'M' }); 

  // Setup Font
  //doc.addFont('ProximaNovaSoft-Bold', 'Proxima Nova Soft Bold', 'Bold'); // library can not embed fonts :(
  doc.addFont('Verdana-Bold','Verdana Bold','Regular');
  doc.setFont('Verdana Bold');
  doc.setFontStyle('Regular');
  doc.setTextColor(52,51,63);


  for (var x=3; x < 180; x = x + 95) {
    for (var y=3; y < 210; y = y + 65) {
      doc.addImage(template,'JPEG',x,y,107,79); // Add template
      doc.addImage(imgData || profileDefault, 'JPEG', x+68, y+21, 17, 17);  // Add web profile image
      doc.addImage(qrcode,'JPEG', x+67, y+40, 19, 19); // Add QR-code

      //add userdata
      doc.setFontSize(14);
      doc.text(x+23, y+25, name || username);
      //doc.text(x+23, y+35, lines[Math.floor(Math.random() * lines.length)]);
      doc.setFontSize(8);
      doc.text(x+23, y+29, work || '') ;
      doc.setFontSize(6);
      doc.text(x+25, y+54.5, url.replace('http://', ''));
      }
  }

  // Add logo and website
  doc.addImage(logo,'JPEG', 153, 282, 50, 11); 
  doc.text(20, 290, 'www.tinderme.cards');

  // Download/open PDF depending on browser settings 
  doc.save('TinderMe-Card-' + username + '.pdf');
}

var imgDataURL = function(url, callback){
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function() {
    var reader  = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.send();
}

var templateLoaded = function(imgDataURL){
  template = imgDataURL;
}
var logoLoaded = function(imgDataURL){
  logo = imgDataURL;
}
var profileDefaultLoaded = function(imgDataURL){
  profileDefault = imgDataURL;
}

var resizeHandler = function(){
  var padding = parseInt($('header').css("padding"));
  var headerRatio = (1697 - 100) / 1131; // Header image ratio
  var windowRatio = $(window).width() / ($(window).height() - 2 * padding);
  if(headerRatio < windowRatio){
    $('header').height($(window).height() - 2 * padding);
  }else{
    $('header').height(1131 / (1697 - 100) * $(window).width());
  }

  // Trigger scrollHandler again
  scrollHandler();
}

var scrollHandler = function(){
  // Fade in on scoll
  $('.scrollFadeIn').each( function(i){

      var bottomOfObject = $(this).offset().top + $(this).outerHeight();
      var bottomOfWindow = $(window).scrollTop() + $(window).height();

      var percDown = $(window).scrollTop() / $('header').outerHeight();
      if($(window).width() >= 768){
        if( bottomOfWindow > bottomOfObject - $(this).outerHeight() * 0.75 ){
          $(this).addClass('visible');
        }
      } else {
        if( bottomOfWindow > bottomOfObject - $(this).outerHeight()){
          $(this).addClass('visible');
        }
      }
  });

  // Position cards and logo
  var percDown = $(window).scrollTop() / $('header').outerHeight();
  if($(window).width() >= 768){
    var newBottom = 15 + percDown * 0.4 * 100;
  }else{
    var newBottom = 60 + percDown * 0.1 * 100;
  }
  $('header #cards').css('transform', 'translateY(' + newBottom + '%)');

  // Navbar state toggle
  if($(window).scrollTop() > $('header').outerHeight() - $('#nav').outerHeight()){
    $('#nav').addClass('scrolling');
    $('#nav #logo').attr('src', 'img/logo-small.svg');
  } else {
    $('#nav.scrolling').removeClass('scrolling');
    $('#nav #logo').attr('src', 'img/logo.svg');
  }

  // Toggle background color
  if($(window).scrollTop() > $('header').height() / 5){
    $('body').addClass('bg');
  }else{
    $('body.bg').removeClass('bg');
  }
}

var removeSpecialChars = function(str) {
  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç";
  var to   = "aaaaeeeeiiiioooouuuunc";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(
                new RegExp(from.charAt(i), 'g'),
                to.charAt(i)
            );
  }
  return str;
}


// ---------------------------------------------
// INITIATION ON PAGE LOAD
// ---------------------------------------------
window.onload = init;