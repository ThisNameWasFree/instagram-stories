function initPlayer(params) {
    const target = document.querySelector(params.target);

    if (target === null || params.slides === undefined) {
        return;
    }

    let timelineChunks = '';
    let playerChunks = '';
    let isFirst = true;

    for (const el of params.slides) {
        timelineChunks += `
            <div class="timeline-chunk ${ isFirst ? 'timeline-chunk-active' : '' }">
              <div class="timeline-chunk-inner"></div>
            </div>
        `;

        playerChunks += `
            <div class="player-chunk ${ isFirst ? 'player-chunk-active' : '' }">
              <img src="${ el.url }" alt="{ el.alt || '' }">
            </div>
        `;

        isFirst = false;
    }

    target.innerHTML = `
        <div class="player">
          <div class="timeline">
            ${ timelineChunks }
          </div>

          <div class="player-content-wrapper">
            <div class="player-chunk-switcher player-chunk-prev"></div>
            <div class="player-chunk-switcher player-chunk-next"></div>
            
            <div class="player-content">
              ${ playerChunks }
            </div>
          </div>
        </div>
    `;

    target.querySelector('.player-chunk-prev').addEventListener('click', function() {
        moveClass('player-chunk-active', 'previousElementSibling');

        moveClass('timeline-chunk-active', 'previousElementSibling', (el) => {
            const inner = el.querySelector('.timeline-chunk-inner');
            const width = parseFloat(inner.style.width) || 0;

            el.querySelector('.timeline-chunk-inner').style.width = '';

            return width <= 20;
        });
    });

    target.querySelector('.player-chunk-next').addEventListener('click', next);

    function moveClass(className, method, pred) {
        const active = target.querySelector('.' + className);
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
            const active = target.querySelector('.timeline-chunk-active').querySelector('.timeline-chunk-inner');
            const width = parseFloat(active.style.width) || 0;

            if (width === 100) {
                next();
                return;
            }

            active.style.width = String(width + step) + '%';

        }, time * 1000 * step / 100);
    }

    runInterval(5, 1);
    runInterval(params.delayPerSlide || 1, 1);
}