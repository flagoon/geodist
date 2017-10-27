This is additional homework from SDA. 

I improved on the idea. At the beginning it should choose between 10 cities, but I added MySQL with 2500 Polish cities.

At the beginning user should choose at least two cities. During writing
data, there is and AJAX request to MySQL, so user receive suggestions of cities name. 
The more letter he wrote, the more precise his choice will be. He should confirm his 
choice by clicking on the city on the list. 

When there is two or more cities selected, another function is
collecting all the provided data and the get latitude and longitude from
json file. After that, in the loop, the formula is calculated and result
is place in input above.

current project at: http://flagoon.ayz.pl/programowanie/geodist/

TODO: Right now system is counting the total distance according
to city placement. So if you choose Three cities, two that are close to each other and one far away, lets say
like letter [a, b, z], but place them in this order [a, z ,b], the distance will be much
larger than it should be. I need to make another functionality, to count
distances between cities without "backtracking". 