const proudctName = document.getElementById('proudctName');
const proudctPrice = document.getElementById('proudctPrice');
const proudctCategory = document.getElementById('proudctCategory');
const proudctDisc = document.getElementById('proudctDesc');
const addProduct = document.getElementById('add');
const myTable = document.getElementById('tableBody');
const mySearch = document.getElementById ('search');

// const editBtn = document.getElementById ('edit');


let productList;

let currentIndex;



class Products {
  constructor(name, price, category, disc){
    this.name = name;
    this.price = price;
    this.category = category;
    this.disc = disc;
  }
};

let addProducts = () => {

  let prodName = proudctName.value;
  let prodPrice = proudctPrice.value;
  let prodCategory = proudctCategory.value;
  let prodDisc = proudctDisc.value;

  let products = new Products(prodName, prodPrice, prodCategory, prodDisc);

  productList.push(products);
  console.log(products);
  localStorage.setItem('proList', JSON.stringify(productList));
  showData(productList);
  ClearInput();

}

addProduct.addEventListener('click', addProducts);


let showData = (index) =>{
  let contianer = "";

  for (let i = 0; i < index.length; i++) {  
      contianer+= `<tr>
                    <td>${i+1}</td>
                    <td>${index[i].name}</td>
                    <td>${index[i].price}</td>
                    <td>${index[i].category}</td>
                    <td>${index[i].disc}</td>
                    <td><button class="btn btn-warning" id="update" onclick = "updateData(${i})">Update</button></td>
                    <td><button class="btn btn-danger" id="delete" onclick = "deleteItem(${i})">Delete</button></td>
                  </tr>`
    }

  myTable.innerHTML = contianer;    
};


let ClearInput = () => {
  proudctName.value = "";
  proudctPrice.value = "";
  proudctCategory.value = "";
  proudctDisc.value = "";
};


let deleteItem = (index) =>{
  productList.splice(index, 1);
  localStorage.setItem('proList', JSON.stringify(productList));
  showData(productList);
}


let searchItems = () => {

  let searchItem = mySearch.value;

  let item = [];

  for (let i = 0; i < productList.length; i++) {
    
    if (productList[i].name.toLowerCase().includes(searchItem.toLowerCase()) == true) {
      item.push(productList[i]);
    }


  }
  showData(item);
}


mySearch.addEventListener('keyup', searchItems);


function updateData (index){
  let x = productList[index];
 
  proudctName.value = x.name;
  proudctPrice.value = x.price;
  proudctCategory.value = x.category;
  proudctDisc.value = x.disc;

  currentIndex = index;


  //console.log(x);
  $('#edit').addClass('d-inline-block');
}

// update products
function editData (){
  let prodName = proudctName.value;
  let prodPrice = proudctPrice.value;
  let prodCategory = proudctCategory.value;
  let prodDisc = proudctDisc.value;
  
  let product = new Products(prodName, prodPrice, prodCategory, prodDisc);

  productList[currentIndex] = product;

  localStorage.setItem('proList', JSON.stringify(productList));
  showData(productList);
  ClearInput();
}

$('#edit').click(function () { 

  editData();

 $(this).removeClass('d-inline-block');
  
});




if (localStorage.getItem('proList') == null) {
  productList = [];

} else {
  productList = JSON.parse(localStorage.getItem('proList'));
  showData(productList);
}





























