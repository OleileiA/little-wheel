/**
 * Created by cyw on 2016/11/22.
 */


/*
*
* */
function deepCopy(child,parent) {

  var child = child || {};
  for(var i in parent){
    if(typeof parent[i] === 'object'){
      child[i] = (parent[i].constructor === Array)?[]:{};
      deepCopy(child[i],parent[i]);
    }else{
      child[i] = parent[i];
    }
  }
  return child;
}