// @ts-check

// Reload the page whenever it becomes visible, fixes reload issues in iOS when
// running as a webapp.
window.document.addEventListener('visibilitychange', (event) => {
  if (window.document.visibilityState === 'visible') {
    window.location.reload()
  }
})
