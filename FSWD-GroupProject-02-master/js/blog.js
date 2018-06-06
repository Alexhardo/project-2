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
const coursesRef = dbRef.child('courses');




// add delete edit Blog 


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
            editIconUI.addEventListener("click", editBlogButtonClicked)

            // delete icon
            let deleteIconUI = document.createElement("span");
            deleteIconUI.class = "delete-blog";
            deleteIconUI.innerHTML = " ☓";
            deleteIconUI.setAttribute("blogid", key);
            deleteIconUI.addEventListener("click", deleteBlogButtonClicked)

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
addBlogBtnUI.addEventListener("click", addBlogBtnClicked);



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


    blogsRef.push(newBlog);
    // document.getElementById("addblogform").reset();
}


// --------------------------
// DELETE
// --------------------------
function deleteBlogButtonClicked(e) {

    e.stopPropagation();

    var blogid = e.target.getAttribute("blogid");

    const blogRef = dbRef.child('blogs/' + blogid);

    blogRef.remove();

}


// --------------------------
// EDIT
// --------------------------
function editBlogButtonClicked(e) {

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




// // add edit delete course section


readCourseData();


// --------------------------
// READ
// --------------------------
function readCourseData() {

    const courseListUI = document.getElementById("course-list");

    coursesRef.on("value", snap => {

        courseListUI.innerHTML = ""

        snap.forEach(childSnap => {

            let key = childSnap.key,
                value = childSnap.val()

            let $li = document.createElement("li");

            // edit icon
            let editIconUI = document.createElement("span");
            editIconUI.class = "edit-course";
            editIconUI.innerHTML = " ✎";
            editIconUI.setAttribute("courseid", key);
            editIconUI.addEventListener("click", editCourseButtonClicked)

            // delete icon
            let deleteIconUI = document.createElement("span");
            deleteIconUI.class = "delete-course";
            deleteIconUI.innerHTML = " ☓";
            deleteIconUI.setAttribute("courseid", key);
            deleteIconUI.addEventListener("click", deleteCourseButtonClicked)

            $li.innerHTML = value.name;
            $li.append(editIconUI);
            $li.append(deleteIconUI);

            $li.setAttribute("course-key", key);
            $li.addEventListener("click", courseClicked)
            courseListUI.append($li);

        });


    })

}






// function readCourseData() {

//     const courseListUI = document.getElementById("course-list");

//     coursesRef.on("value", snap => {

//         courseListUI.innerHTML = ""

//         snap.forEach(childSnap => {

//             let key = childSnap.key,
//                 value = childSnap.val()

//             let $li = document.createElement("li");

//             // edit icon
//             let editIconUI = document.createElement("span");
//             editIconUI.class = "edit-course";
//             editIconUI.innerHTML = " ✎";
//             editIconUI.setAttribute("courseid", key);
//             editIconUI.addEventListener("click", editCourseButtonClicked)

//             // delete icon
//             let deleteIconUI = document.createElement("span");
//             deleteIconUI.class = "delete-course";
//             deleteIconUI.innerHTML = " ☓";
//             deleteIconUI.setAttribute("courseid", key);
//             deleteIconUI.addEventListener("click", deleteCourseButtonClicked)

//             $li.innerHTML = value.name;
//             $li.append(editIconUI);
//             $li.append(deleteIconUI);

//             $li.setAttribute("course-key", key);
//             $li.addEventListener("click", courseClicked)
//             courseListUI.append($li);

//         });


//     })

// }



function courseClicked(e) {


    var courseid = e.target.getAttribute("course-key");

    const courseRef = dbRef.child('courses/' + courseid);
    const courseDetailUI = document.getElementById("course-detail");

    courseRef.on("value", snap => {

        courseDetailUI.innerHTML = ""

        snap.forEach(childSnap => {
            var $p = document.createElement("p");
            $p.innerHTML = childSnap.key + " - " + childSnap.val();
            courseDetailUI.append($p);
        })

    });


}





// --------------------------
// ADD
// --------------------------

const addCourseBtnUI = document.getElementById("add-course-btn");
addCourseBtnUI.addEventListener("click", addCourseBtnClicked)



function addCourseBtnClicked() {

    const coursesRef = dbRef.child('courses');

    const addCourseInputsUI = document.getElementsByClassName("course-input");

    // this object will hold the new course information
    let newCourse = {};

    // loop through View to get the data for the model 
    for (let i = 0, len = addCourseInputsUI.length; i < len; i++) {

        let key = addCourseInputsUI[i].getAttribute('data-key');
        let value = addCourseInputsUI[i].value;
        newCourse[key] = value;
    }
    coursesRef.push(newCourse);
     document.getElementById("addcourseform").reset();
}

    

// --------------------------
// DELETE
// --------------------------
function deleteCourseButtonClicked(e) {

    e.stopPropagation();

    var courseid = e.target.getAttribute("courseid");

    const courseRef = dbRef.child('courses/' + courseid);

    courseRef.remove();

}


// --------------------------
// EDIT
// --------------------------
function editCourseButtonClicked(e) {

    document.getElementById('edit-course-module').style.display = "block";

    //set course id to the hidden input field
    document.querySelector(".edit-courseid").value = e.target.getAttribute("courseid");

    const courseRef = dbRef.child('courses/' + e.target.getAttribute("courseid"));

    // set data to the course field
    const editCourseInputsUI = document.querySelectorAll(".edit-course-input");


    courseRef.on("value", snap => {

        for (var i = 0, len = editCourseInputsUI.length; i < len; i++) {

            var key = editCourseInputsUI[i].getAttribute("data-key");
            editCourseInputsUI[i].value = snap.val()[key];
        }

    });




    const saveBtn = document.querySelector("#edit-course-btn");
    saveBtn.addEventListener("click", saveCourseBtnClicked)
}


function saveCourseBtnClicked(e) {

    const courseid = document.querySelector(".edit-courseid").value;
    const courseRef = dbRef.child('courses/' + courseid);

    var editedCourseObject = {}

    const editCourseInputsUI = document.querySelectorAll(".edit-course-input");

    editCourseInputsUI.forEach(function(textField) {
        let key = textField.getAttribute("data-key");
        let value = textField.value;
        editedCourseObject[textField.getAttribute("data-key")] = textField.value
    });



    courseRef.update(editedCourseObject);

    document.getElementById('edit-course-module').style.display = "none";


}