// !IMPORTANT: REPLACE WITH YOUR OWN CONFIG OBJECT BELOW


// Initialize Firebase
var config = {
    apiKey: "AIzaSyAoCr9FaRcRmmP5uZfg1f_11FlNG64U4wU",
    authDomain: "bim-2018.firebaseapp.com",
    databaseURL: "https://bim-2018.firebaseio.com",
    projectId: "bim-2018",
    storageBucket: "bim-2018.appspot.com",
    messagingSenderId: "1073285445984"
};



firebase.initializeApp(config);

// Firebase Database Reference and the child
const dbRef = firebase.database().ref();
const blogsRef = dbRef.child('blogs');


readBlogData();


// --------------------------
// READ
// --------------------------
function readBlogData() {

    const blogListUI = document.getElementById("blog-list");

    blogsRef.on("value", snap => {

        blogListUI.innerHTML = ""

        snap.forEach(childSnap => {

            let key = childSnap.key,
                value = childSnap.val()

            let $li = document.createElement("li");

            // edit icon
            let editIconUI = document.createElement("span");
            editIconUI.class = "edit-blog";
            editIconUI.innerHTML = " ✎";
            editIconUI.setAttribute("blogid", key);
            editIconUI.addEventListener("click", editButtonClicked)

            // delete icon
            let deleteIconUI = document.createElement("span");
            deleteIconUI.class = "delete-blog";
            deleteIconUI.innerHTML = " ☓";
            deleteIconUI.setAttribute("blogid", key);
            deleteIconUI.addEventListener("click", deleteButtonClicked)

            $li.innerHTML = value.name;
            $li.append(editIconUI);
            $li.append(deleteIconUI);

            $li.setAttribute("blog-key", key);
            $li.addEventListener("click", blogClicked)
            blogListUI.append($li);

        });


    })

}



function blogClicked(e) {


    var blogid = e.target.getAttribute("blog-key");

    const blogRef = dbRef.child('blogs/' + blogid);
    const blogDetailUI = document.getElementById("blog-detail");

    blogRef.on("value", snap => {

        blogDetailUI.innerHTML = ""

        snap.forEach(childSnap => {
            var $p = document.createElement("p");
            $p.innerHTML = childSnap.key + " - " + childSnap.val();
            blogDetailUI.append($p);
        })

    });


}





// --------------------------
// ADD
// --------------------------

const addBlogBtnUI = document.getElementById("add-blog-btn");
addBlogBtnUI.addEventListener("click", addBlogBtnClicked)



function addBlogBtnClicked() {

    const blogsRef = dbRef.child('blogs');

    const addBlogInputsUI = document.getElementsByClassName("blog-input");

    // this object will hold the new blog information
    let newBlog = {};

    // loop through View to get the data for the model 
    for (let i = 0, len = addBlogInputsUI.length; i < len; i++) {

        let key = addBlogInputsUI[i].getAttribute('data-key');
        let value = addBlogInputsUI[i].value;
        newBlog[key] = value;
    }

    blogsRef.push(newBlog)


   



}


// --------------------------
// DELETE
// --------------------------
function deleteButtonClicked(e) {

    e.stopPropagation();

    var blogid = e.target.getAttribute("blogid");

    const blogRef = dbRef.child('blogs/' + blogid);

    blogRef.remove();

}


// --------------------------
// EDIT
// --------------------------
function editButtonClicked(e) {

    document.getElementById('edit-blog-module').style.display = "block";

    //set blog id to the hidden input field
    document.querySelector(".edit-blogid").value = e.target.getAttribute("blogid");

    const blogRef = dbRef.child('blogs/' + e.target.getAttribute("blogid"));

    // set data to the blog field
    const editBlogInputsUI = document.querySelectorAll(".edit-blog-input");


    blogRef.on("value", snap => {

        for (var i = 0, len = editBlogInputsUI.length; i < len; i++) {

            var key = editBlogInputsUI[i].getAttribute("data-key");
            editBlogInputsUI[i].value = snap.val()[key];
        }

    });




    const saveBtn = document.querySelector("#edit-blog-btn");
    saveBtn.addEventListener("click", saveBlogBtnClicked)
}


function saveBlogBtnClicked(e) {

    const blogid = document.querySelector(".edit-blogid").value;
    const blogRef = dbRef.child('blogs/' + blogid);

    var editedBlogObject = {}

    const editBlogInputsUI = document.querySelectorAll(".edit-blog-input");

    editBlogInputsUI.forEach(function(textField) {
        let key = textField.getAttribute("data-key");
        let value = textField.value;
        editedBlogObject[textField.getAttribute("data-key")] = textField.value
    });



    blogRef.update(editedBlogObject);

    document.getElementById('edit-blog-module').style.display = "none";


}