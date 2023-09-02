const sortButton =document.getElementById('sort-button');
const cardsContainer = document.getElementById('card-container');


const buttons = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  const categories = await res.json();
  buttonsManager(categories);
}


// button
const buttonsManager = (categories) => {
  const buttonContainer = document.getElementById('button-container');
  categories.data.forEach(button => {

    const buttons = document.createElement('button');
    buttons.classList = "bg-[#25252521] px-5 py-2 rounded-md"
    buttons.innerHTML = `<button onclick="handleCategory(${button.category_id})"> ${button.category}</button>`
    buttonContainer.appendChild(buttons);
  });
}
const cardsHandler = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
  const allCard = await res.json();
  showAllCard(allCard);
}

const showAllCard = (cards) => {
  
  // no content
  if(cards.data.length === 0){
    const noContentContainer = document.getElementById('no-content')
    const noContent = document.createElement('div')
    noContent.classList = "text-center pt-10 md:pt-20 lg:pt-52"
    noContent.innerHTML = `
    <img src="./Icon.png" alt="" class="mx-auto">
    <p class="font-bold text-3xl">Oops!! Sorry, There is no content here</p>
  `
  noContentContainer.appendChild(noContent);
  }

  // all content
  else{
    cards.data.forEach(card1 => {
      const card = document.createElement('div')
      card.setAttribute('data-views', card1.others?.views);
      const time = timeConverter(card1.others ?.posted_date);
      const timeHandler = ((time.hour !==0 && time.min !== 0) ? `<div class="absolute right-2 bottom-2 text-white  text-xs">
      <p class="bg-[#171717] px-1">${time.hour}hrs ${time.min}min ago</p>
      </div>` : '');
      const verify = card1 ?.authors[0].verified;
      const verifyHandler = (verify === true ? `<svg class="inline-block" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <g clip-path="url(#clip0_11_34)">
        <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
        <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92668C6.88906 8.52512 6.2375 8.52512 5.83594 8.92668C5.43437 9.32824 5.43437 9.97981 5.83594 10.3814L8.43125 12.9767C8.82187 13.3673 9.45625 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
      </g>
      <defs>
        <clipPath id="clip0_11_34">
          <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>` : '');
  
      card.classList = "card bg-base-100 hover:cursor-pointer shadow-xl"
  
  
      card.innerHTML = `
          <figure class="relative">
          <img class="relative h-48 w-full object-cover" src="${card1.thumbnail}" alt="" />
          ${timeHandler}
          </figure>
                      <div class="card-body">
                          <div class="flex gap-3">
                              <div class="">
                                  <img class="inline-block rounded-full h-10 w-10 md:h-10 md:w-10 object-cover" src="${card1?.authors[0].profile_picture}" alt="">
                              </div>
                            <div>
                              <h2 class="card-title">${card1.title}</h2>
                            <p>${card1.authors[0]?.profile_name} ${verifyHandler}</p>
                            <p class="total-views"><span>${card1.others?.views}</span> views</p>
                            </div>
                          </div>
                      </div>
                      `
      cardsContainer.appendChild(card);
      
    });
  }
}
const timeConverter = (seconds) =>{
  const hour = Math.floor(seconds/3600);
  const remainingSeconds = seconds%3600;
  const min = Math.floor(remainingSeconds/60);
  return {
    hour,
    min,
  }
}

const handleCategory =async (categoryId) =>{

  buttons.classList = "bg-[red] px-5 py-2 rounded-md"
  const noContentContainer = document.getElementById('no-content');
  noContentContainer.innerHTML='';
  const cardsContainer = document.getElementById('card-container');
  cardsContainer.innerHTML='';
  console.log(categoryId);
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
  const showCategoriesCard = await res.json();
  showAllCard(showCategoriesCard);

}


sortButton.addEventListener('click', () => {
  // Get all the cards
  const cards = document.querySelectorAll('.card');

  // Create an array to store card elements with their view counts
  const cardArray = [];

  // Iterate through the cards
  cards.forEach(card => {
    // Extract the view count from each card (assuming there's a 'data-views' attribute)
    const viewCount = parseFloat(card.getAttribute('data-views'));

    // Push the card and its view count into the array
    cardArray.push({ card, viewCount });
  });

  // Sort the array of cards based on view counts in ascending order
  cardArray.sort((a, b) => a.viewCount - b.viewCount);

  // Clear the card container
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';

  // Append the sorted cards back to the container
  cardArray.forEach(cardObj => {
    cardContainer.appendChild(cardObj.card);
  });
});



 
  






cardsHandler();
buttons();
