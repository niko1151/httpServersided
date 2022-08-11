//alert();
function formSend() {
    document.getElementById("animalForm").submit();
}

function animalDropdown() {  
    var animalList = document.getElementById("animalList");  
    document.getElementById("animal").value = animalList.options[animalList.selectedIndex].text;  
}  