## Notes and Thoughts for what to do
These are just my ideas for what I should do and what needs to be done
---

#### Make the scene always visible on the profile page and have it update in real time

**Thoughts on two ways how to do it:**

- **First way:**
  1. Put all the user's info into the global state.
  2. When a form is submitted, update that info in the global state and the backend.
  3. Have the profile scene reflect what is in the global state, not what's in the database.
     - This will be more convoluted, but I think it'll work.

- **Second way:**
  1. Figure out how to have the scene check for a database update and adjust the scene accordingly.

---

#### Customizing the Scene

**Notes:**
- When the user wants to view a scene, I want to have the name of that scene's owner on the starting sign. Instead of 'Cozy Camp', it'll say 'Reid's Camp', for example. 
  - This is close, but if the name is too long, it goes off the sign.
- Give the user a blog option so they can let people know what they're doing.
---




#### Double Loading Issue

- I really need to fix the double loading. I think it has to do with how I have the grass working.
  - This seems to be fixed for the most part when I reduced the number of queries.
---

#### Make a blog section
- Just a place for people to write and let other's know what they've been up to.
- Make a comment section for their blog too
- let the owner of the blog post be able to delete comments?
- thumbs up/down counter
- Make my account an admin and able to delete comments/blog posts
---



### Tasks I've completed!
Right now, I'm running a query inside of enviornment/lighting and I'm running a query inside of each of the options for shelter & transport.

steps for working at reducing the query calls:
1. Make a note of each component that makes a QUERY_ME 
2. make the single QUERY_ME inside of pages/MyScene 
3. send that data in, pass it down to each of the components that need it just as 'data'.
4. From within the components, i'll break it down how i need it

* Note: because the searched scene is stored in the global state, that query is only happening once.

- I could probably reduce this down by making a single query inside of pages/MyScene/index.js and pages/SearchedScene/index.jsx and pass the querried props down the line to the different components. 

- This way I'll only have to make that query once and share the data amongst the different components

----
I really need to fix the double loading, i think it has to do with how i have the grass working

- This seems to be fixed for the most part when i reduced the number of queries
---

#### Reducing Query Calls

**Steps:**
1. Make a note of each component that makes a `QUERY_ME`.
2. Make the single `QUERY_ME` inside of `pages/MyScene`.
3. Send that data in, pass it down to each of the components that need it just as `data`.
4. From within the components, I'll break it down how I need it.

*Note: Because the searched scene is stored in the global state, that query is only happening once.*

- I could probably reduce this down by making a single query inside of `pages/MyScene/index.js` and `pages/SearchedScene/index.jsx`, and pass the queried props down the line to the different components.
- This way, I'll only have to make that query once and share the data amongst the different components.
---




*******************************************



