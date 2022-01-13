/*Burger menu*/
/*const burgerControl = document.getElementById("menu-burger-control")
const menuContainer = document.getElementById("container-top-menu-inner-left")

burgerControl.addEventListener(onClick, e => {

})*/

/*Scarf shop images*/

const sellObjectModel = document.getElementById("sell-object-model")
const DOM_main = document.querySelector("main")

for (let i = 0; i<11; i++) {
    const clone = sellObjectModel.cloneNode(true)
    clone.id = `sell-object-${i}`
    DOM_main.append(clone)
}

/*wishlist heart*/
document.addEventListener("click", (e) => {
    let hearthElement = e.target

    if (hearthElement && hearthElement.classList.contains("wishlist-hearth")) {
        
        if (hearthElement.nodeName === "use") {hearthElement = hearthElement.parentNode}
        
        if (hearthElement && hearthElement.classList.contains("on")) {
            hearthElement.firstChild.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '../styles/media/scalable/icons.svg#sprite-navigation-wishlist-off')
            hearthElement.classList.toggle("on")
        } else {
            hearthElement.firstChild.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '../styles/media/scalable/icons.svg#sprite-navigation-wishlist-on')
            hearthElement.classList.toggle("on")
        }
    }
})