const loadData = async () =>{
    // console.log('Clicked');
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await response.json();
    const categories = data.data;
    const showButton = document.getElementById(`show-button`);
    categories.forEach((category) =>{ 
        const div = document.createElement('div')
        div.innerHTML =`
        <button onclick="videoCard('${category.category_id}')" class="btn btn-sm bg-slate-200 hover:bg-red-600 hover:text-white">${category.category}</button>
        `;
        showButton.appendChild(div);
    });
    // console.log(categories);
}

const videoCard = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const cardItems = data.data;
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    const cardContainer2 = document.getElementById('card-container2');
    cardContainer2.textContent = '';
    if(data.status === true){
        cardItems.forEach((item) =>{
            const div = document.createElement('div');
            div.classList = `card w-fit bg-base-100 shadow-xl`;
            div.innerHTML = `
            <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
            <div class="card-body flex items-start">
              <div>
               <img src="" alt="">
              </div>
              <div>
              <h2 class="card-title">Building a Winning UX Strategy Using the Kano Model</h2>
              <div class="flex items-center gap-3">
                <p>Awlad Hossain</p>
                <p></p>
              </div>
              <p>91K views</p>
              </div>
            </div>
            `;
            cardContainer.appendChild(div);
        });
    }
    else{
            const div = document.createElement('div');
            div.classList = `flex flex-col justify-center gap-6 mt-40`;
            div.innerHTML = `
            <div class="flex justify-center">
              <img class="w-fit" src="./logos/icon.png" alt="">
            </div>
            <div>
              <h1 class="text-2xl md:text-4xl font-bold text-center">Oops!! Sorry, There is no<br>content here</h1>
            </div>
            `;
            cardContainer2.appendChild(div);
    }
}

loadData();