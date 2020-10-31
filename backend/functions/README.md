# 👾 LeagueOfCompass Backend

## Documentation

#### API

The API uses Postman for documentation purposes. [Click here for the documentation](https://documenter.getpostman.com/view/12053344/TVYKbca4).

#### Firestore

A firestore stores data about the game version that API uses with its queries under

```
lol (collection)
|__data (document)
   |__version: <game.version; eg. 10.16.1> (field)
```

The [invalidate game data](https://github.com/letelete/league-of-compass/blob/6add4584b171fcdcc55c01c525d264b1259e6a22/backend/functions/index.js#L7) function triggers on the game version change and fetches version-dependent game-related data to the database.

## Stack

JavaScript, Node.js, Express, Firebase.

The API itself is exported as the ['App' Cloud Function](https://github.com/letelete/league-of-compass/blob/6add4584b171fcdcc55c01c525d264b1259e6a22/backend/functions/index.js#L6)
