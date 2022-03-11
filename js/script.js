let menuLinks = [ //an array of objects
    { text: "about", href: "/about" },
    {
      text: "catalog",
      href: "#",
      subLinks: [ //child object of parent object menuLinks
        { text: "all", href: "/catalog/all" },
        { text: "top selling", href: "/catalog/top" },
        { text: "search", href: "/catalog/search" },
      ],
    },
    {
      text: "orders",
      href: "#",
      subLinks: [
        { text: "new", href: "/orders/new" },
        { text: "pending", href: "/orders/pending" },
        { text: "history", href: "/orders/history" },
      ],
    },
    {
      text: "account",
      href: "#",
      subLinks: [
        { text: "profile", href: "/account/profile" },
        { text: "sign out", href: "/account/signout" },
      ],
    },
  ]
//Task 1
let mainEl = document.querySelector('main')
mainEl.style.backgroundColor = 'var(--main-bg)'
mainEl.innerHTML = `<h1>SEI Rocks!</h1>`
mainEl.classList.add('flex-ctr')

// console.log(mainEl)

//Task 2
let topMenuEl = document.querySelector('#top-menu')
topMenuEl.style.height = '100%'
topMenuEl.style.backgroundColor = `var(--top-menu-bg)`
topMenuEl.classList.add(`flex-around`)

// console.log(topMenuEl)

//Task 3
for(let link of menuLinks){
    let aTag = document.createElement('a')
    aTag.setAttribute('href',link.href)
    aTag.textContent = link.text
    topMenuEl.appendChild(aTag)
    console.log(link)
}
// console.log(topMenuEl)
//-----------------------------------------------------------------
//DOM Menu Lab Part II
//Task 4
let subMenuId = document.querySelector(`#sub-menu`)
subMenuId.style.height = `100%`
subMenuId.style.backgroundColor = `var(--sub-menu-bg)`
subMenuId.classList.add(`flex-around`)
subMenuId.style.position = `absolute` // Element positioned relative to the closest positioned ancestor that also has position absolute property. No elements have this set then the element will be position relative to window
subMenuId.style.top = '0px'

console.log(topMenuEl)
console.log(subMenuId)

let topMenuLinks = document.querySelectorAll('a')
let showingSubMenu = false;
let aTag = document.querySelector('a')
console.log(aTag.tagName) //Elements have a JavaScript tagName. console.log(element.tagName) prints the tagName to the console
console.log(topMenuEl.tagName)

topMenuEl.addEventListener( `click`,(e)=> {
  e.preventDefault();
  // console.log(e)  
  if(e.target.tagName !== aTag.tagName){    
    return
  }else{ //a link was clicked
    console.log(e.target)    
    // e.target.classList.remove(`active`)        
    e.target.classList.add('active')
    for(let i = 0; i < topMenuLinks.length; i++){ 
      // console.log(topMenuLinks[i]) //view changes to all links after clicking a link
      if(topMenuLinks[i] !== e.target){ //remove class `active` for all other link elements except for the one that is clicked
        topMenuLinks[i].classList.remove(`active`)        
      }               
    }
    console.log(e.target) //view above changes to only the clicked element  
    let arraySubMenuLinks;
    if(e.target.textContent === 'about'){
      showingSubMenu = false;
      // console.log(showingSubMenu)
      mainEl.innerHTML = null
      mainEl.innerHTML = `<h1>about</h1>`  
      // e.target.classList.remove(`active`)   
    }else{     
      showingSubMenu = true;
      // console.log(showingSubMenu)
      menuLinks.forEach(linkObj =>{
        if(e.target.textContent === linkObj.text){
          arraySubMenuLinks = linkObj.subLinks
        }
      })
    }        
    buildSubMenu(arraySubMenuLinks)
    return              
    }    
})

subMenuId.addEventListener(`click`,(e)=>{ //Element.onclick() doesn't delegate the event to child elements
  e.preventDefault()
  if(e.target.tagName == aTag.tagName){
    console.log(e.target)
    showingSubMenu = false;
    subMenuId.style.top = `0px`
    for(i = 0; i < topMenuLinks.length; i++){
      topMenuLinks[i].classList.remove('active')
    }
    mainEl.innerHTML = null  
    let h1Main = document.createElement('h1')
    h1Main.textContent = e.target.textContent
    mainEl.appendChild(h1Main)
  }else{
    return
  }
})

function buildSubMenu(subMenuLinksToCreate){
  subMenuId.innerHTML = null  
  let subAtag;
  if(showingSubMenu){
    subMenuLinksToCreate.forEach(linkObj =>{
    subAtag = document.createElement(`a`)
    subAtag.setAttribute(`href`,linkObj.href)
    subAtag.textContent = linkObj.text
    subMenuId.appendChild(subAtag)
    })    
    subMenuId.style.top = `100%`
  }else{
    subMenuId.style.top = `0px`
  }
}