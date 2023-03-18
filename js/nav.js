 export function nav(){
    let closeT =document.querySelector(".open-close-icon");
closeT.addEventListener("click" , function(){
  closeT.style.left="0px";
  document.querySelector(".nav-tab").classList.remove("d-none")
})
}


let divRow = document.createElement("div");
divRow.classList.add("col-lg-3","clickCard");
let divCard = document.createElement("div");
divCard.classList.add("meal","position-relative","overflow-hidden","rounded-2","cursor-pointer");
divCard.setAttribute("onclick" , `getMealDetails(${allData[i].idMeal})`);
let img = document.createElement("img") ;
img.classList.add("w-100");
img.setAttribute("src" ,`${allData[i].strMealThumb}`);
img.setAttribute("alt" ,"");
img.setAttribute("srcset" ,"");
divCard.append(img);
let divLayer = document.createElement("div");
divLayer.classList.add("meal-layer","position-absolute","d-flex","align-items-center","text-black","p-2");
let header = document.createElement("h3");
header.innerHTML=`${allData[i].strMeal}`;
divLayer.append(header);
divCard.append(divLayer);
divRow.append(divCard);
console.log(divRow);




//   let tocon = responseMeal.meals[0].strTags ; 
  //   let tags = Array.from(tocon.split(","));
  //   console.log(tags)
  // for(let i  =0 ; i<tags.length ; i++){
  //   console.log(tags[i])
  // }