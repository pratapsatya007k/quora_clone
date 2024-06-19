import "../public/home.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../public/sucessmsg.css";

function Home() {
  //username retrieving:
  const user=localStorage.getItem("user");
  const username=user;
  //sucessmsg:
  const [showNotification, setShowNotification] = useState(false);
  const [blur,setblur]=useState("0px");
  const [borderstyled, isborderstyled] = useState(true);
  const [styledaddqu, isstyledaddqu] = useState(true);
  const [val,setval]=useState("Add Question");
  const [ans,setans]=useState("inline");
  // const [displayqp,setdisplayqp]=useState("none")
  function styleaddquestion() {
    isstyledaddqu(!styledaddqu);
    isborderstyled(!borderstyled);
    let startyourques = document.getElementById("start-your-ques");
    startyourques.placeholder = "Start your Question With What,How,Why,e.t.c";
    let addbtn1 = document.getElementById("addbtn1");
    addbtn1.innerText = "Add Question";
    setval("Add Question");
    setblur("10px");
    if(styledaddqu){
      setblur("10px");
    }else{
      setblur("0px")
    }
  }
  const [styledaddsp1, isstyledaddsp1] = useState(true);
  function styleaddspace() {
    isstyledaddsp1(!styledaddsp1);
    if(styledaddsp1){
      setblur("10px");
    }else{
      setblur("0px")
    }
  }
  function Createpost() {
    // addq.style.border = "none";
    // createp.style.borderBottom = " 3px solid blue";
    isborderstyled(!borderstyled);

    let startyourques = document.getElementById("start-your-ques");
    startyourques.placeholder = "Say something...........";
    // cancelbtn.style.display = "none";
    let addbtn1 = document.getElementById("addbtn1");
    addbtn1.innerText = "Post";
    setval("Create");
    setblur("10px");
  }
  function postfn() {
    isstyledaddqu(!styledaddqu);
    isborderstyled(!false);
    let startyourques = document.getElementById("start-your-ques");
    startyourques.placeholder = "Say something...........";
    let addbtn1 = document.getElementById("addbtn1");
    addbtn1.innerText = "Post";
    setval("Create");
    if(styledaddqu){
      setblur("10px");
    }else{
      setblur("0px")
    }
  }
  function addques() {
    // createp.style.border="none";
    // addq.style.borderBottom=' 3px solid blue'
    isborderstyled(!borderstyled);
    let startyourques = document.getElementById("start-your-ques");
    startyourques.placeholder = "Start your Question With What,How,Why,e.t.c";
    // cancelbtn.style.display="inline";
    let addbtn1 = document.getElementById("addbtn1");
    addbtn1.innerText = "Add Question";
    setval("Add Question");
  }
  function Askfn() {
    isstyledaddqu(!styledaddqu);
    isborderstyled(!true);
    let startyourques = document.getElementById("start-your-ques");
    startyourques.placeholder = "Start your Question With What,How,Why,e.t.c";
    let addbtn1 = document.getElementById("addbtn1");
    addbtn1.innerText = "Add Question";
    setval("Add Question");
    setblur("10px");
  }
  function navigate(val) {
    window.location.href = `/${val}`;
  }
  //createspace:
  const [Name,setName]=useState();
  const [des,setdes]=useState();
  const [data,setData]=useState([]);
  const [post,showposts]=useState([]);
  const createSpace=async()=>{
    await axios.post("/create/space",{
      Name:Name,
      Description:des,
      username:username,
      status:"Following"

    });
     styleaddspace();
     await fetchSpaces();
  }
const fetchpost=async()=>{
  try{
    const response=await axios.get("/post/getposts");
    showposts(response.data.reverse());
  }
  catch(err){
    console.log("error",err);
  }
}
   //fetch Spaces:
   useEffect(async() => {
    await  fetchSpaces();
    await fetchpost();
  }, []);
  const fetchSpaces = async () => {
    try {
      const response = await axios.get('http://localhost:3000/create/getspace', {
        params: {
          status:"Following" }
      });
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
 // question section:
 const [question,askquestion]=useState('');
 async function addquestionpost(val){
  window.location.href="/Home"
  if(val=="Add Question"){
    try{
      axios.post("/question/add",{
        username:username,
        question:question,
        answers:0
      });
      setblur("10px");
      isstyledaddqu(true);
      setShowNotification(true);
    }catch(err){
      console.log(err);
      alert("question, you asked was already asked!!,for answers please visit answers page ");
    }
  }else{
    try {
      const response = await axios.get('http://localhost:3000/api/getfilename', {
        params: { username },
      });
      if (response.data.length > 0) {
        //  const imagePath = response.data[0].filename.replace(/\\/g, '/');
        // const path=`http://localhost:3000/uploads/${imagePath}`
        const path=`http://localhost:3000/uploads/${response.data[0].filename}`;
        if (path) {
          // Post new content using the retrieved path
          await axios.post("/post/new", {
            username: username,
            path: path,
            answer:question,
            question:"",
          });
        } else {
          console.error("Path is undefined. Cannot post new content.");
        }
      }
    } catch (error) {
      console.log(error);
    }
    // Update UI state on success
  }
 }
 // creating post:

 // Image upload
 const [file, setFile] = useState(null);
 const [showfile,setshowfile]=useState("none");
 const [uploaded,setuploaded]=useState("none");
 const [gallery,hidegallery]=useState("inline")

 const handleFileChange = (e) => {
   setFile(e.target.files[0]);
   setshowfile("inline");
   hidegallery("none")
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setuploaded("inline");
   setshowfile("none");
   if (!file) {
     alert("Please select a file.");
     return;
   }

   const formData = new FormData();
   formData.append('image', file);
   formData.append('username', username); // Add username to form data

   try {
     const response = await axios.post('http://localhost:3000/api/upload', formData, {
       headers: {
         'Content-Type': 'multipart/form-data',
       },
     });
     console.log('File uploaded successfully', response.data);
   } catch (error) {
     console.error('Error uploading file', error);
   }
 };

  return (
    <>
      <header>
        <div id="logo"></div>
        <nav id="nav-bar">
          <div id="homepage" onClick={()=>navigate("Home")}></div>
          <div id="following"></div>
          <div id="answer" onClick={()=>navigate("answer")}></div>
          <div id="spaces" onClick={()=>navigate("spaces")}></div>
          <div id="notifications" onClick={() => navigate("notifications")}></div>
        </nav>
        <div id="search">
          <div id="search-logo" for="search-bar"></div>
          <input
            type="search"
            name="search"
            id="search-bar"
            size="30"
            placeholder="search Quora"
          />
        </div>
        <div id="profile"></div>
        <div id="languages"></div>
        <div id="addquestion">
          <button id="addques-btn" onClick={() => styleaddquestion()}>
            Add question
          </button>
        </div>
        <div></div>
      </header>
      <div
        id="addqu"
        style={{
          display: styledaddqu ? "none" : "inline",
        }}
      >
        <div id="wrong" onClick={() => styleaddquestion()}></div>
        <div style={{ display: "flex", marginTop: "5px" }}>
          <div
            id="addq"
            onClick={() => addques()}
            style={{
              borderBottom: borderstyled ? "none" : "3px solid blue",
            }}
          >
            Add Question
          </div>
          <div
            id="createp"
            onClick={() => Createpost()}
            style={{
              borderBottom: borderstyled ? "3px solid blue" : "none",
            }}
          >
            Create Post
          </div>
        </div>
        <input
          type="text"
          id="start-your-ques"
          size="45"
          value={question}
          onChange={(e)=>askquestion(e.target.value)}
          placeholder="Start your Question With What,How,Why,e.t.c"
        />
       
        <div
          style={{
            borderTop: "2px solid grey",
            position: "absolute",
            bottom: "0px",
            right: "2px",
            padding: "15px",
            width: "740px",
            height: "55px",
          }}
        >
            <form onSubmit={handleSubmit}>
        <input type="file" id="imgupload" onChange={handleFileChange} style={{display:showfile}} />
        {file ? (
          <button id="addimage" type="submit" style={{display:showfile}}>Add image</button>
        ) : (
          <div style={{width:"100px",height:"30px",backgroundColor:"white",position:"absolute",bottom:"10px",left:"30px",zIndex:"10"}}>
        <label htmlFor="imgupload"  id="gallerylabel" style={{display:gallery}}></label>
        </div>
        )}
        </form>
        <div style={{fontSize:"18px",fontWeight:"600",position:"absolute",left:"30px",bottom:"30px",display:uploaded}}>Added image to the post ✔️</div> 
          <button id="cancelbtn" onClick={() => styleaddquestion()}>
            Cancel
          </button>
          <button id="addbtn1" onClick={()=>addquestionpost(val)}>Add Question</button>
        </div>
      </div>
      <div>
          <div
            id="addsp1"
            style={{ display: styledaddsp1 ? "none" : "inline" }}
          >
            <div id="wrong" onClick={() => styleaddspace()}></div>
            <div style={{ marginTop: "10px" }}>
              <div id="createspsec">Create a Space</div>
              <div
                style={{
                  fontSize: "21px",
                  paddingLeft: "15px",
                  color: "rgb(85, 80, 80)",
                }}
              >
                Share your interests, curate content, host discussions, and
                more.
              </div>
            </div>
            <label for="namespace" id="nspace">
              Name
            </label>
            <br />
            <input type="text" id="namespace" size="40" value={Name} onChange={(e)=>{
              setName(e.target.value)
            }}/> <br />
            <label id="briefdes">Brief description</label> <br />
            <input type="text" id="namespace1" size="40" value={des} onChange={(e)=>{
              setdes(e.target.value)
            }} />
            <div
              style={{
                borderTop: "2px solid grey",
                position: "absolute",
                bottom: "0px",
                right: "0px",
                left: "0px",
                paddingTop: "10px",
                width: "725px",
                height: "50px",
              }}
            >
              <button id="addbtn2" onClick={()=>createSpace()}>Create</button>
            </div>
          </div>
        </div>
      <main
        style={{
          position: "relative",
          width: "100%",
          filter:`blur(${blur})`,
          marginTop:"70px",
        }}
      >
        <section id="sec1">
          <input
            type="text"
            id="askorshare"
            size="65"
            placeholder="What do you want to ask or share? 
            
        "
            onClick={() => Askfn()}
          />
          <div id="Ask" onClick={() => Askfn()}></div>
          <div id="Ans" onClick={() => navigate("answer")}></div>
          <div id="Post" onClick={() => postfn()}></div>
        </section>
        <section id="sec2" style={{position:"fixed", top: "10px",left: "240px"}}>
          <div id="createspace" onClick={() => styleaddspace()}>
            <div id="plus" onClick={() => styleaddspace()}></div>
            <div id="space" onClick={() => styleaddspace()}>
              Create space
            </div>
          </div>
          <ul style={{positive:"absolute",marginTop:"20px",marginLeft:"20px",listStyleType:"none" }}>
          {data && data.map((item) => (
  <li 
    key={item.id}
    style={{
      listStyleType: "none",
      width: "200px",
      height: "50px",
      backgroundColor: "rgb(220, 215, 215)",
      marginTop: "10px",
      position: "relative"
    }}
    className='spacehov'
    onClick={()=>navigate("spaces")}
  >
    <img 
      src={"https://th.bing.com/th/id/OIP.TOPp5xCWxCUYo6PoL9V31QHaFC?w=259&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"} 
      style={{
        width: "40px",
        height: "35px",
        borderRadius: "20px",
        position: "absolute",
        top: "8px",
        left: "10px"
      }}
    />
    <div 
      style={{
        width: "130px",
        height: "30px",
        position: "absolute",
        top: "10px",
        left: "55px",
        fontSize: "20px",
        padding: "3px",
        overflow:"hidden",
        textTransform:"capitalize"
      }}
    >
      {item.Name}
    </div>
  </li>
))}
 
        </ul>
        </section>
        <div>
          <div
            id="addsp1"
            style={{ display: styledaddsp1 ? "none" : "inline" }}
          >
            <div id="wrong" onClick={() => styleaddspace()}></div>
            <div style={{ marginTop: "10px" }}>
              <div id="createspsec">Create a Space</div>
              <div
                style={{
                  fontSize: "21px",
                  paddingLeft: "15px",
                  color: "rgb(85, 80, 80)",
                }}
              >
                Share your interests, curate content, host discussions, and
                more.
              </div>
            </div>
            <label for="namespace" id="nspace">
              Name
            </label>
            <br />
            <input type="text" id="namespace" size="40" value={Name} onChange={(e)=>{
              setName(e.target.value)
            }}/> <br />
            <label id="briefdes">Brief description</label> <br />
            <input type="text" id="namespace1" size="40" value={des} onChange={(e)=>{
              setdes(e.target.value)
            }} />
            <div
              style={{
                borderTop: "2px solid grey",
                position: "absolute",
                bottom: "0px",
                right: "0px",
                left: "0px",
                paddingTop: "10px",
                width: "725px",
                height: "50px",
              }}
            >
              <button id="addbtn2" onClick={()=>createSpace()}>Create</button>
            </div>
          </div>
        </div>
        
   <ul style={{listStyleType:"none", position:"absolute",top:"120px",left:"500px",bottom:"20px"}}>
   {post.length > 0 && post.map((item) => (
   <li className="post1" key={item.id}>
   <section className='details-sec'>
       <div className="profilepic"></div>
       <div className='username'>{item.username}</div>
       <div className='followbtn'>Follow</div>
   </section>
   {item.question!="" &&
   <section className='question-sec'>
   <p className='questionbox'>{item.question}</p>
</section>}
   
   <section className='ans-sec'>
       <p className='ansbox'>
        {item.answer}
       </p>
   </section>
   {item.path!="" &&
    <img src={encodeURI(item.path)} className='postpic'/>
   }
  
   <div className="interaction">
 <div className="insection">
   <div className="upvote"></div>
   <div className="count">upvote | 0</div>
   <div className="downvote"></div>
 </div>
 <div className="comments"></div>
 <div className="share"></div>
 <div className="threebtn"></div>
</div>
</li>
))}
</ul> 


        <section id="post1" style={{display:"none"}}>
        
          <div
            style={{
              position: "relative",
              width: "600px",
              height: "250px",
              backgroundColor: "white",
            }}
          >
            <div id="profile1"></div>
            <div id="username">{username}</div>
            <div id="follow">Follow</div>
            <div id="q1">What is the saddest animal on Earth?</div>
            <div id="ans1">
              Male Hyenas, Hands down. These guys have got it bad. First of all,
              female Hyenas have a pseudo-penis from which they give birth (By
              rupturing it), and yes, it hurts. The mortality rate of Hyena Cubs
              is 60%, not because they are hunted mercilessly by Lions and other
              opportunistic predators, which they actually are, but because they
              suffocate on their way out of that narrow organ.
            </div>
          </div>
          <div>
            <img
              src="https://qph.cf2.quoracdn.net/main-qimg-ab00c5c9fb185bda1ce56ddb0c8e290c"
              id="p1"
            ></img>
          </div>
          <div id="interaction">
            <div id="insection">
              <div id="upvote"></div>
              <div id="count">upvote | 0</div>
              <div id="downvote"></div>
            </div>
            <div id="comments"></div>
            <div id="share"></div>
            <div id="threebtn"></div>
          </div>
        </section>
      </main>
      {showNotification && (
        <div className="notification" >
          <p>Question added successfully!</p>
          <button onClick={()=>{
            setShowNotification(false);
            setblur("0px");
          }}>Close</button>
          <button onClick={()=>navigate("answer")}>Show Question</button>
        </div>
      )}
    </>
  );
}

export default Home;
