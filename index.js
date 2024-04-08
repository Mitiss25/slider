

let currentImageIndex = 2;
const totalImages = 6;
let isAnimating = false;

let tl = gsap.timeline();

gsap.to('.slide-next-img', {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    duration: 1.5,
    ease: 'power3.out',
    delay: 1,
});

document.addEventListener('click', function(){
    if (isAnimating) return;

    isAnimating = true;

    tl.to('.slide-active-img', {
        scale: 2,
        duration: 2.25,
        ease: 'power3.out',
    });

  



    // const nextContent = document.querySelector('.slider-content-next');
    // nextContent.classList.remove('slider-content-next');
    // nextContent.classList.add('slider-content-active');
    // nextContent.style.top = '0';

    // currentContentIndex = (currentContentIndex + 1) % totalImages;
    // const nextContentText = sliderContent[currentContentIndex];
    // const newContentHTML = `<div class="slider-content-next" style="top:200px;><h1>${nextContentText}</h1></div>`;
    // document.querySelector('.slider-content').insertAdjacentHTML('beforeend', newContentHTML);

    currentImageIndex = (currentImageIndex % totalImages) +1;

    const newSlideHTML = `
        <div class="slide-next">
            <div class="slide-next-img">
                <img src="./images/asset${currentImageIndex}.jpg" alt=""/>
            </div>
        </div>
    `;

    document.querySelector('.slider').insertAdjacentHTML('beforeend', newSlideHTML);

    tl.to('.slider .slide-next:last-child .slide-next-img', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.5
    }, '<');

    const slideNextImg = document.querySelector('.slide-next-img');
    tl.to(slideNextImg, {
        width: '100vw',
        height: '100vh',
        duration: 2,
        ease: 'power3.out',
        onComplete: () => {
            const currentActiveSlide = document.querySelector('.slide-active');
            if(currentActiveSlide) {
                currentActiveSlide.parentNode.removeChild(currentActiveSlide);
            }

            const nextSlide = document.querySelector('.slide-next');
            if(nextSlide) {
                nextSlide.classList.remove('slide-next');
                nextSlide.classList.add('slide-active');

                const nextSlideImg = nextSlide.querySelector('.slide-next-img');
                if(nextSlide){
                    nextSlideImg.classList.remove('slide-next-img');
                    nextSlideImg.classList.add('slide-active-img');
                    console.log('nextSlideImg : ' + nextSlideImg.classList)
                }
            }

            

            console.log('nextSlide : ' + nextSlide.classList);

            setTimeout(() => {
                isAnimating = false
            }, 500)
        }
    }, '<')
})