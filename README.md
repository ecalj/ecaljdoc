# ecalj documentation

This is the documentation for *ecalj*, first-principles electronic structure calculation package.
This document is powered by vitepress and opened [HERE](https://ecalj.github.io/ecaljdoc).

For the developer of this document. Get the access of the repository from msobt.

## Guide of edit

- Pull the repository.
```
git pull git@github.com:ecalj/ecaljdoc.git
```

- Install the dependency
```bash
npm install
```

- Generate document site (ecaljdoc) in your local
```bash
npm run docs:dev
```
If it works, you will find the following message

```
  vitepress v1.6.3

  ➜  Local:   http://localhost:5173/ecaljdoc/
  ➜  Network: use --host to expose
  ➜  press h to show help
``` 
The generated document site can be seen from `http://localhost:5173/ecaljdoc/`. Use the URL with your web browser.

:::hint
Main page configuration: `index.md`
Sidebar configuration: `.vitepress/config.mts`
:::
