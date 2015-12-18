// ---------------------------------------------
// INITIATION FUNCTION
// ---------------------------------------------
var init = function(){

  // Anchor links animate scroll
  $("a[href^='#']").on('click', function(e) {
    console.log("anchor link")

     // prevent default anchor click behavior
     e.preventDefault();

     // store hash
     var hash = this.hash;

     // animate
     $('html, body').animate({
         scrollTop: $(hash).offset().top
       }, 300, function(){

         // when done, add hash to url (default click behaviour)
         window.location.hash = hash;
       });

  });

  $("#generate").on('click', function(e) {
    console.log(getBase64Image("../img/header.jpg"));
    generatePDF();
  });
}



var generatePDF = function(){

 

  // You'll need to make your image into a Data URL
  // Use http://dataurl.net/#dataurlmaker
  console.log("-- PDF -- ");
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

var getBase64Image = function (url) {
    var img = new Image();

    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width =this.width;
        canvas.height =this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        var dataURL = canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, "");

        return dataURL;
    };

    img.src = url;
}


// ---------------------------------------------
// INITIATION ON PAGE LOAD
// ---------------------------------------------
window.onload = init;