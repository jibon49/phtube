const buttons = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const categories = await res.json();
    buttonsManager(categories);
}

const buttonsManager = (categories) =>{
    const buttonContainer = document.getElementById('button-container');
    categories.data.forEach(button => {

        const buttons = document.createElement('button');
        buttons.classList="bg-[#25252521] px-5 py-2 rounded-md"
        buttons.innerHTML=`<button> ${button.category}</button>`
        buttonContainer.appendChild(buttons);
    });
}
buttons();