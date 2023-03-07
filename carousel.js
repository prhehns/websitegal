const track = document.querySelector('.slider');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--left');


async function get_char(char_index){
    const response = await fetch('char.json', {mode:"cors"});
    const data =await response.json();
    console.log(data[char_index]);
    const {name,title, vision, weapon, gender, nation, affiliation, rarity, constellation, description} = data[char_index];
    document.getElementById('name').textContent = name;
    document.getElementById('title').textContent = '"'+title+'"';
    document.getElementById('vision').textContent = vision;
    document.getElementById('weapon').textContent = weapon;
    document.getElementById('gender').textContent = gender;
    document.getElementById('nation').textContent = nation;
    document.getElementById('rarity').textContent = rarity;
    document.getElementById('affil').textContent = affiliation;
    document.getElementById('const').textContent = constellation;
    document.getElementById('descri').textContent = description;
    
    bg_change(vision);

}

async function bg_change(vision){
    const vis = vision.toLowerCase();
    document.body.style.backgroundImage = "url('images/bg/"+vis+".jpg";
}

const slideWidth = slides[0].getBoundingClientRect().width;


const setSlidePosition = (slide, index) =>{
    slide.style.left = (slideWidth-5) * index +'px';
}

//moveToSlide -> scroll value, scrollLeft
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-'+targetSlide.style.left+')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
    
    const targetIndex = slides.findIndex(slide => slide === targetSlide);
    if(targetIndex === 0 ){
        prevButton.style.display = 'none';
    }else if (targetIndex === slides.length-1) {
        nextButton.style.display = 'none';
    } else{
        prevButton.style.display = '' ;
        nextButton.style.display = '';
    }

    console.log(targetIndex);
    get_char(targetIndex);
}
const currentSlide = track.querySelector('.current-slide');
moveToSlide(track, currentSlide, currentSlide);


//clickMove -> scrollvalue, scrollToView
// const clickMove = (track, currentSlide, targetSlide) =>{
//     track.style.transform = 'translateX(-'+targetSlide.style.left+')';
//     currentSlide.classList.remove('current-slide');
//     targetSlide.setAttribute('className', 'li.carousel current-slide');
//     const targetIndex = slides.findIndex(slide => slide === targetSlide);
//     if(targetIndex === 0 ){
//         prevButton.style.display = 'none';
//     }else if (targetIndex === slides.length) {
//         nextButton.style.display = 'none';
//     } else{
//         prevButton.style.display = '' ;
//         nextButton.style.display = '';
//     }
//     console.log(targetIndex);
//     get_char(targetIndex);
// }

slides.forEach(setSlidePosition);

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    moveToSlide(track, currentSlide, prevSlide);
})

nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    moveToSlide(track, currentSlide , nextSlide);
})

// track.addEventListener('click', e =>{
//     const currentSlide = track.querySelector('.current-slide');
//     const nextSlide = e.composedPath()[1]; //.setAttribute('className', 'li.carousel current-slide');// [0]..add('current-slide');
//     clickMove(track, currentSlide, nextSlide);
//     console.log(nextSlide)
// })

//console.log(slides[1].innerHTML);
