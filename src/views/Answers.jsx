import "../public/home.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../public/sucessmsg.css";
import "../public/answers.css";

const Answers = () => {
  //username retrieving:
  const user=localStorage.getItem("user");
  const username=user;
  const [showNotification, setShowNotification] = useState(false);
  const [blur, setBlur] = useState("0px");
  const [borderStyled, setBorderStyled] = useState(true);
  const [styledAddQu, setStyledAddQu] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [val,setval]=useState("Add Question");
  const [ques, setQues] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [hideques,sethideques]=useState("inline");

  function styleAddQuestion() {
    setStyledAddQu(!styledAddQu);
    setBorderStyled(!borderStyled);
    let startyourques = document.getElementById("start-your-ques");
    startyourques.placeholder = "Start your Question With What,How,Why,e.t.c";
    let addbtn1 = document.getElementById("addbtn1");
    addbtn1.innerText = "Add Question";
    setval("Add Question");
    setBlur("10px");
    if(styledAddQu){
      setBlur("10px");
    }else{
      setBlur("0px")
    }
  }

  function navigate(val) {
    window.location.href = `/${val}`;
  }

  function createPost() {
    setBorderStyled(!borderStyled);
    let startYourQues = document.getElementById("start-your-ques");
    startYourQues.placeholder = "Say something...........";
    let addBtn1 = document.getElementById("addbtn1");
    addBtn1.innerText = "Post";
    setval("Create");
    setBlur("10px");
  }

  function addQues() {
    setBorderStyled(!borderStyled);
    let startYourQues = document.getElementById("start-your-ques");
    startYourQues.placeholder = "Start your Question With What, How, Why, etc.";
    let addBtn1 = document.getElementById("addbtn1");
    addBtn1.innerText = "Add Question";
    setval("Add Question");
  }

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("/question/getquestions");
      if (Array.isArray(response.data)) {
        setQuestions(response.data.reverse());
      } else {
        setQuestions([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { 
    fetchQuestions();
  }, []);

  // const addQuestionPost = async (val) => {
  //   if (val === "Add Question") {
  //     try {
  //       await axios.post("/question/add", {
  //         username: username,
  //         question: ques,
  //       });
  //       setBlur("10px");
  //       setStyledAddQu(true);
  //       setShowNotification(true);
  //       fetchQuestions();
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  const closeNotification = () => {
    setBlur("0px");
    setShowNotification(false);
    fetchQuestions();
  };

  // Image upload
  const [file, setFile] = useState(null);
  const [showfile, setshowfile] = useState("none");
  const [uploaded, setuploaded] = useState("none");
  const [gallery, hidegallery] = useState("inline");

 

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
  // Opening answer:
  const [ansques, setAnsQues] = useState("");
  const [ansbox, openAnsBox] = useState("none");
  
  function answerwrite(ques) {
    setAnsQues(ques);
    openAnsBox("inline");
    setBlur("10px");
  }
  
  // Posting a new one:
  const [answer, setAns] = useState("");
  
  async function newPost(questi, ans) {
    window.location.href="/Home";
    try {
      if (file) {
        const response = await axios.get('http://localhost:3000/api/getfilename', {
          params: { username },
        });
        if (response.data.length > 0) {
          const path = `http://localhost:3000/uploads/${response.data[0].filename}`;
          // Post new content using the retrieved path
          await axios.post("/post/new", {
            username: username,
            path: path,
            answer: ans,
            question: questi,
          });
        } else {
          console.error("Path is undefined. Cannot post new content.");
        }
      } else {
        // If no image, still make the post
        await axios.post("/post/new", {
          username: username,
          path: "",
          answer: ans,
          question: questi,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function closeAns() {
    openAnsBox("none");
    setBlur("0px");
  }

  const [question,askquestion]=useState('');
  async function addQuestionPost(val){
   window.location.href="/answer"
   if(val=="Add Question"){
     try{
       axios.post("/question/add",{
         username:username,
         question:question,
         answers:0
       });
       setBlur("10px");
       setStyledAddQu(true);
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
  return (
    <>
      <header>
        <div id="logo"></div>
        <nav id="nav-bar">
          <div id="home" onClick={()=>navigate("Home")}></div>
          <div id="following" onClick={()=>navigate("spaces")}></div>
          <div id="answerpage" onClick={()=>navigate("answer")}></div>
          <div id="spaces" onClick={()=>navigate("spaces")}></div>
          <div id="notifications" onClick={()=>navigate("notifications")}></div>
        </nav>
        <div id="search">
          <div id="search-logo"></div>
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
          <button id="addques-btn" onClick={styleAddQuestion}>
            Add question
          </button>
        </div>
      </header>
      <div
        id="addqu"
        style={{
          display: styledAddQu ? "none" : "inline",
        }}
      >
        <div id="wrong" onClick={() => styleAddQuestion()}></div>
        <div style={{ display: "flex", marginTop: "5px" }}>
          <div
            id="addq"
            onClick={() => addQues()}
            style={{
              borderBottom: borderStyled ? "none" : "3px solid blue",
            }}
          >
            Add Question
          </div>
          <div
            id="createp"
            onClick={() => createPost()}
            style={{
              borderBottom: borderStyled ? "3px solid blue" : "none",
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
          <button id="cancelbtn" onClick={() => styleAddQuestion()}>
            Cancel
          </button>
          <button id="addbtn1" onClick={()=>addQuestionPost(val)}>Add Question</button>
        </div>
      </div>
      <main style={{ filter: `blur(${blur})`, marginTop:"80px" }}>
        <section id="ques-opt">
          <div id="optstyhead">Questions</div>
          <div
            className="optsty"
            style={{
              color: "#b92b27",
              fontWeight: "600",
              backgroundColor: "#caaaa9",
            }}
          >
            Questions for you
          </div>
          <div className="optsty">Answer request</div>
          <div className="optsty">Draft</div>
        </section>
        <section id="quesbox">
          <div id="qhead">Questions for you</div>
          <ul>
            {questions.length > 0 ? (
              questions.map((ques) => (
                <li
                  style={{
                    width: "580px",
                    backgroundColor: "white",
                    position: "relative",
                    borderBottom: "1px solid rgb(167, 167, 167)",
                    paddingBottom: "40px",
                  }}
                  key={ques.id}
                >
                  <div className="ques">{ques.question}</div>
                  <div className="hideques" onClick={()=>{sethideques("none")}} >X</div>
                  <button className="ansbtn" onClick={() => answerwrite(ques.question)}>Answer</button>
                </li>
              ))
            ) : (
              <div style={{ fontWeight: "700", color: "grey", fontSize: "22px" }}> sorry! No questions right now!</div>
            )}
          </ul>
        </section>
      </main>
      {showNotification && (
        <div className="notification">
          <p>Question added successfully!</p>
          <button onClick={closeNotification}>Close</button>
          <button>Show Question</button>
        </div>
      )}
      <section id="answer-sec" style={{ display: ansbox }}>
        <div id="closeans" onClick={closeAns}></div>
        <div id="quest">{ansques}</div>
        <textarea id="writeans" placeholder="Start Writing Your Answer..." value={answer} onChange={(e) => {
          setAns(e.target.value);
        }}></textarea>
        <button type="submit" id="postans" onClick={() => newPost(ansques, answer)}>Post</button>
        <form onSubmit={handleSubmit}>
          <input type="file" id="imgupload" onChange={handleFileChange} style={{ display: "none" }} />
          {file ? (
            <button id="addimage" type="submit" style={{ display: showfile }}>Add image</button>
          ) : (
            <div style={{ width: "100px", height: "30px", backgroundColor: "white", position: "absolute", bottom: "25px", left: "30px", zIndex: "10" }}>
              <label htmlFor="imgupload" id="gallerylabel" style={{ display: gallery }}></label>
            </div>
          )}
        </form>
        <div style={{ fontSize: "18px", fontWeight: "600", position: "absolute", left: "30px", bottom: "30px", display: uploaded }}>Added image to the post ✔️</div>
      </section>
    </>
  );
};

export default Answers;
