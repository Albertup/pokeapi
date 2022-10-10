// /** Scroll */
// window.addEventListener('scroll', function () {
//     addNewScrollPokemon();
//     updateBackToTopVisibility();
// });

// /**add new scroll pokemon when bottom is reached */
// function addNewScrollPokemon() {
//     if (window.scrollY + 100 >= document.documentElement.scrollHeight - document.documentElement.clientHeight) {
//         increaseMaxIndex(30);
//         updatePokemonList();
//     };
// };

/**make back to top button visible */
var scrollTop = document.getElementById("b-scrollTop");

window.onscroll = function(){
    scrollfunction()
};
function scrollfunction(){

    if( document.body.scrollTop > 500 || document.documentElement.scrollTop > 500){
        scrollTop.style.display = "block";
    } else {
        scrollTop.style.display = "none";
    }
}

scrollTop.addEventListener("click", function(){
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
    })
})

function backToTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
};


