$(window).ready(function(){
//sidebar
let width = $(".leftSide").outerWidth(true)
$(".sidebar").css({left:`-${width}px`})
    $(".sidebar .rightSide .icon").click(()=>{
        let left = $(".sidebar").css("left")
        if(left == "0px"){
            let width = $(".leftSide").outerWidth(true)
            $(".sidebar").animate({left:`-${width}px`},500)
            $(".icon").html(`<i class="fa-solid fa-bars"></i>`)
            $(".nav-link").animate({top:"300px"},400)
        }
        else{
            $(".sidebar").animate({left:`0px`},500)
            $(".icon").html(`<i class="fa-solid fa-xmark"></i>`)
            $(".nav-link").animate({top:"0px"},400)
        }  
})
// display Home meals
let listMeals =[]
async function getMeals(){
    $(".landing").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let data = await response.json() 
    listMeals = data.meals
    display(listMeals)
    $(".landing").fadeOut(500)
}
getMeals()
function display(listMeals){
    let temp = ""
    listMeals.forEach((x) => {
        temp += `<div class="col-lg-3 col-md-6 col-sm-12 item" idMeal="${x.idMeal}">
        <div class="image position-relative overflow-hidden">
            <img src="${x.strMealThumb}" alt="food" class="w-100 rounded-2">
            <div class="layer rounded-2"><h4 class="px-2">${x.strMeal}</h4></div>
        </div>
    </div>`
    })
    document.getElementById("myRow").innerHTML = temp
    getId()
}
// display Categories
$("#Categories").click(()=>{
    $(".Categories").removeClass("d-none")
    $(".home").addClass("d-none")
    $(".search").addClass("d-none")
    $(".dateils").addClass("d-none")
    $(".Categories-Meals").addClass("d-none")
    $(".Area-Meals").addClass("d-none")
    $(".Area-Categories").addClass("d-none")
    $(".ingredients-Meals").addClass("d-none")
    $(".ingredients-Categories").addClass("d-none")
    $(".contact").addClass("d-none")
    $(".sidebar").animate({left:`-${width}px`},500)
    $(".icon").html(`<i class="fa-solid fa-bars"></i>`)
})
let listCategories =[]
async function getCategories(){
    $(".landing").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let data = await response.json()
    listCategories = data.categories 
    displayCategories(listCategories)
    $(".landing").fadeOut(500)
}
getCategories()
function displayCategories(listCategories){
    let temp = ""
    listCategories.forEach((x) => {
        temp += `<div class="col-lg-3 col-md-6 col-sm-12 catList" categoryName="${x.strCategory}">
        <div class="image position-relative overflow-hidden">
            <img src="${x.strCategoryThumb}" alt="food" class="w-100 rounded-2">
            <div class="layer rounded-2 text-center flex-column p-2">
              <h4>${x.strCategory}</h4>
              <p>${x.strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
    </div>`
    })
    document.getElementById("myCategories").innerHTML = temp
    getName()
}
// display Categories Meals
function getName(){
    let catLists = document.querySelectorAll(".catList")
    for(let i=0 ; i<catLists.length ; i++){
        catLists[i].addEventListener("click" ,function(){
        let Name = this.getAttribute("categoryName")
        console.log(Name);
        $(".Categories-Meals").addClass("d-none")
        $(".Categories").addClass("d-none")
        $(".home").removeClass("d-none")
        categoriesMeals(Name)
        })
    }
}
let categoriesMealsList =[]
async function categoriesMeals(category){
    $(".landing").fadeIn(500)
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let data = await response.json()
    categoriesMealsList = data.meals
    display(categoriesMealsList)
    $(".landing").fadeOut(500)
}
// display search
async function searchNameMeals(name){
    $(".landing").fadeIn(500)
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let data = await response.json()
    listMeals = data.meals
    console.log(listMeals);
    listMeals ? display(listMeals) : display([])
    $(".landing").fadeOut(500)
    
}
async function searchLetterMeals(name){
    $(".landing").fadeIn(500)
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`)
    let data = await response.json()
    listMeals = data.meals
    console.log(listMeals);
    listMeals ? display(listMeals) : display([])
    $(".landing").fadeOut(500)
}
function search(){
    let searchName = searchNameInput.value.toLowerCase()
    let searchLetter = searchLetterInput.value.toLowerCase()
    listMeals.forEach((x)=>{
        if (x.strMeal.toLowerCase().includes(searchName) == true
            || x.strMeal.toLowerCase().includes(searchLetter) == true) {
                $("#searchRow").append(display)
            }
    })
}
let searchNameInput = document.getElementById("searchNameInput")
searchNameInput.addEventListener("keyup",searchNameMeals)
let searchLetterInput = document.getElementById("searchLetterInput")
searchLetterInput.addEventListener("keyup",searchLetterMeals)
$("#Search").click(()=>{
    $(".search").removeClass("d-none")
    $(".home").addClass("d-none")
    $(".sidebar").animate({left:`-${width}px`},500)
    $(".icon").html(`<i class="fa-solid fa-bars"></i>`)
    search()
    $(".Categories").addClass("d-none")
    $(".dateils").addClass("d-none")
    $(".Categories-Meals").addClass("d-none")
    $(".Area-Meals").addClass("d-none")
    $(".Area-Categories").addClass("d-none")
    $(".ingredients-Meals").addClass("d-none")
    $(".ingredients-Categories").addClass("d-none")
    $(".contact").addClass("d-none")
})
//display Dateils
function getId(){
    let items = document.querySelectorAll(".item")
    for(let i=0 ; i<items.length ; i++){
        items[i].addEventListener("click" ,function(){
        let Id = this.getAttribute("idMeal")
        $(".dateils").removeClass("d-none")
        $(".home").addClass("d-none")
        getDateils(Id)
        })
    }
}
$("#closePage").click(()=>{
    $(".dateils").addClass("d-none")
    $(".home").removeClass("d-none")
})
let listDateils =[]
async function getDateils(id){
    $(".landing").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let data = await response.json()
    listDateils = data.meals
    displayDateils()
    $(".landing").fadeOut(500)
}
function displayDateils(){
    let temp = ""
    listDateils.forEach((x) => {
        let ingredients = ``
        for (let i = 1; i <= 20; i++) {
            if (x[`strIngredient${i}`]) {
                ingredients += `<span class="alert alert-info m-2 p-1">${x[`strMeasure${i}`]} ${x[`strIngredient${i}`]}</span>`
            }
        }
        let tags = x.strTags?.split(",")
        if (!tags) tags = []
        let tagsStr = ''
        tags.forEach((x)=>{tagsStr += `<span class="alert alert-danger m-2 p-1">${x}</span>`})
        temp += `<div class="row text-white">
        <div class="col-md-4 col-sm-12">
            <img src="${x.strMealThumb}" alt="image" class="w-100 rounded-2">
            <h3>${x.strMeal}</h3>
        </div>
        <div class="col-md-8 col-sm-12">
            <h3 class="col-6 pb-1">Instructions</h3>
            <p>${x.strInstructions}</p>
            <h4 class="fw-bold">Area : <span class="fw-normal">${x.strArea}</span></h4>
            <h4 class="py-2 fw-bold">Category : <span class="fw-normal">${x.strCategory}</span></h4>
            <h4 class="pb-3 fw-bold">Recipes : </h4>
            <div class="pb-4 d-flex g-3 flex-wrap">${ingredients}</div>
            <h4 class="pb-3 fw-bold">Tags : </h4>
            <div class="pb-4 d-flex g-3 flex-wrap">${tagsStr}</div>
            <a href="${x.strSource}" target="_blank" class="btn btn-outline-warning text-white mb-5">Source</a>
            <a href="${x.strYoutube}" target="_blank" class="btn btn-outline-danger text-white mb-5">youtube</a>
        </div>
    </div>`
    })
    document.getElementById("myDeatils").innerHTML = temp
}
//display Area
let listArea =[]
async function Area(){
    $(".landing").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let data = await response.json()
    listArea = data.meals
    displayArea()
    $(".landing").fadeOut(500)
}
Area()
function displayArea(){
    let temp = ""
    listArea.forEach((x) => {
        temp += `<div class="col-lg-3 col-md-6 col-sm-12 Area" areaName=${x.strArea}>
                <div class="rounded-2 text-center">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${x.strArea}</h3>
                </div>
                </div>`
    })
    document.getElementById("Area-Meals").innerHTML = temp
    getArea()
}
$("#Area").click(()=>{
    $(".Area-Meals").removeClass("d-none")
    $(".home").addClass("d-none")
    $(".sidebar").animate({left:`-${width}px`},500)
    $(".icon").html(`<i class="fa-solid fa-bars"></i>`)
    $(".Categories").addClass("d-none")
    $(".search").addClass("d-none")
    $(".dateils").addClass("d-none")
    $(".Categories-Meals").addClass("d-none")
    $(".Area-Categories").addClass("d-none")
    $(".ingredients-Meals").addClass("d-none")
    $(".ingredients-Categories").addClass("d-none")
    $(".contact").addClass("d-none")
})
// display Area Categories
function getArea(){
    let areaList = document.querySelectorAll(".Area")
    for(let i=0 ; i<areaList.length ; i++){
        areaList[i].addEventListener("click" ,function(){
        let Area = this.getAttribute("areaName")
        console.log(Area);
        $(".Area-Meals").addClass("d-none")
        $(".Area-Categories").addClass("d-none")
        $(".home").removeClass("d-none")
        AreaMeals(Area)
        })
    }
}
let areaMealsList =[]
async function AreaMeals(area){
    $(".landing").fadeIn(500)
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let data = await response.json()
    areaMealsList = data.meals
    console.log(data.meals);
    display(areaMealsList)
    $(".landing").fadeOut(500)
}
//display ingredients
let listIngredients =[]
async function ingredients(){
    $(".landing").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let data = await response.json()
    listIngredients = data.meals
    displayIngredients(listIngredients)
    $(".landing").fadeOut(500)
}
ingredients()
function displayIngredients(listIngredients){
    let temp = ""
    listIngredients.forEach((x) => {
        temp +=  `<div class="col-md-3 Ingredients" Ingredients=${x.strIngredient}>
                <div class="rounded-2 text-center">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${x.strIngredient}</h3>
                        <p>${x.strDescription?.split(" ").slice(0,20).join(" ")}</p>
                </div>
                </div>`
    })
    document.getElementById("ingredients-Meals").innerHTML = temp
    getIngredients()
}
$("#Ingredients").click(()=>{
    $(".ingredients-Meals").removeClass("d-none")
    $(".home").addClass("d-none")
    $(".Categories").addClass("d-none")
    $(".home").addClass("d-none")
    $(".search").addClass("d-none")
    $(".dateils").addClass("d-none")
    $(".Categories-Meals").addClass("d-none")
    $(".Area-Meals").addClass("d-none")
    $(".Area-Categories").addClass("d-none")
    $(".ingredients-Categories").addClass("d-none")
    $(".contact").addClass("d-none")
    $(".sidebar").animate({left:`-${width}px`},500)
    $(".icon").html(`<i class="fa-solid fa-bars"></i>`)
})
// display ingredients Categories
function getIngredients(){
    let ingredientsList = document.querySelectorAll(".Ingredients")
    for(let i=0 ; i<ingredientsList.length ; i++){
        ingredientsList[i].addEventListener("click" ,function(){
        let intEle = this.getAttribute("Ingredients")
        console.log(intEle);
        $(".ingredients-Meals").addClass("d-none")
        $(".ingredients-Categories").addClass("d-none")
        $(".home").removeClass("d-none")
        intEleMeals(intEle)
        })
    }
}
let ingredientsMealsList =[]
async function intEleMeals(ingredients){
    $(".landing").fadeIn(500)
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    let data = await response.json()
    ingredientsMealsList = data.meals
    console.log(data.meals);
    display(ingredientsMealsList)
    $(".landing").fadeOut(500)
}
// valid Name
$("#Contact").click(()=>{
    $(".contact").removeClass("d-none")
    $(".home").addClass("d-none")
    $(".Categories").addClass("d-none")
    $(".home").addClass("d-none")
    $(".search").addClass("d-none")
    $(".dateils").addClass("d-none")
    $(".Categories-Meals").addClass("d-none")
    $(".Area-Meals").addClass("d-none")
    $(".Area-Categories").addClass("d-none")
    $(".ingredients-Meals").addClass("d-none")
    $(".ingredients-Categories").addClass("d-none")
    $(".sidebar").animate({left:`-${width}px`},500)
    $(".icon").html(`<i class="fa-solid fa-bars"></i>`)
})
let nameInput = document.getElementById("nameInput")
let wrongName = document.getElementById("wrongName")
nameInput.addEventListener("keyup", validTrue)
function validName() {
    let reg = /^[a-zA-Z]{1,10}$/
    if (reg.test(nameInput.value) == true) {
        nameInput.classList.add("is-valid")
        nameInput.classList.remove("is-invalid")
        wrongName.classList.add("d-none")
        
        return true
    }
    else {
        nameInput.classList.add("is-invalid")
        nameInput.classList.remove("is-valid")
        wrongName.classList.remove("d-none")
        return false
    }
}
// valid Email
let emailInput = document.getElementById("emailInput")
let wrongEmail = document.getElementById("wrongEmail")
emailInput.addEventListener("keyup", validTrue)
function validEmail() {
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (reg.test(emailInput.value) == true) {
        emailInput.classList.add("is-valid")
        emailInput.classList.remove("is-invalid")
        wrongEmail.classList.add("d-none")
        return true
    }
    else {
        emailInput.classList.add("is-invalid")
        emailInput.classList.remove("is-valid")
        wrongEmail.classList.remove("d-none")
        return false
    }
}
// Valid Phone
let phoneInput = document.getElementById("phoneInput")
let wrongPhone = document.getElementById("wrongPhone")
phoneInput.addEventListener("keyup", validTrue)
function validPhone() {
    let reg = /^[0-9]{10,15}$/
    if (reg.test(phoneInput.value) == true) {
        phoneInput.classList.add("is-valid")
        phoneInput.classList.remove("is-invalid")
        wrongPhone.classList.add("d-none")
        return true
    }
    else {
        phoneInput.classList.add("is-invalid")
        phoneInput.classList.remove("is-valid")
        wrongPhone.classList.remove("d-none")
        return false
    }
}
// Valid Age
let ageInput = document.getElementById("ageInput")
let wrongAge = document.getElementById("wrongAge")
ageInput.addEventListener("keyup", validTrue)
function validAge() {
    let reg = /^[1-9]{1,2}$/
    if (reg.test(ageInput.value) == true) {
        ageInput.classList.add("is-valid")
        ageInput.classList.remove("is-invalid")
        wrongAge.classList.add("d-none")
        return true
    }
    else {
        ageInput.classList.add("is-invalid")
        ageInput.classList.remove("is-valid")
        wrongAge.classList.remove("d-none")
        return false
    }
}
// Valid Password
let passInput = document.getElementById("passInput")
let wrongPass = document.getElementById("wrongPass")
passInput.addEventListener("keyup", validTrue)
function validPass() {
    let reg = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
    if (reg.test(passInput.value) == true) {
        passInput.classList.add("is-valid")
        passInput.classList.remove("is-invalid")
        wrongPass.classList.add("d-none")
        return true
    }
    else {
        passInput.classList.add("is-invalid")
        passInput.classList.remove("is-valid")
        wrongPass.classList.remove("d-none")
        return false
    }
}
// Valid Repassword
let repassInput = document.getElementById("repassInput")
let wrongRepass = document.getElementById("wrongRepass")
repassInput.addEventListener("keyup", validTrue)
function validRepass() {
    if (passInput.value == repassInput.value) {
        repassInput.classList.add("is-valid")
        repassInput.classList.remove("is-invalid")
        wrongRepass.classList.add("d-none")
        return true
    }
    else {
        repassInput.classList.add("is-invalid")
        repassInput.classList.remove("is-valid")
        wrongRepass.classList.remove("d-none")
        return false
    }
}
// Valid Button
function validTrue(){
    let Btn = document.getElementById("submitBtn")
    if(validName() && validEmail() && validPhone() && validAge() && validPass() && validRepass()){
        Btn.removeAttribute("disabled")
    }
    else{
        Btn.setAttribute("disabled",true)
    }
}
})