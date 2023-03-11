
const mysql = require("mysql");
const bcrypt = require("bcryptjs");


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE,
  });

  exports.login = async(req, res) => {
      try{
        const {email, password} = req.body;
        if(!email||!password) {
          return res.status(400).render("login", {msg: "Please Enter Your Email and Password", msg_type: "error"});
        }

        db.query("select * from users where email=?",[email],async(error, result)=>{
          console.log(result)
          if(result.length<=0){
            return res.status(400).render("login", 
            {msg: "Incorrect Email and Password",
            msg_type: "error",
          });      
          }else{
            if(!(await bcrypt.compare(password,result[0].PASS))) {  
              return res.status(401).render("login", 
            {msg: "wrong Email and Password",
            msg_type: "error",
            }); 
            }else{
              res.send("good")
            }
          }

        });


      }catch(error){
          console.log(error)
      }
  };



exports.register = (req, res)=>{
    console.log(req.body);
    // const name =req.body.name;
    // const email=req.body.email;
    // const password=req.body.password;
    // const confirm_password=req.body.confirm_password;
    // console.log(name);
    // console.log(email);

    const { name, email, password, confirm_password } = req.body;
    db.query("select email from users where email=?", [email],
    async(error,result)=>{

        if(error){
            confirm.log(error);
        }
        if(result.length>0){
            return res.render("register", { msg : "Email id already Taken",msg_type: "error"})
        }   
        else if(password!==confirm_password){
            return res.render("register",{msg:"password do not match", msg_type: "error"})
        }
        let hashedPassword = await bcrypt.hash(password, 8);
        // console.log(hashedPassword);

        db.query("insert into users set ?", { name: name, email: email, pass: hashedPassword },
        (error, result) => {
            if (error) {
                console.log(error);
            }
            else{
                // console.log(result)
                return res.render("register", {msg: "User Registration Success", msg_type: "good"});
            }
        }
        );
    })
};