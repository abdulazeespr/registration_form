
let userForm = document.getElementById('reg-form');


//retervie data from localstroage

const retrieveEnteries = () =>{
    let enteries  = localStorage.getItem('user-Entries');

    if(enteries){
        enteries = JSON.parse(enteries);
    }else{
        enteries =[];
    }
   return enteries;
} 



//collect of the users object Array

let userCollection = retrieveEnteries();


// display the userenteries in broswser

const DisplayUserEnteries = ()=>{
 
    let userdata = retrieveEnteries();

   const tableData = userdata.map((data)=>{
        const nameRow =`<td class="border px-4 py-2">${data.name}</td>`;
        const emailRow =`<td class="border px-4 py-2">${data.email}</td>`;
        const passwordRow =`<td class="border px-4 py-2">${data.password}</td>`;
        const dateRow =`<td class="border px-4 py-2">${data.date}</td>`;
        const acceptTermsRow =`<td class="border px-4 py-2">${data.acceptTerms}</td>`;

        const userRow =`<tr>${nameRow} ${emailRow} ${passwordRow} ${dateRow} ${acceptTermsRow}</tr>`;

        return userRow;
    }).join("\n");

    const table = `<table class="table-auto w-full">
        <tr>
        <th class="px-4 py-2">Name</th>
         <th class="px-4 py-2">Email</th>
        <th class="px-4 py-2">Password</th>
      <th class="px-4 py-2">Date</th>
      <th class="px-4 py-2">acceptTerms</th>       
        </tr>
        ${tableData}
    </table>`

    let userTable = document.getElementById('user-enteries');

    userTable.innerHTML=table;


}

const saveToCollection = (event)=>{

    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const date = document.getElementById('dob').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;

// format data get by form into a object
    let userData = {
        name,
        email,
        password,
        date,
        acceptTerms,
    }

 // push into collect of userdata   
    userCollection.push(userData);

// save usercolletion into localstorage
//use JSON.stringify method to store in string format 

localStorage.setItem('user-Entries',JSON.stringify(userCollection));

 DisplayUserEnteries();

}



const setDateLimit = ()=>{
   //set Date limit 
  
    //current date
   let datenow = new Date();

   //extract date into year,month,day

   let year = datenow.getFullYear();
   let month = datenow.getMonth();
   let day = datenow.getDate();


   //minimum age is 55

    minyear = year - 55;
    maxyear = year - 18;

    //let make minimum year into date format
    if(month<10){
        month="0"+(month + 1);
    }
    if(day<10){
        day = "0"+day;
    }

    let minDate = `${minyear}-${month}-${day}`;
    let maxDate = `${maxyear}-${month}-${day}`;

    let dateTag = document.getElementById('dob');

    //set min attribute

    dateTag.setAttribute('min',minDate);
    dateTag.setAttribute('max',maxDate);




}

setDateLimit();
//when submit occurs
userForm.addEventListener('submit',saveToCollection);

DisplayUserEnteries();

