// ---------------------------------------------
// INITIATION FUNCTION
// ---------------------------------------------
var init = function(){

  // Anchor links animate scroll
  $("a[href^='#']").click(function(e) {
     e.preventDefault(); // prevent default anchor click behavior
     var hash = this.hash; // store hash
     // animate scroll
     $("html, body").animate({
         scrollTop: $(hash).offset().top
       }, 300, function(){
         // when done, add hash to url (default click behaviour)
         window.location.hash = hash;
       });
  });
  // Collapse menu on anchor links in navbar
  $(".navbar-nav li a[href^='#']").click(function(e) {
      $(".navbar-collapse").collapse("hide");
    });

  // Generate PDF button
  $("#generateBtn").on("click", function(e) {
    getUserData($("#inputTinderUsername").val());
  });
}

var getUserData = function(tinderUsername){

  var webProfileURL = "http://www.gotinder.com/@" + tinderUsername;

  // Get info from tinder web profile page
  $.ajax({
    url: "php/scraping_tinder.php?url=" + webProfileURL,
    type: 'get',
    dataType: 'html',
    async: false,
    success: function(data) {
      var result = jQuery.parseJSON(data);

      var name = result.name;
      var age = result.age.replace(/&nbsp;/g, "");
      var img = result.img.replace(/&#x2F;/g, "/");

      //$("#profilePic").attr("src", img);
      //$("#profile").fadeIn(300);
      generatePDF(webProfileURL, tinderUsername, name, age, img);
    },
    error: function(){
      generateAltPDF(webProfileURL);
    }
  });
}

var generatePDF = function(url, username, name, age, img){
  // Create PDF
  var doc = new jsPDF();

  // Add user data 
  doc.setFontSize(20);
  doc.text(20, 20, url.replace("http://", ""));
  doc.text(20, 30, name);
  doc.text(20, 40, age);

  // Add QR from web profile URL
  var qrcode = qr.toDataURL({ mime: "image/jpeg", value: url, background: '#FFFFFF', foreground: '#DC6639' }); 
  doc.addImage(qrcode,"JPEG",20,50,40,40);

  // Download/open PDF depending on browser settings
  doc.save("TinderMe-Card-" + username + ".pdf");
}

var generateAltPDF = function(url){
  // Create PDF
  var doc = new jsPDF();

  // Add user data
  doc.setFontSize(20);
  doc.text(20, 20, url.replace("http://", ""));

  // Add QR from web profile URL
  var qrcode = qr.toDataURL({ mime: "image/jpeg", value: url, background: '#FFFFFF', foreground: '#DC6639' }); 
  doc.addImage(qrcode,"JPEG",20,50,40,40);

  // Download/open PDF depending on browser settings
  doc.save("TinderMe-Card-" + username + ".pdf");
}

var getBase64 = function (url) {
  var img = document.getElementById("profilePic");
  //img.setAttribute("crossOrigin", "anonymous");
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.width;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");  //This line of code will throw exception
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

// ---------------------------------------------
// INITIATION ON PAGE LOAD
// ---------------------------------------------
window.onload = init;