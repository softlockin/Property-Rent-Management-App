# Property Rent Management App

 Live Demo: https://cristianfleancu.dev

This project is a fully responsive single page application that offers an efficient way for property owners to manage their rental properties and for tenants to easily access information about their rental and report issues.

|![safari-web2](https://user-images.githubusercontent.com/93990847/214860054-03319975-4e56-4eb1-9cfc-302c9f75ff14.png)|![safari-mob1](https://user-images.githubusercontent.com/93990847/214860884-090848c0-354e-4102-a41d-41c07ec4acb9.png)|
|---|---|


## Tech used



**Frontend (javascript):** 
* Framework: **React**

* Component Library: **Material UI**

     Deployment: **Netlify**

**Backend - REST API (python):** 
* Framework: **Django/Django Rest Framework**
    
    Authentication method: **JWT**

    

* Database: **PostgreSQL**


    Deployment: **DOCKER, NGINX, GUNICORN, AWS EC2, AWS RDS, AWS ROUTE 53**


## Features

### Registration
User has two ways to regiser:
1. Using email and password.

|![login](https://user-images.githubusercontent.com/93990847/214868922-f5af9b66-d573-4010-8545-4e3099e45159.png)|![register](https://user-images.githubusercontent.com/93990847/214868956-f8cdd184-80aa-4ef7-80a8-2484e4bec996.png)|
|---|---|

2. Continuing with a google account. If chosen, the user is redirected to a screen to complete the registration (choose an user type).

|Desktop view|Mobile view|
|---|---|
|![complete1](https://user-images.githubusercontent.com/93990847/214871032-024283d5-42ef-4715-a339-fcdbcf75e181.png)|![complete 2](https://user-images.githubusercontent.com/93990847/214871082-e3c19e56-8968-49b2-8147-03c14eef7d06.png)|


### User types


#### Owner user type

* **Summary**: a report that tracks the number of properties, total income, expenses, number of issues and overdue invoices.
![summary](https://user-images.githubusercontent.com/93990847/214862273-3a469a67-ec89-4184-9d32-357d79846633.png)

* **Quick actions**: add a new property or link a tenant account quicker.
![quick](https://user-images.githubusercontent.com/93990847/214872691-d6db3bdd-55eb-43af-80ba-13750b524f65.png)



* **Recent issues and latest invoices**
![recent](https://user-images.githubusercontent.com/93990847/214861690-a3b409d6-c7e1-4b49-ae1b-1d64b2b29770.png)

* **Properties list**: a list with the properties and their information. Linking the tenant's account to a property is done by clicking on the property and inserting the required information in the Linking section. Once the user clicks on "Link Account", the tenant receives an email with the rent information and a button to accept the request.

|![property2](https://user-images.githubusercontent.com/93990847/214861848-110c7805-fa00-4802-97d6-36a359d8b077.png)|![property3](https://user-images.githubusercontent.com/93990847/214861910-9fa5ba6a-2711-4c47-aa75-b63059c76997.png)|
|---|---|
|![property-modal](https://user-images.githubusercontent.com/93990847/214861983-42f8a3eb-6e3c-404f-9fa0-7a731c5c1fa6.png)|




* **Issue tracker**: issues reported by tenants are listed here. Additional messages can using the messaging system. Once the issue was fixed, the owner can mark it as closed specifying the cost which is added to the expenses.

|![issue2](https://user-images.githubusercontent.com/93990847/214866263-b2a491e4-9f0e-448a-b5ec-d5fded5f9dd7.png)|![issue3](https://user-images.githubusercontent.com/93990847/214866313-ada011c4-e675-49c8-ab5b-082fd3571a2c.png)|
|---|---|


![issue](https://user-images.githubusercontent.com/93990847/214866827-062ff0a0-6072-4d8e-8d11-196b889f2e35.png)

* **Invoices**: invoices are auto generated monthly. Once an invoice is paid, the owner can mark it as "Paid" and the rent amount is added to the total income.

|![invoice1](https://user-images.githubusercontent.com/93990847/214866991-cc2e0f0b-4876-4c9c-a996-102d8bec61a9.png)|![invoice2](https://user-images.githubusercontent.com/93990847/214867036-4886db6b-ecb3-4c15-b8ec-282b80104855.png)|
|---|---|


* **Map**: An interactive map with all the available properties, their rent and approximate location.

![map](https://user-images.githubusercontent.com/93990847/214867232-2cd6c471-82b0-4ced-bf6c-da7fe5297758.png)


#### Tenant user type

* **Dashboard**: the tenant can access information about their rental and their last invoice. Any issue regarding the property is reported here.
![tenant-dash](https://user-images.githubusercontent.com/93990847/214867960-9eb555d2-1fc4-4eda-94f0-1a7db0688326.png)

* **Issue tracker**: all tenant's issues' information can be accessed here. 
* **Map**: An interactive map with all the available properties, their rent and approximate location.
