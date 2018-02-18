let usrInput;
let commentInput;
let inputBtn;
let chirpCanvas;

let addNewElement = (elementString, nodeToAppendTo = document.body) => {
    nodeToAppendTo.append(elementString);
};

let deleteElement = (elementToModify) => {
    $(elementToModify).remove();
};

let removeEventHandler = (elementToModify, eventToRemove) => {
    $(elementToModify).off(eventToRemove);
};









// $.ajax({
//     url: 'api/chirps',
//     type: 'POST',
//     success: function(result) {
//         //Do something 
//     }
// });

// $.ajax({
//     url: 'api/chirps',
//     type: 'GET',
//     success: function(result) {
//         //Do something 
//     }
// });
// // not sure witch is better
// $.ajax({
//     url: 'api/chirps',
//     type: 'DELETE',
//     success: function(result) {
//         //Do something 
//     }
// });








// let clickEventHandler = (event) => {
//     console.log("name", nameInput.value());
//     console.log("comment", commentInput.value());

// };

function spanClickEventHandler(event){
    console.log($(event.target).parent().parent());
    deleteElement($(event.target).parent().parent());
}

function clickEventHandler(event){
    console.log("name", usrInput.val());
    console.log("comment", commentInput.val());
    let parentDiv = $("<div></div>")
    let deleteSpan = $("<span>X</span>");
    let usrToAdd = $(`<p>${usrInput.val()}</p>`);
    let commentToAdd = $(`<p>${commentInput.val()}</p>`);

    deleteSpan.on("click", spanClickEventHandler);

    addNewElement(parentDiv, chirpCanvas);
    addNewElement(deleteSpan, parentDiv);
    addNewElement(usrToAdd, parentDiv);
    addNewElement(commentToAdd, parentDiv);
}

$(document).ready(() => {
    usrInput = $("#usr-input");
    commentInput = $("#comment-input");
    inputBtn = $("#btn-input");
    chirpCanvas = $("#chirps-canvas");

    inputBtn.on("click", clickEventHandler);
})