$(function() {
  // Cache DOM elements
  var gameList, newItemForm, newItemButton;
  var item = '';
  var games = [];

  gameList = $('ul');
  newItemForm = $('#newItemForm');
  newItemButton = $('#newItemButton');

  // Initialize games array with existing list items
  $('li').each(function() {
    games.push({ title: $(this).text() });
  });
// Update the counter with the initial number of items
  function updateCount() {
    var items = $('li').length;
    $('#counter').text(`${items}`);
  }
// Render the list of games
  function renderGames() {
    gameList.empty();
    $.each(games, function(index, game) {
      $('<li></li>').text(game.title).appendTo(gameList);
    });
    updateCount();
  }
// Initial render of the games list
  renderGames();

  // Show the new item form when the button is clicked
  newItemButton.show();
  newItemForm.hide();
  $('#showForm').on('click', function() {
    newItemButton.hide();
    newItemForm.show();
  });

  // Handle form submission to add a new game
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