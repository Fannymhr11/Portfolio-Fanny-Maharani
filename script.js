// === MENUNGGU SAMPAI DOM CONTENT LOADED ===
document.addEventListener('DOMContentLoaded', () => {
  // === SMOOTH SCROLL FOR BUTTONS ===
  const scrollToSection = (buttonSelector, targetId) => {
    const button = document.querySelector(buttonSelector);
    const target = document.getElementById(targetId);

    if (button && target) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    }
  };

  scrollToSection('#btn-portfolio', 'portfolio');
  scrollToSection('#btn-kontak', 'contact');

  // === PORTFOLIO FILTER ===
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      portfolioItems.forEach(item => {
        const category = item.dataset.category;
        item.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
      });

      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });

  // === VALIDASI + AJAX SUBMIT FORMULIR KONTAK ===
  $('#contactForm').submit(function(event) {
    event.preventDefault();

    let isValid = true;

    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const phone = $('#phone').val().trim();
    const message = $('#message').val().trim();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (name === '') {
      alert('Nama lengkap harus diisi.');
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      alert('Email tidak valid.');
      isValid = false;
    }

    if (!phoneRegex.test(phone)) {
      alert('Nomor handphone tidak valid.');
      isValid = false;
    }

    if (message === '' || message.length > 500) {
      alert('Pesan harus diisi dan tidak boleh lebih dari 500 karakter.');
      isValid = false;
    }

    if (isValid) {
      $.ajax({
        url: 'submit.php',
        type: 'POST',
        data: {
          name: name,
          email: email,
          phone: phone,
          message: message
        },
        success: function(response) {
          alert('Formulir berhasil dikirim!');
          $('#contactForm')[0].reset();
        },
        error: function(xhr, status, error) {
          alert('Terjadi kesalahan saat mengirim data.');
          console.error(error);
        }
      });
    }
  });
});