const fs = require("fs");
const path = require("path");

const findFile = (root) => {
  const rootDir = path.join(__dirname, root);
  let result = [];
  const find = (currentPath) => {
    console.log("currentPath?", currentPath);
    const directory = fs.readdirSync(currentPath);
    for (const index in directory) {
      const findPath = path.join(currentPath, directory[index]);
      const stat = fs.statSync(findPath);

      // 디렉토리일 경우
      if (!stat.isFile()) {
        find(findPath);
      } else {
        // 파일일 경우
        console.log(rootDir === currentPath, directory[index]);
        const urlPath =
          rootDir === currentPath ? "/" : currentPath.replaceAll(rootDir, "");
        const key = path.join(urlPath, directory[index]);
        result.push([key, directory[index]]);
      }
    }
    return result;
  };
  return find(rootDir);
};

const result = findFile("../public");
console.log(result);
