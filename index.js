let express=require("express");
let app=express();
let path=require("path");
const port=8080;

const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'))
let posts = [
    { image: "/photos/shawshank.jpg", name: "ShawShank Redemption" , id:uuidv4() ,reviews:[{
username:"Sparsh",
content:"Good Movie",
id:uuidv4()
}]

},
    { image: "/photos/images (8).jpg", name: "Better Call Saul", id:uuidv4(),reviews:[{
        username:"Sparsh",
        content:"Good Movie",
        id:uuidv4()
        },
        {
            username:"Sup2308",
            content:"Good Movifasfasfse",
            id:uuidv4()
            },{
                username:"Sparsfasfasfh",
                content:"Good Movasfasfafie",
                id:uuidv4()
                }]
        
        } ,
    { image: "/photos/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg", name: "Inception", id:uuidv4() ,reviews:[{
        username:"Sparsh",
        content:"Good Movie"
        },
        {
            username:"Sup2308",
            content:"Good Movifasfasfse",
            id:uuidv4()
            },{
                username:"Sparsfasfasfh",
                content:"Good Movasfasfafie",
                id:uuidv4()
                }]
        
        },
    { image: "/photos/MV5BMzU5ZGYzNmQtMTdhYy00OGRiLTg0NmQtYjVjNzliZTg1ZGE4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", name: "Breaking Bad" , id:uuidv4(),reviews:[{
        username:"Sparsh",
        content:"Good Movie",
        id:uuidv4()
        }]
        
        },
    { image: "/photos/MV5BNGRkOTVjODgtNTBmZS00MDQ3LWE3ZjQtM2ZiNDQ3OWJkMjM2XkEyXkFqcGc@._V1_.jpg", name: "Scam 1992" , id:uuidv4(),reviews:[{
        username:"Sparsh",
        content:"Good Movie",
        id:uuidv4()
        }]
        
        },
    { image: "/photos/MV5BNzBjM2I5ZjUtNmIzNy00OGNkLWIwZDMtOTAwYWUwMzA2YjdlXkEyXkFqcGc@._V1_.jpg", name: "American Psycho" , id:uuidv4(),reviews:[{
        username:"Sparsh",
        content:"Good Movie",
        id:uuidv4()
        }]
        
        },
    { image: "/photos/p10543523_p_v8_as.jpg", name: "Interstellar", id:uuidv4() ,reviews:[{
        username:"Sparsh",
        content:"Good Movie",
        id:uuidv4()
        }]
        
        },
    { image: "/photos/Chernobyl_2019_Miniseries.jpg", name: "Chernobyl", id:uuidv4() ,reviews:[{
        username:"Sparsh",
        content:"Good Movie",
        id:uuidv4()
        }]
        
        }
];




app.listen(port,()=>{
    console.log("Listening at Port ",port);

})

app.get("/posts",(req,res)=>{
    res.render("main.ejs",{posts});
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);    
    let post=posts.find((post)=>id==post.id);
        res.render("page.ejs", { post });
    

})

app.get("/posts/:id/reviews/:reviewId/edit",(req,res)=>{
    let { id, reviewId } = req.params;


    let post = posts.find((post) => post.id === id);
    if (post) {
        let review = post.reviews.find((review) => review.id === reviewId);
        if (review) {
            res.render("form.ejs", { id,review });
        } else {
            res.send("Review not found");
        }
    } else {
        res.send("Post not found");
    }
})

app.patch("/posts/:id/reviews/:reviewId", (req, res) => {
    let { id, reviewId } = req.params;
    let { content } = req.body;  // Assuming the form has 'content' as the field name

    let post = posts.find((post) => post.id === id);
    if (post) {
        let review = post.reviews.find((review) => review.id === reviewId);
        if (review) {
            // Update the review content
            review.content = content;
            res.redirect(`/posts/${id}`);
        } else {
            res.send("Review not found");
        }
    } else {
        res.send("Post not found");
    }
});

app.get("/posts/:id/reviews/new",(req,res)=>{
    let{id}=req.params;
    res.render("newreview.ejs",{id});
})
app.post("/posts/:postid/reviews",(req,res)=>{
    let {postid}=req.params;
     console.log(postid);
    let {username,content}=req.body;
    let id=uuidv4();
    let post = posts.find((post) => post.id === postid);
    post.reviews.push({username,content,id});
    res.redirect(`/posts/${postid}`);
    });