# How to run the application in your localhost ?

1. 
```js
git clone 'repository_name'
```

2.
```js
cd ./folder_created
```

3.
```js
npm install
```
Note: If there is any conflicts, try adding a flag: "--legacy-peer-deps" to resolve.
```js
npm install --legacy-peer-deps
```

4. 
```js
npm run dev
```


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
