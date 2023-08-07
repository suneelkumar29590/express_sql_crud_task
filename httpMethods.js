const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const port = 3001;

let db = null;

const dbpath = path.join(__dirname, "student.db");

const app = express();

app.use(express.json());

const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbpath,
            driver: sqlite3.Database
        });


        app.listen(port, () => {
            console.log(` DB connected \n server running at ${port}`);
        });

    }
    catch (error) {
        console.log(error.message);
        process.exit(1)
    }
};
initializeDBAndServer();

app.get("/", (req, res) => {

    res.send("its working");

})

// // get all books


app.get("/books/", async(req, res) => {
const getallbooks=`
select * from student;`;


const allbooks = await db.all(getallbooks);

res.send(allbooks);

    
});

// // // // get book

app.get("/book/:bookid/", async (req, res )=>{

const{bookid}=req.params
const getbookquery=`select * from student where sid = ${bookid}`

const book = await db.get(getbookquery);
res.send(book);
});

// // post book

app.post("/books/", async (req, res )=>{
    const bookdetails=req.body
    const {
        
  sid,
  sname,
  age,
  email,
  address,
  mno,
  grade
    }=bookdetails;

    const addbookquery=`
    insert into student
    
values
(
    ${sid},
    '${sname}',
     ${age},
    '${email}',
    '${address}',
     ${mno},
    '${grade}'
  );`;

const dbresponse=await db.run(addbookquery);
res.send("book created successfully");
});




// update 

app.put("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;
  const bookdetails=request.body
  const {
      
sid,
sname,
age,
email,
address,
mno,
grade
  }=bookdetails;

  const addbookquery=`
  update student SET 
  sid= ${sid},
  sname= '${sname}',
  age= ${age},
  email= '${email}',
  address= '${address}',
  mno= ${mno},
  grade= '${grade}'
  WHERE
  sid = ${bookId};

`;

const dbresponse=await db.run(addbookquery);
response.send("update  successfully");
});

// delete the rows

app.delete("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;
    const deleteBookQuery = `
      DELETE FROM
        student
      WHERE
        sid = ${bookId};`;
    await db.run(deleteBookQuery);
    response.send("delete");
  });
  

