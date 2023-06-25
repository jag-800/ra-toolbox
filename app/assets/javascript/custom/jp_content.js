document.addEventListener('DOMContentLoaded', function() {
  var contentElement = document.getElementById('jp_content');
  var characterCountElement = document.getElementById('characterCount');
  var characterCountWithoutNewlinesElement = document.getElementById('characterCountWithoutNewlines');

  contentElement.addEventListener('input', function() {
    var content = contentElement.value;
    var characterCount = content.length;
    var characterCountWithoutNewlines = content.replace(/\n/g, '').length;

    characterCountElement.textContent = characterCount;
    characterCountWithoutNewlinesElement.textContent = characterCountWithoutNewlines;
  });
});