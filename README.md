
# Invest Hub Application

An application in which business or investor can find their matching profiles and can connect via chat



# For setup backend 

```
cd backend

```
create .env file

copy .env.example content to .env file and add following variable 

```
PORT=
DB_URL=
JWT_SECRET_KEY=

```

Run npm install and then execute 


```
npm run start
```


# For setup frontend 

```
cd frontend
```


Run npm install and then execute 


```
npm run start
```


Backend will run on specified port 

Use Node js 16 or higher version


# For testing

-> First register as business in one device or browser

-> then register as investor in another device or browser

-> Both need to login after successfull registration

-> On dashboard, business can see matching investor profiles 

-> and similarly investor can see matching business profiles

-> both can communicate via chat through socket.io in real time 

-> user can logout if needed


