
const questions = [

    {
        question: "1. If you had a completely free day to look for visual inspiration, where would you go?",

        answers: [
            {
                text: "A quiet spot with your headphones on, letting your mind wander and imagining a fantasy world.",
                category: "dreamy",
                points: 5
            },
            {
                text: "A walk through a botanical garden, park, or beach, observing organic leaf shapes and lighting.",
                category: "nature",
                points: 3
            },
            {
                text: "A contemporary art gallery or an urban street district filled with vivid graffiti and neon signs.",
                category: "bold",
                points: 1
            },
            {
                text: "An antique bookstore or stationery shop, closely inspecting paper textures, intricate engravings, and small patterns.",
                category: "detail",
                points: 2
            }
        ]
    },

    {
        question: "2. What element is most essential to have in your artwork or designs?",

        answers: [
            {
                text: "A magical atmosphere, soft lighting, or surreal elements that spark imagination.",
                category: "dreamy",
                points: 2
            },
            {
                text: "Earthy color palettes, organic textures, or floral and fauna motifs.",
                category: "nature",
                points: 5
            },
            {
                text: "High-contrast color clashes, unconventional abstract shapes, or a visual style that breaks traditional rules.",
                category: "bold",
                points: 3
            },
            {
                text: "Impeccably clean linework, intricate repeating patterns, or hidden details that reveal themselves up close.",
                category: "detail",
                points: 1
            }
        ]
    },

    {
        question: "3. When you are starting a brand new creative piece, what is your workflow like?",

        answers: [
            {
                text: "You go with the flow of your mood, often daydreaming about the story behind the piece before touching a canvas.",
                category: "dreamy",
                points: 1
            },
            {
                text: "You gather a mood board of real-life photos of plants, skies, or natural landscapes to guide your color choices.",
                category: "nature",
                points: 2
            },
            {
                text: "You jump straight into loose sketching, experimenting with new techniques.",
                category: "bold",
                points: 5
            },
            {
                text: "You meticulously map out a precise grid, skeletal sketch, or structure before adding any color or line weight.",
                category: "detail",
                points: 3
            }
        ]
    },

    {
        question: "4. Which tools or mediums make you feel most at home when creating?",

        answers: [
            {
                text: "Watercolor with soft, blending transitions or digital brushes featuring glowing effects.",
                category: "dreamy",
                points: 3
            },
            {
                text: "Acrylics, colored pencils, or natural texture mediums on rough-grain canvas or kraft paper.",
                category: "nature",
                points: 1
            },
            {
                text: "Spray paint, chunky markers, or digital software with expressive, heavy-textured brushes.",
                category: "bold",
                points: 2
            },
            {
                text: "Fine ink pens, sharp mechanical pencils, or vector art with precise lines.",
                category: "detail",
                points: 5
            }
        ]
    },

    {
        question: "5. If someone looks at your artwork, what is the ultimate compliment you want to hear?",

        answers: [
            {
                text: '"Your art made me feel like I stepped into a peaceful, beautiful dream."',
                category: "dreamy",
                points: 3
            },
            {
                text: '"Looking at this feels like taking a deep breath of fresh air out in nature."',
                category: "nature",
                points: 4
            },
            {
                text: '"This is stunning! It is completely different from anything else out there—so brave and unique."',
                category: "bold",
                points: 2
            },
            {
                text: '"Mind-blowing! The detail is so immaculate; the longer I look, the more hidden gems I find."',
                category: "detail",
                points: 6
            }
        ]
    }

];

const artStyles = {

    dreamy: {
        name: "The Dreamy Creator",

        description:
            "You weave imagination and emotion into every piece. Your art acts as a portal, inviting viewers to escape reality and drift into a pensive, magical world of soft light and surreal beauty.",
        image: "images/Lucy-dreamy.png"
    },

    nature: {
        name: "The Nature Lover",

        description:
            "Grounded, organic, and deeply harmonious. Your aesthetic captures the quiet tranquility of the natural world, using earthy tones and living textures to bring a breath of fresh air to everything you design.",

        image: "images/lucy-nature.png"
    },

    bold: {
        name: "The Bold Experimenter",

        description:
            "Fearless and boundary-pushing. You don't play by the rules—you rewrite them. Your work thrives on striking color clashes, abstract expression, and unapologetic originality that commands attention.",
        image: "images/lucy-experiment .png"
    },

    detail: {
        name: "The Detail Enthusiast",

        description:
            "A true perfectionist of precision. You find joy in the microscopic elements—intricate patterns, razor-sharp lines, and hidden details that reward anyone patient enough to look closely.",

        image: "images/lucy-detail.png"
    }

};

const quizQuestions = document.getElementById("quiz-questions");

const quizResult = document.getElementById("quiz-result");


let currentQuestion = 0;
let userAnswers = [];
let userCategory = null;

function showQuestion() {
    const questionData = questions[currentQuestion];
    let answerHTML = "";
    questionData.answers.forEach(function (answer, index) {
        answerHTML += `
            <button
                type="button"
                class="answer-button"
                data-category="${answer.category}"
                data-points="${answer.points}"
            >

                <strong>${String.fromCharCode(65 + index)}.</strong>

                ${answer.text}

            </button>

        `;

    });


    quizQuestions.innerHTML = `
        <div class="question-box">
            <h3>${questionData.question}</h3>
            <div class="answer-options">
                ${answerHTML}
            </div>

            <p class="question-progress">
                Question ${currentQuestion + 1} of ${questions.length}
            </p>

        </div>

    `;


    const answerButtons =
        document.querySelectorAll(".answer-button");


    answerButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedAnswer = {
                category: button.getAttribute("data-category"),
                points: Number(button.getAttribute("data-points"))
            };


            userAnswers.push(selectedAnswer);
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                calculateResult();
            }

        });

    });

}


function calculateResult() {
    const scores = {
        dreamy: 0,
        nature: 0,
        bold: 0,
        detail: 0

    };

    userAnswers.forEach(function (answer) {
        scores[answer.category] += answer.points;

    });

    let highestScore = Math.max(...Object.values(scores));
    let winningCategories = Object.keys(scores).filter(function (category) {

        return scores[category] === highestScore;

    });

    const randomIndex = Math.floor(
        Math.random() * winningCategories.length

    );
    userCategory = winningCategories[randomIndex];
    showResult();

}

function showResult() {
    const result = artStyles[userCategory];
    quizQuestions.innerHTML = "";

    quizResult.innerHTML = `

        <div class="result-card">
            <p>YOUR ART STYLE</p>
            <h2>${result.name}</h2>
            <img
                src="${result.image}"
                alt="${result.name}"
                class="result-image"
            >

            <p>${result.description}</p>
            <button
                type="button"
                id="retake-quiz-button"
            >

                Retake Quiz
            </button>
        </div>
    `;

    quizResult.scrollIntoView({
        behavior: "smooth",
        block: "center"

    });
    document

        .getElementById("retake-quiz-button")
        .addEventListener("click", function () {
            currentQuestion = 0;
            userAnswers = [];
            userCategory = null;
            quizResult.innerHTML = "";
            showQuestion();

        });
}


if (quizQuestions) {
    showQuestion();

}

// ART CHALLENGE GENERATOR

const challengeIdeas = {
    dreamy: [
        "Create a dreamy landscape using soft pastel colors.",
        "Paint a magical garden filled with imaginary flowers.",
        "Draw your dream bedroom using your favorite colors."
    ],

    nature: [
        "Paint a flower or plant that you can find around you.",
        "Create an artwork inspired by your favorite season.",
        "Draw a peaceful landscape with trees, flowers, and animals."
    ],

    bold: [
        "Create an artwork using three bright and contrasting colors.",
        "Draw something ordinary in a completely unusual way.",
        "Experiment with abstract shapes and unexpected color combinations."
    ],

    detail: [
        "Draw an object around you and focus on its tiny details.",
        "Create a pattern using different shapes and lines.",
        "Draw a close-up illustration of a small object."
    ]
};


// HTML ELEMENTS
const personalChallengeButton =
    document.getElementById("personal-challenge-button");

const randomChallengeButton =
    document.getElementById("random-challenge-button");

const challengeResult =
    document.getElementById("challenge-result");


// DISPLAY CHALLENGE
function displayChallenge(category, challenge) {

    const categoryNames = {
        dreamy: "The Dreamy Creator",
        nature: "The Nature Lover",
        bold: "The Bold Experimenter",
        detail: "The Detail Enthusiast"
    };

    challengeResult.innerHTML = `
        <div class="challenge-card">
            <p>YOUR LITTLE ART CHALLENGE</p>
            <h3>${categoryNames[category]}</h3>
            <p>${challenge}</p>
        </div>
    `;
}


// PERSONAL CHALLENGE
personalChallengeButton.addEventListener("click", function () {

    if (!userCategory || !challengeIdeas[userCategory]) {
        challengeResult.innerHTML = `
            <div class="challenge-card">
                <p>Complete the Art Style Quiz first
                to discover your personal challenge!</p>
            </div>
        `;
        return;
    }

    const ideas = challengeIdeas[userCategory];

    const randomIndex = Math.floor(Math.random() * ideas.length);

    displayChallenge(userCategory, ideas[randomIndex]);

});


// RANDOM CHALLENGE
randomChallengeButton.addEventListener("click", function () {

    const categories = Object.keys(challengeIdeas);

    const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

    const ideas = challengeIdeas[randomCategory];

    const randomIndex = Math.floor(Math.random() * ideas.length);

    displayChallenge(randomCategory, ideas[randomIndex]);

});
