window.onload = () => {

    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];
    
    const words = [
        "transcript","syndrome","witchcraft","xylophone","adjustment","advertisement","comparison"
        ,"competition","distance","distribution"
    ];

    const word = words[Math.floor(Math.random() * words.length)]
    const revealedWord = new Array(word.length).fill('_');
    var wonGame = false;
    const guessed = [];
    var totalLives = 10;

    const keyboard = document.getElementById('keyboard');
    const answerDiv = document.getElementById('answer-div');
    const livesDiv = document.getElementById('lives-div');
    answerDiv.innerHTML = revealedWord.join(' ');
    livesDiv.innerHTML = "You have 10 lives left !";
    
    const playAgain = document.getElementById('play-again');
    playAgain.addEventListener('click', () => {
        location.reload();
    });

    const wonCheck = () => {
        if(word === revealedWord.join('').toLowerCase()){
            wonGame = true;
            livesDiv.innerHTML = "!!! WON !!!"
        } 
    }

    const checkWord = (letterChosed) => {
        if(!guessed.includes(letterChosed) && totalLives > 0){
            guessed.push(letterChosed);
            if(word.indexOf(letterChosed) === -1){
                totalLives--;
                livesDiv.innerHTML = totalLives > 0 ? "You have " + totalLives + " lives left !" : "!!! OOPS, GAME OVER !!!";
                drawHangman();
            }else{
                for(let i=0;i<word.length; i++){
                    if(word[i] === letterChosed){
                        revealedWord[i] = letterChosed.toUpperCase();
                    }
                }
                answerDiv.innerHTML = revealedWord.join(' ');
                wonCheck();
            }
        }   
    }

    const choseAlphabet = (e) => {
        if(totalLives > 0 && !(wonGame)){
            const ele = document.getElementById(e.target.id);
            ele.classList.add('clicked');
            checkWord(e.target.id);
        }
    }

    alphabet.forEach(letter => {
        var alphabtn = document.createElement('div');
        alphabtn.classList.add('alpha-key');
        alphabtn.setAttribute('id',letter);
        alphabtn.innerHTML = letter ;
        alphabtn.addEventListener('click',choseAlphabet);
        keyboard.appendChild(alphabtn);
    });

    var drawHangman = () => {
        var drawMe = totalLives ;
        drawArray[drawMe]();
    }
    
    const canvas =  () => {
        const hangMan = document.getElementById("canvas");
        context = hangMan.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#000";
        context.lineWidth = 2;
    };
    
    const head = () => {
        myStickman = document.getElementById("canvas");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI*2, true);
        context.stroke();
    }
        
    const draw = ($pathFromx, $pathFromy, $pathTox, $pathToy) => {
        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke(); 
    }
    
    const frame1 = () => draw (0, 150, 150, 150);
    const frame2 = () => draw (10, 0, 10, 600);
    const frame3 = () => draw (0, 5, 70, 5);
    const frame4 = () => draw (60, 5, 60, 15);
    const torso = () => draw (60, 36, 60, 70);
    const rightArm = () => draw (60, 46, 100, 50);
    const leftArm = () => draw (60, 46, 20, 50);  
    const rightLeg = () => draw (60, 70, 100, 100);
    const leftLeg = () => draw (60, 70, 20, 100);
    
    drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 
    canvas();
}