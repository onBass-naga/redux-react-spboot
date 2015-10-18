var url = location.href;
var context = url.replace(/http.?\/\/[^\/]*(\u002f.*)/g, "$1");
console.log("static url = '"+ context + "' ");
var title = $('title').text();
console.log("static at = { title == '"+ title + "' }");

console.log("static content = {");
$('input').each(function() {
//      console.log("tag:"+ this.tagName +"/ type:"+ $(this).attr("type") +"/ name:"+ $(this).attr("name") +"/ id:"+ $(this).attr("id") +"/ val:"+ $(this).val());

  var type = $(this).attr("type");
  var idName = $(this).attr("id")? $(this).attr("id"): $(this).attr("name");
  var itemName = (type === "submit" || type === "button" || type === "reset" || type === "image" || type === "file")? idName + "Button"
    : (type === "radio")? idName + "Radio"
    : (type === "checkbox")? idName + "Check"
    : (type === "hidden")? idName + "Hidden" : idName + "Box";
  console.log("    " + itemName + " { $('#" + idName + "') }")
});

$('textarea').each(function() {
  var idName = $(this).attr("id")? $(this).attr("id"): $(this).attr("name");
  var itemName = idName + "Box";
  console.log("    " + itemName + " { $('#" + idName + "') }")
});

$('select').each(function() {
  var idName = $(this).attr("id")? $(this).attr("id"): $(this).attr("name");
  var itemName = idName + "Select";
  console.log("    " + itemName + " { $('#" + idName + "') }")
});

$('button').each(function() {
  var idName = $(this).attr("id")? $(this).attr("id"): $(this).attr("name");
  var itemName = idName + "Select";
  console.log("    " + itemName + " { $('#" + idName + "') }")
});

$('a').each(function() {
  var idName = $(this).attr("id")? $(this).attr("id"): $(this).attr("name");
  var itemName = idName + "Link";
  console.log("    " + itemName + " { $('#" + idName + "') }")
});

console.log("}");