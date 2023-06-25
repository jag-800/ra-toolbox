function countWords() {
  var sentence = document.getElementById('en_content').value;
  var words = sentence.trim().split(/\s+/);
  var wordCount = words.filter(function(word) {
    return word !== '';
  }).length;
  return wordCount;
}

function updateWordCount() {
  var wordCount = countWords();
  document.getElementById('wordCount').textContent = wordCount;
}

document.addEventListener('DOMContentLoaded', function() {
  var contentElement = document.getElementById('en_content');

  contentElement.addEventListener('input', function() {
    updateWordCount();
  });
});


