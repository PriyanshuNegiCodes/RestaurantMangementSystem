//Write  password validation code here 
function setPasswordConfirmValidity() {
    let password=document.getElementById("custPasword").value;
    let confirmPassword=document.getElementById("custConfirmPassword").value;
    alert
    if(password!==confirmPassword){
        document.getElementById("custPasword").value="";
        document.getElementById("custConfirmPassword").value="";
        password=""
        confirmPassword=""
        alert("The Password Should Match");
    }
}


// Write code to submit customer details 
function submitCustomerDetail(event) {
    const formData = new FormData(event.target)
    const formProperties = Object.fromEntries(formData)
    const postPromise = axios.post("http://localhost:3001/customers", formProperties)
    postPromise
        .then((response) => {
            console.log(response)
            alert("your data was inserted");
            alert("The Customer was Registered");
        })
    event.preventDefault() 
}
window.onload = () =>{
    const customer = document.getElementById("customer");
    customer.innerHTML = "";
    const placeHolderName=document.createElement("option");
    placeHolderName.disabled=true;
    placeHolderName.selected=true;
    placeHolderName.value="";
    placeHolderName.textContent="Select Customer";
    customer.appendChild(placeHolderName);
    const getPromise = axios.get("http://localhost:3001/customers")
    getPromise.then((response) => {      
        response.data.forEach(custId => {     
           
            const existingCustomer=document.createElement("option");
            existingCustomer.setAttribute("value", custId.id);
            existingCustomer.innerHTML+= `${custId.id}`;
            customer.appendChild(existingCustomer);     
        }); 
    });

};

function deleteCustomerDetails(){
    const val=document.getElementById("customer").value;
    alert(val)
    let url = `http://localhost:3001/customers/${val}`
    alert(url);
    const deletePromise = axios.delete(url);
    deletePromise.then((response) => {
        alert("The customer was deleted");
    })
    return false;
}


