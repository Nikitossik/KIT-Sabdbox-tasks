$(document).ready(function(){ 

    //функция генерации алфавита 
    
    function generate_keyboad(){
        var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var block = $('.keyboard_block .keyboard');
        block.html('');

        $.each(alphabet, function(index, value){
            var letter = $('<button class="key"></button>');
            letter.html(value).prop('draggable', 'true').attr('id', letter.html());
            block.append(letter);
        });
    }
    
    generate_keyboad();

    var wordlist = {}, //объект для хранения данных json
        inputs = $('input[type="radio"]'), //инпуты для выбора темы игры
        keys = $('.key'), // сгенерированная клава, что будет перетаскиваться
        target_area = $('.drop_field'), // цель назначения для перетаскиваемых клавиш
        theme_span = $('#theme'), // для отображения темы
        word_span = $('#word'), // для отображения слова
        choosen_theme = '', // выбранная тема с помощью инпутов
        random_word = '', //рандомное слово по теме
        answer = [], //массив-ответ, который меняеться по ходу игры
        words = []; // массив всех слов темы


    //достаем из файла .json данные
    
    $.getJSON( "wordlist.json", function( data ) {
        $.each( data, function( key, val ) {
            wordlist[key] = val;
          });
    });

    //при выборе темы пользователем, печатаем ее и выбираем рандомное слово 

    $.each(inputs, function(){
        $(this).on('change',(function(){
            choosen_theme = $(this).val();
            words = Object.keys(wordlist[choosen_theme]);
            theme_span.html(choosen_theme);
            random_word = words[Math.floor(Math.random() * words.length)];
            answer = [];
            $.each(random_word.split(''), function(index){ // запись слова в массив и отображение
                let letter = $('<span></span>');
                if (random_word[index] == '-') letter.html('-');
                else letter.html('_');
                answer[index] = letter;
            });
            word_span.html(answer);
            var dragged_elems = target_area.find('.key');
            if (dragged_elems){
                $.each(dragged_elems, function(){
                    $(this).removeAttr('disabled').removeClass('disabled');
                    $('.keyboard').append($(this));
                });
            }
            target_area.html('<h2 class = "message">Drag your letter here:</h2>');

        }));
    });

    // при нажатии на клавиши, проверка на соответствие буквы в слове

    // $.each(keys, function(){
    //     $(this).on('click', function(){
    //         button = $(this);
    //         button.prop('disabled', 'true').addClass('disabled');
    //         $.each(random_word.split(''), function(index, value){
    //             let letter = button.html().toLowerCase();
    //             if (value === letter) answer[index].html(letter).addClass('opened_letter');
    //         });
    //         word_span.html(answer);
    //     });
    // });

    // делаем таргет целевым элементом

    target_area.on('dragover', function(e){
        e.originalEvent.preventDefault();
    });

    target_area.on('drop', function(e){
        e.originalEvent.preventDefault();
        $(this).find('h2.message').fadeOut();

        var data = e.originalEvent.dataTransfer.getData('text');
        console.log(data);
        var button = $('#' + data);
        console.log(button);
        button.prop('disabled', 'true').addClass('disabled');
        $(this).append(button);

        $.each(random_word.split(''), function(index, value){
            let letter = data.toLowerCase();
            if (value === letter) answer[index].html(letter).addClass('opened_letter');
        });
        word_span.html(answer);
    });

    $.each(keys, function(){
        $(this).on('dragstart', function(e){
            e.originalEvent.dataTransfer.effectAllowed = 'move';
            e.originalEvent.dataTransfer.dropEffect = 'move';
            e.originalEvent.dataTransfer.setData('text', $(this).attr('id'));
        });
    });

});


