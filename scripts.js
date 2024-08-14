

const progress     =     document.querySelector('.progress__filled');
const video        =     document.querySelector('video');
const pauseplay    =     document.querySelector('.toggle');
const Volslider    =     document.querySelector('input[name="volume"]');
const playBackRate =     document.querySelector('input[name="playbackRate"]')
const skipBack     =     document.querySelector('button[data-skip="-10"]')
const skipahed     =     document.querySelector('button[data-skip="25"]')
const volbutton    =     document.querySelector('.vol_button')
const progdiv      =     document.querySelector('.progress')


let videoDuration = 0;
let laststage = 0;

// Event listener for when video metadata is loaded
video.addEventListener('loadedmetadata', () => {
    videoDuration = video.duration;
 
});
var i=0;

// Function to update progress
function handleProgress() {
      
    const me=`${100/videoDuration}`;
    const numMe =Number(me);

    progress.style.flexBasis=`${laststage+numMe}%`;
    laststage+=numMe;
    i++;
    
}

let interval;

function startProgress(playIt) {
    console.log(playIt);

    if (playIt==1) {        // playing logic
        interval = setInterval(() => {
            handleProgress();
            if (laststage >= 100) {
                pauseplay.innerHTML="►";
                clearInterval(interval);
                laststage=0;
            }
        }, 1000);
    } 
    else if(playIt==0) {  // pausing logic  
        
        clearInterval(interval);
    } 
    else if (playIt==2){   // skip behind -10s
        // skip video 
        video.currentTime -= 10;
        console.log(`fell back to ${video.currentTime}`);
        // skip progress
        laststage-= (100/videoDuration)*10;
        handleProgress();
        console.log(`fell back to ${laststage}`);
    }
    else if (playIt==3){   // skip ahead +25s
        // skip video
        video.currentTime += 25;
        console.log(`fell ahed to ${video.currentTime}`)
        // skip progress
        laststage+= (100/videoDuration)*25;
        handleProgress();
        console.log(`fell ahed to ${laststage}`);
    }
}

function PauseOrPlay(){
      if(video.paused){
            video.play().catch(error => {                // play the video
                   console.error("Error attempting to play the video:", error); 
               }) && startProgress(1);                // start progress bar
 
             pauseplay.innerHTML="❚❚";                    // display pause/play button
             console.log(pauseplay.textContent)          // test
       }
       else{
             video.pause();                             // pause the video
             startProgress(0);                          // stop progress
             pauseplay.innerHTML="►";                   // display pause/play 
       }
}

//    LISTENERS

// pause & play
video.addEventListener('click',PauseOrPlay);
pauseplay.addEventListener('click',PauseOrPlay);

// Volume/Slider works below

Volslider.addEventListener('input',()=>{
      //check input level parameter
      //set Volume , that's it
      video.volume = Volslider.value;
    //  console.log(Volslider.value);
      
      const volumeLevel = Volslider.value;
      volbutton.innerHTML = 
          volumeLevel == 0 ? '🔇' : 
          volumeLevel <= 0.3 ? '🔈' : 
          volumeLevel <= 0.7 ? '🔉' : '🔊';
      
}
)
Volslider.addEventListener('mouseover',()=>{
      Volslider.title = `${Volslider.value}`  
})
playBackRate.addEventListener('input',()=>{
      video.playbackRate=playBackRate.value;
      console.log(playBackRate.value);
})
playBackRate.addEventListener('mouseover',()=>{
    playBackRate.title = `${playBackRate.value}`
})

//skip forward/back
skipBack.addEventListener('click',()=>{
    startProgress(2);
})

skipahed.addEventListener('click',()=>{
    startProgress(3);
})


// ADD ONs
//vol button

volbutton.addEventListener('click', () => {
    const initialVol = video.volume;
    if (video.muted) {
        video.muted = false;
        Volslider.value = initialVol;
        video.volume=initialVol;
        volbutton.innerHTML='🔊'
    } else {    
        video.muted = true;
        Volslider.value = 0;
        volbutton.innerHTML='🔇'
    }
});

progdiv.addEventListener('mouseup',(e)=>{
    const x= e.clientX;
    const y= e.clientY;
    //console.log(`Mouse released at X: ${x}, Y: ${y}`)
    console.log(progdiv.offsetWidth);
    console.log(x)
    const divWidth  = progdiv.offsetWidth;
    const divOffset = progdiv.getBoundingClientRect().left;
    const xinside   = x-divOffset;    // need to see this length corresponds to how much time +
    console.log(progdiv.getBoundingClientRect().left)
    console.log(`mouse rel at ${xinside}`) 
    const secperPx = videoDuration/divWidth;    // per px corresponds to how much time
    const timeskip = secperPx * xinside;
     
    
    video.currentTime = timeskip;
    console.log(`${timeskip} seconds skipped`);
    
    laststage= (100/videoDuration)*timeskip;
    handleProgress();   // for instant updation !
    console.log(`progress skipped by ${(100/videoDuration)*timeskip}`)
})