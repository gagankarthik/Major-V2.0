/*--------  nav ---------- */

const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector(".searchToggle"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      siderbarClose = document.querySelector(".siderbarClose");

      let getMode = localStorage.getItem("mode");
          if(getMode && getMode === "dark-mode"){
            body.classList.add("dark");
          }

// js code to toggle dark and light mode
      modeToggle.addEventListener("click" , () =>{
        modeToggle.classList.toggle("active");
        body.classList.toggle("dark");

        // js code to keep user selected mode even page refresh or file reopen
        if(!body.classList.contains("dark")){
            localStorage.setItem("mode" , "light-mode");
        }else{
            localStorage.setItem("mode" , "dark-mode");
        }
      });
 
//   js code to toggle sidebar
sidebarOpen.addEventListener("click" , () =>{
    nav.classList.add("active");
});

body.addEventListener("click" , e =>{
    let clickedElm = e.target;

    if(!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")){
        nav.classList.remove("active");
    }
});


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
/*------- Filters JS -------------*/

const linkTrends = document.querySelectorAll('.trends_item')
function activeTrends() {
    linkTrends.forEach(l => l.classList.remove('active-trends'))
    this.classList.add('active-trends')
    
}
linkTrends.forEach(l=>l.addEventListener('click',activeTrends))

/*-----------  file autosubmit ---------*/
document.getElementById("file").onchange = function() {
    document.getElementById("form").submit();
};