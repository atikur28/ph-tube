const loadData = async () =>{
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
            const seconds = item.others.posted_date;
            const second = parseInt(seconds);
            const hourLeft = Math.floor(second / 3600);
            const min = Math.floor((second - hourLeft * 3600) / 60);
            const time = hourLeft + ' hours ' + min + ' mins ago';
            const number = 0;
            if(verify === true){
              if(hourLeft > number && min > number){
                const div = document.createElement('div');
                div.classList = `card container mx-auto w-fit bg-base-100 shadow-xl`;
                div.innerHTML = `
                <figure><img class="relative h-80 w-96" src=${item.thumbnail} alt="Shoes" /></figure>
                <div class="absolute right-3 bottom-36 bg-black w-max px-2 py-1 rounded-md">
                  <p class="text-white text-xs">${time}</p>
                </div>
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
                div.classList = `card container mx-auto w-fit bg-base-100 shadow-xl`;
                div.innerHTML = `
                <figure><img class="relative h-80 w-96" src=${item.thumbnail} alt="Shoes" /></figure>
                <div class="absolute right-3 bottom-36 bg-black w-max px-2 py-1 rounded-md hidden">
                  <p class="text-white text-xs">${time}</p>
                </div>
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
                   <h2 class="total-views">${item.others.views} views</h2>
                  </div>
                </div>
                `;
                cardContainer.appendChild(div);
              }
            }
            else{
              if(hourLeft > number && min > number){
                const div = document.createElement('div');
              div.classList = `card container mx-auto w-fit bg-base-100 shadow-xl`;
              div.innerHTML = `
              <figure><img class="h-80 w-96" src=${item.thumbnail} alt="Shoes" /></figure>
              <div class="absolute right-3 bottom-36 bg-black w-max px-2 py-1 rounded-md">
                <p class="text-white text-xs">${time}</p>
              </div>
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
                 <h2 class="total-views">${item.others.views} views</h2>
                </div>
              </div>
              `;
              cardContainer.appendChild(div);
              }
              else{
                const div = document.createElement('div');
              div.classList = `card container mx-auto w-fit bg-base-100 shadow-xl`;
              div.innerHTML = `
              <figure><img class="h-80 w-96" src=${item.thumbnail} alt="Shoes" /></figure>
              <div class="absolute right-3 bottom-36 bg-black w-max px-2 py-1 rounded-md hidden">
                <p class="text-white text-xs">${time}</p>
              </div>
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
                 <h2 class="total-views">${item.others.views} views</h2>
                </div>
              </div>
              `;
              cardContainer.appendChild(div);
              }
            }
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

// Still solving
function sortByViews () {
  // console.log(true);
  const cardContainer = document.getElementById('card-container');
  const cardItems = Array.from(cardContainer.children);
  // console.log(cardItems);
  cardItems.sort((a, b) =>{
    const view1 = parseInt(a.querySelector(".total-views").textContent);
    const view2 = parseInt(b.querySelector(".total-views").textContent);
    // console.log(view1);
    return view2 - view1;
  });
  cardItems.forEach((card) => {
    cardContainer.appendChild(card);
    // console.log(cardContainer);
  });
}
sortByViews();

const loadBlog = () =>{
  window.location.href = "https://blog-page-28.surge.sh/";
}


loadData();
videoCard('1000');