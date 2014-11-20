// This is the seconds counter.
var c = 0;
var t;
var timer_is_on = 0;

function displayTime() {
    document.getElementById("time").value = c;
    c = c + 1;
    t = setTimeout(function(){displayTime()}, 1000);
}

function startCount() {
    if (!timer_is_on) {
        timer_is_on = 1;
        displayTime();
    }
}

function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
    c = 0
}