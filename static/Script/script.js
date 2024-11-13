window.addEventListener('scroll', function () {
  var navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    // Bisa diubah sesuai kebutuhan
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
$(document).ready(function () {
  show_message();
});
function show_message() {
  $('#word-list').empty();
  $.ajax({
    type: 'GET',
    url: '/word',
    data: {},
    success: function (response) {
      let rows = response['word'];
      for (let i = 0; i < rows.length; i++) {
        let word = rows[i]['word'];
        let name = rows[i]['name'];
        let jurusan = rows[i]['jurusan'];
        let num = rows[i]['num'];
        let temp_html = ``;

        temp_html = `

<ul class="mt-5">
        <h2>${name}</h2>
         <p class="fst-italic text-secondary">Jurusan : ${jurusan}</p>
        <p class="p-5 bg-secondary text-light rounded">"${word}"</p>
        <button class="btn btn-danger" onclick="delete_word(${num})"> Delete</button>
        <hr>
</ul>`;
        $('#word-list').append(temp_html);
      }
    },
  });
}

function save_word() {
  let word = $('#word').val();
  let name = $('#name').val();
  let jurusan = $('#jurusan').val();

  if (!name) {
    return alert('Hey masukkan namamu');
  }

  if (!jurusan) {
    return alert('Hey masukkan jurusanmu');
  }
  if (!word) {
    return alert('Hey masukkan pesannya');
  }
  $.ajax({
    type: 'POST',
    url: '/save_word',
    data: {
      word_give: word,
      name_give: name,
      jurusan_give: jurusan,
    },
    success: function (response) {
      return alert('thank you');
    },
  });
}

function delete_word(num) {
  $.ajax({
    type: 'POST',
    url: '/word/delete',
    data: { num_give: num },
    success: function (response) {
      // alert(response['msg']);
    },
  });
}
