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
            const verify = item.authors[0].verified;
            if(verify === true){
              const div = document.createElement('div');
            div.classList = `card w-fit bg-base-100 shadow-xl`;
            div.innerHTML = `
            <figure><img class="h-80 w-fit" src=${item.thumbnail} alt="Shoes" /></figure>
            <div class="card-body flex flex-row items-start justify-around">
              <div class="w-max">
               <img class="rounded-full w-10 h-10" src=${item.authors[0].profile_picture} alt="">
              </div>
              <div>
               <h2 class="card-title">${item.title}</h2>
               <div class="flex items-center gap-1">
                <p>${item.authors[0].profile_name}</p>
                <div>
                  <img src="./logos/verified.svg" alt="">
                </div>
               </div>
               <p>${item.others.views} views</p>
              </div>
            </div>
            `;
            cardContainer.appendChild(div);
            }
            else{
              const div = document.createElement('div');
            div.classList = `card w-fit bg-base-100 shadow-xl`;
            div.innerHTML = `
            <figure><img class="h-80 w-fit" src=${item.thumbnail} alt="Shoes" /></figure>
            <div class="card-body flex flex-row items-start justify-around">
              <div class="w-max">
               <img class="rounded-full w-10 h-10" src=${item.authors[0].profile_picture} alt="">
              </div>
              <div>
               <h2 class="card-title">${item.title}</h2>
               <div class="flex items-center gap-1">
                <p>${item.authors[0].profile_name}</p>
                <img src="" alt="">
               </div>
               <p>${item.others.views} views</p>
              </div>
            </div>
            `;
            cardContainer.appendChild(div);
            }
            // console.log(item);
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
    sortByView(categoryId);
}

const sortByView = async (categoryId) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const items = data.data;
    const sortByViewContent = document.getElementById('sort-by-view');
    // sortByViewContent.textContent = '';
    items.forEach((item) =>{
      const views = item.others.views;
      const totalViews = parseFloat(views);
      const newViews = totalViews * 1000;
      console.log(newViews);
      // const div = document.createElement('div');
      // div.innerHTML = 
    });
}

loadData();
videoCard('1000');