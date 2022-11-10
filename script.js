$(document).ready(function () {

    let arrNumbers = [];
    let flagEnd = false;

    let rev;
    //function reverse timer 
    function timerReverse(minReverse, secReverse) {

        rev = setInterval(function () {

            if (secReverse == 00) {
                secReverse = 59;
                if (minReverse > 0) {
                    minReverse--;
                }
            } else {
                secReverse--;
            }
            $('.minShow').html(minReverse > 9 ? minReverse : "0" + minReverse + ':');
            $('.secShow').html(+secReverse > 9 ? secReverse : "0" + secReverse);
            if (secReverse == 0 && minReverse == 0) {
                checkResult()
            }

        }, 1000)

    }

    // create arr of  numbers for random display bg
    function createNumbers() {
        arrNumbers = [];
        while (arrNumbers.length != 16) {
            let b = Math.floor(Math.random() * (15 - 0 + 1)) + 0;
            if (arrNumbers.indexOf(b) === -1) {
                arrNumbers.push(b);
            }
        }
        return arrNumbers;


    }

    //arr fo bg position
    let arrPuzzles = [
        {
            bgX: 0,
            bgY: 0,
            'data-count': 0
        },
        {
            bgX: -100,
            bgY: 0,
            'data-count': 1
        },
        {
            bgX: -200,
            bgY: 0,
            'data-count': 2
        },
        {
            bgX: -300,
            bgY: 0,
            'data-count': 3
        },
        {
            bgX: 0,
            bgY: -100,
            'data-count': 4
        },
        {
            bgX: -100,
            bgY: -100,
            'data-count': 5
        },
        {
            bgX: -200,
            bgY: -100,
            'data-count': 6
        },
        {
            bgX: -300,
            bgY: -100,
            'data-count': 7
        },
        {
            bgX: 0,
            bgY: -200,
            'data-count': 8
        },
        {
            bgX: -100,
            bgY: -200,
            'data-count': 9
        },
        {
            bgX: -200,
            bgY: -200,
            'data-count': 10
        },
        {
            bgX: -300,
            bgY: -200,
            'data-count': 11
        },
        {
            bgX: 0,
            bgY: -300,
            'data-count': 12
        },
        {
            bgX: -100,
            bgY: -300,
            'data-count': 13
        },
        {
            bgX: -200,
            bgY: -300,
            'data-count': 14
        },
        {
            bgX: -300,
            bgY: -300,
            'data-count': 15

        },
    ]

    let divSetPuzzles = $('.puzzls-start');

    SetRandomPuzzles();

    //display puzzles random
    function SetRandomPuzzles() {
        createNumbers();
        divSetPuzzles.css({
            'background': 'url(./fish.jpg)',
            'border': '1px solid black'
        })
        for (let j = 0; j < arrNumbers.length; j++) {
            divSetPuzzles[j].style.backgroundPosition =
                arrPuzzles[arrNumbers[j]].bgX + 'px' +
                ' ' + arrPuzzles[arrNumbers[j]].bgY + 'px';
            ;
            divSetPuzzles[j].id = arrPuzzles[arrNumbers[j]]["data-count"];
        }
    }

    //start new game
    $('#new-game').click(function () {
        location.reload();

    });

    // to start drop

    function letDrag() {
        let startDiv;
        $('.puzzls-start').draggable({
            start: function () {
                startDiv = $(this);
                startDiv.css('zIndex', '3')
            }

        });
        $('.puzzls-end').droppable({
            drop: function () {
                $(this).append(startDiv);
                startDiv.css({
                    'left': 0,
                    'top': 0,
                    'z-index': '2'
                });
            }
        });
    }

    //start game

    $('#start-game').click(function () {
        $('#check').removeClass('disable');
        $('#check').attr('disabled', false);

        timerReverse(1, '00');
        letDrag();
        $('#start-game').addClass('disable');
        $('#start-game').attr('disabled', true);
    })



    //check result
    let check = true;

    $('#check').on('click', function () {
        showModal();

    })


    function checkResult() {
        $('#start-game').removeClass('disable');
        $('#start-game').attr('disabled', false);
        for (let i = 0; i < $('.puzBox').length; i++) {
            let f = $('.puzBox').eq(i);
            let g = $('.puzBox').eq(i).children;
            if ($('.puzBox').eq(i)[0].id != arrPuzzles[i]['data-count']) {
                check = false;
                break;
            }
        }

        $('#btn-check').css('display', 'none');
        if (check) {
            showModal()
            $('.info').text('Woohoo, well done, you did it!');
            clearTimeout(rev);

        }
        else {
            showModal()
            $('.info').text(`It's a pity, but you are lost`);
            $('#btn-check').css('display', 'none');
            clearTimeout(rev);
        }

        check = true;
        flagEnd = true;
    }

    function showModal() {
        let modalDiv = $('.modal');
        $('#btn-check').css('display', 'inline');
        $('.modal-container').css({
            backgroundColor: 'rgb(151 146 146)',
            zIndex: 5
        });
        modalDiv.css('top', 60);
        modalDiv.css('left', (window.innerWidth - modalDiv.width()) / 2);
        modalDiv.css('display', 'block');

        let time = +$('.secShow').text();
        if (time > 0) {
            $('.info').html('You still have time, you sure?' + '<span class="minShow"></span><span class="secShow"></span>');
            flagEnd = false;

        }
        $('#btn-close').on('click', function () {
            closeModal();
        })
        $('#btn-check').on('click', function () {
            checkResult();
        })
    }

    function closeModal() {
        $('.modal-container').css({
            backgroundColor: 'white',
            zIndex: -1
        });
        $('.modal').css('display', 'none');
        if (flagEnd) {
            location.reload();
        }
    }

})

