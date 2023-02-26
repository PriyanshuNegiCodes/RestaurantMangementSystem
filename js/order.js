function fetchData(){

  const contact=document.getElementById("contactNumber").value;
  const getPromise = axios.get(`http://localhost:3001/customers?contact=${contact}`);
  console.log(getPromise);
  getPromise.then((response)=>{
    response.data.forEach(custID=>{
    document.getElementById("CustomerName").value=custID.name;
    document.getElementById("emailId").value=custID.email;
    document.getElementById("inputAddress").value=custID.address;
    })
  });
}


const data=[];
function addOrder(){
  const newOrder=document.createElement("tr");
  newOrder.setAttribute("class", "orderInput");
  const order = document.querySelector(".order-table");  
  newOrder.innerHTML=`
      <td>
        <select class="order-table-body-input CategoryMenu" id="categoryList" required onchange="showItem()">

          <option value="Starters">Starter</option>
          <option value="Main Course">Main Course</option>
          <option value="Beverages">Beverage</option>
          <option value="Desserts">Dessert</option>
        </select>
      </td>
      <td>
        <select class="order-table-body-input itemMenu" id="itemList" required onclick="showPrice()">
          <option value="">Item</option>
        </select>
      </td>
      <td>
        <input class="form-control price" oninput="calculateAmount()" disabled>
      </td>
      <td>
      <input type="number" class="form-control quantity" oninput="calculateAmount()" >
      </td>
      <td>
      <input type="number" readonly class="form-control amount" disabled>
      </td>`;
    order.appendChild(newOrder);
    }
//Method for the categories and Items
function showItem(){
   
    const categories=document.getElementsByClassName("CategoryMenu");
    
    const items=document.querySelectorAll (".itemMenu");
     for (let i = 0; i < categories.length; i++){

        let categoryValues=categories[i].value;
        let itemValues=items[i];
        
        if (categoryValues === "Starters") {
            itemValues.innerHTML = `
          <option value="Dough Balls Doppio">Dough Balls Doppio</option>
          <option value="Mix Salad Bowl">Mix Salad Bowl</option>
          <option value="Garlic Bread Mozzarella">Garlic Bread Mozzarella</option>
          <option value="Veg Wrap">Veg Wrap</option>
          <option value="Spinach and Artichoke Tortilla Crisp">Spinach and Artichoke Tortilla Crisp</option>
          <option value="Mini Vegetable Lasagna">Mini Vegetable Lasagna</option>
          <option value="Potato Wedges">Potato Wedges</option>
          <option value="Emilgrana & Mushroom Dip">Emilgrana & Mushroom Dip</option>`
          }
          else if (categoryValues === "Main Course") {
            itemValues.innerHTML = `
          <option value="Fruit Pizza">Fruit Pizza</option>
          <option value="Combo of 2 Veg Pizzas">Combo of 2 Veg Pizzas</option>
          <option value="Risotto Con Funghi Veg">Risotto Con Funghi Veg</option>
          <option value="Penne con Peppadew">Penne con Peppadew</option>
          <option value="Dan Dan Noodles">Dan Dan Noodles</option>
          <option value="Mexican Delight Pizza">Mexican Delight Pizza</option>
          <option value="Spaghetti Aglio e Olio">Spaghetti Aglio e Olio</option>
          <option value="Pomodoro Pesto Pizza By the Slice">Pomodoro Pesto Pizza By the Slice</option>
          <option value="Cheese Burst Pizza">Cheese Burst Pizza</option>
          <option value="Fresh Veggi Special Pizza">Fresh Veggi Special Pizza</option>`
          }
          else if (categoryValues === "Beverages") {
            itemValues.innerHTML = `
          <option value="Berry Blast">Berry Blast</option>
          <option value="Oreo Monster Shake">Oreo Monster Shake</option>
          <option value="Classic Mojito">Classic Mojito</option>
          <option value="Water Melon Ice Tea">Water Melon Ice Tea</option>
          <option value="Diet Pepsi">Diet Pepsi</option>`
          }
          else if (categoryValues === "Desserts") {
            itemValues.innerHTML = `
          <option value="Chocolate Cheesecake">Chocolate Cheesecake</option>
          <option value="Brownie">Brownie</option>`
          }
    
    }
    
}
//----------------------------Method to update the amount---------------------
function calculateAmount() {
    let sum=0
const prices = document.getElementsByClassName('price');
const quantities = document.getElementsByClassName('quantity');
const amounts = document.getElementsByClassName('amount');
for (let i = 0; i < prices.length; i++) {
   amounts[i].value = prices[i].value * quantities[i].value;
   sum += parseFloat(amounts[i].value);
  }
    document.getElementById('finalAmount').value=sum;
}

// Save the order details on clicking the submit button

// ------------------------Method to print the array--------------------------
const form = document.querySelector('.formcontainer');
const inputs = form.querySelectorAll('input')
      form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    // data.push({OrderID: document.getElementById('orderId').value});
    data.push({CustomerName: document.getElementById('CustomerName').value});
    data.push({ContactNo: document.getElementById('contactNumber').value});
    data.push({CustomerEmail: document.getElementById('emailId').value});
    data.push({Date: document.getElementById('orderDate').value});
    data.push({Address: document.getElementById('inputAddress').value});
 
    const orderInputs = document.querySelectorAll('.orderInput');
    let order=[];
    for (var i = 0; i < orderInputs.length; i++) {
    let category = orderInputs[i].querySelector('.CategoryMenu').value;
    let item = orderInputs[i].querySelector('.itemMenu').value;
    let price = orderInputs[i].querySelector('.price').value;
    let quantity = orderInputs[i].querySelector('.quantity').value;
    let amount = orderInputs[i].querySelector('.amount').value;

            order.push({CategoryName: category,
              ItemName: item,
              Price: price,
              Quantity: quantity,
              Amount: amount})

              data.push(order);
    }

    data.push({FinalAmount: document.getElementById('finalAmount').value});
    
    
    //----------------------AXIOS TO INsert Data in Order table
    let orderData={
      // OrderID: document.getElementById('orderId').value,
      CustomerName: document.getElementById('CustomerName').value,
      ContactNo: document.getElementById('contactNumber').value,
      CustomerEmail: document.getElementById('emailId').value,
      Date: document.getElementById('orderDate').value,
      Address: document.getElementById('inputAddress').value,
      OrderSummary: order,
      FinalAmount: document.getElementById('finalAmount').value
    }  
    axios
      .post("http://localhost:3002/order", orderData)
      .then((response) => {
                const savedData = response.data;
        // alert(JSON.stringify(savedData));
        alert("Order Taken SuccessFully!");
      })
      .catch((error) => {
        console.log("Data not saved:", error);
      });
    
    });
    console.log(data);

    function datePicker() {
      let minDate = new Date().toISOString().split('T')[0];
      document.getElementById("orderDate").min = minDate;
  }


//-------------------------------------------------

function showPrice() {
    const items=document.getElementsByClassName("itemMenu");
    const price=document.getElementsByClassName("price");
    for (let i = 0; i < items.length; i++) {
        let itemValues=items[i].value;
        let priceValues=price[i];
       
        switch(itemValues) {
          case "Dough Balls Doppio":
            priceValues.value = 5.95;
            break;
          case "Mix Salad Bowl":
          case "Fresh Veggi Special Pizza":
            priceValues.value = 4;
            break;
          case "Garlic Bread Mozzarella":
            priceValues.value = 3.12;
            break;
          case "Veg Wrap":
            priceValues.value = 9.5;
            break;
          case "Spinach and Artichoke Tortilla Crisp":
            priceValues.value = 5.24;
            break;
          case "Mini Vegetable Lasagna":
            priceValues.value = 1.53;
            break;
          case "Potato Wedges":
            priceValues.value = 2.1;
            break;
          case "Emilgrana & Mushroom Dip":
            priceValues.value = 4.35;
            break;
          case "Fruit Pizza":
            priceValues.value = 5;
            break;
          case "Combo of 2 Veg Pizzas":
            priceValues.value = 5.04;
            break;
          case "Risotto Con Funghi Veg":
            priceValues.value = 6.58;
            break;
          case "Penne con Peppadew":
          case "Spaghetti Aglio e Olio":
            priceValues.value = 9;
            break;
          case "Dan Dan Noodles":
            priceValues.value = 3.99;
            break;
          case "Mexican Delight Pizza":
            priceValues.value = 4.2;
            break;
          case "Pomodoro Pesto Pizza By the Slice":
            priceValues.value = 15;
            break;
          case "Cheese Burst Pizza":
            priceValues.value = 12;
            break;
          case "Berry Blast":
            priceValues.value = 1.72;
            break;
          case "Oreo Monster Shake":
            priceValues.value = 3.78;
            break;
          case "Classic Mojito":
            priceValues.value = 3.44;
            break;
          case "Water Melon Ice Tea":
            priceValues.value = 2.5;
            break;
          case "Diet Pepsi":
            priceValues.value = 1;
            break;
          case "Chocolate Cheesecake":
            priceValues.value = 7.95;
            break;
          case "Brownie":
            priceValues.value = 2.52;
            break;
        }
        
    }
}
