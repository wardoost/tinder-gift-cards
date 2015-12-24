// ---------------------------------------------
// INITIATION FUNCTION
// ---------------------------------------------
var init = function(){

  // Anchor links animate scroll
  $("a[href^='#']").click(function(evt) {
     evt.preventDefault(); // prevent default anchor click behavior
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
  $(".navbar-nav li a[href^='#']").click(function(event) {
      $(".navbar-collapse").collapse("hide");
    });

  $("#generateBtn").on("click", function(e) {

    var tinderUsername = $("#inputTinderUsername").val();

    generatePDF(tinderUsername);
  });
}



var generatePDF = function(tinderUsername){


  var webProfileURL = "www.tinder.com/@" + tinderUsername;


  // Get info from tinder web profile page
  $("#loadData").load(webProfileURL + " #card-container");

  var age = 20;
  var name = "Name";

  // Create PDF
  var doc = new jsPDF();

  // Set template. 
  
  
  // Add web profile URL  
  doc.setFontSize(40);
  doc.text(35, 25, webProfileURL);

// Add QR from web profile URL
  var qrcode = qr.toDataURL({ mime: "image/jpeg", value: tinderUsername, background: '#DC6639', fill: '#DC6639', foreground: '#FFFFFF' }); 
  doc.addImage(qrcode,"JPEG",15,40,40,40);

  // Download/open PDF depending on browser settings
  doc.save("TinderMe-Card-" + tinderUsername + ".pdf");
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