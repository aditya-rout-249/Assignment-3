const salesRole = "sales";
const adminRole = "admin";
const operationsRole = "operations";
//url for fetch 
const url = "http://localhost:8000/api/users";
// table element at dashboard 
const table = document.getElementById("userTable");
// card elements at dashboard for user count
const adminUsers = document.getElementById("adminUsers")
const totalUsers= document.getElementById("totalUsers")
const salesUsers = document.getElementById("salesUsers")
const operationsUsers = document.getElementById("operationsUsers")
// dashboard division element
const dashBoard = document.getElementById("dashBoard")
// landing page division element
const loginPage = document.getElementById("loginPage")
const editForm = document.getElementById("editForm")

// User Authentication
async function authenticate() {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;
  if (!emailValidator(email)) {
    alert("Please enter email in given format");
  } else if (await validateUser(email, password)) {
    //to fetch currentuser information
    let response = await fetch(`${url}/${email}`);
    let data = await response.json()
    currentUser = data[0]
    createTable(currentUser)
    createDashboard()
    dashBoard.style.display = "block"
    loginPage.style.display = "none";
  }
}

// User Registration
async function registerUser() {
  let email = document.getElementById("registermail").value;
  let password = document.getElementById("registerPassword").value;
  //Password Validation
  if (password.length < 8) {
    alert("Password is weak its length should be more than 8 charactors");
    return;
  } //Email Validation
  if (!emailValidator(email)) {
    alert("Please enter a valid email");
    return;
  } else if (await validateUser(email, password)) {
    alert("user already exist");
    return;
  } else {
    let firstName = document.getElementById("firstName").value;
    let lastname = document.getElementById("lastName").value;
    let name = firstName + " " + lastname;
    let role = document.getElementById("role").value;
    let gender = document.getElementById("gender").value;
    let newUser = { email, name, role, gender, password };
    saveUser(newUser);
    alert("user registered successfully")
    location.reload()
  }
};

// email validation
function emailValidator(email) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.toString().match(validRegex)) {
    return true;
  } else {
    return false;
  }
}

// User Validation
async function validateUser(email, loginPassword) {
  let url = `http://localhost:8000/api/users/${email}`;
  let response = await fetch(url);
  let responseData = await response.json();
  let validResponse = responseData[0];
  alert(validResponse)
  if (validResponse == null ) {
    
    return false;
  } else if (loginPassword == validResponse.password) {
    return true;
  } else if ( loginPassword != validResponse.password){
    
    alert("Incorrect password or email")
  }
}

//function to add  new user record to Database
async function saveUser(newUser) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  console.log(await response.json());
}
/*function validateRegistration( email, firstName,lastName, role, gender, password){


}*/

async function createDashboard(){
    const adminEmployeeNumbers = await  fetch(url + "/counts/" + adminRole);
		const adminCount = await adminEmployeeNumbers.json();
    const salesEmployeeNumbers = await fetch(url + "/counts/" + salesRole);
		const salesCount = await salesEmployeeNumbers.json();
    const operationsEmployeeNumber = await fetch( url + "/counts/" + operationsRole)
		const operationsCount = await operationsEmployeeNumber.json();
		adminUsers.innerText = adminCount;
		totalUsers.innerText = adminCount+salesCount+operationsCount;
		salesUsers.innerText = salesCount;
		operationsUsers.innerText = operationsCount;

}

// Function to create dashboard table
 async function createTable(currentUser) {
		const response = await fetch(url);
		const data = await response.json();
		data.map((user) => {
			let tr = creatRow(user);
			 if (user.email == currentUser.email) {
				createEditBtn(tr,user.email)
			} else if (currentUser.role == adminRole) {
				createDeleteBtn(tr, user.email);
			} else if (
				currentUser.role == operationsRole  &&
				(user.role == operationsRole || user.role == salesRole)
			) {
				createDeleteBtn(tr, user.email);
			} else if (currentUser.role == salesRole && user.role == salesRole) {
				createDeleteBtn(tr, email);
			}
			table.appendChild(tr);
		});
	}
	
	//Creating rows in Dashboard table => calling createCell to add data to rows
function creatRow(data) {
		const tr = document.createElement("tr");
		Object.values(data).map((value) => {
			const td = createCell(value);
			tr.appendChild(td);
		});
		return tr;
	};
	
	//adding data to table rows
function createCell(data) {
		const td = document.createElement("td");
		td.innerText = data;
		return td;
	};

// logout and redirect to login register page
function logout() {
		dashBoard.style.display = 'none'
    loginPage.style.display = 'block'
    currentUser = null;
};

// Function to add a edit button in dashboard table
function createEditBtn(tr) {
  let editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "btn btn-success col-12";
  editButton.addEventListener("click", () => {
    promptEditForm(currentUser);
    tr.remove();
  });
  let td = document.createElement("td");
  td.appendChild(editButton);
  tr.appendChild(td);
  table.appendChild(tr);
};

// function to add a delete button in dashboard table
function createDeleteBtn(tr, email) {
  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.className = "btn btn-danger col-12";
  deleteButton.addEventListener("click", () => {
    deleteUser(email);
    tr.remove();
  });
  let td = document.createElement("td");
  td.appendChild(deleteButton);
  tr.appendChild(td);
  table.appendChild(tr);
};

// to delete user
async function deleteUser(email) {
  const deleteUser = await fetch(`${url}/${email}`, {method: "DELETE" });
};

const editFirstName = document.getElementById('editFirstName')
const editlastname = document.getElementById('editLastName')
const editGender = document.getElementById('editGender')
const editUsername = document.getElementById('editUsername')

function promptEditForm(currentUser){
   
    const name = currentUser.name.split(' ')
    editFirstName.innerText = name[0]
    editlastname.innerText = name[1]
    editForm.style.display = "block"
    
}

// function to submit changed user information by put method
async function submit() {
  currentUser.name = editFirstName.value+' '+editlastname.value
  currentUser.gender = editGender.value
  alert("here")
  await fetch(`${url}/${currentUser.email}`,{
    method:'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentUser),
  }).then(response =>{
    alert(response.json())
  })
  let tr = creatRow(currentUser);
  createEditBtn(tr);
  editForm.style.display = "none";
  dashBoard.style.display = "block";
  loginPage.style.display = "none";
};