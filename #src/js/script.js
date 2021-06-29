function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});

function DropDown(el) {
    this.dd = el;
    this.initEvents();
}
DropDown.prototype = {
    initEvents : function() {
        var obj = this;

        obj.dd.on('click', function(event){
            $(this).toggleClass('active');
            event.stopPropagation();
        });
    }
}

jQuery(($) => {
    $('.select').on('click', '.info__select-head', function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $('.info__placeholder-select').removeClass('placeholder__focus');
            $(this).next().fadeOut();
        } else {
            $('.info__select-head').removeClass('open');
            $('.info__select-list').fadeOut();
            $(this).addClass('open');
            $('.info__placeholder-select').addClass('placeholder__focus');
            $(this).next().fadeIn();
        }
    });

    $('.select').on('click', '.info__list-item', function () {
        $('.info__select-head').removeClass('open');
        $('.info__placeholder-select').addClass('placeholder__focus');
        $(this).parent().fadeOut();
        $(this).parent().prev().text($(this).text());
        $(this).parent().prev().prev().val($(this).text());
    });

    $(document).click(function (e) {
        if (!$(e.target).closest('.select').length) {
            $('.info__select-head').removeClass('open');
            $('.info__select-list').fadeOut();
        }
    });

    $('#link1').click(function(e){
      if (!$(this).hasClass('active')) {
        $(this).addClass('active');
        $('#link2,#link3,#link4,.header__content ul').removeClass('active');
      } 
    });
    $('#link2').click(function(e){
      if (!$(this).hasClass('active')) {
        $(this).addClass('active');
        $('#link1,#link3,#link4,.header__content ul').removeClass('active');
      } 
    });

    $('#link3').click(function(e){
      if (!$(this).hasClass('active')) {
        $(this).addClass('active');
        $('#link2,#link1,#link4,.header__content ul').removeClass('active');
      } 
    });

    $('#link4').click(function(e){
      if (!$(this).hasClass('active')) {
        $(this).addClass('active');
        $('#link2,#link3,#link1,.header__content ul').removeClass('active');
      } 
    });
});



var levels = document.querySelector('.js__item')
var progress = document.querySelector('.js__progress')
var knob = document.querySelector('.js__knob')

var levelsBox, knobBox, points, min, max

knob.addEventListener('mousedown', function(e) {
  e.preventDefault()

  window.addEventListener('mousemove', dragging)
  window.addEventListener('mouseup', drop)

  knob.style.transition = '0s'
  progress.style.transition = '0s'

  var knobBox = knob.getBoundingClientRect()

  var shift = e.x - knobBox.left;

  function dragging(e) {
    var x = 0

    if (e.x < min) x = min
    else if (e.x > max) x = max
    else x = e.x

    X = x - shift - levelsBox.left
    knob.style.transform = `translateX(${X}px) rotate(-45deg)`
    progress.style.width = X + knobBox.width / 2 + 'px'
  }

  function drop(e) {
    var closest = getClosest(X)

    knob.style.transition = '0.5s'
    progress.style.transition = '0.5s'

    knob.style.transform = `
    	translateX(${closest - knobBox.width / 2.7}px)
    	rotate(-45deg)
     `
    progress.style.width = closest + 'px'

    window.removeEventListener('mousemove', dragging)
    window.removeEventListener('mousemove', drop)
  }
})

function getClosest(v) {
  return points.reduce((prev, curr) =>
    (Math.abs(curr - v) < Math.abs(prev - v) ? curr : prev)
  )
}

function init() {
  levelsBox = levels.getBoundingClientRect()
  knobBox = knob.getBoundingClientRect()

  points = [
    0,
    levelsBox.width * 0.25,
    levelsBox.width * 0.5,
    levelsBox.width
  ]

  min = levelsBox.left,
    max = levelsBox.right,

    knob.style.transform = `translateX(-${knobBox.width / 2.7}px) rotate(-45deg)`
  progress.style.width = 0
}

window.onresize = init

init()


$('.content__toggle').on('click', function(){
  $('.header__content ul').toggleClass('active');
});