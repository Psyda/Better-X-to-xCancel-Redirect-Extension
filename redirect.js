(function () {
  const url = window.location.href;
  const newUrl = url
    .replace(/^https?:\/\/(www\.)?x\.com/, "https://xcancel.com")
    .replace(/^https?:\/\/(www\.|mobile\.)?twitter\.com/, "https://xcancel.com");
  if (newUrl !== url) {
    window.location.replace(newUrl);
  }
})();
