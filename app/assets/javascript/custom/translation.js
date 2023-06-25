// document.addEventListener('DOMContentLoaded', function() {
//   const translateButton = document.getElementById('translateButton');
//   const translationResult = document.getElementById('translationResult');
//   const textToTranslate = document.getElementById('textToTranslate');
//   const targetLanguage = document.getElementById('targetLanguage');
//   translateButton.addEventListener('click', function() {

//     const text = textToTranslate.value;
//     const language = targetLanguage.value;
//     const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
//     fetch('/todos/translation', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-CSRF-Token': csrfToken
//       },
//       body: JSON.stringify({ text: text, target_lang: language })
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         const translation = data.translation;
//         const alternatives = data.alternatives;
        

//         const translationText = document.getElementById('translationText');
//         translationText.innerText = `翻訳結果: ${translation}`;

//         const alternativesContainer = document.getElementById('alternativesContainer');
//         alternativesContainer.innerHTML = ''; // 既存の候補をクリア

//         if (alternatives && alternatives.length > 0) {
//           alternatives.forEach(function(candidate) {
//             const alternativeElement = document.createElement('p');
//             alternativeElement.textContent = candidate;
//             alternativesContainer.appendChild(alternativeElement);

//           });
//         } else {
//           const noAlternativesElement = document.createElement('p');
//           noAlternativesElement.textContent = '他の候補はありません。';
//           alternativesContainer.appendChild(noAlternativesElement);
//         }

//         translationResult.style.display = 'block';

//         console.log(data.alternatives);
//       })
//       .catch(error => {
//         console.error('翻訳エラー:', error);
//       });
//   });
// });

// 翻訳結果の他の候補を表示する関数
document.addEventListener("DOMContentLoaded", function() {
  function displayAlternatives(alternatives) {
    // 候補表示用の要素を取得
    const alternativesContainer = document.getElementById('alternativesContainer');

    // 候補をクリア
    alternativesContainer.innerHTML = '';

    // 候補を表示
    if (alternatives && alternatives.length > 0) {
      const ul = document.createElement('ul');
      alternatives.forEach((alternative) => {
        const li = document.createElement('li');
        li.textContent = alternative;
        ul.appendChild(li);
      });
      alternativesContainer.appendChild(ul);
    } else {
      const p = document.createElement('p');
      p.textContent = '他の候補は利用できません。';
      alternativesContainer.appendChild(p);
    }
  }

  // 翻訳ボタンのクリックイベントハンドラ
  document.getElementById('translateButton').addEventListener('click', () => {
    const textToTranslate = document.getElementById('textToTranslate').value;
    const targetLanguage = document.getElementById('targetLanguage').value;

    // DeepL APIにリクエストを送信
    fetch('/todos/translation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({ text: textToTranslate, target_lang: targetLanguage })
    })
      .then((response) => response.json())
      .then((data) => {
        const translationText = document.getElementById('translationText');
        translationText.textContent = data.translation;

        displayAlternatives(data.alternatives);
      })
      .catch((error) => {
        console.error('Translation request error:', error);
      });
  });


});