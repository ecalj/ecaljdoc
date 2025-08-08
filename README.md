# ecaljdoc

## What is ecaljdoc?
ecaljdoc is a suit of documents of the [ecalj package](https://github.com/tkotani/ecalj/). Since we use vitepress for ecaljdoc, we have 
* Read  ecaljdoc  (https://ecalj.github.io/ecaljdoc)
* Souce ecaljdoc  (https://github.com/ecalj/ecaljdoc)

If you can join to edit ecaljdoc, ask to msobt at https://github.com/msobt.

---

### How to edit this document with vitepress

- Get source of ecaljdoc
  ```
  git clone git@github.com:ecalj/ecaljdoc.git
  ```
  Changes at `git@github.com:ecalj/ecaljdoc.git` is promptly reflected at https://ecalj.github.io/ecaljdoc
- Install the dependency
  ```bash
  npm install
  ```
- Generate document site (ecaljdoc) in your local machine
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

Note that we have two key files of vitepress;  
- Main page configuration: `index.md`
- Sidebar configuration: `.vitepress/config.mts`
