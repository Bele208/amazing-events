//////////////--------Este archivo JS lo creé porque no tomaba las categorias en los otros JS---------/////////////7
let categories = ["Food Fair","Museum","Costume Party","Music Concert","Race","Book Exchange","Cinema"];

let category = document.getElementById("form-category")
categories.forEach(item =>{
    category.innerHTML += `
    <div id="content-cat">
        <label>
            <input type="checkbox" name="category1" id="category1">
            <span>${item}</span>
        </label>
    </div>`
})
