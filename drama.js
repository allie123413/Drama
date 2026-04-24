const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('img'));
app.use(express.json());
let kdramas = [
    {id:1, title:'Descendants of the Sun', country:'South Korea', episodes:16, genre:'Action, Comedy, Romance, Melodrama', yearReleased: 2016,duration: '60', 
        description:'Story of love affair between a special forces caption and a surgeon set in both South Korea and a fictional war-torn country called Uruk',
        img:"/sun.png",link:"https://mydramalist.com/10904-descendants-of-the-sun"},
    {id:2,title:'Go Ahead', country:'China', episodes:46, genre:'Comedy, Romance, Drama, Melodrama', yearReleased:2020,duration: '70',
        description:'Three youths from broken families form a close-knit, chosen family. After years apart, they reunite as adults and must confront past wounds to rediscover love, healing, and what it means to be a true family.',
        img:"/goahead.png",link:"https://mydramalist.com/40911-go-ahead"},
    {id:3,title:'Twinkling Watermelon', country:'South Korea', episodes:16, genre:'Romance, Youth, Drama, Fantasy', yearReleased:2023,duration: '45',
        description:'A story of a CODA boy with natural talent for music unexpectedly send back to 1995',
        img:"/watermelon.png",link:"https://mydramalist.com/739603-sparkling-watermelon"}
    
];

app.get('/',(req,res)=>{
    res.send(`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <div style="background-image: url('/background.jpg'); background-size: cover; background-repeat: no-repeat; min-height:100%">
        <nav class="navbar navbar-dark" style="background-color: #79BAEC;">
        <div class="container-fluid">
        <ul class="navbar-nav flex-row">
            <li class="nav-item d-flex align-items-center">
                <img src="/a.png" width="40px" class=me-2><a class="nav-link"><b>Alicia's Hobby</b></a>
            </li>
        </ul>
        <ul class="navbar-nav flex-row ms-auto">
            <li class="nav-item ms-4">
                <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item ms-4">
                <a class="nav-link" href="/lists">Discover Dramas</a>
            </li>
            <li class="nav-item ms-4">
                <a class="nav-link" href="/addDrama">Recommend a Drama</a>
            </li>
            <li class="nav-item ms-4">
                <a class="nav-link" href="/aboutMe">About Me</a>
            </li>
        </ul>
        </div>
        </nav>
            <section class="container my-5">
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <img src="/girl.png" class="img-thumbnail"  >
                    </div>
                    <div class="col-md-8">
                        <h2>Welcome to <span style="color:cornflowerblue">Alicia's Top Drama Picks! &#127800</span></h2>
                        <p>Dive into my curated list of online dramas that will captivate your heart and mind.<p>
                        <p>
                        <h5>Join me in my drama journey!</h5>
                        <p>I'll share the shows that left me breathless, made me laugh, and stayed with me long after the final episode.<p>
                    </div>
                </div>
            </section>
        </div>
    `);
});
app.get('/lists', (req, res) => {
    let list = '';

    for (let i = 0; i < kdramas.length; i++) {
        list +=
        `
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body d-flex flex-column">
                        <img src="${kdramas[i].img}" class="img-fluid mb-2 mx-auto" alt="${kdramas[i].title}" style="width: 200px; height: 230px;">
                        <a href="${kdramas[i].link}" target="_blank"><b>Title: ${kdramas[i].title} <br></b></a>
                        Description: ${kdramas[i].description} <br>
                        <br>
                        <div class="mt-auto">
                        <div class="d-flex gap-2">
                            <a href="/updateDrama/${kdramas[i].id}" class="btn btn-success btn-sm" style="height:30px" ;>Edit</a>
                                <form action="/deleteDrama/${kdramas[i].id}" method="POST" >
                                    <button type="submit" class="btn btn-danger btn-sm" style="height:30px";>Delete</button>
                                </form>
                            <a href="/viewDetails/${kdramas[i].id}" class="btn btn-info btn-sm" style="height:30px" ;>View Details</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
    }
    res.send(`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <div style="background-image: url('/background.jpg'); background-size: cover; background-repeat: no-repeat; min-height:100%">
        <nav class="navbar navbar-dark" style="background-color: #79BAEC;">
        <div class="container-fluid">
        <ul class="navbar-nav flex-row">
            <li class="nav-item d-flex align-items-center">
                <img src="/a.png" width="40px" class=me-2><a class="nav-link"><b>Alicia's Hobby</b></a>
            </li>
        </ul>
        <ul class="navbar-nav flex-row ms-auto">
            <li class="nav-item ms-4">
                <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item ms-4">
                <a class="nav-link" href="/lists">Discover Dramas</a>
            </li>
            <li class="nav-item ms-4">
                <a class="nav-link" href="/addDrama">Recommend a Drama</a>
            </li>
            <li class="nav-item ms-4">
                <a class="nav-link" href="/aboutMe">About Me</a>
            </li>
        </ul>
        </div>
        </nav>
        <section class="py-4" style="padding-top: 10px;">
        <div class="container">
            <h2 class="mb-4 text-center">Discover Amazing Dramas</h2>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                ${list}
            </div>
        </div>
        </section>=
        </div>
    `);
});

app.get('/addDrama', (req, res) => {
    res.send(`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <div style="background-image: url('/background.jpg'); background-size: cover; background-repeat: no-repeat; min-height:100%">
        <nav class="navbar navbar-dark" style="background-color: #79BAEC;">
        <div class="container-fluid">
        <ul class="navbar-nav flex-row">
            <li class="nav-item d-flex align-items-center">
                <img src="/a.png" width="40px" class=me-2><a class="nav-link"><b>Alicia's Hobby</b></a>
            </li>
        </ul>
       <ul class="navbar-nav flex-row ms-auto">
            <li class="nav-item ms-4">
                <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item ms-4">
                <a class="nav-link" href="/lists">Discover Dramas</a>
            </li>
            <li class="nav-item ms-4">
                <a class="nav-link" href="/addDrama">Recommend a Drama</a>
            </li>
            <li class="nav-item ms-4">
                <a class="nav-link" href="/aboutMe">About Me</a>
            </li>
        </ul>
        </div>
        </nav>
        <div style="display: flex; flex-direction: column; align-items: center; padding-top: 10px;">
            <div style="padding-left:10px; width: 800px;">
                <div class="card">
                    <div class="card-body">
                        <h3>Recommend a Drama You Love!</h3>
                        <form action="/addDrama" method="POST"> 
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-6">
                                        Drama Title: <input name="title" input type="text" placeholder="Drama title" required style="width: 100%;"/><br><br>
                                        Country: <input name="country" input type="text" placeholder="Country" required style="width: 100%;"/><br><br>
                                        Genre: <input name="genre" input type="text" placeholder="Genre" required style="width: 100%;"/><br><br>
                                    </div>
                                    <div class="col-6">
                                        Episodes: <input name="episodes" input type="number" placeholder="Episodes" required style="width: 100%;"/><br><br>
                                        Duration (minutes): <input name="duration" input type="number" placeholder="Duration" required style="width: 100%;"/><br><br>
                                        Year Released: <input name="yearReleased" input type="number" placeholder="Year Released" required style="width: 100%;"/><br><br>
                                    </div>
                                    <div class="col-12">
                                        Images: <input name="images" input type="url" placeholder="Image" required style="width:100%;" /><br><br>
                                        Link: <input name="link" input type="url" placeholder="Link" required style="width:100%;" /><br><br>
                                        Description: <br><textarea cols="40" rows="5" name="description" placeholder="Description" required style="width: 100%;height: 100px;"></textarea><br><br>
                                    </div>
                                </div>
                            </div>
                        <button type="submit" class="btn btn-primary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `);
});

app.use(express.urlencoded({extended:true}));
app.post('/addDrama',(req, res) =>{
    const newId = kdramas.length + 1;
    kdramas.push({id: newId, title: req.body.title, country: req.body.country, genre: req.body.genre,
        episodes: parseInt(req.body.episodes),duration: parseInt(req.body.duration),
        yearReleased: parseInt(req.body.yearReleased), img: req.body.images, link: req.body.link, description:req.body.description});
    res.redirect('/lists');
});

app.post('/deleteDrama/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);
    const initialLength = kdramas.length;
    kdramas = kdramas.filter(drama => drama.id !== idToDelete);

    // Re-index the IDs to fill the gap
    if (kdramas.length < initialLength) {
        kdramas.forEach((drama, index) => {
            drama.id = index + 1;
        });
    }

    res.redirect('/lists');
});

app.get('/updateDrama/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    let kdrama = null;

    for (let i = 0; i< kdramas.length; i++){
        if (kdramas[i].id === id){
            kdrama = kdramas[i];
            break;
        }
    }

    if (!kdrama){
        return res.send('<p>Drama is not found.</p><a href="/lists">Back to Drama List</a>');
    }

    res.send(`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <div style="background-image: url('/background.jpg'); background-size: cover; background-repeat: no-repeat; min-height:100%">
        <nav class="navbar navbar-dark" style="background-color: #79BAEC;">
        <div class="container-fluid">
        <ul class="navbar-nav flex-row">
            <li class="nav-item d-flex align-items-center">
                <img src="/a.png" width="40px" class=me-2><a class="nav-link"><b>Alicia's Hobby</b></a>
            </li>
        </ul>
        <ul class="navbar-nav flex-row ms-auto">
            <li class="nav-item ms-4">
                <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item ms-4">
                <a class="nav-link" href="/lists">Discover Dramas</a>
            </li>
            <li class="nav-item ms-4">
                <a class="nav-link" href="/addDrama">Recommend a Drama</a>
            </li>
            <li class="nav-item ms-4">
                <a class="nav-link" href="/aboutMe">About Me</a>
            </li>
        </ul>
        </div>
        </nav>
        <div style="display: flex; flex-direction: column; align-items: center; padding-top: 10px;">
            <div style="padding-left:10px; width: 800px;">
                <div class="card">
                    <div class="card-body">
                        <h3>Update Drama</h3>
                        <form action="/updateDrama/${kdrama.id}" method="POST">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-6">
                                    Drama Title: <input name="title" value="${kdrama.title}" required style="width: 100%;"/><br><br>
                                    Country: <input name="country" value="${kdrama.country}" required style="width: 100%;"/><br><br>
                                    Genre: <input name="genre" value="${kdrama.genre}" required style="width: 100%;"/><br><br>   
                                </div>
                                <div class="col-md-6">
                                    Episodes: <input name="episodes" value="${kdrama.episodes}" required style="width: 100%;"/><br><br>
                                    Duration  (minutes): <input name="duration" value="${kdrama.duration}" required style="width: 100%;"/><br><br>
                                    Year Released: <input name="yearReleased" value="${kdrama.yearReleased}" required style="width: 100%;"/><br><br>
                                </div>
                                <div class="col-md-12">
                                    Images: <input name="images" value=${kdrama.img}" required style="width:100%;" /><br><br>
                                    Link: <input name="link" value=${kdrama.link}" required style="width:100%;" /><br><br>
                                    Description: <textarea name="description" required style="width: 100%; height: 100px;">${kdrama.description}</textarea><br><br>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `);
});

app.post('/updateDrama/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    for (let i = 0; i < kdramas.length; i++){
        if (kdramas[i].id === id){
            kdramas[i].title = req.body.title;
            kdramas[i].country = req.body.country;
            kdramas[i].genre = req.body.genre;
            kdramas[i].episodes = parseInt(req.body.episodes);
            kdramas[i].duration = parseInt(req.body.duration);
            kdramas[i].yearReleased = parseInt(req.body.yearReleased);
            kdramas[i].img = req.body.images;
            kdramas[i].link = req.body.link;
            kdramas[i].description = req.body.description;
            break;
        }
    }
    res.redirect('/lists');
});

app.get('/viewDetails/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const drama = kdramas.find(d => d.id === id);

    if (!drama) {
        return res.send('<p>Drama not found.</p><a href="/lists">Back to Drama List</a>');
    }

    res.send(`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <div style="background-image: url('/background.jpg'); background-size: cover; background-repeat: no-repeat; min-height:100%">
        <nav class="navbar navbar-dark" style="background-color: #79BAEC;">
        <div class="container-fluid">
        <ul class="navbar-nav flex-row">
            <li class="nav-item d-flex align-items-center">
                <img src="/a.png" width="40px" class=me-2><a class="nav-link"><b>Alicia's Hobby</b></a>
            </li>
        </ul>
        <ul class="navbar-nav flex-row ms-auto">
            <li class="nav-item ms-4">
                <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item ms-4">
                <a class="nav-link" href="/lists">Discover Dramas</a>
            </li>
            <li class="nav-item ms-4">
                <a class="nav-link" href="/addDrama">Recommend a Drama</a>
            </li>
            <li class="nav-item ms-4">
                <a class="nav-link" href="/aboutMe">About Me</a>
            </li>
        </ul>
        </div>
        </nav>
        <div class="container my-5">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <div class="card">
                        <div class="card-body">
                            <a href="${drama.link}" target="_blank"><h3 class="card-title">${drama.title}</h3></a>
                            <p class="card-text"><b>Country:</b> ${drama.country}</p>
                            <p class="card-text"><b>Genre:</b> ${drama.genre}</p>
                            <p class="card-text"><b>Episodes:</b> ${drama.episodes}</p>
                            <p class="card-text"><b>Duration (minutes):</b> ${drama.duration}</p>
                            <p class="card-text"><b>Year Released:</b> ${drama.yearReleased}</p>
                            <p class="card-text"><b>Description:</b> ${drama.description}</p>
                            <a href="/lists" class="btn btn-secondary">Back to List</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `);
});

app.get('/aboutMe',(req,res)=>{
    res.send(`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <div style="background-image: url('/background.jpg'); background-size: cover; background-repeat: no-repeat; min-height:100%">
        <nav class="navbar navbar-dark" style="background-color: #79BAEC;">
        <div class="container-fluid">
        <ul class="navbar-nav flex-row">
            <li class="nav-item d-flex align-items-center">
                <img src="/a.png" width="40px" class=me-2><a class="nav-link"><b>Alicia's Hobby</b></a>
            </li>
        </ul>
        <ul class="navbar-nav flex-row ms-auto">
            <li class="nav-item ms-4">
                <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item ms-4">
                <a class="nav-link" href="/lists">Discover Dramas</a>
            </li>
            <li class="nav-item ms-4">
                <a class="nav-link" href="/addDrama">Recommend a Drama</a>
            </li>
            <li class="nav-item ms-4">
                <a class="nav-link" href="/aboutMe">About Me</a>
            </li>
        </ul>
        </div>
        </nav>
        <div style="display: flex; flex-direction: column; align-items: center; padding-top: 10px;">
            <div class="container pt-1 pb-4">
            <div class="row">
                <div class="col-md-10 offset-md-1">
                    <div class="card">
                        <div class="card-body pt-1 pb-2">
                            <div style="display: flex; align-items: center;">
                                <h3 style="margin-right: 10px; ">More About Me</h3>
                                <img src="/panda.png" width="40px">
                            </div>
                            <p style="font-size: 0.9em; margin-bottom: 5px">I find a lot of enjoyment in watching dramas.</p>
                            <p style="font-size: 0.9em; margin-bottom: 5px">Here are my best 3 recommendations!</p>
                            <div class="row row-cols-1 row-cols-3 g-3">
                                <div class="col">
                                    <div class="card h-100">
                                        <img src="/sun.png" class="card-img-top" alt="Descendants of the Sun" style="height: 250px; object-fit: cover;">
                                        <div class="card-body pt-2 pb-1">
                                            <a href="https://mydramalist.com/10904-descendants-of-the-sun" target="_blank"><h5 class="card-title" style="font-size: 1em">Descendants of the Sun</h5></a>
                                            <p class="card-text mb-1" style="font-size: 0.9em">My Comment: I love how the plot blends the romance between a soldier and a surgeon on how they survive through hard challenges</p>
                                            <p class="card-text" style="font-size:0.8em; margin-bottom: 0;">My rating: 9/10</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card h-100">
                                        <img src="/watermelon.png" class="card-img-top" alt="Twinkling Watermelon" style="height: 250px; object-fit: cover;">
                                        <div class="card-body pt-2 pb-1">
                                            <a href="https://mydramalist.com/739603-sparkling-watermelon" target="_blank"><h5 class="card-title" style="font-size: 1em" >Twinkling Watermelon</h5></a>
                                            <p class="card-text mb-1" style="font-size: 0.9em">My Comment: The storyline of the CODA high school student travelling back in time and interacting with his parent's younger selves is amazing</p>
                                            <p class="card-text" style="font-size:0.8em; margin-bottom: 0">My rating: 9.5/10</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card h-100">
                                        <img src="/goahead.png" class="card-img-top" alt="Go Ahead" style="height: 250px; object-fit: cover;">
                                        <div class="card-body pt-2 pb-1">
                                            <a href="https://mydramalist.com/40911-go-ahead" target="_blank"><h5 class="card-title" style="font-size: 1em">Go Ahead</h5></a>
                                            <p class="card-text mb-1" style="font-size: 0.9em">My Comment: The heartwarming story of three unrelated children finding family and navigating life's challenges together, supported by their loving fathers.</p>
                                            <p class="card-text" style="font-size:0.8em; margin-bottom: 0;">My rating: 8.5/10</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                
            </div>
        </div>
    `);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});