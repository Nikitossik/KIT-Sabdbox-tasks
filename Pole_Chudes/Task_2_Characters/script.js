$(document).ready(function(){

    var bots_images = {
        "watson": "images/dr_watson.png",
        "holmes": "images/sherlok_holmes.png",
        "potter": "images/potter.png",
        "germiona": "images/germiona.png"
    };

    var bot1 = $('.bot1'), 
        bot2 = $('.bot2'),
        char = Object.keys(bots_images),
        img1, img2;

    var a = Math.floor(Math.random() * char.length);
        
    img1 = bots_images[char[a]];
    char.splice(a, 1);

    a = Math.floor(Math.random() * char.length);

    img2 = bots_images[char[a]];

    bot1.find('img').attr('src', img1);
    bot2.find('img').attr('src', img2);

    var showman_phrases = [
        'Сектор "Приз" на барабане!',
        'Сектор "Плюс" на барабане!',
        'Сектор "Ключ" на барабане!',
        'Переход хода!', 'Очки удвоены!',
        'Есть такая буква!',
        'Такой буквы нет!'
    ];

    $('#say-btn').click(function(){
        var phrase_box = $('.show-man-box .phrase-box'),
            phrase = showman_phrases[Math.floor(Math.random() * showman_phrases.length)];

        phrase_box.find('#phrase').html(phrase);
        phrase_box.fadeIn();
        setTimeout(function(){
            phrase_box.fadeOut();
        }, 2000);

    });



});