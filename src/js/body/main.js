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
    //console.log("Base64test: " + getBase64("../img/header.jpg"));
   
  });
}



var generatePDF = function(tinderUsername){

  // You'll need to make your image into a Data URL
  // Use http://dataurl.net/#dataurlmaker
  var doc = new jsPDF();
  
  doc.setFontSize(40);
  doc.text(35, 25, "www.tinder.com/@" + tinderUsername);

  var dataUrl = qr.toDataURL({ mime: "image/jpeg", value: tinderUsername }); 
  doc.addImage(dataUrl,"JPEG",15,40,40,40);

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