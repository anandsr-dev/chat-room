window.onload = (e) => {
  broadcastMessage(username)
}

const socket = io("http://localhost:3000");

socket.on("message", (data) => {
  chatMessageDisplay(data.name, data.message)
})

socket.on("user-created", (name) => {
    broadcastMessage(name)
})



const submitForm = document.getElementById("send-form")

submitForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const message = document.getElementById('chat-message')
  if(message.value) {
    socket.emit('message', {name: username, message: message.value})
    selfMessageDisplay(message.value)
    socket.emit("chat-message", message.value)
    message.value = ''
  }
})

function broadcastMessage(name) {
    const messageWrapper = document.querySelector('.message-wrapper')
    const broadcastDiv = document.createElement('div')
    const p = document.createElement('p')
    p.innerText = `${name} has joined the chat`
    broadcastDiv.appendChild(p)
    broadcastDiv.classList.add('broadcast')
    messageWrapper.appendChild(broadcastDiv)
}

function chatMessageDisplay(name, message) {
  const messageWrapper = document.querySelector('.message-wrapper')
  const messageDiv = document.createElement('div')
  messageDiv.classList.add('message')
  const author = document.createElement('span')
  author.innerText = name
  author.classList.add('author')
  const messageElement = document.createElement('p')
  messageElement.innerText = message
  messageElement.classList.add('message-text')
  messageDiv.appendChild(author)
  messageDiv.appendChild(messageElement)
  messageWrapper.appendChild(messageDiv)
}

function selfMessageDisplay(message) {
    const messageWrapper = document.querySelector('.message-wrapper')
    const messageDiv = document.createElement('div')
    messageDiv.classList.add('self-message')
    const author = document.createElement('span')
    author.innerText = "You"
    author.classList.add('author')
    const messageElement = document.createElement('p')
    messageElement.innerText = message
    messageElement.classList.add('message-text')
    messageDiv.appendChild(author)
    messageDiv.appendChild(messageElement)
    messageWrapper.appendChild(messageDiv)
}
