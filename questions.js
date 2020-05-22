// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDaQApJlYMXzbJD7RB6KR1Gd0B2d0ec9Qo",
    authDomain: "knowmeapp-efa33.firebaseapp.com",
    databaseURL: "https://knowmeapp-efa33.firebaseio.com",
    projectId: "knowmeapp-efa33",
    storageBucket: "knowmeapp-efa33.appspot.com",
    messagingSenderId: "1066997208238",
    appId: "1:1066997208238:web:a8a63d1f74fb58efa0c93f",
    measurementId: "G-FW1K92FFZN"
};
// Initialize Firebase
console.log("omkar ajagunde")
firebase.initializeApp(firebaseConfig);

let game = {
    name: '',
    responders: []
}

let responder = {
    name: '',
    gender: '',
    score: '',
}

let user = {

    gender: '',
    name: '',
    respondersCount: 1,
    responders: [0, ],
    ansArr: [],
    questionList: [

        {
            type: 1,
            ques: `Which mobile phone USERNAME use? android or iPhone?`,
            ans: ['android', 'iPhone', 'BlackBerry']
        },
        {
            type: 2,
            ques: `Do USERNAME have GENDER`,
            ans: ['Yes', 'No']
        },
        {
            type: 1,
            ques: `Which type of movies do USERNAME like?`,
            ans: ['suspense-thriller', 'romance', 'funny']
        },
        {
            type: 1,
            ques: `Which mobile phone USERNAME use? android or iPhone?`,
            ans: ['android', 'iPhone', 'BlackBerry']
        },
        {
            type: 2,
            ques: `Do USERNAME have GENDER`,
            ans: ['Yes', 'No']
        },
        {
            type: 1,
            ques: `Which type of movies do USERNAME like?`,
            ans: ['suspense-thriller', 'romance', 'funny']
        },
        {
            type: 1,
            ques: `Which mobile phone USERNAME use? android or iPhone?`,
            ans: ['android', 'iPhone', 'BlackBerry']
        },
        {
            type: 2,
            ques: `Do USERNAME have GENDER`,
            ans: ['Yes', 'No']
        },
        {
            type: 1,
            ques: `Which type of movies do USERNAME like?`,
            ans: ['suspense-thriller', 'romance', 'funny']
        },
        {
            type: 1,
            ques: `Which type of movies do USERNAME like?`,
            ans: ['suspense-thriller', 'romance', 'funny']
        },
        {
            type: 1,
            ques: `Which type of movies do USERNAME like?`,
            ans: ['suspense-thriller', 'romance', 'funny']
        },
    ]

}



var countQuestion = 0;
var checkMarkCounter = 1;
var progressBarNotifier = 10;
var url = ''
var score = 0;
var quesCounter = 0;
var _uniqueID = ''
var _responderID = ''
var token = ''

let getname = () => user.name
let genderInitialiser = (gender) => user.gender = gender

let responderGenderInit = (gender) => responder.gender = gender



let shareWhatsapp = () => {
    showSnakBar('Diverting to whatsapp ...')
    window.location.href = 'https://api.whatsapp.com/send?text=https://omkarajagunde.github.io/startQuestions.html?identifier=' + token
}

let shareLink = () => {
    var input = document.createElement('input');
    input.setAttribute('value', `https://omkarajagunde.github.io/startQuestions.html?identifier=${token}`);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showSnakBar('link copied ...')
}



let mobileProgressBarUpdate = () => {
    let lastProgress = progressBarNotifier
    progressBarNotifier += 9;
    // keyframes
    document.getElementById("progress-tracker").animate([
        // keyframes
        { width: `${lastProgress}%` },
        { width: `${progressBarNotifier}%` }
    ], {
        // timing options
        duration: 1000,
    });
    document.getElementById("progress-tracker").style.width = `${progressBarNotifier}%`
    console.log(progressBarNotifier)
}

let playProgressSound = () => {
    var audio = new Audio("assets/coinSound.mp3");
    audio.play();
}

let lineAnimation = (id) => {
    if (checkMarkCounter > 9) {
        return
    }
    let el = document.querySelector(id);
    let myAnimation = new LazyLinePainter(el, {
        "ease": "easeLinear",
        "strokeWidth": 5,
        "strokeOpacity": 1,
        "strokeColor": "#0EFAC8",
        "strokeCap": "square"
    });
    myAnimation.paint();
}

let makeQuestionURL = () => {

    url = new Uri()
        .setPath('https://omkarajagunde.github.io/startQuestions.html')
        .setQuery(`?identifier=${_uniqueID}`)
}

let initAnsweringUser = () => {

    token = new Uri(localStorage.getItem('url')).getQueryParamValue('identifier')
    console.log("Token : ", token)

}

let questionSetter = () => {


    // hide buttons before going ahead  
    document.getElementById(`btn-1`).style.visibility = "hidden"
    document.getElementById(`btn-2`).style.visibility = "hidden"
    document.getElementById(`btn-3`).style.visibility = "hidden"
    document.getElementById(`ansInput`).style.visibility = "hidden"

    // set question titles
    document.getElementById("remQues").innerHTML = `Answer below question`
    let str = user.questionList[countQuestion].ques
    str = str.replace('USERNAME', user.name)

    // set answer buttons to questions
    let btnCount = 1
    user.questionList[countQuestion].ans.forEach((value, index) => {
        document.getElementById(`btn-${btnCount}`).innerHTML = `${value}`
        document.getElementById(`btn-${btnCount}`).style.visibility = "visible"
        if (user.questionList[countQuestion].type == 1) {
            document.getElementById(`ansInput`).style.visibility = "visible"
        }
        btnCount++
    })

    document.getElementById("quesTitle").innerHTML = str


    if (countQuestion > 9) {

        showSnakBar("Hooray! questions completed")
        console.log(user)
        document.getElementById(`btn-1`).style.visibility = "hidden"
        document.getElementById(`btn-2`).style.visibility = "hidden"
        document.getElementById(`btn-3`).style.visibility = "hidden"
        document.getElementById(`ansInput`).style.visibility = "hidden"
        document.getElementById(`quesTitle`).style.visibility = "hidden"
        document.getElementById(`remQues`).style.visibility = "hidden"
        uploadToFireStone()
    }
    countQuestion++;
    document.getElementById(`checkCircle-${checkMarkCounter}`).style.visibility = "visible"
    lineAnimation(`#line-${checkMarkCounter}`)
    playProgressSound()

    if (checkMarkCounter == 9) {
        document.getElementById(`successVector`).style.visibility = "visible"
        console.log(user.questionList)

    }
    checkMarkCounter++;

}

let answerValidator = () => {


    // hide buttons before going ahead
    document.getElementById(`btn-1`).style.visibility = "hidden"
    document.getElementById(`btn-2`).style.visibility = "hidden"
    document.getElementById(`btn-3`).style.visibility = "hidden"
    document.getElementById(`btn-4`).style.visibility = "hidden"

    // set question titles
    document.getElementById("remQues").innerHTML = `Answer below question`
    let str = user.questionList[countQuestion].ques
    str = str.replace('USERNAME', user.name)

    // set answer buttons to questions
    let btnCount = 1
    user.questionList[countQuestion].ans.forEach((value, index) => {
        document.getElementById(`btn-${btnCount}`).innerHTML = `${value}`
        document.getElementById(`btn-${btnCount}`).style.visibility = "visible"
        btnCount++
    })

    document.getElementById("quesTitle").innerHTML = str


    if (countQuestion > 9) {
        showSnakBar("Hooray! answers completed")
        console.log(user)
        document.getElementById(`btn-1`).style.visibility = "hidden"
        document.getElementById(`btn-2`).style.visibility = "hidden"
        document.getElementById(`btn-3`).style.visibility = "hidden"
        document.getElementById(`btn-4`).style.visibility = "hidden"
        document.getElementById(`quesTitle`).style.visibility = "hidden"
        document.getElementById(`remQues`).style.visibility = "hidden"
        localStorage.setItem('recentScore', score)
        responder.score = score;
        uploadResponceToFireStone()
        window.location.replace("https://omkarajagunde.github.io/responderResults.html");
        return
    }
    countQuestion++;
    document.getElementById(`checkCircle-${checkMarkCounter}`).style.visibility = "visible"
    lineAnimation(`#line-${checkMarkCounter}`)
    playProgressSound()

    if (checkMarkCounter == 9) {
        document.getElementById(`successVector`).style.visibility = "visible"
        console.log(user.questionList)

    }
    checkMarkCounter++;

}

let addNewOption = (id, ansIndex) => {
    let option = document.getElementById(id).value
    if (option == '') {
        showSnakBar('enter your answer please!')
    } else {
        user.questionList[countQuestion - 1].ans.push(option)
        user.ansArr.push(ansIndex)
        questionSetter()
        document.getElementById(id).value = ''
        mobileProgressBarUpdate()
    }

}



let gameInitialiser = () => {
    user.name = document.getElementById("nameInput").value;
    if (user.name == '') {
        showSnakBar("Please enter your name! ")
    } else {
        questionSetter()
    }

}

let gamePlayInitialiser = () => {
    responder.name = document.getElementById("nameInput").value;
    if (responder.name == '') {
        showSnakBar("Please enter your name! ")
    } else {
        answerValidator()
    }
}

let showSnakBar = (message) => {
    // Get the snackbar DIV
    let x = document.getElementById("snackbar")

    // Add the "show" class to DIV
    x.className = "show";
    x.innerHTML = message;

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
}

let setAns = (ansIndex) => {
    user.ansArr.push(ansIndex)

    questionSetter()
    mobileProgressBarUpdate()

}

let checkAns = (ansIndex) => {

    if (user.ansArr[quesCounter] == ansIndex) {
        score += 10;
        console.log(quesCounter + ":" + user.ansArr[quesCounter])
    }
    console.log(quesCounter + ":" + user.ansArr[quesCounter])
    quesCounter++;
    answerValidator()
    mobileProgressBarUpdate()
}

let setResponderResults = () => {
    let vScore = localStorage.getItem('recentScore')
    let correctAnsCount = vScore / 10;
    document.getElementById("scoreText").innerHTML = `${vScore}`
    document.getElementById("correctAnsText").innerHTML = `you got ${correctAnsCount} / 10 right`
}

let answerInit = () => {
    token = new Uri('/http://' + window.location.hostname + ':5500' + window.location.pathname + '/' + window.location.search).getQueryParamValue('identifier')
    console.log("Token : ", token)
    getFromFireStone()
}

let idGenerator = () => {
    var ALPHABET = '0123456789';
    var ID_LENGTH = 8;
    var rtn = '';
    for (var i = 0; i < ID_LENGTH; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
}

let uploadToFireStone = () => {
    _uniqueID = idGenerator()

    let db = firebase.database().ref("users/" + _uniqueID)
    db.set(user).then(function() {
        console.log("uploaded id :", _uniqueID)
        makeQuestionURL()
        localStorage.setItem("url", url)
        window.location.replace("https://omkarajagunde.github.io/shareQuestionsPage.html");
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });

    return
}

let uploadResponceToFireStone = () => {
    _responderID = idGenerator()
    let db = firebase.database().ref("responderList/" + _responderID)
    db.set(responder).then(function() {
        console.log("uploaded responders id :", _responderID)
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
    firebase.database().ref('/users/' + token).child('responders').push(_responderID)

}

let getFromFireStone = () => {

    var doc = firebase.database().ref('users/' + token);
    doc.on('value', function(snapshot) {
        console.log(snapshot.val())
        user = snapshot.val()
        console.log(user)
    });
    return
}
