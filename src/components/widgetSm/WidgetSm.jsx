import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import {useState, useEffect} from 'react'
import axios from 'axios'

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([])
  useEffect(() => {
    const getNewUsers = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/api/users?new=true`,
          {
              headers: {
                  authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
              }
          }
          )
          setNewUsers(response.data)
      } catch (error) {
          console.log(error);
      }   
  }
  getNewUsers()
  }, [])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map(user => 
             <li className="widgetSmListItem" key={user._id}>
             <img
               src={user.profilePic || "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"}
               alt=""
               className="widgetSmImg"
             />
             <div className="widgetSmUser">
               <span className="widgetSmUsername">{user.username}</span>
             </div>
             <button className="widgetSmButton">
               <Visibility className="widgetSmIcon" />
               Display
             </button> 
           </li>
          )}
      </ul>
    </div>
  );
}
