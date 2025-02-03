const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery")
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// adit option

let editElement;
let editFlag = false;
let editID = "";

// *** event listeners ****

// submit form

form.addEventListener("submit", addItem);

// clear list

clearBtn.addEventListener("click", clearItem);

// display items onload

window.addEventListener("DOMContentLoaded", setupItems);

// *** function ****

// add item
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getItem().toString()


    if (value !== "" && !editFlag) {
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("grocery-item");
        element.innerHTML = ` <p class="title">${value}</p>
                <div class="btn-container">
                <!-- edit btn -->
                <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
                </button>
                <! -- delete btn -- >
                <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
                </button>
                </div>
            `;

        // add event listeners to both button;
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector(".edit-btn")
        editBtn.addEventListener("click", editItem);

        // append child 

        list.appendChild(element);

        // display alert

        displayAlert("item added to the list", "success");

        // show  container

        container.classList.add("show-container");

        // set  local storage

        addToLocalStorage(id, value);

        // set back  to default

        setBackToDefault();
    } else if (value !== "" && editFlag) {
        editElement.innerHTML = value;
        displayAlert("value changed", "success");

        // edit local storage

        editLocalStorage(editID, value);
        setBackToDefault();
    } else {
        displayAlert("please enter value", " danger")
    }

    }


function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    // remove alert

    setTimeout(fucntion (){
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);

    }, 1000);
}


// clear item
function clearItems(){
    const items = document.querySelectorAll(".grocery-item");
    if (items.length > 0 ) {
        items.forEach(function (item) {
            list.removeChild(item);
        });
    }
}


}