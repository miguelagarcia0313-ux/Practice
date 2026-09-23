$(function() {
  var gameList, newItemForm, newItemButton;
  var item = '';
  var games = [];

  gameList = $('ul');
  newItemForm = $('#newItemForm');
  newItemButton = $('#newItemButton');

  $('li').each(function() {
    games.push({ title: $(this).text() });
  });

  function updateCount() {
    var items = $('li').length;
    $('#counter').text(`${items}`);
  }

  function renderGames() {
    gameList.empty();
    $.each(games, function(index, game) {
      $('<li></li>').text(game.title).appendTo(gameList);
    });
    updateCount();
  }

  renderGames();

  newItemButton.show();
  newItemForm.hide();
  $('#showForm').on('click', function() {
    newItemButton.hide();
    newItemForm.show();
  });

  newItemForm.submit(function(e) {
    e.preventDefault();
    var text = $('input:text').val().trim();

    if (text !== '') {
      games.push({ title: text });
      renderGames();
      $('input:text').val('');
    }
  });
});