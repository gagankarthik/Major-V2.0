/*--------  nav ---------- */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
    }
  }

/*------------ service Model  ------------- */
const modelViews = document.querySelectorAll('.service_model'),
        modelBtn = document.querySelectorAll('.service_btn'),
        modelClose = document.querySelectorAll('.service_model-close')

let model = function(modelClick){
    modelViews[modelClick].classList.add('active-model')
}

modelBtn.forEach((mb,i)=>{
    mb.addEventListener('click',()=>{
        model(i)
    })
})

modelClose.forEach((mc,i)=>{
    mc.addEventListener('click',()=>{
        modelViews.forEach((mv)=>{
            mv.classList.remove('active-model')
        })
        
    })
})