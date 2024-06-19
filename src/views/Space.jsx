import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import '../public/home.css';
import '../public/space.css';

const Space = () => {
  //username retrieving:
  const user=localStorage.getItem('user');
  const username=user;
  const [showNotification, setShowNotification] = useState(false);
  const [blur, setBlur] = useState('0px');
  const [borderStyled, setBorderStyled] = useState(true);
  const [styledAddQu, setStyledAddQu] = useState(true);
  const [styledaddsp1, isStyledAddsp1] = useState(true);
  const [Name, setName] = useState('');
  const [des, setDes] = useState('');
  const [data, setData] = useState([]);
  const [ques, askQuestion] = useState('');

  const styleAddQuestion = () => {
    setStyledAddQu(!styledAddQu);
    setBorderStyled(!borderStyled);
    const startYourQues = document.getElementById('start-your-ques');
    startYourQues.placeholder = 'Start your Question With What, How, Why, etc.';
    const addBtn1 = document.getElementById('addbtn1');
    addBtn1.innerText = 'Add Question';
  };

  const navigate = (val) => {
    window.location.href = `/${val}`;
  };

  const styleAddSpace = () => {
    isStyledAddsp1(!styledaddsp1);
    setBlur('10px');
  };

  const wrong = () => {
    isStyledAddsp1(!styledaddsp1);
    setBlur('0px');
  };

  const createPost = () => {
    setBorderStyled(!borderStyled);
    const startYourQues = document.getElementById('start-your-ques');
    startYourQues.placeholder = 'Say something...........';
    const addBtn1 = document.getElementById('addbtn1');
    addBtn1.innerText = 'Post';
  };

  const addQues = () => {
    setBorderStyled(!borderStyled);
    const startYourQues = document.getElementById('start-your-ques');
    startYourQues.placeholder = 'Start your Question With What, How, Why, etc.';
    const addBtn1 = document.getElementById('addbtn1');
    addBtn1.innerText = 'Add Question';
  };

  const createSpace=async()=>{
    await axios.post("/create/space",{
      Name:Name,
      Description:des,
      username:username,
      status:"Following"
    })
  }
  const fetchSpaces = async () => {
    try {
      const response = await axios.get('http://localhost:3000/create/getspace', {
        params: {status:"Following" },
      });
      const fetchedspace=response.data.reverse();
      setData(fetchedspace);
      if(fetchedspace.length > 0){
        setspacename(fetchedspace[0].Name);
        setspacestatus(fetchedspace[0].status);
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSpaces();
    fetchotherspaces();
  }, []);

  const addQuestionPost = async (val) => {
    if (val === 'Add Question') {
      try {
        await axios.post('/question/add', {
          username,
          question: ques,
        });
        setBlur('10px');
        setStyledAddQu(true);
        setShowNotification(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const closeNotification = () => {
    setBlur('0px');
    setShowNotification(false);
  };
  
  const [otherspaces,showotherspaces]=useState([]);
  async function fetchotherspaces(){
    try {
      const response=await axios.get("/create/otherspaces",{ params : {
        status:"Follow"
      }});
      const spaces=response.data.reverse();
      showotherspaces(spaces);
    } catch (error) {
      console.log(error)
    }
  }
  //showing space details:
  const [spacename,setspacename]=useState('');
  const [spacestatus,setspacestatus]=useState('');
  function showspacedetails(name,status){
    setspacename(name);
    setspacestatus(status);
  }

  // changing status :
  useEffect(()=>{
   
  },[]);
  async function changestatus() {
    try {
        const newStatus = spacestatus === "Follow" ? "Following" : "Follow";
        
        await axios.post("/create/updateStatus", null, {
            params: {
                Name: spacename,
                status: spacestatus
            }
        });

        setspacestatus(newStatus);
        
        // Fetch updated spaces
        await fetchSpaces();
        await fetchotherspaces();
    } catch (error) {
        console.error("Error updating status:", error);
    }
}

  return (
    <>
      <header>
        <div id="logo"></div>
        <nav id="nav-bar">
          <div id="home" onClick={()=>navigate("Home")}></div>
          <div id="following"onClick={()=>navigate("spaces")}></div>
          <div id="answer" onClick={()=>navigate("answer")}></div>
          <div id="spacespage" onClick={()=>navigate("spaces")}></div>
          <div id="notifications" onClick={()=>navigate("notifications")} ></div>
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
          display: styledAddQu ? 'none' : 'inline',
        }}
      >
        <div id="wrong" onClick={styleAddQuestion}></div>
        <div style={{ display: 'flex', marginTop: '5px' }}>
          <div
            id="addq"
            onClick={addQues}
            style={{
              borderBottom: borderStyled ? 'none' : '3px solid blue',
            }}
          >
            Add Question
          </div>
          <div
            id="createp"
            onClick={createPost}
            style={{
              borderBottom: borderStyled ? '3px solid blue' : 'none',
            }}
          >
            Create Post
          </div>
        </div>
        <input
          type="text"
          id="start-your-ques"
          size="45"
          value={ques}
          onChange={(e) => askQuestion(e.target.value)}
          placeholder="Start your Question With What, How, Why, etc."
        />
        <div
          style={{
            borderTop: '2px solid grey',
            position: 'absolute',
            bottom: '0px',
            right: '2px',
            padding: '15px',
            width: '740px',
            height: '50px',
          }}
        >
          <button id="cancelbtn" onClick={styleAddQuestion}>
            Cancel
          </button>
          <button id="addbtn1" onClick={() => addQuestionPost('Add Question')}>
            Add Question
          </button>
          <div id="imgh"></div>
        </div>
      </div>
      <main style={{ filter: `blur(${blur})`, marginTop:"73px", paddingBottom:"90vh" }}>
        <section id='sec2'>
          <div id="createspace" onClick={styleAddSpace}>
            <div id="plus" onClick={styleAddSpace}></div>
            <div id="space" onClick={styleAddSpace}>
              Create space
            </div>
          </div>
          <ul style={{ position: 'absolute', marginTop: '20px', marginLeft: '24px', listStyleType: 'none' }}>
            {data && data.map((item) => (
              <li
                key={item.id}
                style={{
                  listStyleType: 'none',
                  width: '200px',
                  height: '50px',
                  backgroundColor: 'rgb(220, 215, 215)',
                  marginTop: '10px',
                  position: 'relative',
                }}
                className='spacehov'
                onClick={()=>showspacedetails(item.Name,item.status)}
              >
                <img
                  src={'https://th.bing.com/th/id/OIP.TOPp5xCWxCUYo6PoL9V31QHaFC?w=259&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'}
                  style={{
                    width: '40px',
                    height: '35px',
                    borderRadius: '20px',
                    position: 'absolute',
                    top: '8px',
                    left: '10px',
                  }}
                  alt="space"
                />
                <div
                  style={{
                    width: '130px',
                    height: '30px',
                    position: 'absolute',
                    top: '10px',
                    left: '55px',
                    fontSize: '20px',
                    padding: '3px',
                    overflow: 'hidden',
                    textTransform:"capitalize"
                  }}
                >
                  {item.Name}
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section id="space-sec">
          <img src="https://th.bing.com/th/id/OIP.hLNG2wej1BcedcNXdF4kWAHaHa?w=166&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="No image" id="profile-pic" />
          <div id="space-name">{spacename}</div>
          <button id="follow-btn" onClick={()=>changestatus(spacename,spacestatus)}>{spacestatus}</button>
        </section>
        <div style={{ width: '500px', height: '50px', position: 'absolute', top: '190px', left: '575px', fontSize: '36px', fontWeight: '600', color: 'rgb(87, 85, 85)' }}>
          No Content yet
        </div>
        <section id='otherspacesec'>
          <div style={{width:"200px",height:"30px",backgroundColor:"none",padding:"5px",fontWeight:"600",fontSize:"18px",position:"absolute",left:"20px",top:"10px",borderBottom:"1px solid rgb(167, 167, 167)"}}>Discover Spaces</div>
        <ul style={{ position: 'absolute', marginTop: '50px', marginLeft: '24px', listStyleType: 'none' }}>
            {otherspaces && otherspaces.map((item) => (
              <li
                key={item.id}
                style={{
                  listStyleType: 'none',
                  width: '200px',
                  height: '50px',
                  backgroundColor: 'rgb(220, 215, 215)',
                  marginTop: '10px',
                  position: 'relative',
                  transition: 'rgb(87, 84, 84) 0.3s ease'
                }}
                className='discoverspaces'
                onClick={()=>showspacedetails(item.Name,item.status)}
              >
                <img
                  src={'https://th.bing.com/th/id/OIP.TOPp5xCWxCUYo6PoL9V31QHaFC?w=259&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'}
                  style={{
                    width: '40px',
                    height: '35px',
                    borderRadius: '20px',
                    position: 'absolute',
                    top: '8px',
                    left: '10px',
                  }}
                  alt="space"
                />
                <div
                  style={{
                    width: '130px',
                    height: '30px',
                    position: 'absolute',
                    top: '10px',
                    left: '55px',
                    fontSize: '20px',
                    padding: '3px',
                    overflow: 'hidden',
                  }}
                >
                  {item.Name}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <div>
        <div
          id="addsp1"
          style={{ display: styledaddsp1 ? 'none' : 'inline' }}
        >
          <div id="wrong" onClick={wrong}></div>
          <div style={{ marginTop: '10px' }}>
            <div id="createspsec">Create a Space</div>
            <div
              style={{
                fontSize: '21px',
                paddingLeft: '15px',
                color: 'rgb(85, 80, 80)',
              }}
            >
              Share your interests, curate content, host discussions, and more.
            </div>
          </div>
          <label htmlFor="namespace" id="nspace">
            Name
          </label>
          <br />
          <input type="text" id="namespace" size="40" value={Name} onChange={(e) => setName(e.target.value)} /> <br />
          <label id="briefdes">Brief description</label> <br />
          <input type="text" id="namespace1" size="40" value={des} onChange={(e) => setDes(e.target.value)} />
          <div
            style={{
              borderTop: '2px solid grey',
              position: 'absolute',
              bottom: '0px',
              right: '0px',
              left: '0px',
              paddingTop: '10px',
              width: '725px',
              height: '50px',
            }}
          >
            <button id="addbtn2" onClick={createSpace}>Create</button>
          </div>
        </div>
      </div>
      {showNotification && (
        <div className="notification">
          <p>Question added successfully!</p>
          <button onClick={closeNotification}>Close</button>
          <button>Show Question</button>
          
        </div>
      )}
    </>
  );
};

export default Space;
