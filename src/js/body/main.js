// ---------------------------------------------
// GLOBAL VARIABLES
// ---------------------------------------------
var template;
var profileDefault;
var lines = [
  "I like you.",
  "Save water, shower with a friend!",
  "I can picture you and me together.",
  "My doctor says I'm lacking Vitamin U.",
  "If I were a cat I'd spend all 9 lives with you.",
  "Are you a thief because you just stole my heart?",
  "How was heaven when you left?",
  "Do I know you?",
  "Want to dance?",
  "You're pretty.",
  "Where do you hide your wings?",
  "You don't need keys to drive me crazy.",
  "You're so fine I must be dreaming.",
  "If beauty were time, you'd be eternity.",
  "I super like you.",
  "I will swipe you right",
  "I would swipe you right"
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

  // Preload PDF template
  imgDataURL("img/template.jpg", templateLoaded);
  imgDataURL("img/profileDefault.jpg", profileDefaultLoaded);

  // Generate PDF button
  $('#generateBtn').on('click', function(e) {
    e.preventDefault();
    getUserData($('#inputTinderUsername').val());
  });
}

var getUserData = function(tinderUsername){

  var webProfileURL = 'http://www.gotinder.com/@' + tinderUsername;

  // Get info from tinder web profile page
  $.ajax({
    url: 'php/scraping_tinder.php?url=' + webProfileURL,
    type: 'get',
    dataType: 'html',
    async: false,
    success: function(data) {
      var result = jQuery.parseJSON(data);

      if(result.name){
        var name = result.name;  
      }
      if(result.age){
        var age = result.age.replace(/&nbsp;/g, '');
      }
      if(result.imgdata){
        var imgData = 'data:image/jpeg;base64,' + result.imgdata;  
      }

      // Generate PDF with user info
      generatePDF(webProfileURL, tinderUsername, name, imgData);
    },
    error: function(){
      // Generate PDF with only the web profile link
      generatePDF(webProfileURL, tinderUsername);
    }
  });
}

var generatePDF = function(url, username, name, imgData){
  // Create PDF
  var doc = new jsPDF('p', 'mm', [297, 210]);

  // Add user data 
  doc.addFont('GothamRoundedMedium', 'Gotham Rounded', 'medium');
  doc.setFont('Gotham Rounded');
  doc.setFontSize(10);
  doc.text(20, 20, url.replace('http://', ''));
  doc.text(20, 30, name || username);
  doc.text(20, 40, lines[Math.floor(Math.random() * lines.length)]);

  // Add QR from web profile URL
  var qrcode = qr.toDataURL({ mime: 'image/jpeg', value: url, background: '#FFFFFF', foreground: '#34333F' }); 

  for (var x=5; x < 180; x = x + 90) {
    for (var y=5; y < 210; y = y + 60) {
      doc.addImage(template,'JPEG',x,y,107,79); // Add template
      doc.addImage(imgData || profileDefault, 'JPEG', x+68, y+21, 17, 17);  // Add web profile image
      doc.addImage(qrcode,'JPEG', x+67, y+38, 19, 19); // Add QR-code
      }
  }

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
var profileDefaultLoaded = function(imgDataURL){
  profileDefault = imgDataURL;
}

// ---------------------------------------------
// INITIATION ON PAGE LOAD
// ---------------------------------------------
window.onload = init;