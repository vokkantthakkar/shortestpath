# Shortestpath

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.1.

This project was as a part of the Microsoft Mars Colonization Program.

It consists of a web application to visualise Dijkstra's algorithm in a user defined grid with 3 types of predetermined weights.

## Instructions to run

The application is deployed on Firebase and is available [here](https://shortestpath-mars-rover.web.app/)

To run this project on your local machine clone the repository

Run `npm install` to install the dependancies.
Run `ng serve` to run a local server on localhost/4200

## Workflow

This application is a front end application built using Angular. Angular is a typescript based open source web application framework made by Google. It has a Single Page Application Architecture with only one index.html file. It is composed of various components that interact with each other and let users make dynamic changes to their webpages.

The components in this angular application are:

element - forms one small box on a grid. The grid is present in the main app.component and is rendered by forming a 2D array of elements in the html file by using the ngFor directive. Each element points to a class Node which contains the status of each Node in the application with objects such as row, column, startPoint, endPoint, etc.
It includes the css styling to change colours when interacted with and when given a certain property.

Node - is the logic behind each element. Contains various fields to store the current state of the element along with a function to update the distance from the previous element, by comparing values and selecting the shorter value.

app.component - contains the overall design of the web page including the toolbar, the form and the grid composed of individual element components. It includes the main code to find the shortest path, which operates by using the distance object in the node, and comparing it to its neighbours and updating it.

## Screenshots

Green is Start Point
Blue is End Point
Light elevation corresponds to a weight of 1.2 units.
High elevation corresponds to a weight of 1.4 units.
Extreme elevation corresponds to impassable terrain.
On clicking submit, the green line will give the shortest path.

![Screenshot from 2020-07-24 23-26-48](https://user-images.githubusercontent.com/51082769/88423464-75868880-ce09-11ea-968e-2fddd83129ce.png)
![Screenshot from 2020-07-24 23-27-17](https://user-images.githubusercontent.com/51082769/88423469-77504c00-ce09-11ea-8da5-c6aa2c12c868.png)
![Screenshot from 2020-07-24 23-35-32](https://user-images.githubusercontent.com/51082769/88423471-77e8e280-ce09-11ea-9987-97bb0cb822ab.png)
![Screenshot from 2020-07-24 23-35-54](https://user-images.githubusercontent.com/51082769/88423475-78817900-ce09-11ea-8a89-b681756b39f1.png)

