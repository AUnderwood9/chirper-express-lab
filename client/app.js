

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
    console.log($(event.target).parent());

     let DeleteThisId = $(event.target).parent().attr("id");
    $.ajax({
        url: 'api/chirps/' + DeleteThisId,
        type: 'DELETE',
        //alert doesnt work but code does
        success: function(result) {
            alert("worked");
        }
    });

    deleteElement($(event.target).parent());
    
    
    
}

function addChirp(usr, comment, postId=nextId){
    let parentDiv = $(`<div class="box" id=${postId}></div>`)
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
            let grandPappy = currentParent.parent();

            console.log("Fire!");

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

        // console.log(event.target);

        
        
    });
    commentToAdd.off("click", () => {
        console.log("OFF");
    })

    addNewElement(parentDiv, chirpCanvas);
    addNewElement(deleteSpan, parentDiv);
    addNewElement(usrToAdd, parentDiv);
    addNewElement(commentToAdd, parentDiv);
    nextId++;

    // commentToAdd.click(function(){
    //     let name = $(this).text();
    //     $(this).html('');
        // $('<input></input>')
        //     .attr({
        //         'type': 'text',
        //         'name': 'fname',
        //         'id': 'txt_fullname',
        //         'size': '30',
        //         'value': name
        //     })
    //         .appendTo(commentToAdd);
    //     $('#txt_fullname').focus(() => {
    //         console.log(focus);
    //     });
    //     $('#txt_fullname').blur(() => {
    //         console.log("Blurred out");
    //     });
    // });

}




function clickEventHandler(event){
    console.log("name", usrInput.val());
    console.log("comment", commentInput.val());
    // let parentDiv = $("<div></div>")
    // let deleteSpan = $("<span>X</span>");
    // let usrToAdd = $(`<p>${usrInput.val()}</p>`);
    // let commentToAdd = $(`<p>${commentInput.val()}</p>`);

    // deleteSpan.on("click", spanClickEventHandler);

    // addNewElement(parentDiv, chirpCanvas);
    // addNewElement(deleteSpan, parentDiv);
    // addNewElement(usrToAdd, parentDiv);
    // addNewElement(commentToAdd, parentDiv);

    addChirp(usrInput.val(), commentInput.val());

    $.ajax({
        url: 'api/chirps',
        type: 'POST',
        data: JSON.stringify({ usr: usrInput.val(), comment: commentInput.val() }),
        contentType: "application/json",
        success: function(result) {
            console.log(result);
        }
    });

    console.log("Click");

    usrInput.val('');
    commentInput.val('');

   
    


}

function handleAjaxData(data){
    // console.log(data);
    chirpsArr = data;
    console.log("chirpsArr", chirpsArr);
    nextId = chirpsArr.nextid;
    
    for(item in chirpsArr){
        // console.log(item);
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
            // console.log(result);
        }
    });

    // console.log("chirpsArr 2", chirpsArr);
    
   
})