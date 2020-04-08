
window.onload = afterload;

var num_sets = 2
var i = 0;
var new_el = ""
function afterload(){
    for(i=0;i<num_sets*6;i++){
        let j = i%6 + 1
        new_el = `<figure class="gallery__item gallery__item--${j}"><img src="img/image-${i}.jpg" alt="Gallery image ${j}" class="gallery__img"></figure>`;
        
        console.log(i);
document.getElementById("gallery2").innerHTML +=  new_el;
              
        }
}
