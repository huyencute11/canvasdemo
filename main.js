const $ =document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


var canvas = new fabric.Canvas('canvas');
// lắng nghe sự kiện đăng tải file
$('#inp').addEventListener("change", function (e) {
  //lấy thông tin tập tin được đăng tải
  var file = e.target.files[0];

   // Khởi tạo đối tượng FileReader
  var reader = new FileReader();

 
  // Lắng nghe quá trình đọc tập tin hoàn thành
  reader.onload = function (f) {
    // Lấy chuỗi Binary thông tin hình ảnh
    var data = f.target.result;                    
    fabric.Image.fromURL(data, function (img) {
      var oImg = img.set({left: 40, top: 40, angle: 0}).scale(0.9);
      canvas.add(oImg).renderAll();
      var a = canvas.setActiveObject(oImg);
      var dataURL = canvas.toDataURL({format: 'png', quality: 0.8});
    });
  };
  //đọc nội dung tệp dưới dạng URl đại diện cho dữ liệu của tệp ảnh
  reader.readAsDataURL(file);
});

/**
 * khi nhập vào thẻ text thì nó sẽ xuất hiện trong canvas
 */
var textValue;
var inputText = $('input[type="text"]')
inputText.addEventListener('input', function(e){
  inputValue = e.target.value;
  var text1 = new fabric.IText(inputValue,{ left: 100, top: 100 })
  canvas.add(text1)
})

/**
 * nhấn vào 1 đối tượng cần xóa thì sẽ nhấn move xóa đối tượng
 */
var movebtn = $('#move')
movebtn.addEventListener('click',e => {
  canvas.remove(canvas.getActiveObject())
})

// Save 
var savebtn = $('#save')
savebtn.addEventListener('click',saveImage)

function saveImage() {
  canvas.getElement().toBlob(function(blob) {
    saveAs(blob, "lisaloveme image.png");
});
}

var resetbtn = $('#reset')
resetbtn.addEventListener('click', function(){
  canvas.clear()

  var json = canvas.toJSON();
  
  
  
  canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));
})
 

 




