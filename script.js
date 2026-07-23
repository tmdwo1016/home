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

  const githubHandle = 'USERNAME';
  const githubUsernameEl = document.getElementById('github-username');
  const githubReposEl = document.getElementById('github-repos');
  const githubFollowersEl = document.getElementById('github-followers');
  const githubLatestEl = document.getElementById('github-latest');
  const githubLink = document.getElementById('github-link');
  const githubLinkContact = document.getElementById('github-link-contact');
  const githubFollowBtn = document.getElementById('github-follow-btn');

  const setGithubFallback = () => {
    if (githubUsernameEl) githubUsernameEl.textContent = '@USERNAME';
    if (githubReposEl) githubReposEl.textContent = '--';
    if (githubFollowersEl) githubFollowersEl.textContent = '--';
    if (githubLatestEl) githubLatestEl.textContent = 'Replace with your GitHub username';
  };

  const loadGithubProfile = async () => {
    if (!githubHandle || githubHandle === 'USERNAME') {
      setGithubFallback();
      return;
    }

    try {
      const profileRes = await fetch(`https://api.github.com/users/${githubHandle}`);
      if (!profileRes.ok) throw new Error('GitHub profile not found');
      const profile = await profileRes.json();
      const reposRes = await fetch(`https://api.github.com/users/${githubHandle}/repos?sort=updated&per_page=5`);
      const repos = reposRes.ok ? await reposRes.json() : [];
      const latestRepo = Array.isArray(repos) && repos.length ? repos[0].name : 'No repo yet';

      if (githubUsernameEl) githubUsernameEl.textContent = `@${profile.login}`;
      if (githubReposEl) githubReposEl.textContent = profile.public_repos;
      if (githubFollowersEl) githubFollowersEl.textContent = profile.followers;
      if (githubLatestEl) githubLatestEl.textContent = latestRepo;
      if (githubLink) githubLink.href = profile.html_url;
      if (githubLinkContact) githubLinkContact.href = profile.html_url;
      if (githubFollowBtn) githubFollowBtn.href = `${profile.html_url}?tab=followers`;
    } catch (error) {
      console.warn('GitHub API 오류:', error);
      if (githubLatestEl) githubLatestEl.textContent = 'API 로드 실패';
    }
  };

  revealOnScroll();
  typeNextChar();
  loadGithubProfile();
  window.addEventListener('scroll', revealOnScroll);
});
