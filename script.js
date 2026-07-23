document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  const revealElements = document.querySelectorAll('.reveal');
  const typewriter = document.getElementById('typewriter');
  const codeLines = [
    "const portfolio = createPortfolio({",
    "  role: 'Full-Stack Developer',",
    "  stack: ['React', 'Node.js', 'AWS', 'Django'],",
    "  focus: 'AI-driven apps & scalable services',",
    "});",
    "",
    "deploy(portfolio).to('github-pages');",
  ];
  let lineIndex = 0;
  let charIndex = 0;

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - 120) {
        element.classList.add('show');
      }
    });
  };

  const typeNextChar = () => {
    if (!typewriter) return;
    if (lineIndex >= codeLines.length) return;

    const currentLine = codeLines[lineIndex];
    typewriter.textContent = `${codeLines.slice(0, lineIndex).join('\n')}\n${currentLine.slice(0, charIndex)}`;

    if (charIndex < currentLine.length) {
      charIndex += 1;
      setTimeout(typeNextChar, 60);
    } else {
      lineIndex += 1;
      charIndex = 0;
      setTimeout(typeNextChar, 280);
    }
  };

  revealOnScroll();
  typeNextChar();
  window.addEventListener('scroll', revealOnScroll);
});
