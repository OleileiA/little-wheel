/**
 * Created by cyw on 16/11/19.
 */
function insertAfter(newElement,targetElement) {
  var parent = targetElement.parentNode;
  if(parent.lastChild == targetElement){
    parent.appendChild(newElement);
  }else{
    parent.insertBefore(newElement,targetElement.nextElementSibling);
  }
}