document.querySelector('.player-chunk-prev').addEventListener('click', function() {
    moveClass('player-chunk-active', 'previousElementSibling');

    moveClass('timeline-chunk-active', 'previousElementSibling', (el) => {
        const inner = el.querySelector('.timeline-chunk-inner');
        const width = parseFloat(inner.style.width) || 0;

        el.querySelector('.timeline-chunk-inner').style.width = '';

        return width <= 20;
    });
});

document.querySelector('.player-chunk-next').addEventListener('click', next);

function moveClass(className, method, pred) {
    const active = document.querySelector('.' + className);
    const next = active[method];

    if (pred && !pred(active)) {
        return null;
    }

    if (next) {
        active.classList.remove(className);
        next.classList.add(className);

        return active;
    }

    return null;
}

function next() {
    moveClass('player-chunk-active', 'nextElementSibling');

    const element = moveClass('timeline-chunk-active', 'nextElementSibling');

    if (element) {
        element.querySelector('.timeline-chunk-inner').style.width = '';
    }
}

let timer;

function runInterval(time, step) {
    clearInterval(timer);

    timer = setInterval(() => {
        const active = document.querySelector('.timeline-chunk-active').querySelector('.timeline-chunk-inner');
        const width = parseFloat(active.style.width) || 0;

        if (width === 100) {
            next();
            return;
        }

        active.style.width = String(width + step) + '%';

    }, time * 1000 * step / 100);
}

runInterval(5, 1);