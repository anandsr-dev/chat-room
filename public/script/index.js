let submitButton;
window.onload = function () {
    submitButton = document.getElementById("submit-button");
}

function submit(e) {
    e.preventDefault();
    loadingScreen();
    e.submit();
}

function loadingScreen () {
    document.getElementsByClassName("container")[0].style.opacity = "0.1";
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