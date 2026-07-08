const http = require("http");
const path = require("path");
const fs = require("fs");
const { spawn, spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 5173);
const shouldWatch = !process.argv.includes("--no-watch");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const npmBin = process.platform === "win32" ? "npx.cmd" : "npx";

function buildOnce() {
  const result = spawnSync(npmBin, ["tsc"], {
    cwd: root,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

function startTypeScriptWatcher() {
  const child = spawn(npmBin, ["tsc", "--watch", "--preserveWatchOutput"], {
    cwd: root,
    stdio: "inherit",
  });

  process.on("SIGINT", () => {
    child.kill("SIGINT");
    process.exit(0);
  });
}

function sendFile(response, filePath) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const extension = path.extname(filePath);
    response.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(data);
  });
}

buildOnce();

if (shouldWatch) {
  startTypeScriptWatcher();
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url || "/", `http://localhost:${port}`);
  const requestedPath = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
  const filePath = path.normalize(path.join(root, requestedPath));

  if (!filePath.startsWith(root)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  sendFile(response, filePath);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Puffin game dev server: http://localhost:${port}`);
});
