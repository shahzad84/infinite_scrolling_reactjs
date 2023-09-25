import { React, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [userData, Setdata] = useState([]);
  const [page, setPage] = useState(1);

  const fetchMoreData = () => {
    setTimeout(() => {
      axios
        .get(`https://jsonplaceholder.typicode.com/photos?_page=${page + 1}`)
        .then((response) => {
          Setdata([...userData, ...response.data]);
          setPage(page + 1);
        });
    }, 500); // Simulating a delay of 500 milliseconds before fetching more data
  };

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        Setdata(response.data);
      });
  }, []);
  return (
    <InfiniteScroll
      dataLength={userData.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <div className="App">
        {userData.map((data) => {
          return (
            <div className="container my-3">
              <div className="row">
                <div className="col-md-4">
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      src={data.thumbnailUrl}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <p className="card-text">{data.title}</p>
                    </div>
                  </div>
                </div> 
              </div>
            </div>
          );
        })}
      </div>
    </InfiniteScroll>
  );
}

export default App;
