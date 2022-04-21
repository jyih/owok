<p align="center">
  <img width="200" src="https://user-images.githubusercontent.com/89059894/164376033-a14d4402-ff63-41b5-88cc-6858b865a3f3.png" alt="Owok">
</p>


[Owok](https://uwuowok.herokuapp.com/) is a two player game based on Maplestory's popular, nostalgic mini-game: Omok. The rules of Owok are simple: successfully place 5 pieces in a row to win! 😋

<p align="center">
  <img width="300" src="https://i.gyazo.com/cfbd0aa0c8553e2bfbe3b25f79704ec7.gif" alt="Owok">
</p>

***DISCLAIMER: THIS IS NOT FOR PROFIT AND JUST FOR FUN AND WAS MADE SO WE DIDN'T HAVE TO LOG ONTO MAPLESTORY TO PLAY OMOK WE WILL TAKE IT DOWN IF U SEE THIS N3X0N***

<p align="center">
   <img src="https://user-images.githubusercontent.com/89059894/164385380-74939524-9c01-4df0-87d4-912316942ca6.png" alt="sprite">
   <img src="https://user-images.githubusercontent.com/89059894/164375848-7010ac23-3539-4793-8d5c-454fa89212e4.png" alt="sprite">
</p>
<p align="center">
   This website is brought to you by <a href="https://www.linkedin.com/in/johnathan-yih/">Johnathan Yih</a> and <a href="https://www.linkedin.com/in/sharonfang8">Sharon Fang</a>. Thank you for playing Owok! 😊❤
</p>
<p align="center">
    <img src="https://user-images.githubusercontent.com/89059894/164375977-b53746a8-127c-4626-9bf4-e403291739e0.png" alt="slime">
</p>

---

# Index

### GitHub Documentation

| [MVP Feature List](https://github.com/jyih/owok/wiki/Features) | [Database Schema](https://github.com/jyih/owok/wiki/Database-Schema) | [API Documentation](https://github.com/jyih/owok/wiki/API-Documentation) |
[Redux State Shape](https://github.com/jyih/owok/wiki/State-Shape) | [User Stories](https://github.com/jyih/owok/wiki/User-Stories) | [Wireframes](https://github.com/jyih/owok/wiki/Wireframes)
<br>

### Navigating this ReadMe

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Features](#features)
- [To-do/Future Features](#to-dofuture-features)
- [Debugging Log](#debugging-log)

<br>

# Technologies Used

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="python" title="python" width="60" /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="javascript" title="javascript" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" alt="socketio" title="socketio" width="60" /> 
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="react" title="react" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" alt="redux" title="redux" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" alt="sqlalchemy" title="sqlalchemy" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="postgresql" title="postgresql" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="html5" title="html5" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="css3" title="css3" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="git" title="git" width="60" />

<br>

# Getting Started

<details>
<summary>How do I run this project?</summary>

1. Clone this repo.

   ```bash
   git clone git@github.com:milkyomo/owok.git
   ```

2. Install dependencies from the root directory and update the contents of your requirements.txt file to match your Pipfile.lock

   ```bash
   pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
   ```

   ```bash
   pipenv install psycopg2-binary
   ```
   
   ```bash
   pipenv install flask-socketio
   ```
   
   ```bash
   pipenv install eventlet==0.30.2
   ```
   
   ```bash
   pipenv lock -r > requirements.txt
   ```

3. Install dependencies from the `react-app` directory

   ```bash
   npm install
   ```
   
   ```bash
   npm install socket.io-client
   ```

4. In the `react-app` directory, create a `.env` file using the `.env.example` that will be used to define your desired `PORT` (preferably 5000).

5. In the root directory, create a `.env` file that will be used to define your environment variables.

   > Use the `.env.example` found in the root directory as a template. Use a secured combination of characters for your `SECRET_KEY`. The `DATABASE_URL` should be in the format of `postgresql://<database_user>:<password>@localhost/<database_name>`

6. Create a **user** using the same credentials in the `.env` file of the root directory with the ability to create databases

   ```bash
    psql -c "CREATE USER <database_username> PASSWORD '<password>' CREATEDB"
   ```

7. Create a **database** using the same credentials in the `.env` file of the root directory

   ```bash
    psql -c "CREATE DATABASE <database_name> WITH OWNER <database_username>"
   ```

8. Enter `pipenv` to migrate and seed your database

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

9. Inside of the `pipenv` shell, start the services in the root directory

   ```bash
   flask run
   ```

10. In a separate terminal, start the services in the `react-app` directory

    ```bash
    npm start
    ```

# Helpful commands

| Command              | Purpose                                                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `pipenv shell`       | Open your terminal in the virtual environment and be able to run flask commands without a prefix                                             |
| `pipenv run`         | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands |
| `flask db upgrade`   | Check in with the database and run any needed migrations                                                                                     |
| `flask db downgrade` | Check in with the database and revert any needed migrations                                                                                  |
| `flask seed all`     | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details                |

</details>

<br>

# Features
   
   Users must select a sprite for their profile upon sign up!

   ![spriteselection](https://i.gyazo.com/94e183406b6abf9180faab93e1c966b7.gif)
   
   If you do not want to make an account, feel free to use the Demo login!
   
   ![image](https://user-images.githubusercontent.com/89059894/164381675-781aa4d2-7b5d-4256-9687-78bb7178e6b2.png)


   ### Logged in users can perform the following actions:

   - Host a game of Owok, or join other games of Owok as either a participant or a spectator
   - Chat with other users inside games
   - View replays of past games, move by move
   - Change the privacy of games that they played
   - Comment on replays
   - Edit and delete their comments
   - View their own profile or profiles of other users

<br>

# To-do/Future Features
   
   This was the first time that we ever tried to implement game logic! There were definitely a lot of struggles throughout this whole process, especially when it came to implementing sockets to make the game actually playable between two people. We began the project with very simple logic with a hardcoded second player, but that all had to change when it came down to integrating sockets with the website. Just being able to place a piece was a great accomplishment, and the next came with calculating wins, and the final "aha!" moment came when a second player could finally successfully join the room! Of course, there is a LOT of room for improvement.. but that comes with anything in life! 😊

In the future, We want to move the game logic to the backend for more efficiency. We also want to implement more features to improve user experience, such as creating actual rooms with unique links so people can't just join a room by typing in a simple url. We also want to add moderator priveledges to better monitor comments and chats.

## To-do

- [ ] Refactor game logic
- [ ] Link to private rooms
- [ ] Mod priveledges
- [ ] More piece sets (pink teddy and panda!!)

<br>

# Debugging Log
   
   **[04-13-2022]**
   
   *Issue:*
   Could not implement multiple foreign keys in Game referencing User (player_one and player_two)

   *Solution:*
   Implemented.

   **[04-15-2022]**
   
   *Issue:*
   Replays were not properly playing the first move, which made the moves play out of order

   *Solution:*
   Found that the new game moves were storing with curly braces wrapping the coordinates inside
   the string. Had to slice first and last character from string to remove curly braces
   const movesArr = game?.moves?.slice(1, -1).split(",");

   **[04-19-2022]**
   
   *Issue:*
   Datetime not saving to database correctly

   *Solution:*
   Removed invocation of datetime in models
   
   **[04-20-2022]**
   
   *Issue:*
   Sockets: not persisting data across clients, and then later emitting information universally

   *Solution:*
   Added a custom hook useDidMountEffect to ensure that the useEffect does not trigger on page load. Added useState to ensure that the moves persist before setting the board and checking for win. joinRoom(socketRoom) useEffect.
