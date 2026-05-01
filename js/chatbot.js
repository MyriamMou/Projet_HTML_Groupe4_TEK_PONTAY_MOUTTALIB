class ChatHistory {
    constructor() {
        this.messages = [];
    }
    addMessage(message) {
        this.messages.push(message);
    }
    getHistory() {
        return this.messages;
    }
}

const chatHistory = new ChatHistory();

window.addEventListener("beforeunload", function () {
    sessionStorage.setItem(
        "chatHistory",
        JSON.stringify(chatHistory.getHistory())
    );
});

window.addEventListener("load", function () {
    const savedHistory = sessionStorage.getItem("chatHistory");

    if (savedHistory) {
        const messages = JSON.parse(savedHistory);

        messages.forEach(msg => {
            showMessage(msg.text, msg.type);
        });
    }
});

function saveMessages() {
    console.log('Saving chat history...');
    console.log(historyMessages.getHistory());
    sessionStorage.setItem('chatHistory',
    JSON.stringify(historyMessages.getHistory().map(msg => ({ text: msg.text, type: msg.type }))));
}

function loadMessages() { 
    const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory'));
    if (chatHistory) {
        chatHistory.forEach(message => {
            showMessage(message.text, message.sender);
        });
    }
}

// Fonction pour récupérer et traiter le JSON
function fetchJSON(url) {
    // Récupérer le JSON à partir de l'URL fournie
    fetch(url)
    //then est une méthode qui retourne une promesse et prend en paramètre une
        //fonction callback qui sera exécutée une fois la promesse résolue
        .then(response => {
            // Vérifier si la réponse est correcte
            if (!response.ok) {
                // Si la réponse n'est pas correcte, lancer une erreur
                throw new Error('Network response was not ok');
            }
            // Si la réponse est correcte, retourner le JSON
            return response.json();
        })
        //then ici permettra de récupérer le JSON retourné par la promesse
        .then(data => {
            // Vérifier si le JSON est vide ou mal formé
            if (Object.keys(data).length === 0 && data.constructor === Object) {
            // Si le JSON est vide ou mal formé, lancer une erreur
                throw new Error('Empty JSON or malformed JSON');
                }
                //On affiche le JSON dans la console. Il s'agit d'un objet contenant les
                // intentions du chatbot
                console.log(data);
                // Passer les intentions à la fonction sendMessage qui sera définie plus tard
                sendMessage(data.intents);
                })
                //catch est une méthode qui retourne une promesse et prend en paramètre une
                //fonction callback qui sera exécutée en cas d’erreur
                .catch(error => {
                // En cas d’erreur, afficher un message d’erreur dans la console
                console.error('There was a problem with the fetch operation:', error);
        }) ;
}

function showMessage(message, type) {
    const chatBox = document.getElementById("chat-box");

    const messageElement = document.createElement("div");
    messageElement.classList.add("message", type);
    messageElement.textContent = message;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;

    chatHistory.addMessage({
        text: message,
        type: type
    });
}

function sendMessage(intents) {
    const input = document.getElementById("user-input");
    const userMessage = input.value.trim();

    if (userMessage === "") return;

    showMessage(userMessage, "user");

    const botResponse = processMessage(intents, userMessage);
    showMessage(botResponse, "bot");


    input.value = "";
}

function processMessage(intents, message) {
    let response = "Désolé, je n'ai pas compris votre message.";
    intents.forEach(intent => {
        intent.patterns.forEach(pattern => {
            if (message.toLowerCase().includes(pattern.toLowerCase())) {
                response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
            }
        });
    });
    return response;
}   