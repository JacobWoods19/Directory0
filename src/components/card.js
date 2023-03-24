import React, { useEffect } from 'react';

function getFaviconFromUrl(url) {
  var url = new URL(url);
  // console.log(url.protocol + "//" + url.hostname + "/favicon.ico")
  url = url.protocol + "//" + url.hostname + "/favicon.ico";
  // if the url returns a 404, return the default favicon
  return url;
}

export default function Card(props) {
  const [barColor, setBarColor] = React.useState("bg-blue-500");
  const [upvotes, setUpvotes] = React.useState(props.upvotes);
  const [hasUpvoted, setHasUpvoted] = React.useState(false);
  const [hasBookmarked, setHasBookmarked] = React.useState(false);
  useEffect(() => {
    //check if user has upvoted this project
    let upvotedProjects = JSON.parse(localStorage.getItem("upvotedProjects"));
    if (upvotedProjects) {
      if ((upvotedProjects.includes(props.id) || hasUpvoted) && props.session?.data?.session?.user?.id) {
        setBarColor("bg-green-500");
        setHasUpvoted(true);
      }
      else {
        setBarColor("bg-blue-500");
      }
    }
    window.addEventListener('storage', () => {
      let upvotedProjects = JSON.parse(localStorage.getItem("upvotedProjects"));
      if (upvotedProjects) {
        if (upvotedProjects.includes(props.id) || hasUpvoted) {
          setBarColor("bg-green-500");
          setHasUpvoted(true);
        }
        else {
          setBarColor("bg-blue-500");
        }
      }
      let bookmarkedProjects = JSON.parse(localStorage.getItem("bookmarkedProjects"));
      if (bookmarkedProjects) {
        if (bookmarkedProjects.includes(props.id) || hasBookmarked) {
          setHasBookmarked(true);
        }
      }
  })
    //check if user has bookmarked this project
    let bookmarkedProjects = JSON.parse(localStorage.getItem("bookmarkedProjects"));
    if (bookmarkedProjects) {
      if (bookmarkedProjects.includes(props.id) || hasBookmarked) {
        setHasBookmarked(true);
      }
    }
  }, []);
  //add upvotes prop to state and update it when upvote is clicked

  async function upvote(user_id, id, type) {
    console.log("TYPE IS: " + type)
    const response = await fetch('https://api.directory0.org/api/upvote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        id: id,
        type: type
      })
    });
    if (response.status === 200) {
      //APPEND LOCAL STORAGE UPVOTED PROJECTS
      let upvotedProjects = JSON.parse(localStorage.getItem("upvotedProjects"))
      if (upvotedProjects === null) {
        upvotedProjects = []
      }
      upvotedProjects.push(id)
      localStorage.setItem("upvotedProjects", JSON.stringify(upvotedProjects))
      //TODO: Change bar color to green
      setBarColor("bg-green-500")
      setUpvotes(upvotes + 1)
      setHasUpvoted(true)
      return true;
    }
    if (response.status === 400) {
      alert("You have already upvoted this project!")
      return false;
    }
    else {
      return false;
    }
  }
  async function downvote(user_id, id, type) {
    const response = await fetch('https://api.directory0.org/api/downvote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        id: id,
        type: type
      })
    });
    if (response.status === 200) {
      // Remove from local storage
      let upvotedProjects = JSON.parse(localStorage.getItem("upvotedProjects"))
      if (upvotedProjects === null) {
        upvotedProjects = []
      }
      upvotedProjects = upvotedProjects.filter((project) => project !== id)
      localStorage.setItem("upvotedProjects", JSON.stringify(upvotedProjects))
      setBarColor("bg-blue-500")
      setUpvotes(upvotes - 1)
      setHasUpvoted(false)
      return true;
    }
    if (response.status === 400) {
      alert("Downvote failed!")
      return false;
    }
    else {
      return false;
    }
  }
  function addBookmarkToDatabase(id) {
    alert("Bookmark working on it!")
    async function add() {
      const response = await fetch('https://api.directory0.org/api/bookmarked', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: props.session.data.session.user.id,
          id: id
        })
      });
      if (response.status === 200) {
        addBookmark(id)
        alert("Bookmark added!")
        return true;
      }
      if (response.status === 400) {
        alert("Bookmark failed!")
        return false;
      }
      else {
        return false;
      }
    }
    add();

  }
  function removeBookmarkFromDatabase(id) {
    alert("Bookmark working on it!")
    async function remove() {
      const response = await fetch('https://api.directory0.org/api/bookmarked/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: props.session.data.session.user.id,
          id: id
        })
      });
      if (response.status === 200) {
        removeBookmark(id)
        return true;
      }
      if (response.status === 400) {
        return false;
      }
      else {
        return false;
      }
    }
    remove();

  }

  function addBookmark(id) {
    // For now, just add to local storage
    let bookmarkedProjects = JSON.parse(localStorage.getItem("bookmarkedProjects"))
    if (bookmarkedProjects === null) {
      bookmarkedProjects = []
    }
    bookmarkedProjects.push(id)
    localStorage.setItem("bookmarkedProjects", JSON.stringify(bookmarkedProjects))
    // add to database

    setHasBookmarked(true)
  }
  function removeBookmark(id) {
    // For now, just add to local storage
    let bookmarkedProjects = JSON.parse(localStorage.getItem("bookmarkedProjects"))
    if (bookmarkedProjects === null) {
      bookmarkedProjects = []
    }
    bookmarkedProjects = bookmarkedProjects.filter((project) => project !== id)
    localStorage.setItem("bookmarkedProjects", JSON.stringify(bookmarkedProjects))
    setHasBookmarked(false)
  }


  return (

    <div class="  outline outline-blue-500 outline-2 rounded shadow-lg bg-slate-800 hover:bg-slate-700  w-100">
      <div className="flex justify-between">

        <div className='p-3'>
          <div className='flex'>
            <div className="flex justify-center items-center">

            </div>
            <div>
              <a href={props.url}>
                <div className='inline-flex '>
                  <img src={getFaviconFromUrl(props.url)} className="w-6 h-6" onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "defaulcon.png";
                  }}
                  />
                  <h1 class="text-white font-semibold px-2">{props.title}</h1>
                </div>
                <h2 class="text-slate-100  font-semibold text-sm sm:text-xs">{props.description}*</h2>
                <p className="text-blue-500 font-semibold underline pt-3 text-sm">{props.url.slice(0, 30) + "..."}</p>
              </a>
            </div>
          </div>
        </div>



      </div>


      <button class="mx-3 my-3 py-1 px-2 shadow-md no-underline rounded-full bg-blue-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2" onClick={
        () => {
          window.sessionStorage.setItem("search", props.tag);
          window.location.href = "/result";
        }
      }>{props.tag}</button>


      {/* <button class="mx-3 my-3 py-1 px-2 shadow-md no-underline rounded-full bg-blue-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">Machine Learning</button>
      <button class="mx-3 my-3 py-1 px-2 shadow-md no-underline rounded-full bg-blue-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">Python</button> */}
      <div id="bottom-bar" className={`flex justify-between cursor-pointer ${barColor}`} >
        <h1 class="text-white font-semibold text-sm cursor-pointer p-2" onClick={() => {
          if (props?.session?.data.session?.user) {
            if (!hasUpvoted) {
              console.log(props.id)
              upvote(props.session.data.session.user.id, props.id, props.type)
            }
            else {
              downvote(props.session.data.session.user.id, props.id, props.type)
            }
          }
          else {
            window.location.href = "/login"
          }
        }}>🥇 {upvotes} Upvotes</h1>
        <img src={hasBookmarked ? "bookmark_fill.png" : "bookmark.png"} className="w-8 cursor-pointer" onClick={
          () => {
            if (props?.session?.data.session?.user) {
              if (!hasBookmarked) {
                addBookmarkToDatabase(props.id)
                setHasBookmarked(true)
              }
              else {
                removeBookmarkFromDatabase(props.id)
                setHasBookmarked(false)
              }
            }
            else {
              window.location.href = "/login"
            }
          }
        } />

      </div>
    </div>

  );
}
