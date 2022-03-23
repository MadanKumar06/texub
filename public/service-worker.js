// Install Service Worker
self.addEventListener("install", (e) => {
  console.log("Install");
});

// Activate Service Worker
self.addEventListener("activate", (e) => {
  console.log("Activated");
});

self.addEventListener("fetch", function (event) {
  // it can be empty if you just want to get rid of that error
});
