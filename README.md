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
Application: Go to http://localhost:5173/

Assumptions:
1. 1 Single room = 1 adult
2. 1 Double room  = 2 adults
3. 1 Triple room = 3 adults
4. 1 Adult = 2 childs
5. Booking can be created till next 3 months.
6. 1 single room cost = Rs. 1000
7. 1 double room cost = R. 4000
8. 1 triple room cost = Rs. 3000
9. Initially, for each day, 1 hotel = 15 single rooms, 10 double rooms, 5 triple rooms.

Note: If you found any unhandled-error from users side, don't hesitate to create an issue.

Thank You
Anubhav Agrawal
I hope you liked it, if you did then can you star mark it for me ?
