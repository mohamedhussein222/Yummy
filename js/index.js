

let closeT =document.querySelector(".open-close-icon");
closeT.addEventListener("click" , function(){
  closeT.style.left="0px";
  document.querySelector(".nav-tab").classList.remove("d-none")
})
// ===================first===========================
let allData = [];
 async function getData(namefood){
 let req = new XMLHttpRequest();
 req.open('get' , `https://www.themealdb.com/api/json/v1/1/search.php?s=${namefood}`);
 req.send();
 req.addEventListener("readystatechange" ,  async function(){
  if(req.readyState==4 && req.status==200){
   allData = JSON.parse(req.response).meals ; 
    console.log(allData)
  await display() ; 
  }
 })
}
getData("")
function display(){
  let cartona ="";
  return new Promise (function(){
    for(let i = 0 ; i<allData.length ;  i++){
      cartona+=`
    <div class="col-lg-3 clickCard">
<div onclick="getMealDetails(${allData[i].idMeal})" class="meal  position-relative overflow-hidden rounded-2 cursor-pointer">
    <img class="w-100" src="${allData[i].strMealThumb}" alt="" srcset="">
    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
        <h3>${allData[i].strMeal}</h3>
    </div>
</div>
</div>
    
    `
    document.querySelector(".tt").innerHTML=cartona ; 

    
    }
    let cards = document.querySelectorAll(".meal");
    for(let i =0 ; i<cards.length ; i++){
      cards[i].addEventListener("click",function(){
        document.querySelector(".tt").classList.add("d-none");
        document.querySelector(".con-id").classList.remove("d-none");
      })
    }
     });
}

let responseMeal =[];
async function getMealDetails(id){
  let sendId =  await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` )
   responseMeal = await sendId.json();

  await displayId()
       
 
}
 
function displayId (){
  return new Promise (function(){
    let dispalyCartonaId ="";
    dispalyCartonaId+= `
<div class="col-md-4">
        <img class="w-100 rounded-3" src='${responseMeal.meals[0].strMealThumb}'/>
            <h2 class="c-id">${responseMeal.meals[0].strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2 class="c-id">Instructions</h2>
        <p class="c-id">${responseMeal.meals[0].strInstructions}</p>
        <h3 class="c-id"><span class="fw-bolder c-id">Area : </span>${responseMeal.meals[0].strArea}</h3>
        <h3 class="c-id"><span class="fw-bolder c-id ">Category : </span>${responseMeal.meals[0].strCategory}</h3>
        <h3 class="c-id">Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            <li class="alert alert-info m-2 p-1">${responseMeal.meals[0].strMeasure1} ${responseMeal.meals[0].strIngredient1} </li>
            <li class="alert alert-info m-2 p-1">${responseMeal.meals[0].strMeasure2} ${responseMeal.meals[0].strIngredient2}</li>
            <li class="alert alert-info m-2 p-1">${responseMeal.meals[0].strMeasure3} ${responseMeal.meals[0].strIngredient3}</li>
            <li class="alert alert-info m-2 p-1">${responseMeal.meals[0].strMeasure4} ${responseMeal.meals[0].strIngredient4}</li>
            <li class="alert alert-info m-2 p-1">${responseMeal.meals[0].strMeasure5} ${responseMeal.meals[0].strIngredient5}</li>
            <li class="alert alert-info m-2 p-1">${responseMeal.meals[0].strMeasure6} ${responseMeal.meals[0].strIngredient6}</li>
            <li class="alert alert-info m-2 p-1">${responseMeal.meals[0].strMeasure7} ${responseMeal.meals[0].strIngredient7}</li>
        </ul>

        <h3 class="c-id">Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
      
                    
       
              
        </ul>

        <a target="_blank" href="${responseMeal.meals[0].strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${responseMeal.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
    </div>
    `
   
  document.querySelector("#rowData").innerHTML=dispalyCartonaId;
  });
}




// // =======================================================================================================================
var Category=[];
async function getDataCategory(){
  let reqCategory =new XMLHttpRequest(); 
reqCategory.open("get" , `https://www.themealdb.com/api/json/v1/1/categories.php`);
reqCategory.send();
reqCategory.addEventListener("readystatechange" ,async function(){
    if(reqCategory.readyState==4 && reqCategory.status==200){
      Category = JSON.parse(reqCategory.response).categories; 
   await displayCategory() ;
       
    }
})
}

function displayCategory (){
  return new Promise(function (){
    let counter ="";
    for (let i = 0 ; i<Category.length ; i++){
       counter += `
       <div class="col-md-3" >
       <div  class="meal mealcate position-relative overflow-hidden rounded-2 cursor-pointer">
           <img class="w-100" src="${Category[i].strCategoryThumb}" alt="" srcset="">
           <div  class="meal-layer layer position-absolute text-center text-black p-2">
               <h3>${Category[i].strCategory}</h3>
               <p>${Category[i].strCategoryDescription}</p>
           </div>
       </div>
</div>
       
       `
      
    }

   
    document.querySelector(".tt").innerHTML=counter ;
    let mealcate = document.querySelectorAll(".mealcate");
    for(let i = 0 ; i<mealcate.length ; i++){
      mealcate[i].addEventListener("click", function(){
        getData(Category[i].strCategory)
      })
    }


  //   let layer = document.querySelectorAll(".layer");
    
  //   for(let i = 0 ; i<layer.length ; i++){
  //     layer[i].addEventListener("click", function(){
  //       getData(Category[i].strCategory)
  //     })
  //   }
  });



}

document.querySelector(".Categories").addEventListener("click",function(){
  getDataCategory();
})

// =====================================Area=================================================================================================
var Area=[];
async function getDataArea(){
  let reqArea =new XMLHttpRequest(); 
reqArea.open("get" , `https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
reqArea.send();
reqArea.addEventListener("readystatechange" ,async function(){
    if(reqArea.readyState==4 && reqArea.status==200){
      Area =  JSON.parse(reqArea.response).meals; 
      console.log(Area)
   await displayArea() ;
   
    }
})
}

function displayArea(){
  return new Promise(function(){
    let carArea = "";
    for(let i = 0  ; i<Area.length ; i++){
     carArea += `
     <div class="col-md-3">
                <div  class="rounded-2 text-center mealArea cursor-pointer">
                        <i class="fa-solid fa-house-laptop  text-light fa-4x"></i>
                        <h3 class="text-light">${Area[i].strArea}</h3>
                </div>
        </div>
     
     `
    }
    document.querySelector(".tt").innerHTML=carArea ; 
    let mealArea = document.querySelectorAll(".mealArea");
    
    for(let i = 0 ; i<mealArea.length ; i++){
      mealArea[i].addEventListener("click", function(){
        getMealsArea(Area[i].strArea);
      })
    }
  });
}


// ======================================================================

// async function getMealsArea(Area){
//   let Mealsreq =new XMLHttpRequest(); 
// Mealsreq.open("get" , `https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`);
// Mealsreq.send();
// Mealsreq.addEventListener("readystatechange" ,async function(){
//     if(Mealsreq.readyState==4 && Mealsreq.status==200){
//      MealsArea = JSON.parse(Mealsreq.response).meals ; 
//    console.log(MealsArea)
//   await displayMealsArea();
  
//     }
// })
// }



let idResponse = [];
 async  function getMealsArea(Area){
   let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`, {
     method:'get' ,
    
   }
   )
idResponse = await req.json(); 
   console.log(idResponse.meals)
  await displayMealsArea();
   }
function displayMealsArea(){
  return new Promise(function(){
    let poll =""
    for(let i =0 ; i<idResponse.length ; i++){
      poll `
      
      <div class="col-lg-3 clickCard">
      <div onclick="getMealDetails(${idResponse[i].idMeal})" class="meal  position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${idResponse[i].strMealThumb}" alt="" srcset="">
          <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
              <h3>${idResponse[i].strMeal}</h3>
          </div>
      </div>
      </div>
      
      `
      
    }
    
    document.querySelector(".tt").innerHTML=poll ; 
  });
  
}
document.querySelector(".Area").addEventListener("click" , function(){
  getDataArea()
  
})
