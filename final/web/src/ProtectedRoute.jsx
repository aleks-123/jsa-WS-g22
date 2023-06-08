import React, { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       const res = await fetch("http://localhost:9002/api/v1/posts", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       const data = await res.json();
  //       if (res.ok) {
  //         setPosts(data.data.post);
  //       } else {
  //         console.log("error: failed");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchPost();
  // }, []);
  return (
    <div>
      <p>Posts:</p>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.plot}</p>
        </div>
      ))}
    </div>
  );
};

export default ProtectedRoute;
