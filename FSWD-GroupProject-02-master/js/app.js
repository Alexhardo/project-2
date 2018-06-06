









// // !IMPORTANT: REPLACE WITH YOUR OWN CONFIG OBJECT BELOW


// // Initialize Firebase
// var config = {
//     apiKey: "AIzaSyAoCr9FaRcRmmP5uZfg1f_11FlNG64U4wU",
//     authDomain: "bim-2018.firebaseapp.com",
//     databaseURL: "https://bim-2018.firebaseio.com",
//     projectId: "bim-2018",
//     storageBucket: "bim-2018.appspot.com",
//     messagingSenderId: "1073285445984"
// };



// firebase.initializeApp(config);

// // Firebase Database Reference and the child
// const dbRef = firebase.database().ref();
// const coursesRef = dbRef.child('booking');
// const coursesRef2 = dbRef.child('courses');
// readCourseData();
// // readCourseData2();
// // READ courses
// // --------------------------
// function readCourseData2() {
//     let courseListUI = document.getElementById("booking-list");
//     coursesRef2.on("value", snap => {
//         courseListUI.innerHTML = ""
//         snap.forEach(childSnap => {
//             let key = childSnap.key,
//                 value = childSnap.val()
//             courseListUI += document.createElement("p");
//             courseListUI.innerHTML += value.name;
//             // document.getElementById("output").innerHTML += value.start;
//             // document.getElementById("output").innerHTML += value.end;
//             // document.getElementById("output").innerHTML += value.price;
//             // document.getElementById("output").innerHTML += value.description;
//         });
//     })
// }







// // --------------------------
// // READ booking
// // --------------------------
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
//             editIconUI.addEventListener("click", editButtonClicked)



//             // delete icon
//             let deleteIconUI = document.createElement("span");
//             deleteIconUI.class = "delete-course";
//             deleteIconUI.innerHTML = " ☓";
//             deleteIconUI.setAttribute("courseid", key);
//             deleteIconUI.addEventListener("click", deleteButtonClicked)

//             $li.innerHTML = value.name;
//             $li.innerHTML = value.fname + " " + value.lname;
//             $li.append(editIconUI);
//             $li.append(deleteIconUI);

//             $li.setAttribute("course-key", key);
//             $li.addEventListener("click", courseClicked)
//             courseListUI.append($li);

//         });


//     })

// }



// function courseClicked(e) {


//     var courseid = e.target.getAttribute("course-key");

//     const courseRef = dbRef.child('booking/' + courseid);
//     const courseDetailUI = document.getElementById("course-detail");

//     courseRef.on("value", snap => {

//         courseDetailUI.innerHTML = ""

//         snap.forEach(childSnap => {
//             var $p = document.createElement("p");
//             $p.innerHTML = childSnap.key + " : " + childSnap.val();
//             courseDetailUI.append($p);
//         })

//     });


// }





// // --------------------------
// // ADD
// // --------------------------

// const addCourseBtnUI = document.getElementById("add-course-btn");
// addCourseBtnUI.addEventListener("click", addCourseBtnClicked)



// function addCourseBtnClicked() {

//     const coursesRef = dbRef.child('booking');

//     const addCourseInputsUI = document.getElementsByClassName("course-input");

//     // this object will hold the new course information
//     let newCourse = {};

//     // loop through View to get the data for the model 
//     for (let i = 0, len = addCourseInputsUI.length; i < len; i++) {

//         let key = addCourseInputsUI[i].getAttribute('data-key');
//         let value = addCourseInputsUI[i].value;
//         newCourse[key] = value;
//     }

//     coursesRef.push(newCourse)


//     // console.log(myPro)



// }


// // --------------------------
// // DELETE
// // --------------------------
// function deleteButtonClicked(e) {

//     e.stopPropagation();

//     var courseid = e.target.getAttribute("courseid");

//     const courseRef = dbRef.child('booking/' + courseid);

//     courseRef.remove();

// }


// // --------------------------
// // EDIT
// // --------------------------
// function editButtonClicked(e) {

//     document.getElementById('edit-course-module').style.display = "block";

//     //set course id to the hidden input field
//     document.querySelector(".edit-courseid").value = e.target.getAttribute("courseid");

//     const courseRef = dbRef.child('booking/' + e.target.getAttribute("courseid"));

//     // set data to the course field
//     const editCourseInputsUI = document.querySelectorAll(".edit-course-input");


//     courseRef.on("value", snap => {

//         for (var i = 0, len = editCourseInputsUI.length; i < len; i++) {

//             var key = editCourseInputsUI[i].getAttribute("data-key");
//             editCourseInputsUI[i].value = snap.val()[key];
//         }

//     });




//     const saveBtn = document.querySelector("#edit-course-btn");
//     saveBtn.addEventListener("click", saveCourseBtnClicked)
// }


// function saveCourseBtnClicked(e) {

//     const courseid = document.querySelector(".edit-courseid").value;
//     const courseRef = dbRef.child('booking/' + courseid);

//     var editedCourseObject = {}

//     const editCourseInputsUI = document.querySelectorAll(".edit-course-input");

//     editCourseInputsUI.forEach(function(textField) {
//         let key = textField.getAttribute("data-key");
//         let value = textField.value;
//         editedCourseObject[textField.getAttribute("data-key")] = textField.value
//     });



//     courseRef.update(editedCourseObject);

//     document.getElementById('edit-course-module').style.display = "none";


// }