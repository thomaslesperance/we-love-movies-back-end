# WeLoveMovies

## Context
WeLoveMovies is a simple CRUDL API created to showcase skills with both the Express web framework as well a PostgreSQL database connection using the Knex library.

## How to Use

This project requires the use of a PostgreSQL database (either local or remote).

1. Fork and clone repo
2. npm install
3. (From root directory of project): touch .env
4. Append the following to .env: DATABASE_URL="[your database URL here]"
5. npm run start:dev
6. (Separate terminal): npm run seed
7. Open browser to localhost:5001
8. Append browser URL with any of the valid application paths (e.g., /movies/2/reviews)

## Features
Here is an image of what a frontend to the application might look like:
![image](https://github.com/thomaslesperance/WeLoveMovies/assets/144936700/1e322ad4-cca4-4057-a102-8b8e8d2e09b3)


The application currently provides the following routes:

### HTTP METHOD | PATH
### DESCRIPTION
________________________________
### GET /movies                        
Provides list of all movies. Use '?is_showing=true' query string to list only movies currently showing in a theater.


### GET /movies/:movieId              
Returns a single movie that matches the movieId route parameter provided.


### GET /movies/:movieId/theaters      
Returns all theaters currently associated with the movieId route parameter.


### GET /movies/:movieId/reviews      
Returns all reviews with associated critic data for movies associated with the movieId route parameter.


### UPDATE /reviews/:reviewId          
Updates a review associated with the reviewId route parameter and returns a representation of the updated data.


### DELETE /reviews/:reviewId         
Deletes a review associated with the reviewId route parameter and returns a 204 status code.


### GET /theaters                    
Returns an array of distinct theater records with an array of distinct movies associated with that theater via the theater_id property.


## Tools and Technology

--  JavaScript

--  Express

--  Knex

--  PostgreSQL

## Conclusion

Future plans for this project include incorporating elements of the route schema as well as repurposing functions or pieces of the file structure for other more sophisticated projects.
