let usrInput;
let commentInput;
let inputBtn;
let chirpCanvas;
let chirpsArr = {};
let nextId = 0;

let addNewElement = (elementString, nodeToAppendTo = document.body) => {
    nodeToAppendTo.append(elementString);
};

let deleteElement = (elementToModify) => {
    $(elementToModify).remove();
 
};;

let removeEventHandler = (elementToModify, eventToRemove) => {
    $(elementToModify).off(eventToRemove);
};

function spanClickEventHandler(event){
     let DeleteThisId = $(event.target).parent().attr("id");
    $.ajax({
        url: 'api/chirps/' + DeleteThisId,
        type: 'DELETE',
        
        success: function(result) {
            console.log("Deleted");
        }
    });

    deleteElement($(event.target).parent());

}

function addChirp(usr, comment, postId=nextId){
    console.log(postId);
    let parentDiv = $(`<div id=${postId}></div>`)
    let deleteSpan = $("<span>X</span>");
    let usrToAdd = $(`<p id="usr-name">${usr}</p>`);
    let commentToAdd = $(`<p>${comment}</p>`);

    deleteSpan.on("click", spanClickEventHandler);
    commentToAdd.on("click", function(event){

        let name = $(this).text();
        let editBox = $('<input></input>');
        
        $(editBox).on("blur", function(event){

            let newText = $(event.target).val();
            let newPTag = $(`<p>${newText}</p>`);
            let currentParent = $(event.target).parent();

            $.ajax({
                url: 'api/chirps/' + postId,
                type: 'PUT',
                data: JSON.stringify({ usr: usr, comment: $(event.target).val()  }),
                contentType: "application/json",
                success: function(result) {
                    console.log(result);
                }
            });

            removeEventHandler($(event.target), "blur");
            deleteElement($(event.target));
            currentParent.text(newText);
        })
        .attr({
            'type': 'text',
            'name': 'fname',
            'id': 'txt_fullname',
            'size': '30',
            'value': name
        });

        $(this).html(editBox);
        
        $(editBox).focus();
        
    });
    commentToAdd.off("click", () => {
        console.log("OFF");
    })

    addNewElement(parentDiv, chirpCanvas);
    addNewElement(deleteSpan, parentDiv);
    addNewElement(usrToAdd, parentDiv);
    addNewElement(commentToAdd, parentDiv);
    nextId++;

}


function clickEventHandler(event){
    // console.log("name", usrInput.val());
    // console.log("comment", commentInput.val());

    $.ajax({
        url: 'api/chirps',
        type: 'POST',
        data: JSON.stringify({ usr: usrInput.val(), comment: commentInput.val() }),
        contentType: "application/json",
        success: function(result) {
            // console.log(result.idAdded);    
            // console.log("name", usrInput.val());
            // console.log("comment", commentInput.val());
            addChirp(result.chirpAdded.usr, result.chirpAdded.comment, result.idAdded);
        }
    });

    

    console.log("Click");

    usrInput.val('');
    commentInput.val('');

}

function handleAjaxData(data){
    chirpsArr = data;
    console.log("chirpsArr", chirpsArr);
    nextId = chirpsArr.nextid;
    
    for(item in chirpsArr){
        if(!isNaN(item)){
            console.log(chirpsArr[item].usr);
            console.log(chirpsArr[item].comment);
            addChirp(chirpsArr[item].usr, chirpsArr[item].comment, item);
        }
    }
    console.log(chirpsArr.nextid);
}

$(document).ready(() => {
    usrInput = $("#usr-input");
    commentInput = $("#comment-input");
    inputBtn = $("#btn-input");
    chirpCanvas = $("#chirps-canvas");

    inputBtn.on("click", clickEventHandler);

    $.ajax({
        url: 'api/chirps',
        type: 'GET',
        success: function(result) {
            handleAjaxData(result);
        }
    });
    
   
})