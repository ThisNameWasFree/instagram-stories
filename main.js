document.querySelector('.player-chunk-prev').addEventListener('click', function() {
    moveClass('timeline-chunk-active', 'previousElementSibling');
    moveClass('player-chunk-active', 'previousElementSibling');
});

document.querySelector('.player-chunk-next').addEventListener('click', function() {
    moveClass('timeline-chunk-active', 'nextElementSibling');
    moveClass('player-chunk-active', 'nextElementSibling');
});

function moveClass(className, method) {
    let active = document.querySelector('.' + className);
    let next = active[method];

    if (next) {
        active.classList.remove(className);
        next.classList.add(className);
    }
}
