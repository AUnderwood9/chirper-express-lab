let nameInput;
let commentInput;
let inputBtn;

let addNewElement = (elementString, nodeToAppendTo = document.body) => {
    nodeToAppendTo.append(elementString);
};

let deleteElement = (elementToModify) => {
    $(elementToModify).remove();
};

let removeEventHandler = (elementToModify, eventToRemove) => {
    $(elementToModify).off(eventToRemove);
};

// let clickEventHandler = (event) => {
//     console.log("name", nameInput.value());
//     console.log("comment", commentInput.value());

// };

function clickEventHandler(event){
    console.log("name", nameInput.val());
    console.log("comment", commentInput.val());
}

$(document).ready(() => {
    nameInput = $("#name-input");
    commentInput = $("#comment-input");
    inputBtn = $("#btn-input");
    // console.log("Lets go!");
    // console.log(nameInput, commentInput, inputBtn);

    inputBtn.on("click", clickEventHandler);
})