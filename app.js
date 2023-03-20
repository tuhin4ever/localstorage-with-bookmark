const loadProduct = () => {
  fetch("./product.json")
    .then((response) => response.json())
    .then((data) => displayProduct(data));
};

const displayProduct = (data) => {
  const cards = document.getElementById("cards");
  data.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card", "m-2");
    // console.log(product)

    card.innerHTML = `
          <div class="bookmark-icon">
          <i onclick="handleRemoveBookMark(${product.id})" class="fa-solid fa-bookmark"></i>
          <i  onclick="handleBookmark('${product.name}', '${product.id}', '${product.price}')" class="fa-regular fa-bookmark"></i>
        


        </div>
        <div class="product-img-container">
          <img
            class="product-img"
            src=${product.image}
            alt=""
          />
        </div>
        <h3>${product.name}</h3>
        <p>The Widget 3000 is the latest and greatest in widget</p>
        <div class="priceAndButtons">
          <h2 class="text-primary">$${product.price}</h2>
          <button class="btn btn-primary">Buy Now</button>
        </div>
          `;
    cards.appendChild(card);
  });
};

// ! handle book mark

const handleBookmark = (name, id, price) => {
  // console.log({name, id, price})
  let bookMarkArray = [];
  
  const productObj = {name, id, price, bookmark: true};
  // console.log(productObj)
  
  
  const previousBookmark = JSON.parse(localStorage.getItem('bookmark'));
  // console.log(previousBookmark)
  if (previousBookmark) {
    // console.log("ache")
    const isThisBookMarked = previousBookmark.find((pd) =>pd.id == id)
    // console.log(isThisBookMarked)
    if (isThisBookMarked) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Already Bookmarked!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }else {
      bookMarkArray.push(...previousBookmark, productObj);
      console.log(bookMarkArray)
      localStorage.setItem('bookmark',JSON.stringify(bookMarkArray))
    }
  }else {
    bookMarkArray.push(productObj)
    // console.log("nai")
    //? JSON.stringify(localStorage.setItem('bookmark',bookMarkArray)); wrong type mistake
    localStorage.setItem('bookmark',JSON.stringify(bookMarkArray))
  }
}

const handleRemoveBookMark = (id) => {
  // console.log(id)
  const previousBookmark = JSON.parse(localStorage.getItem('bookmark'))
  // console.log(previousBookmark)
  const restOfThen = previousBookmark.filter((product) => product.id  != id)
  // console.log(restOfThen)
  localStorage.setItem('bookmark', JSON.stringify(restOfThen))
}

loadProduct();
