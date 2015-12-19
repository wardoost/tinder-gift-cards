// ---------------------------------------------
// INITIATION FUNCTION
// ---------------------------------------------
var init = function(){

  // Anchor links animate scroll
  $("a[href^='#']").click(function(evt) {
     evt.preventDefault(); // prevent default anchor click behavior
     var hash = this.hash; // store hash
     // animate scroll
     $('html, body').animate({
         scrollTop: $(hash).offset().top
       }, 300, function(){
         // when done, add hash to url (default click behaviour)
         window.location.hash = hash;
       });
  });
  // Collapse menu on anchor links in navbar
  $(".navbar-nav li a[href^='#']").click(function(event) {
      $(".navbar-collapse").collapse('hide');
    });

  $("#generateBtn").on('click', function(e) {
    console.log("Base64test: " + getBase64("../img/header.jpg"));
    generatePDF();
  });
}



var generatePDF = function(){

  console.log("-- PDF --");
  // You'll need to make your image into a Data URL
  // Use http://dataurl.net/#dataurlmaker
  //var imgData = getBase64Image("http://images.gotinder.com/52e418a804580e204b00033c/640x640_e73edb75-10a3-4112-8ca5-fee6d332a722.jpg")
  var doc = new jsPDF();
  doc.setFontSize(40);
  doc.text(35, 25, "Paranyan loves jsPDF");
  //doc.addImage(imgData, 'JPEG', 15, 40, 180, 160);

  console.log("-- QR -- ");
  var qr = new QRCode("test", {
    text: "http://www.driesdepoorter.be",
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

  var dataUrl = qr.toDataURL();

  doc.addImage(dataUrl);
  doc.save('test.pdf');
}

var getBase64 = function (url) {
  var img = document.getElementById("profilePic");
  //img.setAttribute('crossOrigin', 'anonymous');
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.width;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png"); //This line of code will throw exception
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}


// ---------------------------------------------
// INITIATION ON PAGE LOAD
// ---------------------------------------------
window.onload = init;