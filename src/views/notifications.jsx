import "../public/home.css";
import React, { useState } from "react";
function Notifications() {
  const [isstyledstories, setstyledstories] = useState(true);
  const [isstyledques, setstyledques] = useState(true);
  const [isstyledspaces, setstyledspaces] = useState(true);
  const [isstyledcontent, setstyledcontent] = useState(true);
  const [isstyledprofile, setstyledprofile] = useState(true);
  function click1() {
    setstyledstories(!false);
    setstyledques(!false);
    setstyledspaces(!false);
    setstyledcontent(!false);
    setstyledprofile(!false);
  }
  function click2() {
    setstyledstories(!true);
    setstyledques(!true);
    setstyledspaces(!false);
    setstyledcontent(!false);
    setstyledprofile(!false);
  }
  function click3() {
    setstyledstories(!true);
    setstyledques(!false);
    setstyledspaces(!true);
    setstyledcontent(!false);
    setstyledprofile(!false);
  }
  function click4() {
    setstyledstories(!true);
    setstyledques(!false);
    setstyledspaces(!false);
    setstyledcontent(!true);
    setstyledprofile(!false);
  }
  function click5() {
    setstyledstories(!true);
    setstyledques(!false);
    setstyledspaces(!false);
    setstyledcontent(!false);
    setstyledprofile(!true);
  }
  function navigate(val) {
    window.location.href = `/${val}`;
  }
  return (
    <>
      <header>
        <div id="logo"></div>
        <nav id="nav-bar">
          <div
            id="home"
            onClick={() => navigate("Home")}
            style={{ borderBottom: "none" }}
          ></div>
          <div id="following" onClick={()=>navigate("spaces")}></div>
          <div id="answer" onClick={()=>navigate("answer")}></div>
          <div id="spaces" onClick={()=>navigate("spaces")}></div>
          <div
            id="notificationspage"
            onClick={()=>navigate("notifications")}
          ></div>
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
          <button id="addques-btn">Add question</button>
        </div>
      </header>
      <div id="addqu">
        <div id="wrong"></div>
        <div style={{ display: "flex", marginTop: "5px" }}>
          <div id="addq">Add Question</div>
          <div id="createp">Create Post</div>
        </div>
        <input
          type="text"
          id="start-your-ques"
          size="45"
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
            height: "50px",
          }}
        >
          <button id="cancelbtn">Cancel</button>
          <button id="addbtn1">Add Question</button>
          <div id="img"></div>
        </div>
      </div>
      <main>
        <section id="sec3">
          <div id="filter">Filter</div>
          <div id="filterspace">
            <div
              class="filter1"
              style={{
                backgroundColor: isstyledstories
                  ? "rgb(234, 176, 176)"
                  : "white",
                color: isstyledstories ? "rgb(207, 60, 60)" : "rgb(55, 51, 51)",
                fontWeight: isstyledstories ? "700" : "400",
              }}
              id="st"
              onClick={() => click1()}
            >
              Stories
            </div>
            <div
              class="filter1"
              id="q"
              style={{
                backgroundColor: isstyledques ? "white" : "rgb(234, 176, 176)",
                color: isstyledques ? "rgb(55, 51, 51)" : "rgb(207, 60, 60)",
                fontWeight: isstyledques ? "400" : "700",
              }}
              onClick={() => click2()}
            >
              Questions
            </div>
            <div
              class="filter1"
              id="s"
              style={{
                backgroundColor: isstyledspaces
                  ? "white"
                  : "rgb(234, 176, 176)",
                color: isstyledspaces ? "rgb(55, 51, 51)" : "rgb(207, 60, 60)",
                fontWeight: isstyledspaces ? "400" : "700",
              }}
              onClick={() => click3()}
            >
              Spaces
            </div>
            <div
              class="filter1"
              id="c"
              style={{
                backgroundColor: isstyledcontent
                  ? "white"
                  : "rgb(234, 176, 176)",
                color: isstyledcontent ? "rgb(55, 51, 51)" : "rgb(207, 60, 60)",
                fontWeight: isstyledcontent ? "400" : "700",
              }}
              onClick={() => click4()}
            >
              Your content
            </div>
            <div
              class="filter1"
              id="p"
              style={{
                backgroundColor: isstyledprofile
                  ? "white"
                  : "rgb(234, 176, 176)",
                color: isstyledprofile ? "rgb(55, 51, 51)" : "rgb(207, 60, 60)",
                fontWeight: isstyledprofile ? "400" : "700",
              }}
              onClick={() => click5()}
            >
              Your profile
            </div>
          </div>
        </section>
        <section id="sec4">
          <div id="notify">Stories</div>
          <div id="notify-img"></div>
        </section>
      </main>
    </>
  );
}

export default Notifications;
