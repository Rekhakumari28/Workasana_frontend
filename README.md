## Workasana

Workasana is a task management and team collaboration tool where users can create projects, assign tasks to teams and owners, set deadlines, and organize work using tags.
<br> With a user-friendly interface powered by React. it supports authentication, dynamic filtering, URL-based queries, and reporting features to treak task, progress and team productivity.

---

## Demo Link
[Live Demo](https://workasana-frontend-five.vercel.app/)

---

## Login
> **Guest**  
> Email: `guestlogin@example.com`  
> Password: `guestlogin` 

## Quick Start

```
git clone https://github.com/Rekhakumari28/Workasana_frontend.git
cd Workasana_frontend
npm install
npm run dev
```

## Technologies

- React JS
- Bootstrap
- Redux 
- Chart.js
- Node.js
- Express
- MongoDB
- JWT

## Demo Video
Explore a 5-6 minute walkthrough showcasing all major features of this app.
[Loom Video Link](https://www.loom.com/share/d258d87c35e8414096a3372c510e5809?sid=fcf6e091-90b3-4b10-82eb-d38016a90490)

## Features

**Home**

- Displays all projects and tasks
- Filter by status
- Search with title
- Add project and add task button

**Project view**

- Displays all available tasks in a table
- Table shows task name, owners name initials, priority, due date and rating
- Filtering & sorting

**Project Details**

- Displays project name and description.
- Table shows task name, owners name initials, priority, due date and rating
- Filtering & sorting

**Teams**

- Displays all teams in a grid
- Card include team name, team member name initial and no. of members
- Add new team button

**Team Details**

- Displays team name, member names
- Add member button, add new member form

**Report**

- Total work done last week (Bar Chart)   
- Total day to work pending (Bar Chart)
- Task closed by team (Pai Chart)

**Setting**

- Displays a signout button
- Displays project, team, task in grid
- Card include name, edit, delete button

## API Reference

### **GET /api/projects**<br>

Displays a list of all available Projects.<br>
Sample API response<br>

```[{_id, name, description, status}, ...]```

### **GET /api/tasks**<br>

Displays a list of all available Tasks.<br>
Sample API response<br>

```{_id, project, taskName, team, status, owners, tags, timeToComplete, priority}```

### **GET /api/teams**<br>

Displays a list of all available Teams.<br>
Sample API response<br>

```{_id, name, description, members}```

### **POST /api/user/signup**<br>

Register a new user<br>
Sample API response<br>
```{ userId, token }```


## Contact

Encountered a problem or have a suggestion? Reach out at rekha.kumari1928@gmail.com.

