import React, { useContext } from "react";
import "../App.css";
import avatar from "../images/roee-n-avatar.png";
import DataContext from "./usedb";

function ProfileCard(props) {
  const {item} = useContext(DataContext)
	return (
		<div className="card-container">
			<header>
				<img src={avatar} alt={props.name} />
			</header>
			<h1 className="bold-text">
				{props.name} <span className="normal-text">27</span>
			</h1>
			<h2 className="normal-text">Tel Aviv</h2>
			<div className="social-container">
				<div className="followers">
					<h1 className="bold-text">15</h1>
					<h2 className="smaller-text">Followers</h2>
				</div>
				<div className="likes">
					<h1 className="bold-text">27</h1>
					<h2 className="smaller-text">Likes</h2>
				</div>
				<div className="photos">
					<h1 className="bold-text">6</h1>
					<h2 className="smaller-text">Products</h2>
				</div>
			</div>
		</div>
	);
}

export default ProfileCard;