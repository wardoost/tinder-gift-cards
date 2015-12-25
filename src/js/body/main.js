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

  $("#generateBtn").on("click", function(e) {

    var tinderUsername = $("#inputTinderUsername").val();

    generatePDF(tinderUsername);
  });
}



var generatePDF = function(tinderUsername){

  var webProfileURL = "http://www.gotinder.com/@" + tinderUsername;

  // Get info from tinder web profile page
  $.ajax({
    url: "php/scraping_tinder.php?url=" + webProfileURL,
    type: 'get',
    dataType: 'html',
    async: false,
    success: function(data) {
      var result = jQuery.parseJSON(data)

      // Create PDF
      var doc = new jsPDF();

      var name = result.name;
      var age = result.age.replace(/&nbsp;/g, "");
      
      // Add web profile URL  
      doc.setFontSize(20);
      doc.text(20, 20, webProfileURL.replace("http://", ""));
      doc.text(20, 30, name);
      doc.text(20, 40, age);

      // Add QR from web profile URL
      var qrcode = qr.toDataURL({ mime: "image/jpeg", value: webProfileURL, background: '#FFFFFF', foreground: '#DC6639' }); 
      doc.addImage(qrcode,"JPEG",20,50,40,40);

      // Download/open PDF depending on browser settings
      doc.save("TinderMe-Card-" + tinderUsername + ".pdf");
    } 
  });
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