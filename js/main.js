var prodName = document.getElementById('prodName')
var prodcat = document.getElementById('prodcat')
var prodpric = document.getElementById('prodpric')
var desc = document.getElementById('desc')
var searporduct = document.getElementById('searchporduct')
var addBtn = document.getElementById('addBtn')
var alertInput = document.getElementById('alertInput')
var curentIndex;

// addBtn.onclick = function () {
//     if (prodNameValidat() == true) {
//         creatprodect()
//     }
//     else {
//         alert('enter a valied data')
//     }
// }

function editprod(index) {
    curentIndex = index;
    prodName.value = productContener[index].prodNa;
    prodcat.value = productContener[index].category;
    prodpric.value = productContener[index].price;
    desc.value = productContener[index].descr
    addBtn.innerHTML = 'updite data'
}

addBtn.onclick = function () {
    if (validInput() == true) {
        if (addBtn.innerHTML == 'Add proudect') {

            creatprodect()
        } else {
            saveProd()

        }

        localStorage.setItem('allproduct', JSON.stringify(productContener))
        desplay()
        reset()
    }

}

function saveProd() {
    var prod = {
        prodNa: prodName.value,
        category: prodcat.value,
        price: prodpric.value,
        descr: desc.value
    }

    productContener[curentIndex] = prod;
    addBtn.innerHTML = 'Add proudect'

}


function validInput() {
    if (prodName.value != '' && prodcat.value != '' && prodpric.value != '' && desc.value != '') {
        alertInput.classList.replace('d-block', 'd-none')

        return true
    } else {
        addBtn.setAttribute('disabeld', true)
        alertInput.classList.replace('d-none', 'd-block')
        return false
    }
}

if (localStorage.getItem('allproduct') == null) {
    var productContener = []
} else {
    productContener = JSON.parse(localStorage.getItem('allproduct'))
    desplay()
}

// creat 
function creatprodect() {
    var prod = {
        prodNa: prodName.value,
        category: prodcat.value,
        price: prodpric.value,
        descr: desc.value
    }
    productContener.push(prod);

    console.log(productContener);

}

//desplay

function desplay() {
    var trs = ``
    for (i = 0; i < productContener.length; i++) {
        trs += `
        <tr>
        <td>${i + 1}</td>
        <td>${productContener[i].prodNa}</td>
        <td>${productContener[i].category}</td>
        <td>${productContener[i].price}</td>
        <td>${productContener[i].descr}</td>
        <td><button class="btn btn-outline-warning" onclick="editprod(${i})"><i class="fa-solid fa-edit"></i></button></td>
        <td><button class="btn btn-outline-danger" onclick="delet(${i})"><i class="fa-solid fa-trash"></i></button></td>
    </tr>
        `
    }
    document.getElementById('tableBody').innerHTML = trs
}


// delete

function delet(index) {

    productContener.splice(index, 1)
    localStorage.setItem("allproduct", JSON.stringify(productContener))
    desplay()


}

//search

function searchProd() {
    var trs = ``
    for (i = 0; i < productContener.length; i++) {
        if (productContener[i].prodNa.includes(searchporduct.value)) {
            trs += `
            <tr>
            <td>${i + 1}</td>
            <td>${productContener[i].prodNa.replace('searporduct.value', `<mark>searporduct.value</mark>`)}</td>
            <td>${productContener[i].category}</td>
            <td>${productContener[i].price}</td>
            <td>${productContener[i].descr}</td>
            <td><button class="btn btn-outline-warning"><i class="fa-solid fa-edit"></i></button></td>
            <td><button class="btn btn-outline-danger" onclick="delet()"><i class="fa-solid fa-trash"></i></button></td>
        </tr>
            `
        }

    }

    document.getElementById('tableBody').innerHTML = trs

}

//reset

function reset() {
    prodName.value = ""
    prodcat.value = ""
    prodpric.value = ""
    desc.value = ""
}

// validetion 

function prodNameValidat() {

    var vPname = prodName.value
    var regx = /^[A-Z][a-z]{3,9}$/
    if (regx.test(vPname) == true) {
        return true
    } else {
        return false
    }
}
