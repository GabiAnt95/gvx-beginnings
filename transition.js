// Smooth page transitions for internal navigation
(function () {
  const body = document.body;
  const TRANSITION_ATTR = 'data-transition';
  const FADE_OUT_CLASS = 'page-fade-out';
  const FADE_IN_CLASS = 'page-fade-in';
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DURATION = prefersReduce ? 0 : 450;

  const resetState = () => body.classList.remove(FADE_OUT_CLASS);
  window.addEventListener('pageshow', resetState);
  if (!prefersReduce) {
    body.classList.add(FADE_IN_CLASS);
  }

  const shouldHandle = (anchor) => {
    const href = anchor.getAttribute('href');
    if (!href) return false;
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    if (anchor.target && anchor.target !== '_self') return false;
    const url = anchor.href ? new URL(anchor.href, window.location.href) : null;
    if (url && url.origin !== window.location.origin) return false;
    return true;
  };

  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.currentTarget;
    if (!shouldHandle(anchor)) return;
    event.preventDefault();
    const navigate = () => { window.location.href = anchor.href; };
    if (prefersReduce) {
      navigate();
    } else {
      body.classList.add(FADE_OUT_CLASS);
      setTimeout(navigate, DURATION);
    }
  };

  document.querySelectorAll(`a[${TRANSITION_ATTR}]`).forEach((anchor) => {
    anchor.removeEventListener('click', handleClick);
    anchor.addEventListener('click', handleClick);
  });
})();
