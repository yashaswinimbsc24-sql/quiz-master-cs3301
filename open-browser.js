const http = require("http");
const { spawn } = require("child_process");

const url = "http://localhost:3000";

function checkServer() {
  http
    .get(url, (res) => {
      console.log("React is ready. Opening Chrome...");
      
      spawn(
        "cmd",
        ["/c", "start", "", "chrome", url],
        {
          detached: true,
          stdio: "ignore",
          windowsHide: true
        }
      );

      process.exit(0);
    })
    .on("error", () => {
      setTimeout(checkServer, 1000);
    });
}

checkServer();