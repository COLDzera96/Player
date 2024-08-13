

const progress = document.querySelector('.progress__filled');
const video = document.querySelector('video');
const pauseplay = document.querySelector('.toggle');

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

    if (playIt) {
        interval = setInterval(() => {
            handleProgress();
            if (laststage >= 100) {
                clearInterval(interval);
            }
        }, 1000);
    } else {
        clearInterval(interval);
    }
}


function PauseOrPlay(){
      if(video.paused){
            video.play().catch(error => {                // play the video
                   console.error("Error attempting to play the video:", error); 
               }) && startProgress(true);                // start progress bar
 
             pauseplay.innerHTML="❚❚";                   // display pause/play button
             console.log(pauseplay.textContent)          // test
       }
       else{
             video.pause();                             // pause the video
             startProgress(false);                      // stop progress
             pauseplay.innerHTML="►";                   // display pause/play 
       }
}

// pause & play
video.addEventListener('click',PauseOrPlay);
pauseplay.addEventListener('click',PauseOrPlay);




