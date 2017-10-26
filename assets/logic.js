var animals = ["pig", "snake", "cat", "dog", "fish"];


createAnimalButtons();

$('#addAnimal').on('click', function() {
    var animalEntered = $('#animalInput').val().trim();
    animals.push(animalEntered);
    $('#animalInput').val('');
    createAnimalButtons();

    return false;
});
$(document.body).on('click', '.button-list', function() {
    var animalClicked = $(this).data('animal');
    var query = 'https://api.giphy.com/v1/gifs/search?q=' + animalClicked + '&limit=10&api_key=4kpATRurpC7jUXR9xC5hhfZ0oUBfKvxR';
    $('#animals').empty();
    $.ajax({
        url: query,
        method: 'GET'
    }).done(function(response) {

        var results = response.data;

        for (i = 0; i < results.length; i++) {

            var newGif = $('<div class="col-sm-4">');

            var rating = results[i].rating.toUpperCase();

            var p = $('<p>').html('Rating: ' + rating);

            p.addClass('text-center');

            var img = $('<img>');


            img.attr('src', results[i].images.fixed_height_small_still.url);

            img.attr('data-still', results[i].images.fixed_height_small_still.url);

            img.attr('data-animate', results[i].images.fixed_height_small.url);

            img.attr('data-clicked', 'still');

            img.addClass('gif-margin gif center-block panel');

            newGif.append(p);
            newGif.append(img);
            $('#animals').append(newGif);
        }
    });
});

$(document.body).on('click', '.gif', function() {
    var click = $(this).attr('data-clicked');
    if (click === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-clicked', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-clicked', 'still');
    }
});
function createAnimalButtons() {
    $('#animalButtons').empty();

    for (var i = 0; i < animals.length; i++) {
        var button = $('<button>').addClass('btn btn-primary button-list');
        button.attr('data-animal', animals[i]).html(animals[i]);
        $('#animalButtons').append(button);
    }
}
