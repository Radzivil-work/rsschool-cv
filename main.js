document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.fullpage');
    const paginationContainer = document.getElementById('pagination');
    let currentSection = 0;
    let isScrolling = false;
  
    // Create pagination dots
    sections.forEach((section, index) => {
      const dot = document.createElement('div');
      dot.addEventListener('click', () => {
        scrollToSection(index);
      });
      paginationContainer.appendChild(dot);
    });
  
    const paginationDots = paginationContainer.querySelectorAll('div');
    updatePagination(currentSection);
  
    function scrollToSection(index) {
      if (index >= 0 && index < sections.length) {
        isScrolling = true;
        window.scrollTo({
          top: sections[index].offsetTop,
          behavior: 'smooth'
        });
        currentSection = index;
        updatePagination(currentSection);
        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    }
  
    function updatePagination(index) {
      paginationDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
  
    document.addEventListener('wheel', function (event) {
      if (isScrolling) return;
      if (event.deltaY > 0) {
        // Scrolling down
        if (currentSection < sections.length - 1) {
          currentSection++;
          scrollToSection(currentSection);
        }
      } else {
        // Scrolling up
        if (currentSection > 0) {
          currentSection--;
          scrollToSection(currentSection);
        }
      }
    });
  
    document.addEventListener('keydown', function (event) {
      if (isScrolling) return;
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        // Scrolling down
        if (currentSection < sections.length - 1) {
          currentSection++;
          scrollToSection(currentSection);
        }
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        // Scrolling up
        if (currentSection > 0) {
          currentSection--;
          scrollToSection(currentSection);
        }
      }
    });
  
    window.addEventListener('hashchange', function () {
      const hash = window.location.hash.replace('#', '');
      const sectionIndex = Array.from(sections).findIndex(section => section.id === hash);
      if (sectionIndex !== -1) {
        currentSection = sectionIndex;
        updatePagination(currentSection);
      }
    });
  
    // Update pagination
    const initialHash = window.location.hash.replace('#', '');
    const initialSectionIndex = Array.from(sections).findIndex(section => section.id === initialHash);
    if (initialSectionIndex !== -1) {
      currentSection = initialSectionIndex;
      scrollToSection(currentSection);
    }
  });
  
  function toggleAccordion(event) {
    // Проверяем, был ли клик по ссылке
    if (event.target.tagName === 'A') {
      event.stopPropagation();
      return;
    }
  
    const header = event.currentTarget;
    const content = header.nextElementSibling;
    const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
  
    // Закрываем все открытые элементы
    document.querySelectorAll('.accordion-content').forEach(function (content) {
      content.style.maxHeight = null;
    });
  
    // Открываем текущий элемент, если он был закрыт
    if (!isOpen) {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  }
  
  // Привязываем обработчик к каждому заголовку аккордеона
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', toggleAccordion);
  });
  
  // Привязываем обработчик к каждому ссылке внутри аккордеона
  document.querySelectorAll('.accordion-content .works__link').forEach(link => {
    link.addEventListener('click', function(event) {
      event.stopPropagation(); // Предотвращаем всплытие события клика
    });
  });