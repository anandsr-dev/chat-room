let submitButton;
window.onload = function () {
    submitButton = document.getElementById("submit-button");
}

function submit(e) {
    e.preventDefault();
    loadingScreen();
    e.submit();
    // const name = document.getElementById("name").value;
    // fetch(`http://localhost:3000/room?name=${name}`)
}

function loadingScreen () {
    document.getElementsByClassName("container")[0].style.opacity = "0.1";
    console.log('called')
    let loading = document.getElementById("loading");
    loading.style.display = "block";
    submitButton.disabled = true;
}

function unloadedScreen () {
    document.getElementsByClassName("container")[0].style.opacity = "1";
    let loading = document.getElementById("loading");
    loading.style.display = "none";
    submitButton.disabled = false;
}