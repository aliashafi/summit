# README

## SUMMIT 

### About
This application is a clone of Strava (link here: http://strava.com/). Because of the time constraint, it was not feasible to clone *every* features from Strava, instead I focused on a few of my favorite features to mimic. This README will walk you through the challenges, engineering deciscions and overall design flow of SUMMIT. 

### Technical Overview
SUMMIT was built with a Ruby on Rails backend that interacted with a postgresql database. The front-end was built with React-Redux. To render maps, I used MapBox API, to render graphs and charts, I used ReChart's API. All user photos are stored in AWS.

### Features

1. Feed Page
  - Comments
  - Likes
  - Current user recent activity stats 
  - Activity Feed (containing both current user and thier followers/following recent activity) *implemented infinite scroll

2. Activity Show
  - onClick, user can view each activity and its stats 
  - Some stats displayed: elevation chart, elevation gain, splits per mile (only for running), average speed, elapsed time,     date
  - Interactive elevation chart that reacts simulataneously with geoJSON point on the graph
  
3. Create Route Feature 
  - A user can create a route
  - Takes you to an interactive map where user can draw geoJSON line of possible route
  - Predicts average duration in minuets and distance 
  - Saves the route to their page
  
4. User Profile
  - Displays recent feed
  - Stats for the last 4 weeks
  - Follower/Following count
  
  
 ### Schema Decsions
 
 #### Tables 
 - Users 
 - Activities
 - Routes (for the create route feature)
 - Followers
 - Kudos (likes)
 - Comments
 
 ### Challenges 
 The biggest challenge for building out my schema was figuring out how I was going to store route coordinates. I decided that I was not going to implememnt file upload for gpx data, so I need to find a way to store thousands of coordinates to create activity maps. Some Ideas I had:
  1. Storing coordinates in an array - This seemed like the obvious first thought. Storing the coordinates in their original datatype seemed like the most logical first step. However, for many reasons, storing arrays in a psql database is not the best idea - see this link for a good explanation for why: https://stackoverflow.com/questions/20219503/is-it-bad-design-to-use-arrays-within-a-database. 
  
  2. Storing a whole gpx file in AWS - Storing a whole file would avoid the whole problem of trying to keep coordinates limited to a database row. Every time that I would need the data in the frontend, I would fetch the file and parse it live to get all necessary info for that certain view. Downside is that I would have the parse the file live - this would greatly slow down production speed. If I were to optimize that, it would certainly be the way to go.
  
  3. Storing the coordinates as text *(what I actually did)* - Its not an array, and its not a file. Storing the coordinates as text give me the freedom of having the data on demand in my table, but also not limiting myself with arrays. When I needed the data on my frontend, I fetch the coordinate row (saved as datatype text) and parse it into a json object to use for relavent features. 
  
 
 ### Activity Show Feature 
 
Integrating a real-time interactive map feature that allows users to easily analyze elevation and statistical data was one of my largest challenges. I used MapBox API to render the maps and display a GeoJSON route and ReChart to graph elevation data. When a user mouses over a portion on the graph, a dot that representes their current location on the route should update. Each sub feature exists in a different component. So, how do I allow these components to talk to eachother, my options: (1) utilizing local state to pass information down to and upfrom parent and child component.


