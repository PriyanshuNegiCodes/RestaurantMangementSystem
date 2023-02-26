//Write code to get menu data from the json-server using axios API
const url = 'http://localhost:3000/menu'
const getPromise = axios.get(url);
//Write code to load menu data using window onload event: getPromise is the promise result obained from Axios call
window.onload = () =>{
    getPromise.then((response) => {      
            response.data.forEach(menu => {     
                const newItem=document.createElement("tr");
                newItem.setAttribute("class", "itemInput");
                const item = document.querySelector(".item-table")
                newItem.innerHTML+=   `
                    <td>
                    ${menu.itemName}
                    </td>
                    <td>
                    ${menu.price}
                    </td>
                `;
                item.appendChild(newItem);
            });    
        });
}
let filterItem=[]

const category = document.getElementById('category');
category.addEventListener('change', function (e) {
    switch(category.value){
        case "Starters":{
            getPromise.then((response)=>{
                filterItem = response.data.filter(menu => menu.category === "Starters");
            })
            break;
        }
        case "Main Course":{
            getPromise.then((response)=>{
                filterItem = response.data.filter(menu => menu.category === "Main Course");

            })

        }
        break;
        case "Beverages":{
            getPromise.then((response)=>{
                filterItem = response.data.filter(menu => menu.category === "Beverages");

            })

        }
        break;
        case "Desserts":{
            getPromise.then((response)=>{
                filterItem = response.data.filter(menu => menu.category === "Desserts");

              })
        }
        break;
       
        default:{
            getPromise.then((response)=>{
                filterItem = response.data.filter(menu => menu.category === "All");

            })
        }
        // Add more cases for other categories if needed
    }
    findItems();
});

function findItems() {
    const item = document.querySelector(".item-table");
    item.innerHTML = "";
    filterItem.forEach(menu => {     
        const newItem=document.createElement("tr");
        newItem.setAttribute("class", "itemInput");
        newItem.innerHTML+=   `
            <td>
            ${menu.itemName}
            </td>
            <td>
            ${menu.price}
            </td>
        `;
        item.appendChild(newItem);
    });  
}